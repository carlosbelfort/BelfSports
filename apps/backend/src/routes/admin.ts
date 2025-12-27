import { Router } from 'express'
import  authMiddleware  from '../middlewares/auth.middleware'
import  roleMiddleware  from '../middlewares/role.middleware'
import {
  listUsers,
  updateUserRole,
  toggleUserStatus,
  deleteUser
} from '../controllers/adminController'

const router = Router()

router.use(authMiddleware)
router.use(roleMiddleware('ADMIN'))

router.get('/users', listUsers)
router.patch('/users/:id/role', updateUserRole)
router.patch('/users/:id/status', toggleUserStatus)
router.delete('/users/:id', deleteUser)

export default router
