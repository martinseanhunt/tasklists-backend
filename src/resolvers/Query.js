module.exports = {
  async userByToken(root, args, ctx) {
    const user = await ctx.prisma.user({ signupToken: args.token })
    if(!user) throw new Error('Signup token is invalid')
    if(user.password) throw new Error(`You've already signed up`)
    if(user.signupTokenExpiry < Date.now()) throw new Error('Signup token has expired')

    return user
  },

  async users(root, args, ctx) {
    const { request: { userId } } = ctx
    if(!userId) return []

    const user = await ctx.prisma.user({ id: userId })
    if(!user) return []

    return ctx.prisma.users()
  },

  me(root, args, ctx) {
    if(!ctx.request.userId) return null
    return ctx.prisma.user({ id: ctx.request.userId })
  },
  
  async taskLists(root, args, ctx, info) {
    const { request: { userId } } = ctx
    if(!userId) return []

    // DECISION: do I need to limit getting all categories to admin / superadmin?

    return ctx.prisma.taskLists()
  },

  async taskList(root, args, ctx) {
    const { request: { userId } } = ctx
    if(!userId) return []

    return ctx.prisma.taskList({ slug: args.slug })
  },

  async tasks(root, args, ctx) {
    const { request: { userId } } = ctx
    if(!userId) return []

    const where = {
      taskList: {
        slug: args.taskListSlug
      },
      status_not_in: args.excludeStatus,
    }

    if(args.filterByStatus) {
      where.status_in = args.filterByStatus
    }

    if(args.orderBy && args.orderBy.includes('dueDate')) {
      // If we're sorting by due date ignore results that don't have a due date otherwise
      // They will show up on top for ASC
      where.dueDate_not = null
    }

    return ctx.prisma
      .tasks({ 
        where,
        orderBy: args.orderBy
      })
  },

  async openTasks(root, args, ctx) {
    const { request: { userId } } = ctx
    if(!userId) return []

    return ctx.prisma
      .tasks({
        where: {
          taskList: {
            slug: args.taskListSlug
          },
          status_not_in: ['COMPLETED', 'CLOSED']
        }
      })
  },

  async completedTasks(root, args, ctx) {
    const { request: { userId } } = ctx
    if(!userId) return []

    return ctx.prisma
      .tasks({
        where: {
          taskList: {
            slug: args.taskListSlug
          },
          status: 'COMPLETED'
        }
      })
  },

  async task(root, args, ctx) {
    const { request: { userId } } = ctx
    if(!userId) throw new Error('You must be logged in to access a task')

    

    /* temporarily use $request as the above isn't working to retireve comments
    // and the comment related nodes

    const query = `
      query {
        task(where:{id:"${args.id}"}){
          id
          title
          description
          createdBy {
            name
            id
            avatar
          }
          assignedTo {
            name 
            id
            avatar
          }
          due
          dueDate
          assets {
            id
            assetUrl
            assetType
          }
          taskList {
            name
            slug
          }
          createdAt
          updatedAt
          customFields {
            id
            fieldName
            fieldValue
            fieldType
          }
          status
          comments {
            id
            comment
            createdAt
            assets {
              id
            }
            createdBy {
              id
              name
              avatar
            }
          }
          subscribedUsers {
            id
            name
            avatar
          }
        }
      }
    ` 
    const task = await ctx.prisma.$graphql(query) */
    
    const task = await ctx.prisma.task({ id: args.id })
    if(!task) throw new Error('Task not found')

    return task
  },

  async myOpenTasks(root, args, ctx) {
    const { request: { userId } } = ctx
    if(!userId) return []

    const where = {
      taskList: {
        slug: args.taskListSlug
      },
      assignedTo: {
        id: userId
      },
      status_not_in: ['COMPLETED', 'CLOSED']
    }

    if(args.orderBy && args.orderBy.includes('dueDate')) {
      // If we're sorting by due date ignore results that don't have a due date otherwise
      // They will show up on top for ASC
      where.dueDate_not = null
    }

    return ctx.prisma
      .tasks({
        where,
        orderBy: args.orderBy
      })
  },

  async mySubscriptions(root, args, ctx) {
    const { request: { userId } } = ctx
    if(!userId) return []

    const where = { status_not_in: ['COMPLETED', 'CLOSED'] }

    if(args.orderBy && args.orderBy.includes('dueDate')) {
      // If we're sorting by due date ignore results that don't have a due date otherwise
      // They will show up on top for ASC
      where.dueDate_not = null
    }

    return ctx.prisma
      .user({ id: userId })
      .subscribedTasks({ where, orderBy: args.orderBy })
  },

}