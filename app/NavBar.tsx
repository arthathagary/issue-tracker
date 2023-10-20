"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {AiFillBug} from 'react-icons/ai'
import classNames from 'classnames';

const NavBar = () => {
  const pathName = usePathname();
  
  
    const links = [
        { label : "Dashboard", href : "/" },
        { label : "Issues", href : "/issues"}
    ]
  return (
    <nav className='flex space-x-6 border-b h-14 items-center mb-5 px-5'>
        <Link href="/"><AiFillBug/></Link>
        <ul className='flex space-x-5'>
            {links.map(link => 
            <Link key={link.href} href={link.href} 
            className={classNames({
              'text-zinc-900' : link.href === pathName,
              'text-zinc-500' : link.href !== pathName,
              'hover:text-zinc-800 transition-colors' : true
            })}
>{link.label}</Link>)}
        </ul>
    </nav>
  )
}

export default NavBar