import prisma from "../db/prismaClient.js"

const createUser = async (userData) => {
    const user = await prisma.user.create({data:{...userData}, include:{profile:true}})
    return user;
}
const updateUser = async (userData, userId) => {
    const user = await prisma.user.update({
        where: { id:userId },
        data:userData, 
      });
    return user;
}
const getUser = async (userId) => {
    const user = await prisma.user.findUnique({where:{id:userId}})
    return user;
}
const getUserByEmail = async (userEmail) => {
    const user = await prisma.user.findUnique({where:{email:userEmail}})
    return user;
}
const getAllUsers = async (relations) => {
    let relationsBuilder = {}
    for (let i = 0; i < relations.length; i++) {
        relationsBuilder[relations[i]] = true
        
    }
    const user = await prisma.user.findMany({include:relationsBuilder});
    return user;
}

export {createUser,updateUser,getAllUsers,getUser,getUserByEmail}