import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import './Layout.css'

export default function Layout({ children }) {
  
  return (
    <div className="container-fluid glass">
      <Navbar sticky="top" variant="light">
        <Link to="/">
          <Navbar.Brand>
            Sunny Pick Up
          </Navbar.Brand>
        </Link>
      </Navbar>
      <div className="container">{children}</div>
    </div>
  )
}
