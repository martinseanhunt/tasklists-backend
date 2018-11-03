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
  
  async categories(parent, args, ctx, info) {
    const { request: { userId } } = ctx
    if(!userId) return []

    // DECISION: do we need to limit getting all categories to admin / superadmin?
    
    // Use fragments to get related custom fields to the category
    const fragment = `
      fragment categoriesWithCategoryFields on Category {
        id
        name
        description
        categoryFields {
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

    return ctx.prisma.categories().$fragment(fragment)
  } 
}