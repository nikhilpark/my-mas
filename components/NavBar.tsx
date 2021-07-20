import React from 'react'
import Link from 'next/link'


const NavBar = () => {
    return (
        <div className="flex rounded p-4 w-full text-white justify-between bg-gradient-to-br from-purple-900  to-blue-600">
            <div>
                <Link href="/" passHref>
                    <span className="hover:cursor-pointer text-xl">My-mas</span>
                </Link>
            </div>
            <div>
                <Link href="/login">Login</Link>
            </div>
        </div>
    )
}
 
export default NavBar; 
