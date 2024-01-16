import express from "express";
import { auth, getOne, getUsers, refresUser, register, removeUser, update } from "../controllers/authController.js";
import { verifyPermissionsProfile, verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get('/', getUsers)
router.get('/:id', getOne)
router.post('/',register)
router.put('/:id',verifyToken,verifyPermissionsProfile(['ADMIN','DEVELOPER']),update)
router.delete('/:id',verifyToken,verifyPermissionsProfile(['ADMIN','DEVELOPER']),removeUser)
router.post('/login',auth)
//router.post('/intranet',registerStaffUser)
router.get('/refresh',verifyToken,refresUser)


export default router