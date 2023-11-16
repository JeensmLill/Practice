const { useRoute_CRUD } = require("./@routes-CRUD")
const routes = [
    require('./account'),
    require('./user'),
    require('./upload'),
    require('./news'),
]

const useRoute = (app) => {
    routes.forEach((route) => {
        app.use(route.path, route.router)
    })
    useRoute_CRUD(app)
}

module.exports = {
    useRoute
}