import NavigationBar from './NavBar/NavBar'
import { Outlet } from 'react-router-dom'

const NavbarLayout = () => {
  return (
    <div>
    <NavigationBar />
    <div>
        <Outlet />
    </div>
</div>
  )
}

export default NavbarLayout