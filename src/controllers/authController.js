import { createJwt } from "../helpers/auth.js";
import bcrypt from 'bcrypt'
import { errorResponse } from "../helpers/response.js";
import { loginUserSchema, registerUserSchema, updateUserSchema } from "../helpers/bodyValidators.js";
import { createUser, getAllUsers, getUser, getUserByEmail, updateUser } from "../services/userService.js";
import { findProfile } from "../services/profileService.js";
const getUsers = async (req,res) => {
    const data = await getAllUsers(['profile'])
    console.log('test');
    res.json(data)
}
const getOne = async (req,res) => {
    const user = await getUser(parseInt(req.params.id))
    
    res.json(user)
}


const update = async (req,res) => {
    const data = req.body;
    const id = parseInt(req.params.id)
    const {error} = updateUserSchema.validate(data)
    
    if(!id) return errorResponse(res,400,'user id not provided')
    if(error) return errorResponse(res,400,error.message,'alo')
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

    const user = await getUserByEmail(data.email)
      
    if (!user) return errorResponse(res,401,'user not found')

    const compare = await bcrypt.compare(data.password,user.password)
      
    if(!compare) return errorResponse(res,403,'incorrect password')
      const token = createJwt({uid: user.id, profileId: user.profile.id})

    const {id,first_name, email, profile} = user

    const trimUser = {
        id,first_name,email,profile
    }
    
    res.json({user:trimUser,token})
      


}

const register = async (req,res) => {
    const data = req.body
    
    const {error} = registerUserSchema.validate(data)
    
    if(error) return errorResponse(res,400,error.message)
    const foundUser = await getUserByEmail(data.email)
    if(foundUser) return errorResponse(res,400,'user already exists')
    const hashedPassword = await bcrypt.hash(data.password,parseInt(process.env.SALT_ROUNDS))
    const profile = await findProfile(data.profileId)
    if(!profile) return errorResponse(res,400,'selected profile doest exists')
    const user = await createUser({...data, password:hashedPassword, is_active:true})
    
    res.json(user)
}

const refresUser = async (req,res) => {
    const tokenUserId = req.body.user;
    const user = await getUser(tokenUserId)

      if (!user) return errorResponse(res,401,'user not found')

      
      const {id,first_name, email, profile} = user
  
      const trimUser = {
          id,first_name,email,profile
      }
      
      res.json({user:trimUser})
}

export {getUsers,register,update,auth,refresUser,getOne}