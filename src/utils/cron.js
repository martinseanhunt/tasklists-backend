const cron = require('node-cron')
const { prisma } = require('../generated/prisma-client')
const moment = require('moment')

const { sendSlackDM } = require('./slack')

// TODO PRIORITY - THIS NEEDS TESTING ON MY IMAC

// TODO instead of doing one chek every 24 hours, we chould check every few hours and only send a notification if they haven't already recieved one for that task in the last 24 hours.

// TODO compile all notifications for user in to one daily message to avoid unnececarry calls
// to slack API

// Delay function to dealy 1 min between each user to avoid too many slack calls
const delay = ms => new Promise(res => setTimeout(res, ms))

// Get Due in MS
const calcDueIn = (task) => {
  // Get due date in miliseconds
  const due = new Date(task.dueDate).getTime()

  // MS between due date and now
  return Date.now() - due
}

const sendMessage = (task, dueIn, notificationType) => {
  // Is it due today ? 
  const dueToday = new Date(Date.now()).getDate() === new Date(task.dueDate).getDate()

  // Find out if the number is negative i.e. due date has passed
  const overdue = dueIn > 0

  // Work out user friendly time from now
  const fromNow = moment(task.dueDate).fromNow()        

  // TODO different message if today

  // Is task due by or on date
  const byOrOn = task.due === 'BYDATE' ? 'by' : 'on'

  // human readable duedate
  const dueDate = moment(task.dueDate).format('dddd, MMMM Do YYYY')

  // Send the slack message
  overdue 
    ? sendSlackDM(user.slackHandle, `🚨 *Task Overdue - due ${fromNow}* \n \n A task you ${notificationType} \`${task.title}\` was due ${byOrOn} ${dueDate}. \n \n Click here to view the task ${process.env.FRONTEND_URL}/task/${task.id} \r \n`) 
    
    : sendSlackDM(user.slackHandle, `⏰ *Task Due ${fromNow}* \n \n A task you ${notificationType} \`${task.title}\` is due ${byOrOn} ${dueDate}. \n \n Click here to view the task ${process.env.FRONTEND_URL}/task/${task.id} \r \n`)
}

module.exports = () => {
  cron.schedule("0 9 * * *", async () => {
    const taskQuery = `(
      where: {
        status_not_in: [COMPLETED, CLOSED],
        due_in:[BYDATE, ONDATE]
      }
    ){
      id
      title
      status
      due
      dueDate
    }`

    const query = `
      query {
        users(where: {
          OR: [
            {
              tasksCreated_some: {
                status_not_in: [COMPLETED, CLOSED],
                due_in:[BYDATE, ONDATE]
              }
            },
            {
              tasksAssignedTo_some: {
                status_not_in: [COMPLETED, CLOSED],
                due_in:[BYDATE, ONDATE]
              }
            },
            {
              subscribedTasks_some: {
                status_not_in: [COMPLETED, CLOSED],
                due_in:[BYDATE, ONDATE]
              }
            }
          ]
        }) {
          id
          name
          slackHandle
          tasksCreated${taskQuery}
          tasksAssignedTo${taskQuery}
          subscribedTasks${taskQuery}
        }
      }
    `

    const users = await prisma.$graphql(query)

    // One day in MS
    const day = 86400000

    for(const user of users.users) {
      let tasksNotified = []
      
      for(const task of user.tasksCreated) {
        // MS between due date and now
        const dueIn = calcDueIn(task)

        // If it's due in more than 3 days from now, 
        // no need to send a notification
        if(dueIn > (day * 3)) continue

        // Now we know we're going to send a notification so add
        // the task ID to the list of tasks that we've already notified
        // this user about.
        tasksNotified = [...tasksNotified, task.id]

        // Send the message
        sendMessage(task, dueIn, 'created')
      }

      for(const task of user.tasksAssignedTo) {
        // If the ID is in the array it means we've already
        // sent a notification above about this task because the user is the
        // tasks creator. so there's no  need to send another
        if(tasksNotified.includes(task.id)) continue
        
        // MS between due date and now
        const dueIn = calcDueIn(task)

        // If it's due in more than 3 days from now, 
        // no need to send a notification
        if(dueIn > (day * 3)) continue

        // Now we know we're going to send a notification so add
        // the task ID to the list of tasks that we've already notified
        // this user about.
        tasksNotified = [...tasksNotified, task.id]

        // Send the message
        sendMessage(task, dueIn, 'are assigned to')
      }

      for(const task of user.subscribedTasks) {
        // If the ID is in the array it means we've already
        // sent a notification above about this task because the user is the
        // tasks creator. so there's no  need to send another
        if(tasksNotified.includes(task.id)) continue
        
        // MS between due date and now
        const dueIn = calcDueIn(task)

        // If it's due in more than 3 days from now, 
        // no need to send a notification
        if(dueIn > (day * 3)) continue

        // Now we know we're going to send a notification so add
        // the task ID to the list of tasks that we've already notified
        // this user about.
        tasksNotified = [...tasksNotified, task.id]

        // Send the message
        sendMessage(task, dueIn, 'are subscribed to')
      }

      // Delay before processing next user
      await delay(60000)
    }
  })
}