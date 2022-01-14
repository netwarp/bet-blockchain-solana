import {Router} from "express";
import AppController from '../controllers/AppController.mjs'
const router = Router()


router.get('/', (request, response) => {
    const data = {
        wallet: request.session.wallet
    }
    response.render('index.html', data)
})

router.get('/app', AppController.index)

router.get('/rules', (request, response) => response.render('rules.html'))


export default router