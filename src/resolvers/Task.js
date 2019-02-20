// TODO / QUESTION: For now this is too slow and I'm using the prisma.$graphql method instead

const Task = {
  id: parent => parent.id,
  title: parent => parent.title,
  description: parent => parent.description,
  dueDate: parent => parent.dueDate,
  due: parent => parent.due,
  createdAt: parent => parent.createdAt,
  updatedAt: parent => parent.updatedAt,
  customFields: parent => parent.customFields,
  status: parent => parent.status,
  priority: parent => parent.priority,
  // QUESTION is this the right way of thinking about 
  // getting the related nodes here ? 
  createdBy: (parent, args, ctx) =>
    ctx.prisma.task({ id: parent.id }).createdBy(),
  assignedTo: (parent, args, ctx) =>
    ctx.prisma.task({ id: parent.id }).assignedTo(),
  assets: (parent, args, ctx) =>
    ctx.prisma.task({ id: parent.id }).assets(),
  taskList: (parent, args, ctx) =>
    ctx.prisma.task({ id: parent.id }).taskList(),
  customFields: (parent, args, ctx) =>
    ctx.prisma.task({ id: parent.id }).customFields(),
  comments: (parent, args, ctx) =>
    ctx.prisma.comments({ where: { task: { id: parent.id } } }),
  subscribedUsers: (parent, args, ctx) =>
    ctx.prisma.task({ id: parent.id }).subscribedUsers(),
}

module.exports = Task