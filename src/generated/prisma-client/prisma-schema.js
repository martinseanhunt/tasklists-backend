module.exports = {
        typeDefs: /* GraphQL */ `type AggregateAsset {
  count: Int!
}

type AggregateCategory {
  count: Int!
}

type AggregateComment {
  count: Int!
}

type AggregateTask {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type Asset {
  id: ID!
  createdBy: User!
  assetUrl: String!
  createdAt: DateTime!
}

type AssetConnection {
  pageInfo: PageInfo!
  edges: [AssetEdge]!
  aggregate: AggregateAsset!
}

input AssetCreateInput {
  createdBy: UserCreateOneInput!
  assetUrl: String!
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
  assetUrl_ASC
  assetUrl_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AssetPreviousValues {
  id: ID!
  assetUrl: String!
  createdAt: DateTime!
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

input AssetUpdateDataInput {
  createdBy: UserUpdateOneRequiredInput
  assetUrl: String
}

input AssetUpdateInput {
  createdBy: UserUpdateOneRequiredInput
  assetUrl: String
}

input AssetUpdateManyInput {
  create: [AssetCreateInput!]
  update: [AssetUpdateWithWhereUniqueNestedInput!]
  upsert: [AssetUpsertWithWhereUniqueNestedInput!]
  delete: [AssetWhereUniqueInput!]
  connect: [AssetWhereUniqueInput!]
  disconnect: [AssetWhereUniqueInput!]
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

type Category {
  id: ID!
  name: String!
}

type CategoryConnection {
  pageInfo: PageInfo!
  edges: [CategoryEdge]!
  aggregate: AggregateCategory!
}

input CategoryCreateInput {
  name: String!
}

input CategoryCreateOneInput {
  create: CategoryCreateInput
  connect: CategoryWhereUniqueInput
}

type CategoryEdge {
  node: Category!
  cursor: String!
}

enum CategoryOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CategoryPreviousValues {
  id: ID!
  name: String!
}

type CategorySubscriptionPayload {
  mutation: MutationType!
  node: Category
  updatedFields: [String!]
  previousValues: CategoryPreviousValues
}

input CategorySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CategoryWhereInput
  AND: [CategorySubscriptionWhereInput!]
  OR: [CategorySubscriptionWhereInput!]
  NOT: [CategorySubscriptionWhereInput!]
}

input CategoryUpdateDataInput {
  name: String
}

input CategoryUpdateInput {
  name: String
}

input CategoryUpdateOneRequiredInput {
  create: CategoryCreateInput
  update: CategoryUpdateDataInput
  upsert: CategoryUpsertNestedInput
  connect: CategoryWhereUniqueInput
}

input CategoryUpsertNestedInput {
  update: CategoryUpdateDataInput!
  create: CategoryCreateInput!
}

input CategoryWhereInput {
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
  AND: [CategoryWhereInput!]
  OR: [CategoryWhereInput!]
  NOT: [CategoryWhereInput!]
}

input CategoryWhereUniqueInput {
  id: ID
}

type Comment {
  id: ID!
  comment: String!
  user: User
  assets(where: AssetWhereInput, orderBy: AssetOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Asset!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

type CommentConnection {
  pageInfo: PageInfo!
  edges: [CommentEdge]!
  aggregate: AggregateComment!
}

input CommentCreateInput {
  comment: String!
  user: UserCreateOneInput
  assets: AssetCreateManyInput
}

input CommentCreateManyInput {
  create: [CommentCreateInput!]
  connect: [CommentWhereUniqueInput!]
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

input CommentUpdateDataInput {
  comment: String
  user: UserUpdateOneInput
  assets: AssetUpdateManyInput
}

input CommentUpdateInput {
  comment: String
  user: UserUpdateOneInput
  assets: AssetUpdateManyInput
}

input CommentUpdateManyInput {
  create: [CommentCreateInput!]
  update: [CommentUpdateWithWhereUniqueNestedInput!]
  upsert: [CommentUpsertWithWhereUniqueNestedInput!]
  delete: [CommentWhereUniqueInput!]
  connect: [CommentWhereUniqueInput!]
  disconnect: [CommentWhereUniqueInput!]
}

input CommentUpdateWithWhereUniqueNestedInput {
  where: CommentWhereUniqueInput!
  data: CommentUpdateDataInput!
}

input CommentUpsertWithWhereUniqueNestedInput {
  where: CommentWhereUniqueInput!
  update: CommentUpdateDataInput!
  create: CommentCreateInput!
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
  user: UserWhereInput
  assets_every: AssetWhereInput
  assets_some: AssetWhereInput
  assets_none: AssetWhereInput
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
  AND: [CommentWhereInput!]
  OR: [CommentWhereInput!]
  NOT: [CommentWhereInput!]
}

input CommentWhereUniqueInput {
  id: ID
}

scalar DateTime

scalar Long

type Mutation {
  createAsset(data: AssetCreateInput!): Asset!
  updateAsset(data: AssetUpdateInput!, where: AssetWhereUniqueInput!): Asset
  updateManyAssets(data: AssetUpdateInput!, where: AssetWhereInput): BatchPayload!
  upsertAsset(where: AssetWhereUniqueInput!, create: AssetCreateInput!, update: AssetUpdateInput!): Asset!
  deleteAsset(where: AssetWhereUniqueInput!): Asset
  deleteManyAssets(where: AssetWhereInput): BatchPayload!
  createCategory(data: CategoryCreateInput!): Category!
  updateCategory(data: CategoryUpdateInput!, where: CategoryWhereUniqueInput!): Category
  updateManyCategories(data: CategoryUpdateInput!, where: CategoryWhereInput): BatchPayload!
  upsertCategory(where: CategoryWhereUniqueInput!, create: CategoryCreateInput!, update: CategoryUpdateInput!): Category!
  deleteCategory(where: CategoryWhereUniqueInput!): Category
  deleteManyCategories(where: CategoryWhereInput): BatchPayload!
  createComment(data: CommentCreateInput!): Comment!
  updateComment(data: CommentUpdateInput!, where: CommentWhereUniqueInput!): Comment
  updateManyComments(data: CommentUpdateInput!, where: CommentWhereInput): BatchPayload!
  upsertComment(where: CommentWhereUniqueInput!, create: CommentCreateInput!, update: CommentUpdateInput!): Comment!
  deleteComment(where: CommentWhereUniqueInput!): Comment
  deleteManyComments(where: CommentWhereInput): BatchPayload!
  createTask(data: TaskCreateInput!): Task!
  updateTask(data: TaskUpdateInput!, where: TaskWhereUniqueInput!): Task
  updateManyTasks(data: TaskUpdateInput!, where: TaskWhereInput): BatchPayload!
  upsertTask(where: TaskWhereUniqueInput!, create: TaskCreateInput!, update: TaskUpdateInput!): Task!
  deleteTask(where: TaskWhereUniqueInput!): Task
  deleteManyTasks(where: TaskWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
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
  asset(where: AssetWhereUniqueInput!): Asset
  assets(where: AssetWhereInput, orderBy: AssetOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Asset]!
  assetsConnection(where: AssetWhereInput, orderBy: AssetOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AssetConnection!
  category(where: CategoryWhereUniqueInput!): Category
  categories(where: CategoryWhereInput, orderBy: CategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Category]!
  categoriesConnection(where: CategoryWhereInput, orderBy: CategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CategoryConnection!
  comment(where: CommentWhereUniqueInput!): Comment
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment]!
  commentsConnection(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CommentConnection!
  task(where: TaskWhereUniqueInput!): Task
  tasks(where: TaskWhereInput, orderBy: TaskOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Task]!
  tasksConnection(where: TaskWhereInput, orderBy: TaskOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TaskConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

enum Role {
  SUPERADMIN
  ADMIN
  STAFF
}

enum Status {
  JOINED
  INVITED
  DELETED
}

type Subscription {
  asset(where: AssetSubscriptionWhereInput): AssetSubscriptionPayload
  category(where: CategorySubscriptionWhereInput): CategorySubscriptionPayload
  comment(where: CommentSubscriptionWhereInput): CommentSubscriptionPayload
  task(where: TaskSubscriptionWhereInput): TaskSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type Task {
  id: ID!
  createdBy: User!
  assignedTo: User
  approved: Boolean!
  title: String!
  description: String!
  assets(where: AssetWhereInput, orderBy: AssetOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Asset!]
  category: Category!
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
  dueDate: DateTime
  dueWhenPossible: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type TaskConnection {
  pageInfo: PageInfo!
  edges: [TaskEdge]!
  aggregate: AggregateTask!
}

input TaskCreateInput {
  createdBy: UserCreateOneWithoutTasksCreatedInput!
  assignedTo: UserCreateOneWithoutTasksAssignedToInput
  approved: Boolean
  title: String!
  description: String!
  assets: AssetCreateManyInput
  category: CategoryCreateOneInput!
  comments: CommentCreateManyInput
  dueDate: DateTime
  dueWhenPossible: Boolean
}

input TaskCreateManyWithoutAssignedToInput {
  create: [TaskCreateWithoutAssignedToInput!]
  connect: [TaskWhereUniqueInput!]
}

input TaskCreateManyWithoutCreatedByInput {
  create: [TaskCreateWithoutCreatedByInput!]
  connect: [TaskWhereUniqueInput!]
}

input TaskCreateWithoutAssignedToInput {
  createdBy: UserCreateOneWithoutTasksCreatedInput!
  approved: Boolean
  title: String!
  description: String!
  assets: AssetCreateManyInput
  category: CategoryCreateOneInput!
  comments: CommentCreateManyInput
  dueDate: DateTime
  dueWhenPossible: Boolean
}

input TaskCreateWithoutCreatedByInput {
  assignedTo: UserCreateOneWithoutTasksAssignedToInput
  approved: Boolean
  title: String!
  description: String!
  assets: AssetCreateManyInput
  category: CategoryCreateOneInput!
  comments: CommentCreateManyInput
  dueDate: DateTime
  dueWhenPossible: Boolean
}

type TaskEdge {
  node: Task!
  cursor: String!
}

enum TaskOrderByInput {
  id_ASC
  id_DESC
  approved_ASC
  approved_DESC
  title_ASC
  title_DESC
  description_ASC
  description_DESC
  dueDate_ASC
  dueDate_DESC
  dueWhenPossible_ASC
  dueWhenPossible_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TaskPreviousValues {
  id: ID!
  approved: Boolean!
  title: String!
  description: String!
  dueDate: DateTime
  dueWhenPossible: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
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
  createdBy: UserUpdateOneRequiredWithoutTasksCreatedInput
  assignedTo: UserUpdateOneWithoutTasksAssignedToInput
  approved: Boolean
  title: String
  description: String
  assets: AssetUpdateManyInput
  category: CategoryUpdateOneRequiredInput
  comments: CommentUpdateManyInput
  dueDate: DateTime
  dueWhenPossible: Boolean
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

input TaskUpdateWithoutAssignedToDataInput {
  createdBy: UserUpdateOneRequiredWithoutTasksCreatedInput
  approved: Boolean
  title: String
  description: String
  assets: AssetUpdateManyInput
  category: CategoryUpdateOneRequiredInput
  comments: CommentUpdateManyInput
  dueDate: DateTime
  dueWhenPossible: Boolean
}

input TaskUpdateWithoutCreatedByDataInput {
  assignedTo: UserUpdateOneWithoutTasksAssignedToInput
  approved: Boolean
  title: String
  description: String
  assets: AssetUpdateManyInput
  category: CategoryUpdateOneRequiredInput
  comments: CommentUpdateManyInput
  dueDate: DateTime
  dueWhenPossible: Boolean
}

input TaskUpdateWithWhereUniqueWithoutAssignedToInput {
  where: TaskWhereUniqueInput!
  data: TaskUpdateWithoutAssignedToDataInput!
}

input TaskUpdateWithWhereUniqueWithoutCreatedByInput {
  where: TaskWhereUniqueInput!
  data: TaskUpdateWithoutCreatedByDataInput!
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
  approved: Boolean
  approved_not: Boolean
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
  category: CategoryWhereInput
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
  dueWhenPossible: Boolean
  dueWhenPossible_not: Boolean
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
  role: Role!
  password: String
  resetToken: String
  resetTokenExpiry: Float
  signupToken: String
  signupTokenExpiry: Float
  status: Status!
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
  role: Role
  password: String
  resetToken: String
  resetTokenExpiry: Float
  signupToken: String
  signupTokenExpiry: Float
  status: Status
}

input UserCreateOneInput {
  create: UserCreateInput
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

input UserCreateWithoutTasksAssignedToInput {
  email: String!
  name: String
  avatar: String
  slackHandle: String
  tasksCreated: TaskCreateManyWithoutCreatedByInput
  role: Role
  password: String
  resetToken: String
  resetTokenExpiry: Float
  signupToken: String
  signupTokenExpiry: Float
  status: Status
}

input UserCreateWithoutTasksCreatedInput {
  email: String!
  name: String
  avatar: String
  slackHandle: String
  tasksAssignedTo: TaskCreateManyWithoutAssignedToInput
  role: Role
  password: String
  resetToken: String
  resetTokenExpiry: Float
  signupToken: String
  signupTokenExpiry: Float
  status: Status
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
  status: Status!
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
  role: Role
  password: String
  resetToken: String
  resetTokenExpiry: Float
  signupToken: String
  signupTokenExpiry: Float
  status: Status
}

input UserUpdateInput {
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
  status: Status
}

input UserUpdateOneInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutTasksCreatedInput {
  create: UserCreateWithoutTasksCreatedInput
  update: UserUpdateWithoutTasksCreatedDataInput
  upsert: UserUpsertWithoutTasksCreatedInput
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

input UserUpdateWithoutTasksAssignedToDataInput {
  email: String
  name: String
  avatar: String
  slackHandle: String
  tasksCreated: TaskUpdateManyWithoutCreatedByInput
  role: Role
  password: String
  resetToken: String
  resetTokenExpiry: Float
  signupToken: String
  signupTokenExpiry: Float
  status: Status
}

input UserUpdateWithoutTasksCreatedDataInput {
  email: String
  name: String
  avatar: String
  slackHandle: String
  tasksAssignedTo: TaskUpdateManyWithoutAssignedToInput
  role: Role
  password: String
  resetToken: String
  resetTokenExpiry: Float
  signupToken: String
  signupTokenExpiry: Float
  status: Status
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserUpsertWithoutTasksAssignedToInput {
  update: UserUpdateWithoutTasksAssignedToDataInput!
  create: UserCreateWithoutTasksAssignedToInput!
}

input UserUpsertWithoutTasksCreatedInput {
  update: UserUpdateWithoutTasksCreatedDataInput!
  create: UserCreateWithoutTasksCreatedInput!
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
  status: Status
  status_not: Status
  status_in: [Status!]
  status_not_in: [Status!]
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
    