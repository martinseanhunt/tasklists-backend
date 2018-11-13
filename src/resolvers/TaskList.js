const TaskList = {
  id: parent => parent.id,
  name: parent => parent.name,
  description: parent => parent.description,
  slug: parent => parent.slug,
  tasks: (parent, args, ctx) => 
    ctx.prisma.tasks({ where: { taskList: { id: parent.id } } }),
  taskListFields: (parent, args, ctx) => 
    ctx.prisma.taskListFields({ where: { taskList: { id: parent.id } } }),
  totalTaskCount: (parent, args, ctx) =>
    ctx.prisma.tasksConnection({ where: { 
      taskList: { id: parent.id },
      status_not: 'CLOSED'
    } })
    .aggregate()
    .count(),
  completedTaskCount: (parent, args, ctx) =>
    ctx.prisma.tasksConnection({ where: { 
      taskList: { id: parent.id }, 
      status: 'COMPLETED'
    } })
    .aggregate()
    .count()
}

module.exports = TaskList