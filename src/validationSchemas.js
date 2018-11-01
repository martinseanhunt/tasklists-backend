const Joi = require('joi')

exports.createUserSchema = {
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email({ minDomainAtoms: 2 }).min(3).max(255).required(),
  slackHandle: Joi.string().min(3).max(100).required(),
  role: Joi.string().max(100).allow(''),
  avatar: Joi.string().max(255).allow('')
}

