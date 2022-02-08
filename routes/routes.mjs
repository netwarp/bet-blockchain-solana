import {Router} from "express";
import * as AppController from '../controllers/AppController.mjs'
const router = Router()
import api from './api.mjs'

router.get('/', AppController.index)

router.get('/play', AppController.play)

router.get('/rules', AppController.rules)

router.get('/stats', AppController.stats)




router.use('/api', api)

export default router