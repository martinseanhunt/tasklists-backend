const Comment = {
  id: parent => parent.id,
  comment: parent => parent.comment,
  createdAt: parent => parent.createdAt,
  updatedAt: parent => parent.updatedAt,
  createdBy: (parent, args, ctx) => 
    ctx.prisma.comment({ id: parent.id }).createdBy(),
  assets: (parent, args, ctx) => 
    ctx.prisma.comment({ id: parent.id }).assets()
}

module.exports = Comment