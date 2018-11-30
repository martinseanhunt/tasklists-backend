"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Asset",
    embedded: false
  },
  {
    name: "AssetType",
    embedded: false
  },
  {
    name: "Comment",
    embedded: false
  },
  {
    name: "CustomField",
    embedded: false
  },
  {
    name: "FieldType",
    embedded: false
  },
  {
    name: "Role",
    embedded: false
  },
  {
    name: "Task",
    embedded: false
  },
  {
    name: "TaskDue",
    embedded: false
  },
  {
    name: "TaskList",
    embedded: false
  },
  {
    name: "TaskListField",
    embedded: false
  },
  {
    name: "TaskStatus",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "UserStatus",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://localhost:4466/`
});
exports.prisma = new exports.Prisma();
