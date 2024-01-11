import { checkJwt } from "../helpers/auth.js"
import { errorResponse } from "../helpers/response.js"

const verifyToken = (req,res,next) => {
    const customtoken = req.header('x-token')
    
    const token = checkJwt(customtoken)
    if(!token) return errorResponse(res,401,'invalid token or doesnt exists')
    req.body.user = token.uid
next();
}

export {verifyToken}