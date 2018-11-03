const Joi = require('joi')

exports.createUser = {
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email({ minDomainAtoms: 2 }).min(3).max(255).required(),
  slackHandle: Joi.string().min(3).max(100).required(),
  role: Joi.string().max(100).allow(''),
  avatar: Joi.string().max(255).allow('')
}

exports.createCategory = {
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(3).max(500).required(),
  categoryFields: Joi.array().items(Joi.object().keys({
    fieldName: Joi.string().min(3).max(100).required(),
    fieldType: Joi.string().valid('STRING', 'DATE', 'INT', 'ASSET').required()
  }))
}

exports.signUp = {
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  avatar: Joi.string().max(255).allow(''),
  token: Joi.string().max(255).required()
} 