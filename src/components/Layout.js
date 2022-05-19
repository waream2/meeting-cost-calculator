import React from 'react'
import { VerticalNavigation } from 'react-rainbow-components';

const Layout = ({ children }) => {
  return (
    <div className="container mx-auto flex flex-col items-center ">
      {children}
    </div>
  )
}

export default Layout
