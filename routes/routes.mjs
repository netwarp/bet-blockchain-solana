import {Router} from "express";

const router = Router()

router.get('/', (request, response) => response.render('index.html'))
router.get('/rules', (request, response) => response.render('rules.html'))

export default router