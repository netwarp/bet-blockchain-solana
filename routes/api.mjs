import {Router} from 'express'
const router = Router()
import * as ApiController from '../controllers/API/ApiController.mjs'

router.get('/', ApiController.index)

router.post('/play', ApiController.play)

export default router
