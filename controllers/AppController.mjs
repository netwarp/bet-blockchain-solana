const AppController = {
    async index(request, response) {
        response.render('app/index.html')
    }
}

export default AppController