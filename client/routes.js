import AllLocations from './views/pages/allLocations'
import CreateNewLocation from './views/pages/createNewLocation'

const routes = [
  {
    name: 'home',
    path: '/',
    exact: true,
    component: AllLocations,
    sidebarText: 'Home'
  },
  {
    name: 'create-new-location',
    path: '/create-location',
    exact: true,
    component: CreateNewLocation,
    sidebarText: 'New Location'
  },
]

export default routes
