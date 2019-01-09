import HomeIcon from '@material-ui/icons/HomeSharp'
import AddLocationIcon from '@material-ui/icons/AddLocationSharp'

import AllLocations from './views/pages/allLocations'
import CreateNewLocation from './views/pages/createNewLocation'

const routes = [
  {
    name: 'home',
    path: '/',
    exact: true,
    component: AllLocations,
    sidebarText: 'Home',
    sidebarIcon: HomeIcon
  },
  {
    name: 'create-new-location',
    path: '/create-location',
    exact: true,
    component: CreateNewLocation,
    sidebarText: 'New Location',
    sidebarIcon: AddLocationIcon
  },
]

export default routes
