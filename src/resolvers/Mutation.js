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

    // ToDo if .send fails then delete the user from the database and send a good error message

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
    ctx.response.clearCookie('token')
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

    const task = await ctx.prisma.createTask({
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
        { id: user.id },
        { id: args.assignedTo }
      ] },
      status: args.assignedTo && args.assignedTo !== '' 
        ? 'ASSIGNED'
        : 'CREATED' 
    })
    
    return task
  },

  async updateTaskStatus(root, args, ctx) {
    const { userId } = ctx.request
    if(!userId) throw new Error('You must be logged in to do this')

    const user = await ctx.prisma.user({ id: userId })
    if(!user) throw new Error('You must be logged in to do this')

    const task = await ctx.prisma.task({ id: args.id })
    if(!task) throw new Error('No task found')

    // TODO Slack notifications!

    if(!(['ADMIN', 'SUPERADMIN'].includes(user.role)
    || task.createdBy.id === userData.me.id
    || (task.assignedTo && task.assignedTo.id === userData.me.id))) 
      throw new Error('You do not have permission to update this task')

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

    let notified = false
    // Send slack message if notify and user has a slack handle
    if(args.notify && user.slackHandle) {
      const notifyUser = await ctx.prisma.user({ id: args.notify })
      if(!notifyUser) console.error('No user found')

      sendSlackDM(notifyUser.slackHandle, `👋 <@${user.slackHandle}> mentioned you in a discussion the task \`${task.title}\`. \n \n *${user.name} wrote:* \n \`\`\`${args.comment}\`\`\` \n Click here to view the task and respond ${process.env.FRONTEND_URL}/task/${args.task} \r \n`)

      notified = true
    }

    // TODO different messages if you are the task creator or asignee

    // Send slack message to all users subscribed to Task as long as the user hasn't
    // Been notified because of a mentiion in the above block
    const subscribedUsers = await ctx.prisma.task({ id: args.task }).subscribedUsers()
    if(subscribedUsers.length) {
      subscribedUsers.forEach(subscribedUser => {
        !notified && sendSlackDM(subscribedUser.slackHandle, `👋 <@${user.slackHandle}> commented on the task \`${task.title}\` that you are subscribed to. \n \n *${user.name} wrote:* \n \`\`\`${args.comment}\`\`\` \n Click here to view the task ${process.env.FRONTEND_URL}/task/${args.task} \r \n`)
      })
    }

    // TODO want to send email here or keep to slack for now ?

    const comment = {
      comment: args.comment,
      task: {
        connect: {
          id: args.task
        }
      },
      createdBy: {
        connect: {
          id: user.id
        }
      }
    }

    return await ctx.prisma.createComment(comment)
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