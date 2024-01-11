import prisma from "../db/prismaClient.js"

const findAll = async () => {
    const profile = await prisma.profile.findMany()

    return profile
}

const findProfileByType = async (profileType) => {
    const profile = await prisma.profile.findUnique({where:{type:profileType}})

    return profile
}
const findProfile = async (profileId) => {
    const profile = await prisma.profile.findUnique({where:{id:profileId}})

    return profile
}

export {findProfileByType,findProfile,findAll}