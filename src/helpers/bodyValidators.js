import Joi from "joi";

const registerUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required() ,
    first_name:Joi.string().required(),
    last_name:Joi.string().required(),
  second_lastname:Joi.string(),
    rut:Joi.string().required(),
    

})


const updateUserSchema = Joi.object({
    
    email: Joi.string().email(),
    password:Joi.string(),
    first_name:Joi.string(),
    last_name:Joi.string(),
  second_lastname:Joi.string(),
    rut:Joi.string(),
    profileId:Joi.number(),
    is_active:Joi.bool()

})

const loginUserSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(5).required()
})

export {registerUserSchema,updateUserSchema, loginUserSchema}