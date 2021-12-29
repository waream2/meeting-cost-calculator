import React from 'react'

const Layout = ({children}) => {
  return (
    <div className="container mx-auto flex flex-col items">
      {children}
    </div>
  )
}

export default Layout
