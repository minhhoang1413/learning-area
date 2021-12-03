import logo from './images/logo.svg'
import { FaBars } from 'react-icons/fa'
import { useGlobalContext } from './context'
const Navbar = () => {
  const { openSidebar, openSubmenu, closeSubmenu } = useGlobalContext()
  const displaySubmenu = (e) => {
    const page = e.target.textContent
    const btnRect = e.target.getBoundingClientRect()
    const center =  (btnRect.right + btnRect.left)/2
    const bottom = btnRect.bottom + 1
    
    openSubmenu(page,{center,bottom})
  }
  const handleMouseOver = (e)=>{
    if (!e.target.classList.contains('link-btn')) {
      closeSubmenu()
    }
  }
  return <nav onMouseOver={handleMouseOver}>
    <div className="nav-center">
      <div className="nav-header">
        <img src={logo} alt="stripe" className="nav-logo" />
        <button className="btn btn-toggle" onClick={openSidebar}>
          <FaBars />
        </button>
      </div>
      <ul className="nav-links">
        <li><button className="link-btn" onMouseOver={displaySubmenu}>products</button></li>
        <li><button className="link-btn" onMouseOver={displaySubmenu}>developers</button></li>
        <li><button className="link-btn" onMouseOver={displaySubmenu}>company</button></li>
      </ul>
      <button className="btn signin-btn">Sign in</button>
    </div>
  </nav>
}

export default Navbar
