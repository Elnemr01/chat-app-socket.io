import React from 'react'
import ProtectedRoute from './ProtectedRoute'
import { Outlet } from 'react-router'

const AppLayout = () => {
    return (
        <ProtectedRoute>
            <Outlet/>
        </ProtectedRoute>
    )
}

export default AppLayout