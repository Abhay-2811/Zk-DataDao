import React from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {
  return (
    <nav>
        <div className='nav-list'>
        <ul><a href='/'>Logo</a></ul>
        <ul><NavLink exact to='/daos'>Available DAO's</NavLink></ul>
        <ul><NavLink exact to='/createDao'>Create Data DAO</NavLink></ul>
        <ul><a href='/profile'>Profile</a></ul>
        <ul><ConnectButton showBalance={false} chainStatus="icon"/></ul>
        </div>
    </nav>
  )
}

export default Navbar