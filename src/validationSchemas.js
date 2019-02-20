const Joi = require('joi')

// BIGQUESTION: Is joi the righ thting to be using here? Would it be better to validate 
// at the prisma layer? 

exports.createUser = {
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email({ minDomainAtoms: 2 }).min(3).max(255).required(),
  slackHandle: Joi.string().min(3).max(100).required(),
  role: Joi.string().max(100).allow(''),
  avatar: Joi.string().max(255).allow('')
}

exports.createTaskList = {
  name: Joi.string().min(3).max(100).required(),
  color: Joi.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  description: Joi.string().min(3).max(500).required(),
  taskListFields: Joi.array().items(Joi.object().keys({
    fieldName: Joi.string().min(3).max(100).required(),
    fieldType: Joi.string().valid('STRING', 'DATE', 'INT', 'ASSET').required()
  }))
}

exports.signUp = {
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  avatar: Joi.string().max(255).allow(''),
  token: Joi.string().max(255).required()
} 