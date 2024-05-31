import {Router} from 'express'
const router = Router()

import {getAllUsers, getUser, createUser, updateUser, deleteUser, loginUser, logoutUSer} from '../controllers/userController.js'
import { authMiddleware } from "../middlewares/authMiddleware.js";

router.post('/', createUser)
router.get('/', authMiddleware, getAllUsers)
router.get('/:id', authMiddleware, getUser)
router.patch('/:id', authMiddleware, updateUser)
router.delete('/:id', authMiddleware, deleteUser)
router.post('/login', loginUser)
router.post('/logout', logoutUSer)

export default router;