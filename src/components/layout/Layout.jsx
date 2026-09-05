import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import useScrollToTop from '../../hooks/useScrollToTop'
import { SettingsProvider } from '../../context/SettingsContext'

function ScrollManager() {
  useScrollToTop()
  return null
}

export default function Layout() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  useEffect(() => {
    // Reset horizontal scroll so no route ever inherits an overflow state.
    window.scrollTo({ left: 0 })
  }, [location.pathname])

  return (
    <SettingsProvider>
      <div className="flex min-h-screen flex-col">
        <ScrollManager />
        <Navbar />
        <main className="flex-1" id="main">
          <Outlet />
        </main>
        {!isAdminRoute && <Footer />}
      </div>
    </SettingsProvider>
  )
}
