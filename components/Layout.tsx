import React from 'react'
import NavBar from './NavBar'
import {useRouter as router} from 'next/router'
const Layout = ({children}) => {

    const showNavBar = () =>{
        if(router().pathname === '/' || router().pathname === '/login'){
            return false
        } else{
            return true
        }
        
    } 
    console.log(router().pathname)


    
    return (
        <div>
            {showNavBar()?<><NavBar/></>:<></>}
            
            {children}
        </div>
    )
}

export default Layout
