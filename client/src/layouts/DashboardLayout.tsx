import { useEffect } from 'react'
import { Outlet } from "react-router-dom"
import { SideBar } from "../components/ui/SideBar"
import styles from './layout.module.css'

export function DashboardLayout() {
  useEffect(() => {
    document.title = 'Dashboard - Car Rental'
  }, []);
  return (
    <div className={`grid ${styles.container}`}>
      <SideBar />
      <main style={{ gridArea: 'main' }}>
        <Outlet />
      </main>
    </div>
  )
}