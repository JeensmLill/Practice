const routes = [
    require('./user/User'),
    require('./user/Role'),
    require('./user/Area'),
    require('./user/Right'),
    require('./user/Role_Right'),
]

function useRoute_CRUD(app) {
    routes.forEach((route) => {
        app.use(route.path, route.router)
    })
}

module.exports = {
    useRoute_CRUD
}