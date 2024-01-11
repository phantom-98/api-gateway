import { successResponse } from "../helpers/response.js"
import { findAll } from "../services/profileService.js"

const getAllProfiles = async (req,res) => {
    const profiles = await findAll()
    successResponse(res,200,profiles)
}

export {getAllProfiles}