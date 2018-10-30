module.exports = {
  user(parent, args, ctx, info) {
    return ctx.prisma.user({ email: args.email })
  },
}