import {Router} from 'express'
const router = Router()
import * as ApiController from '../controllers/API/ApiController.mjs'

router.get('/', ApiController.index)

router.post('/history', ApiController.history)

router.post('/rewards', ApiController.rewards)

export default router
