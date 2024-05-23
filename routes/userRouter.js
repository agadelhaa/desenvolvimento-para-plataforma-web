import {Router} from 'express'
const router = Router()

import {getAllUsers, getUser, createUser, updateUser, deleteUser} from '../controllers/userController.js'

router.get('/', getAllUsers)
router.post('/', createUser)
router.get('/:id',getUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router;