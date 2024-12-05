import Joi from 'joi'

export const loginSchema = Joi.object().keys({
  body: Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().required()
  })
})

export const registerSchema = Joi.object().keys({
  body: Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required()
  })
})