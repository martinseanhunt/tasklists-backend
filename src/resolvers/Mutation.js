const { randomBytes } = require('crypto')
const { promisify } = require('util')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
var slug = require('slug')

const validationSchemas = require('../validationSchemas')
const { sendSlackDM } = require('../utils/slack')

const cookieSettings = {
  httpOnly: true,
  domain: '.omstars.com',
  secure: true,
  maxAge: 1000 * 60 * 60 *24 * 365, // 1 year cookie
}

// TODO make sure I'm using Joi for all mutations where accepting external values

module.exports = {

  // TODO change the name of this function to invite user 
  // and update on front end

  async createUser(root, args, ctx) {
    const { userId } = ctx.request
    if(!userId) throw new Error('You must be logged in to do this')

    // TODO put role on JWT so I can check the users role without calling the DB
    const currentUser = await ctx.prisma.user({ id: userId })
    if(!currentUser || !['ADMIN', 'SUPERADMIN'].includes(currentUser.role)) 
      throw new Error('Not authorized')

    // TODO For better error handling check if user already exists 
    // and return custom error:
    // https://www.prisma.io/docs/prisma-client/features/check-existence-JAVASCRIPT-pyl1/

    const email = args.email.toLowerCase()
    const signupToken = (await promisify(randomBytes)(20)).toString('hex')
    const signupTokenExpiry = Date.now() + (3600000 * 24 * 14) // 1 week

    const { error } = Joi.validate({...args, email}, validationSchemas.createUser)
    if(error) throw new Error(error)

    const user = await ctx.prisma.createUser({
      ...args,
      email,
      signupToken,
      signupTokenExpiry,
    })

    // Send email to user with link to signup incl token
    // TODO improve signup email

    // TODO send slack message to user as well!
    
    ctx.sgMail.send({
      to: email,
      from: process.env.COMPANY_EMAIL,
      subject: `Your ${process.env.COMPANY_NAME} devlist invite`,
      text: `You've been invited to join the ${process.env.COMPANY_NAME} devlist. Visit ${process.env.FRONTEND_URL}/signup?token=${signupToken}`,
      html: `<strong>You've been invited to join the ${process.env.COMPANY_NAME} devlist.</strong> Click <a href="${process.env.FRONTEND_URL}/signup?token=${signupToken}">here to get started</a>`,
    })

    // TODO if .send fails then delete the user from the database and send a good error message

    return user
  },

  async signUp(root, args, ctx) {
    const user = await ctx.prisma.user({ signupToken: args.token })

    // TODO what's the flow for if a token has expired, how do we send them a new one? 

    // TODO flow for if user has already signed up / accepted invite

    // TODO improve error messages

    const { error } = Joi.validate({...args}, validationSchemas.signUp)

    if(!user) throw new Error('Signup token is invalid')
    if(user.password) throw new Error(`You've already signed up`)
    if(user.signupTokenExpiry < Date.now()) throw new Error('Signup token has expired')

    const password = await bcrypt.hash(args.password, 10)

    const signedUpUser = await ctx.prisma.updateUser({
      where: { signupToken: args.token },
      data: { 
        password,
        status: "JOINED"
      }
    })

    const token = jwt.sign({ userId: signedUpUser.id }, process.env.APP_SECRET)

    ctx.response.cookie('token', token, cookieSettings)

    return signedUpUser
  },

  async signIn(root, {email, password}, ctx) {
    const user = await ctx.prisma.user({ email })    
    if(!user) throw new Error('Email not found')

    if(!user.password) throw new Error('You still need to accept your invitation. Please check your email or slack for instructions')

    const matchingPass = await bcrypt.compare(password, user.password)
    if(!matchingPass) throw new Error('Incorrect password')

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    ctx.response.cookie('token', token, cookieSettings)

    return user
  },

  async signOut(root, args, ctx) {
    ctx.response.clearCookie('token', { domain: cookieSettings.domain })
    return { message: 'Success' }
  },

  async createTaskList(root, args, ctx) {
    // TODO helper function for protected routes

    // TODO Put role on JWT so I don't have to check the DB when not needed for permissions
    const { userId } = ctx.request
    if(!userId) throw new Error('You must be logged in to do this')

    const currentUser = await ctx.prisma.user({ id: userId })
    if(!currentUser || !['ADMIN', 'SUPERADMIN'].includes(currentUser.role)) 
      throw new Error('Not authorized')

    const { error } = Joi.validate({...args}, validationSchemas.createTaskList)
    if(error) throw new Error(error)

    const taskList = await ctx.prisma.createTaskList({
      ...args,
      slug: slug(args.name.toLowerCase()),
      taskListFields: {
        create: args.taskListFields
      }
    })

    return taskList
  },

  
  async createTask(root, args, ctx) {
    const { userId } = ctx.request
    if(!userId) throw new Error('You must be logged in to do this')

    const user = await ctx.prisma.user({ id: userId })
    if(!user) throw new Error('You must be logged in to do this')

    // TODO Validation

    // TODO refactor for clarity

    const taskData = {
      ...args,
      taskList: {
        connect: {
          slug: args.taskList
        }
      },
      assignedTo: args.assignedTo && args.assignedTo !== '' ? {
        connect: {
          id: args.assignedTo
        }
      } : null,
      createdBy: {
        connect: {
          id: user.id 
        }
      },
      assets: {
        create: args.assets
          .filter(a => a.assetUrl)
          .map(a => ({
            ...a,
            createdBy: {
              connect: { id: user.id } 
            }
          }
        ))
      },
      customFields: {
        create: args.customFields
          .filter(field => field !== null && field.fieldValue)
          .map(field => ({
            ...field, 
            taskListField: { connect: { id: field.taskListField } }
          }))
      },
      subscribedUsers: { connect: [
        { id: user.id }
      ] },
      status: args.assignedTo && args.assignedTo !== '' 
        ? 'ASSIGNED'
        : 'CREATED' 
    }

    if(args.assignedTo && args.assignedTo !== '') {
      taskData.subscribedUsers = { connect: [
        { id: user.id },
        { id: args.assignedTo }
      ] }
    }

    const task = await ctx.prisma.createTask(taskData)

    console.log(args.assignedTo)

    if (args.assignedTo) {
      // Send slack message to assignee
      const assignedUser = await ctx.prisma.user({ id: args.assignedTo })
      console.log(assignedUser)

      sendSlackDM(assignedUser.slackHandle, `👋 *Assigned to new task* \n \n <@${user.slackHandle}> created a new task assigned to you \`${task.title}\` \n \n Click here to view the task ${process.env.FRONTEND_URL}/task/${task.id} \r \n`)
      console.log('sent')
    }
    
    return task
  },

  async updateTaskStatus(root, args, ctx) {
    const { userId } = ctx.request
    if(!userId) throw new Error('You must be logged in to do this')

    const user = await ctx.prisma.user({ id: userId })
    if(!user) throw new Error('You must be logged in to do this')

    const task = await ctx.prisma.task({ id: args.id })
    if(!task) throw new Error('No task found')

    if(!(['ADMIN', 'SUPERADMIN'].includes(user.role)
    || task.createdBy.id === userData.me.id
    || (task.assignedTo && task.assignedTo.id === userData.me.id))) 
      throw new Error('You do not have permission to update this task')

    // Send slack message to all users subscribed to Task

    // TODO refactor this to it's own function
    const userFrienlyStatus = {
      COMPLETED: 'Completed',
      CREATED: 'Open',
      ASSIGNED: 'Assigned',
      AWAITINGINPUT: 'Awaiting Input',
      CLOSED: 'Closed'
    }

    // TODO refactor this to it's own function
    let statusMessage = { title: '', message: ''}
    if(args.status === 'COMPLETED'){ 
      statusMessage = { 
        title: 'Task Completed', 
        message: 'completed'
      } 
    } else if(args.status === 'CLOSED') {
      statusMessage = { 
        title: 'Task Closed', 
        message: 'closed'
      } 
    } else {
      statusMessage = { 
        title: 'Task Re-Opened', 
        message: 're-opened'
      } 
    }

    // TODO different messages if you are the task creator or asignee

    // QUESTION why do I have to do this here? Why does the task reslover not give us access to subscribed users here? 
    const subscribedUsers = await ctx.prisma.task({ id: task.id }).subscribedUsers()
    if(subscribedUsers.length) {
      subscribedUsers.forEach(subscribedUser => {
        //if(subscribedUser.id === user.id) return true

        sendSlackDM(subscribedUser.slackHandle, `👋 *${statusMessage.title}* \n \n <@${user.slackHandle}> ${statusMessage.message} the task \`${task.title}\` that you are subscribed to. \n \n Click here to view the task ${process.env.FRONTEND_URL}/task/${args.task} \r \n`)
      })
    }

    return ctx.prisma.updateTask({ 
      where: { id: task.id },
      data: { status: args.status }
    })
  },

  async createComment(root, args, ctx) {
    const { userId } = ctx.request
    if(!userId) throw new Error('You must be logged in to do this')

    const user = await ctx.prisma.user({ id: userId })
    if(!user) throw new Error('You must be logged in to do this')

    const task = await ctx.prisma.task({ id: args.task })
    if(!task) throw new Error('No task found')
    
    // TODO refactor this. These slack sending blocks should be in their own functions

    // Filter out dupliates - users mentioned more than once
    const usersToNotify = Array.from(new Set(args.notify))

    // TODO refactor this in to it's own helper funciton

    // TODO this will probably break if the user uses @ outside the context of a mention... test / Fix!

    // Format comment to replace @mentions with markup to display.
    // TODO this is absolutely horrible. I need to learn more about regexp to make this better ;) 

    const regexp = /\[(.*?)\]/g
    let matches = []
    let match = regexp.exec(args.comment)

    while (match != null) {
      matches = [...matches, match[1]]
      match = regexp.exec(args.comment)
    }

    let formattedComment = args.comment
    let slackFormattedComment = args.comment

    matches.forEach((m, i) => {
      formattedComment = formattedComment.replace(/\@(.*?)\)/, `<span class="mention">${matches[i]}</span>`)
      slackFormattedComment = slackFormattedComment.replace(/\@(.*?)\)/, `@${matches[i]}`)
    })

    // Send slack message to all mentioned users
    const notified = usersToNotify.length 
      ? await Promise.all(usersToNotify.map(async uid => {
        const notifyUser = await ctx.prisma.user({ id: uid })
        if(!notifyUser) console.error('No user found')

        sendSlackDM(notifyUser.slackHandle, `👋 <@${user.slackHandle}> mentioned you in a discussion the task \`${task.title}\`. \n \n *${user.name} wrote:* \n \`\`\`${slackFormattedComment}\`\`\` \n Click here to view the task and respond ${process.env.FRONTEND_URL}/task/${args.task} \r \n`)

        return uid
      }))
      : []
  
    // TODO different messages if you are the task creator or asignee

    // Send slack message to all users subscribed to Task as long as the user hasn't
    // already been notified because of a mentiion
    const subscribedUsers = await ctx.prisma.task({ id: args.task }).subscribedUsers()
    if(subscribedUsers.length) {
      subscribedUsers.forEach(subscribedUser => {
        if(notified.includes(subscribedUser.id)) return true

        sendSlackDM(subscribedUser.slackHandle, `👋 <@${user.slackHandle}> commented on the task \`${task.title}\` that you are subscribed to. \n \n *${user.name} wrote:* \n \`\`\`${slackFormattedComment}\`\`\` \n Click here to view the task ${process.env.FRONTEND_URL}/task/${args.task} \r \n`)
      })
    }

    // TODO want to send email here or keep to slack for now ?

    const comment = {
      comment: formattedComment,
      task: {
        connect: {
          id: args.task
        }
      },
      createdBy: {
        connect: {
          id: user.id
        }
      },
      mentions: {
        connect: args.notify.map(u => ({ id: u }))
      }
    }

    // TODO / QUESTION I'm doing it like this because my comment resolver is way too 
    // slow when returning multiple comments. Would rather be able to return  ctx.prisma.createComment(comment) and for the resolver to take care of it.
    const createdComment =  await ctx.prisma.createComment(comment)
    createdComment.createdBy = await ctx.prisma.comment({ id: createdComment.id }).createdBy()
    createdComment.assets = await ctx.prisma.comment({ id: createdComment.id }).assets()

    return createdComment
  },

  async subscribeToTask(root, args, ctx) {
    const { userId } = ctx.request
    if(!userId) throw new Error('You must be logged in to do this')

    const user = await ctx.prisma.user({ id: userId })
    if(!user) throw new Error('You must be logged in to do this')

    const taskExists = ctx.prisma.$exists.task({ id: args.task })
    if(!taskExists) throw new Error('No task found')

    const task = await ctx.prisma.updateTask({ 
      where: { id: args.task },
      data: {
        subscribedUsers: { connect: { id: user.id } }
      }
     })

     return task
  },

  async unsubscribeFromTask(root, args, ctx) {
    const { userId } = ctx.request
    if(!userId) throw new Error('You must be logged in to do this')

    const user = await ctx.prisma.user({ id: userId })
    if(!user) throw new Error('You must be logged in to do this')

    const taskExists = ctx.prisma.$exists.task({ id: args.task })
    if(!taskExists) throw new Error('No task found')

    const task = await ctx.prisma.updateTask({ 
      where: { id: args.task },
      data: {
        subscribedUsers: { disconnect: { id: user.id } }
      }
     })

     return task
  }
}