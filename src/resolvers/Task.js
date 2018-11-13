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
}

module.exports = Task


