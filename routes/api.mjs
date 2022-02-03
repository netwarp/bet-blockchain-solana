import {Router} from 'express'
const router = Router()
import * as ApiController from '../controllers/API/ApiController.mjs'

router.get('/', ApiController.index)

export default router
