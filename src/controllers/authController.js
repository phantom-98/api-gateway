import prisma from "../db/prismaClient.js"
import { createJwt } from "../helpers/auth.js";
import bcrypt from 'bcrypt'
import { errorResponse } from "../helpers/response.js";
import { loginUserSchema, registerUserSchema, updateUserSchema } from "../helpers/bodyValidators.js";
import { rolesEnums } from "../db/enums.js";
import { createUser, getAllUsers, updateUser } from "../services/userService.js";
import { findProfile, findProfileByType } from "../services/profileService.js";
const getUsers = async (req,res) => {
    const data = await getAllUsers(['profile'])
    res.json(data)
}
const getOne = async (req,res) => {
    const user = await prisma.user.findUnique({where:{id:parseInt(req.params.id)},include:{profile:true}})
    
    res.json(user)
}

const register = async (req,res) => {
    const data = req.body
    
    const {error} = registerUserSchema.validate(data)
    
    if(error) return errorResponse(res,400,error.message)
    const foundUser = await prisma.user.findUnique({where:{email:data.email}})
    if(foundUser) return errorResponse(res,400,'user already exists')
    const hashedPassword = await bcrypt.hash(data.password,parseInt(process.env.SALT_ROUNDS))
const profile = await findProfileByType(rolesEnums.CLIENT)
    const user = await createUser({...data, password:hashedPassword, is_active:true, profileId:profile.id})
    const token = createJwt({uid: user.id})
    res.json({user,token})
}

const update = async (req,res) => {
    const data = req.body;
    const id = parseInt(req.params.id)
    const {error} = updateUserSchema.validate(data)
    
    if(!id) return errorResponse(res,400,'user id not provided')
    if(error) return errorResponse(res,400,error.message)
    if(data.password){
        
        const hashedPassword = await bcrypt.hash(data.password,5)
        data.password = hashedPassword
        
    }
    const updatedUser = await updateUser(data,id)
    if(!updatedUser) return errorResponse(res,400,'user not found')

    res.json(updatedUser)
}

const auth = async(req,res) => {
    const data = req.body
    
    const {error} = loginUserSchema.validate(data)
    
    if(error) return errorResponse(res,400,error.message)

    const user = await prisma.user.findUnique({
        where: {
          email:data.email 
        },
        include:{profile:true}
      });
      
    if (!user) return errorResponse(res,401,'user not found')

    const compare = await bcrypt.compare(data.password,user.password)
      
    if(!compare) return errorResponse(res,403,'incorrect password')
      const token = createJwt({uid: user.id})

    const {id,first_name, email, profile} = user

    const trimUser = {
        id,first_name,email,profile
    }
    
    res.json({user:trimUser,token})
      


}

const registerStaffUser = async (req,res) => {
    const {profileType,...data} = req.body
    
    const {error} = registerUserSchema.validate(data)
    
    if(error || !profileType) return errorResponse(res,400,error.message)
    const foundUser = await prisma.user.findUnique({where:{email:data.email}})
    if(foundUser) return errorResponse(res,400,'user already exists')
    const hashedPassword = await bcrypt.hash(data.password,parseInt(process.env.SALT_ROUNDS))
const profile = await findProfileByType(profileType)
    const user = await createUser({...data, password:hashedPassword, is_active:true, profileId:profile.id})
    const token = createJwt({id: user.id})
    res.json({user,token})
}

const refresUser = async (req,res) => {
    const tokenUserId = req.body.user;
    const user = await prisma.user.findUnique({
        where: {
          id:tokenUserId 
        },
        include:{profile:true}
      });

      if (!user) return errorResponse(res,401,'user not found')

      
      const {id,first_name, email, profile} = user
  
      const trimUser = {
          id,first_name,email,profile
      }
      
      res.json({user:trimUser})
}

export {getUsers,register,update,auth,registerStaffUser,refresUser,getOne}