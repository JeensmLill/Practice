import {
    createBrowserRouter,
} from 'react-router-dom'

import root from './root'
import login from './login'

const router = createBrowserRouter([
    root,
    login,
])

export default router