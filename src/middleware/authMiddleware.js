import { checkJwt } from "../helpers/auth.js"
import { errorResponse } from "../helpers/response.js"
import { findAll, findProfile } from "../services/profileService.js"

const verifyToken = (req,res,next) => {
    const customtoken = req.header('x-token')
    
    const token = checkJwt(customtoken)
    
    if(!token) return errorResponse(res,401,'invalid token or doesnt exists')
    req.token = {uid:token.uid,profileId:token.profileId}
    
    next();
}

const verifyPermissionsProfile = (profileList) => {
    
    return async (req,res,next) => {
        
        const profile = await findProfile(req.token.profileId)

        for (const i of profileList) {
            if (profile.type === i) {
              return next();
            }
          }
        
        return errorResponse(res,400,'User dont have permissions')
        
    }
}

export {verifyToken,verifyPermissionsProfile}