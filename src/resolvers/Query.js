module.exports = {
  async userByToken(parent, args, ctx, info) {
    const user = await ctx.prisma.user({ signupToken: args.token })
    if(!user) throw new Error('Signup token is invalid')
    if(user.password) throw new Error(`You've already signed up`)
    if(user.signupTokenExpiry < Date.now()) throw new Error('Signup token has expired')

    return user
  },

  async users(parent, args, ctx, info) {
    const { request: { userId } } = ctx
    if(!userId) return []

    const user = await ctx.prisma.user({ id: userId })
    if(!user || (user.role !== 'ADMIN' && user.role !== 'SUPERADMIN')) return []

    return ctx.prisma.users()
  },

  me(parent, args, ctx, info) {
    if(!ctx.request.userId) return null
    return ctx.prisma.user({ id: ctx.request.userId })
  },
  
  async taskLists(parent, args, ctx, info) {
    const { request: { userId } } = ctx
    if(!userId) return []

    // DECISION: do we need to limit getting all categories to admin / superadmin?
    
    // Use fragments to get related custom fields to the category
    const fragment = `
      fragment taskListsWithTaskListFields on Category {
        id
        name
        description
        slug
        taskListFields {
          id
          fieldName
          fieldType
        }
        tasks {
          id
          status
        }
      }
    `

    return ctx.prisma.taskLists().$fragment(fragment)
  },

  async taskList(parent, args, ctx) {
    const { request: { userId } } = ctx
    if(!userId) return []
    
    // Use fragments to get related tasks to the category
    const fragment = `
      fragment taskListsWithFilteredTasks on Category {
        name
        id
        slug
        description
      }
    `

    // BIGQUESTION: Do we really need fragments to do this? 

    // Can i run prisma bindings in parralel with prisma client so I don't have
    // to explicity state what fields to return here all the time! it removes so much flexibility
    // on the front end

    return ctx.prisma
      .taskList({ slug: args.slug })
      .$fragment(fragment)

  },

  async tasks(parent, args, ctx) {
    const { request: { userId } } = ctx
    if(!userId) return []

    return ctx.prisma
      .tasks({
        where: {
          taskList: {
            slug: args.taskListSlug
          },
          status_not_in: args.excludeStatus
        }
      })
  }
}