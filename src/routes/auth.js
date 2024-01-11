import express from "express";
import { auth, getOne, getUsers, refresUser, register, registerStaffUser, update } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get('/', getUsers)
router.get('/:id', getOne)
router.post('/',register)
router.put('/:id',update)
router.post('/login',auth)
router.post('/intranet',registerStaffUser)
router.get('/refresh',verifyToken,refresUser)


export default router