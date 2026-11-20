import Chat from '../features/chats/ui/pages/Chat'
import Dashboard from '../features/dashboard/ui/pages/Dashboard'
import Settings from '../features/settings/ui/pages/Settings'


export let commonRoutes = [
    {
        path:'',
        element: <Dashboard/>
    },
    {
        path:'chat',
        element: <Chat/>
    },
    {
        path: 'setting',
        element: <Settings/>
    }
]