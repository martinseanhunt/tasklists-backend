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
    if(!user || (user.role !== 'ADMIN' && user.role !== 'SUPERADMIN')) return []

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

    return ctx.prisma
      .tasks({
        where: {
          taskList: {
            slug: args.taskListSlug
          },
          status_not_in: args.excludeStatus
        }
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
          status_not: 'COMPLETED'
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

    const task = await ctx.prisma.task({ id: args.id })
    if(!task) throw new Error('Task not found')

    return task
  }
}