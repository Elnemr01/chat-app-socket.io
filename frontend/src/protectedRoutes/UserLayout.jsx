import React from 'react'
import { Outlet } from 'react-router-dom'
import InverseProRoute from './InverseProRoute'

const UserLayout = () => {
    return (
        <InverseProRoute>
            <Outlet/>
        </InverseProRoute>
    )
}

export default UserLayout