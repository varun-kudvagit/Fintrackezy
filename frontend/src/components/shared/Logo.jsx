import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to="/">
        <img src="./src/assets/pngegg.png" alt="logo" 
        className='w-20'/>
    </Link>
  )
}

export default Logo
