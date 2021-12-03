import { createContext, useContext, useState } from 'react'
import sublinks from './data'
const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
    const [submenuLocation, setSubmenuLocation] = useState({})
    const [sublink, setSublink] = useState({page:'',links:[]})
    const openSidebar = () => {
        setIsSidebarOpen(true)
    }
    const closeSidebar = () => {
        setIsSidebarOpen(false)
    }
    const openSubmenu = (text, location) => {
        const sublink = sublinks.find(link => link.page === text)
        setSubmenuLocation(location)
        setSublink(sublink)
        setIsSubmenuOpen(true)
    }
    const closeSubmenu = () => {
        setIsSubmenuOpen(false)
    }

    return <AppContext.Provider value={{
        isSidebarOpen, openSidebar, closeSidebar,
        isSubmenuOpen, openSubmenu, closeSubmenu,
        submenuLocation, sublink
    }}>
        {children}
    </AppContext.Provider>
}
export const useGlobalContext = () => {
    return useContext(AppContext)
}