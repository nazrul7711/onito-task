import React from 'react'
import {Outlet,Link} from "react-router-dom"
import Navigation from './Navigation'

function RootLayout() {
  return (
    <div>
      <Navigation/>
      <Outlet/>
    </div>
  )
}

export default RootLayout


