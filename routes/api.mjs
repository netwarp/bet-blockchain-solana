import {Router} from 'express'
const router = Router()
import * as ApiController from '../controllers/API/ApiController.mjs'

router.get('/', ApiController.index)


router.post('/play/response', ApiController.response)
export default router
