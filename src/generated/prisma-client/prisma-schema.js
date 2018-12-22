module.exports = {
        typeDefs: /* GraphQL */ `type AggregateAsset {
  count: Int!
}

type AggregateComment {
  count: Int!
}

type AggregateCustomField {
  count: Int!
}

type AggregateTask {
  count: Int!
}

type AggregateTaskList {
  count: Int!
}

type AggregateTaskListField {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type Asset {
  id: ID!
  createdBy: User!
  title: String!
  assetUrl: String!
  createdAt: DateTime!
  assetType: AssetType!
}

type AssetConnection {
  pageInfo: PageInfo!
  edges: [AssetEdge]!
  aggregate: AggregateAsset!
}

input AssetCreateInput {
  createdBy: UserCreateOneInput!
  title: String!
  assetUrl: String!
  assetType: AssetType!
}

input AssetCreateManyInput {
  create: [AssetCreateInput!]
  connect: [AssetWhereUniqueInput!]
}

type AssetEdge {
  node: Asset!
  cursor: String!
}

enum AssetOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  assetUrl_ASC
  assetUrl_DESC
  createdAt_ASC
  createdAt_DESC
  assetType_ASC
  assetType_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AssetPreviousValues {
  id: ID!
  title: String!
  assetUrl: String!
  createdAt: DateTime!
  assetType: AssetType!
}

type AssetSubscriptionPayload {
  mutation: MutationType!
  node: Asset
  updatedFields: [String!]
  previousValues: AssetPreviousValues
}

input AssetSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AssetWhereInput
  AND: [AssetSubscriptionWhereInput!]
  OR: [AssetSubscriptionWhereInput!]
  NOT: [AssetSubscriptionWhereInput!]
}

enum AssetType {
  IMAGE
  VIDEO
  FILE
}

input AssetUpdateDataInput {
  createdBy: UserUpdateOneInput
  title: String
  assetUrl: String
  assetType: AssetType
}

input AssetUpdateInput {
  createdBy: UserUpdateOneInput
  title: String
  assetUrl: String
  assetType: AssetType
}

input AssetUpdateManyInput {
  create: [AssetCreateInput!]
  delete: [AssetWhereUniqueInput!]
  connect: [AssetWhereUniqueInput!]
  disconnect: [AssetWhereUniqueInput!]
  update: [AssetUpdateWithWhereUniqueNestedInput!]
  upsert: [AssetUpsertWithWhereUniqueNestedInput!]
}

input AssetUpdateWithWhereUniqueNestedInput {
  where: AssetWhereUniqueInput!
  data: AssetUpdateDataInput!
}

input AssetUpsertWithWhereUniqueNestedInput {
  where: AssetWhereUniqueInput!
  update: AssetUpdateDataInput!
  create: AssetCreateInput!
}

input AssetWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdBy: UserWhereInput
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  assetUrl: String
  assetUrl_not: String
  assetUrl_in: [String!]
  assetUrl_not_in: [String!]
  assetUrl_lt: String
  assetUrl_lte: String
  assetUrl_gt: String
  assetUrl_gte: String
  assetUrl_contains: String
  assetUrl_not_contains: String
  assetUrl_starts_with: String
  assetUrl_not_starts_with: String
  assetUrl_ends_with: String
  assetUrl_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  assetType: AssetType
  assetType_not: AssetType
  assetType_in: [AssetType!]
  assetType_not_in: [AssetType!]
  AND: [AssetWhereInput!]
  OR: [AssetWhereInput!]
  NOT: [AssetWhereInput!]
}

input AssetWhereUniqueInput {
  id: ID
}

type BatchPayload {
  count: Long!
}

type Comment {
  id: ID!
  comment: String!
  createdBy: User!
  createdAt: DateTime!
  updatedAt: DateTime!
  assets(where: AssetWhereInput, orderBy: AssetOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Asset!]
  task: Task!
  mentions(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
}

type CommentConnection {
  pageInfo: PageInfo!
  edges: [CommentEdge]!
  aggregate: AggregateComment!
}

input CommentCreateInput {
  comment: String!
  createdBy: UserCreateOneWithoutCommentsCreatedInput!
  assets: AssetCreateManyInput
  task: TaskCreateOneWithoutCommentsInput!
  mentions: UserCreateManyWithoutMentionsInput
}

input CommentCreateManyWithoutCreatedByInput {
  create: [CommentCreateWithoutCreatedByInput!]
  connect: [CommentWhereUniqueInput!]
}

input CommentCreateManyWithoutMentionsInput {
  create: [CommentCreateWithoutMentionsInput!]
  connect: [CommentWhereUniqueInput!]
}

input CommentCreateManyWithoutTaskInput {
  create: [CommentCreateWithoutTaskInput!]
  connect: [CommentWhereUniqueInput!]
}

input CommentCreateWithoutCreatedByInput {
  comment: String!
  assets: AssetCreateManyInput
  task: TaskCreateOneWithoutCommentsInput!
  mentions: UserCreateManyWithoutMentionsInput
}

input CommentCreateWithoutMentionsInput {
  comment: String!
  createdBy: UserCreateOneWithoutCommentsCreatedInput!
  assets: AssetCreateManyInput
  task: TaskCreateOneWithoutCommentsInput!
}

input CommentCreateWithoutTaskInput {
  comment: String!
  createdBy: UserCreateOneWithoutCommentsCreatedInput!
  assets: AssetCreateManyInput
  mentions: UserCreateManyWithoutMentionsInput
}

type CommentEdge {
  node: Comment!
  cursor: String!
}

enum CommentOrderByInput {
  id_ASC
  id_DESC
  comment_ASC
  comment_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CommentPreviousValues {
  id: ID!
  comment: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type CommentSubscriptionPayload {
  mutation: MutationType!
  node: Comment
  updatedFields: [String!]
  previousValues: CommentPreviousValues
}

input CommentSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CommentWhereInput
  AND: [CommentSubscriptionWhereInput!]
  OR: [CommentSubscriptionWhereInput!]
  NOT: [CommentSubscriptionWhereInput!]
}

input CommentUpdateInput {
  comment: String
  createdBy: UserUpdateOneWithoutCommentsCreatedInput
  assets: AssetUpdateManyInput
  task: TaskUpdateOneWithoutCommentsInput
  mentions: UserUpdateManyWithoutMentionsInput
}

input CommentUpdateManyWithoutCreatedByInput {
  create: [CommentCreateWithoutCreatedByInput!]
  delete: [CommentWhereUniqueInput!]
  connect: [CommentWhereUniqueInput!]
  disconnect: [CommentWhereUniqueInput!]
  update: [CommentUpdateWithWhereUniqueWithoutCreatedByInput!]
  upsert: [CommentUpsertWithWhereUniqueWithoutCreatedByInput!]
}

input CommentUpdateManyWithoutMentionsInput {
  create: [CommentCreateWithoutMentionsInput!]
  delete: [CommentWhereUniqueInput!]
  connect: [CommentWhereUniqueInput!]
  disconnect: [CommentWhereUniqueInput!]
  update: [CommentUpdateWithWhereUniqueWithoutMentionsInput!]
  upsert: [CommentUpsertWithWhereUniqueWithoutMentionsInput!]
}

input CommentUpdateManyWithoutTaskInput {
  create: [CommentCreateWithoutTaskInput!]
  delete: [CommentWhereUniqueInput!]
  connect: [CommentWhereUniqueInput!]
  disconnect: [CommentWhereUniqueInput!]
  update: [CommentUpdateWithWhereUniqueWithoutTaskInput!]
  upsert: [CommentUpsertWithWhereUniqueWithoutTaskInput!]
}

input CommentUpdateWithoutCreatedByDataInput {
  comment: String
  assets: AssetUpdateManyInput
  task: TaskUpdateOneWithoutCommentsInput
  mentions: UserUpdateManyWithoutMentionsInput
}

input CommentUpdateWithoutMentionsDataInput {
  comment: String
  createdBy: UserUpdateOneWithoutCommentsCreatedInput
  assets: AssetUpdateManyInput
  task: TaskUpdateOneWithoutCommentsInput
}

input CommentUpdateWithoutTaskDataInput {
  comment: String
  createdBy: UserUpdateOneWithoutCommentsCreatedInput
  assets: AssetUpdateManyInput
  mentions: UserUpdateManyWithoutMentionsInput
}

input CommentUpdateWithWhereUniqueWithoutCreatedByInput {
  where: CommentWhereUniqueInput!
  data: CommentUpdateWithoutCreatedByDataInput!
}

input CommentUpdateWithWhereUniqueWithoutMentionsInput {
  where: CommentWhereUniqueInput!
  data: CommentUpdateWithoutMentionsDataInput!
}

input CommentUpdateWithWhereUniqueWithoutTaskInput {
  where: CommentWhereUniqueInput!
  data: CommentUpdateWithoutTaskDataInput!
}

input CommentUpsertWithWhereUniqueWithoutCreatedByInput {
  where: CommentWhereUniqueInput!
  update: CommentUpdateWithoutCreatedByDataInput!
  create: CommentCreateWithoutCreatedByInput!
}

input CommentUpsertWithWhereUniqueWithoutMentionsInput {
  where: CommentWhereUniqueInput!
  update: CommentUpdateWithoutMentionsDataInput!
  create: CommentCreateWithoutMentionsInput!
}

input CommentUpsertWithWhereUniqueWithoutTaskInput {
  where: CommentWhereUniqueInput!
  update: CommentUpdateWithoutTaskDataInput!
  create: CommentCreateWithoutTaskInput!
}

input CommentWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  comment: String
  comment_not: String
  comment_in: [String!]
  comment_not_in: [String!]
  comment_lt: String
  comment_lte: String
  comment_gt: String
  comment_gte: String
  comment_contains: String
  comment_not_contains: String
  comment_starts_with: String
  comment_not_starts_with: String
  comment_ends_with: String
  comment_not_ends_with: String
  createdBy: UserWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  assets_every: AssetWhereInput
  assets_some: AssetWhereInput
  assets_none: AssetWhereInput
  task: TaskWhereInput
  mentions_every: UserWhereInput
  mentions_some: UserWhereInput
  mentions_none: UserWhereInput
  AND: [CommentWhereInput!]
  OR: [CommentWhereInput!]
  NOT: [CommentWhereInput!]
}

input CommentWhereUniqueInput {
  id: ID
}

type CustomField {
  id: ID!
  fieldName: String!
  fieldType: FieldType!
  fieldValue: String!
  taskListField: TaskListField!
}

type CustomFieldConnection {
  pageInfo: PageInfo!
  edges: [CustomFieldEdge]!
  aggregate: AggregateCustomField!
}

input CustomFieldCreateInput {
  fieldName: String!
  fieldType: FieldType!
  fieldValue: String!
  taskListField: TaskListFieldCreateOneInput!
}

input CustomFieldCreateManyInput {
  create: [CustomFieldCreateInput!]
  connect: [CustomFieldWhereUniqueInput!]
}

type CustomFieldEdge {
  node: CustomField!
  cursor: String!
}

enum CustomFieldOrderByInput {
  id_ASC
  id_DESC
  fieldName_ASC
  fieldName_DESC
  fieldType_ASC
  fieldType_DESC
  fieldValue_ASC
  fieldValue_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CustomFieldPreviousValues {
  id: ID!
  fieldName: String!
  fieldType: FieldType!
  fieldValue: String!
}

type CustomFieldSubscriptionPayload {
  mutation: MutationType!
  node: CustomField
  updatedFields: [String!]
  previousValues: CustomFieldPreviousValues
}

input CustomFieldSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CustomFieldWhereInput
  AND: [CustomFieldSubscriptionWhereInput!]
  OR: [CustomFieldSubscriptionWhereInput!]
  NOT: [CustomFieldSubscriptionWhereInput!]
}

input CustomFieldUpdateDataInput {
  fieldName: String
  fieldType: FieldType
  fieldValue: String
  taskListField: TaskListFieldUpdateOneInput
}

input CustomFieldUpdateInput {
  fieldName: String
  fieldType: FieldType
  fieldValue: String
  taskListField: TaskListFieldUpdateOneInput
}

input CustomFieldUpdateManyInput {
  create: [CustomFieldCreateInput!]
  delete: [CustomFieldWhereUniqueInput!]
  connect: [CustomFieldWhereUniqueInput!]
  disconnect: [CustomFieldWhereUniqueInput!]
  update: [CustomFieldUpdateWithWhereUniqueNestedInput!]
  upsert: [CustomFieldUpsertWithWhereUniqueNestedInput!]
}

input CustomFieldUpdateWithWhereUniqueNestedInput {
  where: CustomFieldWhereUniqueInput!
  data: CustomFieldUpdateDataInput!
}

input CustomFieldUpsertWithWhereUniqueNestedInput {
  where: CustomFieldWhereUniqueInput!
  update: CustomFieldUpdateDataInput!
  create: CustomFieldCreateInput!
}

input CustomFieldWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  fieldName: String
  fieldName_not: String
  fieldName_in: [String!]
  fieldName_not_in: [String!]
  fieldName_lt: String
  fieldName_lte: String
  fieldName_gt: String
  fieldName_gte: String
  fieldName_contains: String
  fieldName_not_contains: String
  fieldName_starts_with: String
  fieldName_not_starts_with: String
  fieldName_ends_with: String
  fieldName_not_ends_with: String
  fieldType: FieldType
  fieldType_not: FieldType
  fieldType_in: [FieldType!]
  fieldType_not_in: [FieldType!]
  fieldValue: String
  fieldValue_not: String
  fieldValue_in: [String!]
  fieldValue_not_in: [String!]
  fieldValue_lt: String
  fieldValue_lte: String
  fieldValue_gt: String
  fieldValue_gte: String
  fieldValue_contains: String
  fieldValue_not_contains: String
  fieldValue_starts_with: String
  fieldValue_not_starts_with: String
  fieldValue_ends_with: String
  fieldValue_not_ends_with: String
  taskListField: TaskListFieldWhereInput
  AND: [CustomFieldWhereInput!]
  OR: [CustomFieldWhereInput!]
  NOT: [CustomFieldWhereInput!]
}

input CustomFieldWhereUniqueInput {
  id: ID
}

scalar DateTime

enum FieldType {
  STRING
  INT
  DATE
  ASSET
}

scalar Long

type Mutation {
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  createTask(data: TaskCreateInput!): Task!
  updateTask(data: TaskUpdateInput!, where: TaskWhereUniqueInput!): Task
  updateManyTasks(data: TaskUpdateInput!, where: TaskWhereInput): BatchPayload!
  upsertTask(where: TaskWhereUniqueInput!, create: TaskCreateInput!, update: TaskUpdateInput!): Task!
  deleteTask(where: TaskWhereUniqueInput!): Task
  deleteManyTasks(where: TaskWhereInput): BatchPayload!
  createCustomField(data: CustomFieldCreateInput!): CustomField!
  updateCustomField(data: CustomFieldUpdateInput!, where: CustomFieldWhereUniqueInput!): CustomField
  updateManyCustomFields(data: CustomFieldUpdateInput!, where: CustomFieldWhereInput): BatchPayload!
  upsertCustomField(where: CustomFieldWhereUniqueInput!, create: CustomFieldCreateInput!, update: CustomFieldUpdateInput!): CustomField!
  deleteCustomField(where: CustomFieldWhereUniqueInput!): CustomField
  deleteManyCustomFields(where: CustomFieldWhereInput): BatchPayload!
  createTaskList(data: TaskListCreateInput!): TaskList!
  updateTaskList(data: TaskListUpdateInput!, where: TaskListWhereUniqueInput!): TaskList
  updateManyTaskLists(data: TaskListUpdateInput!, where: TaskListWhereInput): BatchPayload!
  upsertTaskList(where: TaskListWhereUniqueInput!, create: TaskListCreateInput!, update: TaskListUpdateInput!): TaskList!
  deleteTaskList(where: TaskListWhereUniqueInput!): TaskList
  deleteManyTaskLists(where: TaskListWhereInput): BatchPayload!
  createTaskListField(data: TaskListFieldCreateInput!): TaskListField!
  updateTaskListField(data: TaskListFieldUpdateInput!, where: TaskListFieldWhereUniqueInput!): TaskListField
  updateManyTaskListFields(data: TaskListFieldUpdateInput!, where: TaskListFieldWhereInput): BatchPayload!
  upsertTaskListField(where: TaskListFieldWhereUniqueInput!, create: TaskListFieldCreateInput!, update: TaskListFieldUpdateInput!): TaskListField!
  deleteTaskListField(where: TaskListFieldWhereUniqueInput!): TaskListField
  deleteManyTaskListFields(where: TaskListFieldWhereInput): BatchPayload!
  createComment(data: CommentCreateInput!): Comment!
  updateComment(data: CommentUpdateInput!, where: CommentWhereUniqueInput!): Comment
  updateManyComments(data: CommentUpdateInput!, where: CommentWhereInput): BatchPayload!
  upsertComment(where: CommentWhereUniqueInput!, create: CommentCreateInput!, update: CommentUpdateInput!): Comment!
  deleteComment(where: CommentWhereUniqueInput!): Comment
  deleteManyComments(where: CommentWhereInput): BatchPayload!
  createAsset(data: AssetCreateInput!): Asset!
  updateAsset(data: AssetUpdateInput!, where: AssetWhereUniqueInput!): Asset
  updateManyAssets(data: AssetUpdateInput!, where: AssetWhereInput): BatchPayload!
  upsertAsset(where: AssetWhereUniqueInput!, create: AssetCreateInput!, update: AssetUpdateInput!): Asset!
  deleteAsset(where: AssetWhereUniqueInput!): Asset
  deleteManyAssets(where: AssetWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  task(where: TaskWhereUniqueInput!): Task
  tasks(where: TaskWhereInput, orderBy: TaskOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Task]!
  tasksConnection(where: TaskWhereInput, orderBy: TaskOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TaskConnection!
  customField(where: CustomFieldWhereUniqueInput!): CustomField
  customFields(where: CustomFieldWhereInput, orderBy: CustomFieldOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CustomField]!
  customFieldsConnection(where: CustomFieldWhereInput, orderBy: CustomFieldOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CustomFieldConnection!
  taskList(where: TaskListWhereUniqueInput!): TaskList
  taskLists(where: TaskListWhereInput, orderBy: TaskListOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TaskList]!
  taskListsConnection(where: TaskListWhereInput, orderBy: TaskListOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TaskListConnection!
  taskListField(where: TaskListFieldWhereUniqueInput!): TaskListField
  taskListFields(where: TaskListFieldWhereInput, orderBy: TaskListFieldOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TaskListField]!
  taskListFieldsConnection(where: TaskListFieldWhereInput, orderBy: TaskListFieldOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TaskListFieldConnection!
  comment(where: CommentWhereUniqueInput!): Comment
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment]!
  commentsConnection(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CommentConnection!
  asset(where: AssetWhereUniqueInput!): Asset
  assets(where: AssetWhereInput, orderBy: AssetOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Asset]!
  assetsConnection(where: AssetWhereInput, orderBy: AssetOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AssetConnection!
  node(id: ID!): Node
}

enum Role {
  SUPERADMIN
  ADMIN
  STAFF
}

type Subscription {
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  task(where: TaskSubscriptionWhereInput): TaskSubscriptionPayload
  customField(where: CustomFieldSubscriptionWhereInput): CustomFieldSubscriptionPayload
  taskList(where: TaskListSubscriptionWhereInput): TaskListSubscriptionPayload
  taskListField(where: TaskListFieldSubscriptionWhereInput): TaskListFieldSubscriptionPayload
  comment(where: CommentSubscriptionWhereInput): CommentSubscriptionPayload
  asset(where: AssetSubscriptionWhereInput): AssetSubscriptionPayload
}

type Task {
  id: ID!
  createdBy: User!
  assignedTo: User
  title: String!
  description: String!
  assets(where: AssetWhereInput, orderBy: AssetOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Asset!]
  taskList: TaskList!
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
  dueDate: DateTime
  due: TaskDue!
  createdAt: DateTime!
  updatedAt: DateTime!
  customFields(where: CustomFieldWhereInput, orderBy: CustomFieldOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CustomField!]
  status: TaskStatus!
  subscribedUsers(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
}

type TaskConnection {
  pageInfo: PageInfo!
  edges: [TaskEdge]!
  aggregate: AggregateTask!
}

input TaskCreateInput {
  createdBy: UserCreateOneWithoutTasksCreatedInput!
  assignedTo: UserCreateOneWithoutTasksAssignedToInput
  title: String!
  description: String!
  assets: AssetCreateManyInput
  taskList: TaskListCreateOneWithoutTasksInput!
  comments: CommentCreateManyWithoutTaskInput
  dueDate: DateTime
  due: TaskDue
  customFields: CustomFieldCreateManyInput
  status: TaskStatus
  subscribedUsers: UserCreateManyWithoutSubscribedTasksInput
}

input TaskCreateManyWithoutAssignedToInput {
  create: [TaskCreateWithoutAssignedToInput!]
  connect: [TaskWhereUniqueInput!]
}

input TaskCreateManyWithoutCreatedByInput {
  create: [TaskCreateWithoutCreatedByInput!]
  connect: [TaskWhereUniqueInput!]
}

input TaskCreateManyWithoutSubscribedUsersInput {
  create: [TaskCreateWithoutSubscribedUsersInput!]
  connect: [TaskWhereUniqueInput!]
}

input TaskCreateManyWithoutTaskListInput {
  create: [TaskCreateWithoutTaskListInput!]
  connect: [TaskWhereUniqueInput!]
}

input TaskCreateOneWithoutCommentsInput {
  create: TaskCreateWithoutCommentsInput
  connect: TaskWhereUniqueInput
}

input TaskCreateWithoutAssignedToInput {
  createdBy: UserCreateOneWithoutTasksCreatedInput!
  title: String!
  description: String!
  assets: AssetCreateManyInput
  taskList: TaskListCreateOneWithoutTasksInput!
  comments: CommentCreateManyWithoutTaskInput
  dueDate: DateTime
  due: TaskDue
  customFields: CustomFieldCreateManyInput
  status: TaskStatus
  subscribedUsers: UserCreateManyWithoutSubscribedTasksInput
}

input TaskCreateWithoutCommentsInput {
  createdBy: UserCreateOneWithoutTasksCreatedInput!
  assignedTo: UserCreateOneWithoutTasksAssignedToInput
  title: String!
  description: String!
  assets: AssetCreateManyInput
  taskList: TaskListCreateOneWithoutTasksInput!
  dueDate: DateTime
  due: TaskDue
  customFields: CustomFieldCreateManyInput
  status: TaskStatus
  subscribedUsers: UserCreateManyWithoutSubscribedTasksInput
}

input TaskCreateWithoutCreatedByInput {
  assignedTo: UserCreateOneWithoutTasksAssignedToInput
  title: String!
  description: String!
  assets: AssetCreateManyInput
  taskList: TaskListCreateOneWithoutTasksInput!
  comments: CommentCreateManyWithoutTaskInput
  dueDate: DateTime
  due: TaskDue
  customFields: CustomFieldCreateManyInput
  status: TaskStatus
  subscribedUsers: UserCreateManyWithoutSubscribedTasksInput
}

input TaskCreateWithoutSubscribedUsersInput {
  createdBy: UserCreateOneWithoutTasksCreatedInput!
  assignedTo: UserCreateOneWithoutTasksAssignedToInput
  title: String!
  description: String!
  assets: AssetCreateManyInput
  taskList: TaskListCreateOneWithoutTasksInput!
  comments: CommentCreateManyWithoutTaskInput
  dueDate: DateTime
  due: TaskDue
  customFields: CustomFieldCreateManyInput
  status: TaskStatus
}

input TaskCreateWithoutTaskListInput {
  createdBy: UserCreateOneWithoutTasksCreatedInput!
  assignedTo: UserCreateOneWithoutTasksAssignedToInput
  title: String!
  description: String!
  assets: AssetCreateManyInput
  comments: CommentCreateManyWithoutTaskInput
  dueDate: DateTime
  due: TaskDue
  customFields: CustomFieldCreateManyInput
  status: TaskStatus
  subscribedUsers: UserCreateManyWithoutSubscribedTasksInput
}

enum TaskDue {
  WHENPOSSIBLE
  ASAP
  BYDATE
  ONDATE
}

type TaskEdge {
  node: Task!
  cursor: String!
}

type TaskList {
  id: ID!
  name: String!
  description: String
  taskListFields(where: TaskListFieldWhereInput, orderBy: TaskListFieldOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TaskListField!]
  tasks(where: TaskWhereInput, orderBy: TaskOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Task!]
  slug: String!
}

type TaskListConnection {
  pageInfo: PageInfo!
  edges: [TaskListEdge]!
  aggregate: AggregateTaskList!
}

input TaskListCreateInput {
  name: String!
  description: String
  taskListFields: TaskListFieldCreateManyWithoutTaskListInput
  tasks: TaskCreateManyWithoutTaskListInput
  slug: String!
}

input TaskListCreateOneWithoutTaskListFieldsInput {
  create: TaskListCreateWithoutTaskListFieldsInput
  connect: TaskListWhereUniqueInput
}

input TaskListCreateOneWithoutTasksInput {
  create: TaskListCreateWithoutTasksInput
  connect: TaskListWhereUniqueInput
}

input TaskListCreateWithoutTaskListFieldsInput {
  name: String!
  description: String
  tasks: TaskCreateManyWithoutTaskListInput
  slug: String!
}

input TaskListCreateWithoutTasksInput {
  name: String!
  description: String
  taskListFields: TaskListFieldCreateManyWithoutTaskListInput
  slug: String!
}

type TaskListEdge {
  node: TaskList!
  cursor: String!
}

type TaskListField {
  id: ID!
  fieldName: String!
  fieldType: FieldType!
  taskList: TaskList
}

type TaskListFieldConnection {
  pageInfo: PageInfo!
  edges: [TaskListFieldEdge]!
  aggregate: AggregateTaskListField!
}

input TaskListFieldCreateInput {
  fieldName: String!
  fieldType: FieldType!
  taskList: TaskListCreateOneWithoutTaskListFieldsInput
}

input TaskListFieldCreateManyWithoutTaskListInput {
  create: [TaskListFieldCreateWithoutTaskListInput!]
  connect: [TaskListFieldWhereUniqueInput!]
}

input TaskListFieldCreateOneInput {
  create: TaskListFieldCreateInput
  connect: TaskListFieldWhereUniqueInput
}

input TaskListFieldCreateWithoutTaskListInput {
  fieldName: String!
  fieldType: FieldType!
}

type TaskListFieldEdge {
  node: TaskListField!
  cursor: String!
}

enum TaskListFieldOrderByInput {
  id_ASC
  id_DESC
  fieldName_ASC
  fieldName_DESC
  fieldType_ASC
  fieldType_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TaskListFieldPreviousValues {
  id: ID!
  fieldName: String!
  fieldType: FieldType!
}

type TaskListFieldSubscriptionPayload {
  mutation: MutationType!
  node: TaskListField
  updatedFields: [String!]
  previousValues: TaskListFieldPreviousValues
}

input TaskListFieldSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TaskListFieldWhereInput
  AND: [TaskListFieldSubscriptionWhereInput!]
  OR: [TaskListFieldSubscriptionWhereInput!]
  NOT: [TaskListFieldSubscriptionWhereInput!]
}

input TaskListFieldUpdateDataInput {
  fieldName: String
  fieldType: FieldType
  taskList: TaskListUpdateOneWithoutTaskListFieldsInput
}

input TaskListFieldUpdateInput {
  fieldName: String
  fieldType: FieldType
  taskList: TaskListUpdateOneWithoutTaskListFieldsInput
}

input TaskListFieldUpdateManyWithoutTaskListInput {
  create: [TaskListFieldCreateWithoutTaskListInput!]
  delete: [TaskListFieldWhereUniqueInput!]
  connect: [TaskListFieldWhereUniqueInput!]
  disconnect: [TaskListFieldWhereUniqueInput!]
  update: [TaskListFieldUpdateWithWhereUniqueWithoutTaskListInput!]
  upsert: [TaskListFieldUpsertWithWhereUniqueWithoutTaskListInput!]
}

input TaskListFieldUpdateOneInput {
  create: TaskListFieldCreateInput
  update: TaskListFieldUpdateDataInput
  upsert: TaskListFieldUpsertNestedInput
  delete: Boolean
  connect: TaskListFieldWhereUniqueInput
}

input TaskListFieldUpdateWithoutTaskListDataInput {
  fieldName: String
  fieldType: FieldType
}

input TaskListFieldUpdateWithWhereUniqueWithoutTaskListInput {
  where: TaskListFieldWhereUniqueInput!
  data: TaskListFieldUpdateWithoutTaskListDataInput!
}

input TaskListFieldUpsertNestedInput {
  update: TaskListFieldUpdateDataInput!
  create: TaskListFieldCreateInput!
}

input TaskListFieldUpsertWithWhereUniqueWithoutTaskListInput {
  where: TaskListFieldWhereUniqueInput!
  update: TaskListFieldUpdateWithoutTaskListDataInput!
  create: TaskListFieldCreateWithoutTaskListInput!
}

input TaskListFieldWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  fieldName: String
  fieldName_not: String
  fieldName_in: [String!]
  fieldName_not_in: [String!]
  fieldName_lt: String
  fieldName_lte: String
  fieldName_gt: String
  fieldName_gte: String
  fieldName_contains: String
  fieldName_not_contains: String
  fieldName_starts_with: String
  fieldName_not_starts_with: String
  fieldName_ends_with: String
  fieldName_not_ends_with: String
  fieldType: FieldType
  fieldType_not: FieldType
  fieldType_in: [FieldType!]
  fieldType_not_in: [FieldType!]
  taskList: TaskListWhereInput
  AND: [TaskListFieldWhereInput!]
  OR: [TaskListFieldWhereInput!]
  NOT: [TaskListFieldWhereInput!]
}

input TaskListFieldWhereUniqueInput {
  id: ID
}

enum TaskListOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  description_ASC
  description_DESC
  slug_ASC
  slug_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TaskListPreviousValues {
  id: ID!
  name: String!
  description: String
  slug: String!
}

type TaskListSubscriptionPayload {
  mutation: MutationType!
  node: TaskList
  updatedFields: [String!]
  previousValues: TaskListPreviousValues
}

input TaskListSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TaskListWhereInput
  AND: [TaskListSubscriptionWhereInput!]
  OR: [TaskListSubscriptionWhereInput!]
  NOT: [TaskListSubscriptionWhereInput!]
}

input TaskListUpdateInput {
  name: String
  description: String
  taskListFields: TaskListFieldUpdateManyWithoutTaskListInput
  tasks: TaskUpdateManyWithoutTaskListInput
  slug: String
}

input TaskListUpdateOneWithoutTaskListFieldsInput {
  create: TaskListCreateWithoutTaskListFieldsInput
  update: TaskListUpdateWithoutTaskListFieldsDataInput
  upsert: TaskListUpsertWithoutTaskListFieldsInput
  delete: Boolean
  disconnect: Boolean
  connect: TaskListWhereUniqueInput
}

input TaskListUpdateOneWithoutTasksInput {
  create: TaskListCreateWithoutTasksInput
  update: TaskListUpdateWithoutTasksDataInput
  upsert: TaskListUpsertWithoutTasksInput
  delete: Boolean
  connect: TaskListWhereUniqueInput
}

input TaskListUpdateWithoutTaskListFieldsDataInput {
  name: String
  description: String
  tasks: TaskUpdateManyWithoutTaskListInput
  slug: String
}

input TaskListUpdateWithoutTasksDataInput {
  name: String
  description: String
  taskListFields: TaskListFieldUpdateManyWithoutTaskListInput
  slug: String
}

input TaskListUpsertWithoutTaskListFieldsInput {
  update: TaskListUpdateWithoutTaskListFieldsDataInput!
  create: TaskListCreateWithoutTaskListFieldsInput!
}

input TaskListUpsertWithoutTasksInput {
  update: TaskListUpdateWithoutTasksDataInput!
  create: TaskListCreateWithoutTasksInput!
}

input TaskListWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  taskListFields_every: TaskListFieldWhereInput
  taskListFields_some: TaskListFieldWhereInput
  taskListFields_none: TaskListFieldWhereInput
  tasks_every: TaskWhereInput
  tasks_some: TaskWhereInput
  tasks_none: TaskWhereInput
  slug: String
  slug_not: String
  slug_in: [String!]
  slug_not_in: [String!]
  slug_lt: String
  slug_lte: String
  slug_gt: String
  slug_gte: String
  slug_contains: String
  slug_not_contains: String
  slug_starts_with: String
  slug_not_starts_with: String
  slug_ends_with: String
  slug_not_ends_with: String
  AND: [TaskListWhereInput!]
  OR: [TaskListWhereInput!]
  NOT: [TaskListWhereInput!]
}

input TaskListWhereUniqueInput {
  id: ID
  name: String
  slug: String
}

enum TaskOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  description_ASC
  description_DESC
  dueDate_ASC
  dueDate_DESC
  due_ASC
  due_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  status_ASC
  status_DESC
}

type TaskPreviousValues {
  id: ID!
  title: String!
  description: String!
  dueDate: DateTime
  due: TaskDue!
  createdAt: DateTime!
  updatedAt: DateTime!
  status: TaskStatus!
}

enum TaskStatus {
  CREATED
  ASSIGNED
  AWAITINGINPUT
  COMPLETED
  CLOSED
}

type TaskSubscriptionPayload {
  mutation: MutationType!
  node: Task
  updatedFields: [String!]
  previousValues: TaskPreviousValues
}

input TaskSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TaskWhereInput
  AND: [TaskSubscriptionWhereInput!]
  OR: [TaskSubscriptionWhereInput!]
  NOT: [TaskSubscriptionWhereInput!]
}

input TaskUpdateInput {
  createdBy: UserUpdateOneWithoutTasksCreatedInput
  assignedTo: UserUpdateOneWithoutTasksAssignedToInput
  title: String
  description: String
  assets: AssetUpdateManyInput
  taskList: TaskListUpdateOneWithoutTasksInput
  comments: CommentUpdateManyWithoutTaskInput
  dueDate: DateTime
  due: TaskDue
  customFields: CustomFieldUpdateManyInput
  status: TaskStatus
  subscribedUsers: UserUpdateManyWithoutSubscribedTasksInput
}

input TaskUpdateManyWithoutAssignedToInput {
  create: [TaskCreateWithoutAssignedToInput!]
  delete: [TaskWhereUniqueInput!]
  connect: [TaskWhereUniqueInput!]
  disconnect: [TaskWhereUniqueInput!]
  update: [TaskUpdateWithWhereUniqueWithoutAssignedToInput!]
  upsert: [TaskUpsertWithWhereUniqueWithoutAssignedToInput!]
}

input TaskUpdateManyWithoutCreatedByInput {
  create: [TaskCreateWithoutCreatedByInput!]
  delete: [TaskWhereUniqueInput!]
  connect: [TaskWhereUniqueInput!]
  disconnect: [TaskWhereUniqueInput!]
  update: [TaskUpdateWithWhereUniqueWithoutCreatedByInput!]
  upsert: [TaskUpsertWithWhereUniqueWithoutCreatedByInput!]
}

input TaskUpdateManyWithoutSubscribedUsersInput {
  create: [TaskCreateWithoutSubscribedUsersInput!]
  delete: [TaskWhereUniqueInput!]
  connect: [TaskWhereUniqueInput!]
  disconnect: [TaskWhereUniqueInput!]
  update: [TaskUpdateWithWhereUniqueWithoutSubscribedUsersInput!]
  upsert: [TaskUpsertWithWhereUniqueWithoutSubscribedUsersInput!]
}

input TaskUpdateManyWithoutTaskListInput {
  create: [TaskCreateWithoutTaskListInput!]
  delete: [TaskWhereUniqueInput!]
  connect: [TaskWhereUniqueInput!]
  disconnect: [TaskWhereUniqueInput!]
  update: [TaskUpdateWithWhereUniqueWithoutTaskListInput!]
  upsert: [TaskUpsertWithWhereUniqueWithoutTaskListInput!]
}

input TaskUpdateOneWithoutCommentsInput {
  create: TaskCreateWithoutCommentsInput
  update: TaskUpdateWithoutCommentsDataInput
  upsert: TaskUpsertWithoutCommentsInput
  delete: Boolean
  connect: TaskWhereUniqueInput
}

input TaskUpdateWithoutAssignedToDataInput {
  createdBy: UserUpdateOneWithoutTasksCreatedInput
  title: String
  description: String
  assets: AssetUpdateManyInput
  taskList: TaskListUpdateOneWithoutTasksInput
  comments: CommentUpdateManyWithoutTaskInput
  dueDate: DateTime
  due: TaskDue
  customFields: CustomFieldUpdateManyInput
  status: TaskStatus
  subscribedUsers: UserUpdateManyWithoutSubscribedTasksInput
}

input TaskUpdateWithoutCommentsDataInput {
  createdBy: UserUpdateOneWithoutTasksCreatedInput
  assignedTo: UserUpdateOneWithoutTasksAssignedToInput
  title: String
  description: String
  assets: AssetUpdateManyInput
  taskList: TaskListUpdateOneWithoutTasksInput
  dueDate: DateTime
  due: TaskDue
  customFields: CustomFieldUpdateManyInput
  status: TaskStatus
  subscribedUsers: UserUpdateManyWithoutSubscribedTasksInput
}

input TaskUpdateWithoutCreatedByDataInput {
  assignedTo: UserUpdateOneWithoutTasksAssignedToInput
  title: String
  description: String
  assets: AssetUpdateManyInput
  taskList: TaskListUpdateOneWithoutTasksInput
  comments: CommentUpdateManyWithoutTaskInput
  dueDate: DateTime
  due: TaskDue
  customFields: CustomFieldUpdateManyInput
  status: TaskStatus
  subscribedUsers: UserUpdateManyWithoutSubscribedTasksInput
}

input TaskUpdateWithoutSubscribedUsersDataInput {
  createdBy: UserUpdateOneWithoutTasksCreatedInput
  assignedTo: UserUpdateOneWithoutTasksAssignedToInput
  title: String
  description: String
  assets: AssetUpdateManyInput
  taskList: TaskListUpdateOneWithoutTasksInput
  comments: CommentUpdateManyWithoutTaskInput
  dueDate: DateTime
  due: TaskDue
  customFields: CustomFieldUpdateManyInput
  status: TaskStatus
}

input TaskUpdateWithoutTaskListDataInput {
  createdBy: UserUpdateOneWithoutTasksCreatedInput
  assignedTo: UserUpdateOneWithoutTasksAssignedToInput
  title: String
  description: String
  assets: AssetUpdateManyInput
  comments: CommentUpdateManyWithoutTaskInput
  dueDate: DateTime
  due: TaskDue
  customFields: CustomFieldUpdateManyInput
  status: TaskStatus
  subscribedUsers: UserUpdateManyWithoutSubscribedTasksInput
}

input TaskUpdateWithWhereUniqueWithoutAssignedToInput {
  where: TaskWhereUniqueInput!
  data: TaskUpdateWithoutAssignedToDataInput!
}

input TaskUpdateWithWhereUniqueWithoutCreatedByInput {
  where: TaskWhereUniqueInput!
  data: TaskUpdateWithoutCreatedByDataInput!
}

input TaskUpdateWithWhereUniqueWithoutSubscribedUsersInput {
  where: TaskWhereUniqueInput!
  data: TaskUpdateWithoutSubscribedUsersDataInput!
}

input TaskUpdateWithWhereUniqueWithoutTaskListInput {
  where: TaskWhereUniqueInput!
  data: TaskUpdateWithoutTaskListDataInput!
}

input TaskUpsertWithoutCommentsInput {
  update: TaskUpdateWithoutCommentsDataInput!
  create: TaskCreateWithoutCommentsInput!
}

input TaskUpsertWithWhereUniqueWithoutAssignedToInput {
  where: TaskWhereUniqueInput!
  update: TaskUpdateWithoutAssignedToDataInput!
  create: TaskCreateWithoutAssignedToInput!
}

input TaskUpsertWithWhereUniqueWithoutCreatedByInput {
  where: TaskWhereUniqueInput!
  update: TaskUpdateWithoutCreatedByDataInput!
  create: TaskCreateWithoutCreatedByInput!
}

input TaskUpsertWithWhereUniqueWithoutSubscribedUsersInput {
  where: TaskWhereUniqueInput!
  update: TaskUpdateWithoutSubscribedUsersDataInput!
  create: TaskCreateWithoutSubscribedUsersInput!
}

input TaskUpsertWithWhereUniqueWithoutTaskListInput {
  where: TaskWhereUniqueInput!
  update: TaskUpdateWithoutTaskListDataInput!
  create: TaskCreateWithoutTaskListInput!
}

input TaskWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdBy: UserWhereInput
  assignedTo: UserWhereInput
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  assets_every: AssetWhereInput
  assets_some: AssetWhereInput
  assets_none: AssetWhereInput
  taskList: TaskListWhereInput
  comments_every: CommentWhereInput
  comments_some: CommentWhereInput
  comments_none: CommentWhereInput
  dueDate: DateTime
  dueDate_not: DateTime
  dueDate_in: [DateTime!]
  dueDate_not_in: [DateTime!]
  dueDate_lt: DateTime
  dueDate_lte: DateTime
  dueDate_gt: DateTime
  dueDate_gte: DateTime
  due: TaskDue
  due_not: TaskDue
  due_in: [TaskDue!]
  due_not_in: [TaskDue!]
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  customFields_every: CustomFieldWhereInput
  customFields_some: CustomFieldWhereInput
  customFields_none: CustomFieldWhereInput
  status: TaskStatus
  status_not: TaskStatus
  status_in: [TaskStatus!]
  status_not_in: [TaskStatus!]
  subscribedUsers_every: UserWhereInput
  subscribedUsers_some: UserWhereInput
  subscribedUsers_none: UserWhereInput
  AND: [TaskWhereInput!]
  OR: [TaskWhereInput!]
  NOT: [TaskWhereInput!]
}

input TaskWhereUniqueInput {
  id: ID
}

type User {
  id: ID!
  email: String!
  name: String
  avatar: String
  slackHandle: String
  tasksCreated(where: TaskWhereInput, orderBy: TaskOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Task!]
  tasksAssignedTo(where: TaskWhereInput, orderBy: TaskOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Task!]
  commentsCreated(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
  role: Role!
  password: String
  resetToken: String
  resetTokenExpiry: Float
  signupToken: String
  signupTokenExpiry: Float
  status: UserStatus!
  subscribedTasks(where: TaskWhereInput, orderBy: TaskOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Task!]
  mentions(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  name: String
  avatar: String
  slackHandle: String
  tasksCreated: TaskCreateManyWithoutCreatedByInput
  tasksAssignedTo: TaskCreateManyWithoutAssignedToInput
  commentsCreated: CommentCreateManyWithoutCreatedByInput
  role: Role
  password: String
  resetToken: String
  resetTokenExpiry: Float
  signupToken: String
  signupTokenExpiry: Float
  status: UserStatus
  subscribedTasks: TaskCreateManyWithoutSubscribedUsersInput
  mentions: CommentCreateManyWithoutMentionsInput
}

input UserCreateManyWithoutMentionsInput {
  create: [UserCreateWithoutMentionsInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateManyWithoutSubscribedTasksInput {
  create: [UserCreateWithoutSubscribedTasksInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutCommentsCreatedInput {
  create: UserCreateWithoutCommentsCreatedInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutTasksAssignedToInput {
  create: UserCreateWithoutTasksAssignedToInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutTasksCreatedInput {
  create: UserCreateWithoutTasksCreatedInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutCommentsCreatedInput {
  email: String!
  name: String
  avatar: String
  slackHandle: String
  tasksCreated: TaskCreateManyWithoutCreatedByInput
  tasksAssignedTo: TaskCreateManyWithoutAssignedToInput
  role: Role
  password: String
  resetToken: String
  resetTokenExpiry: Float
  signupToken: String
  signupTokenExpiry: Float
  status: UserStatus
  subscribedTasks: TaskCreateManyWithoutSubscribedUsersInput
  mentions: CommentCreateManyWithoutMentionsInput
}

input UserCreateWithoutMentionsInput {
  email: String!
  name: String
  avatar: String
  slackHandle: String
  tasksCreated: TaskCreateManyWithoutCreatedByInput
  tasksAssignedTo: TaskCreateManyWithoutAssignedToInput
  commentsCreated: CommentCreateManyWithoutCreatedByInput
  role: Role
  password: String
  resetToken: String
  resetTokenExpiry: Float
  signupToken: String
  signupTokenExpiry: Float
  status: UserStatus
  subscribedTasks: TaskCreateManyWithoutSubscribedUsersInput
}

input UserCreateWithoutSubscribedTasksInput {
  email: String!
  name: String
  avatar: String
  slackHandle: String
  tasksCreated: TaskCreateManyWithoutCreatedByInput
  tasksAssignedTo: TaskCreateManyWithoutAssignedToInput
  commentsCreated: CommentCreateManyWithoutCreatedByInput
  role: Role
  password: String
  resetToken: String
  resetTokenExpiry: Float
  signupToken: String
  signupTokenExpiry: Float
  status: UserStatus
  mentions: CommentCreateManyWithoutMentionsInput
}

input UserCreateWithoutTasksAssignedToInput {
  email: String!
  name: String
  avatar: String
  slackHandle: String
  tasksCreated: TaskCreateManyWithoutCreatedByInput
  commentsCreated: CommentCreateManyWithoutCreatedByInput
  role: Role
  password: String
  resetToken: String
  resetTokenExpiry: Float
  signupToken: String
  signupTokenExpiry: Float
  status: UserStatus
  subscribedTasks: TaskCreateManyWithoutSubscribedUsersInput
  mentions: CommentCreateManyWithoutMentionsInput
}

input UserCreateWithoutTasksCreatedInput {
  email: String!
  name: String
  avatar: String
  slackHandle: String
  tasksAssignedTo: TaskCreateManyWithoutAssignedToInput
  commentsCreated: CommentCreateManyWithoutCreatedByInput
  role: Role
  password: String
  resetToken: String
  resetTokenExpiry: Float
  signupToken: String
  signupTokenExpiry: Float
  status: UserStatus
  subscribedTasks: TaskCreateManyWithoutSubscribedUsersInput
  mentions: CommentCreateManyWithoutMentionsInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  name_ASC
  name_DESC
  avatar_ASC
  avatar_DESC
  slackHandle_ASC
  slackHandle_DESC
  role_ASC
  role_DESC
  password_ASC
  password_DESC
  resetToken_ASC
  resetToken_DESC
  resetTokenExpiry_ASC
  resetTokenExpiry_DESC
  signupToken_ASC
  signupToken_DESC
  signupTokenExpiry_ASC
  signupTokenExpiry_DESC
  status_ASC
  status_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  name: String
  avatar: String
  slackHandle: String
  role: Role!
  password: String
  resetToken: String
  resetTokenExpiry: Float
  signupToken: String
  signupTokenExpiry: Float
  status: UserStatus!
}

enum UserStatus {
  JOINED
  INVITED
  DELETED
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateDataInput {
  email: String
  name: String
  avatar: String
  slackHandle: String
  tasksCreated: TaskUpdateManyWithoutCreatedByInput
  tasksAssignedTo: TaskUpdateManyWithoutAssignedToInput
  commentsCreated: CommentUpdateManyWithoutCreatedByInput
  role: Role
  password: String
  resetToken: String
  resetTokenExpiry: Float
  signupToken: String
  signupTokenExpiry: Float
  status: UserStatus
  subscribedTasks: TaskUpdateManyWithoutSubscribedUsersInput
  mentions: CommentUpdateManyWithoutMentionsInput
}

input UserUpdateInput {
  email: String
  name: String
  avatar: String
  slackHandle: String
  tasksCreated: TaskUpdateManyWithoutCreatedByInput
  tasksAssignedTo: TaskUpdateManyWithoutAssignedToInput
  commentsCreated: CommentUpdateManyWithoutCreatedByInput
  role: Role
  password: String
  resetToken: String
  resetTokenExpiry: Float
  signupToken: String
  signupTokenExpiry: Float
  status: UserStatus
  subscribedTasks: TaskUpdateManyWithoutSubscribedUsersInput
  mentions: CommentUpdateManyWithoutMentionsInput
}

input UserUpdateManyWithoutMentionsInput {
  create: [UserCreateWithoutMentionsInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutMentionsInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutMentionsInput!]
}

input UserUpdateManyWithoutSubscribedTasksInput {
  create: [UserCreateWithoutSubscribedTasksInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutSubscribedTasksInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutSubscribedTasksInput!]
}

input UserUpdateOneInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  delete: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateOneWithoutCommentsCreatedInput {
  create: UserCreateWithoutCommentsCreatedInput
  update: UserUpdateWithoutCommentsCreatedDataInput
  upsert: UserUpsertWithoutCommentsCreatedInput
  delete: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateOneWithoutTasksAssignedToInput {
  create: UserCreateWithoutTasksAssignedToInput
  update: UserUpdateWithoutTasksAssignedToDataInput
  upsert: UserUpsertWithoutTasksAssignedToInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateOneWithoutTasksCreatedInput {
  create: UserCreateWithoutTasksCreatedInput
  update: UserUpdateWithoutTasksCreatedDataInput
  upsert: UserUpsertWithoutTasksCreatedInput
  delete: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutCommentsCreatedDataInput {
  email: String
  name: String
  avatar: String
  slackHandle: String
  tasksCreated: TaskUpdateManyWithoutCreatedByInput
  tasksAssignedTo: TaskUpdateManyWithoutAssignedToInput
  role: Role
  password: String
  resetToken: String
  resetTokenExpiry: Float
  signupToken: String
  signupTokenExpiry: Float
  status: UserStatus
  subscribedTasks: TaskUpdateManyWithoutSubscribedUsersInput
  mentions: CommentUpdateManyWithoutMentionsInput
}

input UserUpdateWithoutMentionsDataInput {
  email: String
  name: String
  avatar: String
  slackHandle: String
  tasksCreated: TaskUpdateManyWithoutCreatedByInput
  tasksAssignedTo: TaskUpdateManyWithoutAssignedToInput
  commentsCreated: CommentUpdateManyWithoutCreatedByInput
  role: Role
  password: String
  resetToken: String
  resetTokenExpiry: Float
  signupToken: String
  signupTokenExpiry: Float
  status: UserStatus
  subscribedTasks: TaskUpdateManyWithoutSubscribedUsersInput
}

input UserUpdateWithoutSubscribedTasksDataInput {
  email: String
  name: String
  avatar: String
  slackHandle: String
  tasksCreated: TaskUpdateManyWithoutCreatedByInput
  tasksAssignedTo: TaskUpdateManyWithoutAssignedToInput
  commentsCreated: CommentUpdateManyWithoutCreatedByInput
  role: Role
  password: String
  resetToken: String
  resetTokenExpiry: Float
  signupToken: String
  signupTokenExpiry: Float
  status: UserStatus
  mentions: CommentUpdateManyWithoutMentionsInput
}

input UserUpdateWithoutTasksAssignedToDataInput {
  email: String
  name: String
  avatar: String
  slackHandle: String
  tasksCreated: TaskUpdateManyWithoutCreatedByInput
  commentsCreated: CommentUpdateManyWithoutCreatedByInput
  role: Role
  password: String
  resetToken: String
  resetTokenExpiry: Float
  signupToken: String
  signupTokenExpiry: Float
  status: UserStatus
  subscribedTasks: TaskUpdateManyWithoutSubscribedUsersInput
  mentions: CommentUpdateManyWithoutMentionsInput
}

input UserUpdateWithoutTasksCreatedDataInput {
  email: String
  name: String
  avatar: String
  slackHandle: String
  tasksAssignedTo: TaskUpdateManyWithoutAssignedToInput
  commentsCreated: CommentUpdateManyWithoutCreatedByInput
  role: Role
  password: String
  resetToken: String
  resetTokenExpiry: Float
  signupToken: String
  signupTokenExpiry: Float
  status: UserStatus
  subscribedTasks: TaskUpdateManyWithoutSubscribedUsersInput
  mentions: CommentUpdateManyWithoutMentionsInput
}

input UserUpdateWithWhereUniqueWithoutMentionsInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutMentionsDataInput!
}

input UserUpdateWithWhereUniqueWithoutSubscribedTasksInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutSubscribedTasksDataInput!
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserUpsertWithoutCommentsCreatedInput {
  update: UserUpdateWithoutCommentsCreatedDataInput!
  create: UserCreateWithoutCommentsCreatedInput!
}

input UserUpsertWithoutTasksAssignedToInput {
  update: UserUpdateWithoutTasksAssignedToDataInput!
  create: UserCreateWithoutTasksAssignedToInput!
}

input UserUpsertWithoutTasksCreatedInput {
  update: UserUpdateWithoutTasksCreatedDataInput!
  create: UserCreateWithoutTasksCreatedInput!
}

input UserUpsertWithWhereUniqueWithoutMentionsInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutMentionsDataInput!
  create: UserCreateWithoutMentionsInput!
}

input UserUpsertWithWhereUniqueWithoutSubscribedTasksInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutSubscribedTasksDataInput!
  create: UserCreateWithoutSubscribedTasksInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  avatar: String
  avatar_not: String
  avatar_in: [String!]
  avatar_not_in: [String!]
  avatar_lt: String
  avatar_lte: String
  avatar_gt: String
  avatar_gte: String
  avatar_contains: String
  avatar_not_contains: String
  avatar_starts_with: String
  avatar_not_starts_with: String
  avatar_ends_with: String
  avatar_not_ends_with: String
  slackHandle: String
  slackHandle_not: String
  slackHandle_in: [String!]
  slackHandle_not_in: [String!]
  slackHandle_lt: String
  slackHandle_lte: String
  slackHandle_gt: String
  slackHandle_gte: String
  slackHandle_contains: String
  slackHandle_not_contains: String
  slackHandle_starts_with: String
  slackHandle_not_starts_with: String
  slackHandle_ends_with: String
  slackHandle_not_ends_with: String
  tasksCreated_every: TaskWhereInput
  tasksCreated_some: TaskWhereInput
  tasksCreated_none: TaskWhereInput
  tasksAssignedTo_every: TaskWhereInput
  tasksAssignedTo_some: TaskWhereInput
  tasksAssignedTo_none: TaskWhereInput
  commentsCreated_every: CommentWhereInput
  commentsCreated_some: CommentWhereInput
  commentsCreated_none: CommentWhereInput
  role: Role
  role_not: Role
  role_in: [Role!]
  role_not_in: [Role!]
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  resetToken: String
  resetToken_not: String
  resetToken_in: [String!]
  resetToken_not_in: [String!]
  resetToken_lt: String
  resetToken_lte: String
  resetToken_gt: String
  resetToken_gte: String
  resetToken_contains: String
  resetToken_not_contains: String
  resetToken_starts_with: String
  resetToken_not_starts_with: String
  resetToken_ends_with: String
  resetToken_not_ends_with: String
  resetTokenExpiry: Float
  resetTokenExpiry_not: Float
  resetTokenExpiry_in: [Float!]
  resetTokenExpiry_not_in: [Float!]
  resetTokenExpiry_lt: Float
  resetTokenExpiry_lte: Float
  resetTokenExpiry_gt: Float
  resetTokenExpiry_gte: Float
  signupToken: String
  signupToken_not: String
  signupToken_in: [String!]
  signupToken_not_in: [String!]
  signupToken_lt: String
  signupToken_lte: String
  signupToken_gt: String
  signupToken_gte: String
  signupToken_contains: String
  signupToken_not_contains: String
  signupToken_starts_with: String
  signupToken_not_starts_with: String
  signupToken_ends_with: String
  signupToken_not_ends_with: String
  signupTokenExpiry: Float
  signupTokenExpiry_not: Float
  signupTokenExpiry_in: [Float!]
  signupTokenExpiry_not_in: [Float!]
  signupTokenExpiry_lt: Float
  signupTokenExpiry_lte: Float
  signupTokenExpiry_gt: Float
  signupTokenExpiry_gte: Float
  status: UserStatus
  status_not: UserStatus
  status_in: [UserStatus!]
  status_not_in: [UserStatus!]
  subscribedTasks_every: TaskWhereInput
  subscribedTasks_some: TaskWhereInput
  subscribedTasks_none: TaskWhereInput
  mentions_every: CommentWhereInput
  mentions_some: CommentWhereInput
  mentions_none: CommentWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
  resetToken: String
  signupToken: String
}
`
      }
    