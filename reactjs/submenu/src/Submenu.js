import { useState, useRef, useEffect } from 'react'
import { useGlobalContext } from './context'
const Submenu = () => {
  const { isSubmenuOpen, submenuLocation, sublink } = useGlobalContext()
  const submenuRef = useRef(null)
  const [column, setColumn] = useState('col-2')
  useEffect(() => {
    if (submenuLocation) {
      submenuRef.current.style.left = submenuLocation.center + 'px'
      submenuRef.current.style.top = submenuLocation.bottom + 'px'
    }
    if (sublink.links.length === 2) {
      setColumn('col-2')
    } else if (sublink.links.length === 3) {
      setColumn('col-3')
    } else if (sublink.links.length > 3) {
      setColumn('col-4')
    }
  }, [submenuLocation, sublink])
  return <aside className={`submenu ${isSubmenuOpen ? 'show' : ''}`} ref={submenuRef}>
    <h4>{sublink.page}</h4>
    <div className={`submenu-center ${column}`}>
      {sublink.links.map(item =>
        <a href={item.url} key={item.label}>{item.icon}{item.label}</a>
      )}
    </div>

  </aside>
}

export default Submenu
