import React from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Navbar = () => {
  return (
    <nav>
      <div className='nav-list'>
        <ul>
        <NavLink exact to='/'>
              <img src="logo.png" alt="" style={{width:'100px'}}/>
            </NavLink>
        </ul>
        <div className='mid-section'>
          <ul>
            <NavLink exact to='/daos'>
              Available DAO's
            </NavLink>
          </ul>
          <ul>
            <NavLink exact to='/createDao'>
              Create Data DAO
            </NavLink>
          </ul>
          <ul>
            <a href='/profile'>Profile</a>
          </ul>
        </div>
        <div className='right-section'>
          <ul>
            <ConnectButton showBalance={false} chainStatus='icon' />
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
