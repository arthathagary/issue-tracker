"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {AiFillBug} from 'react-icons/ai'
import classNames from 'classnames';
import {useSession} from 'next-auth/react';
import {Box, Container, Flex} from '@radix-ui/themes'

const NavBar = () => {
  const pathName = usePathname();
  const {status,data:session} = useSession();
  
  
    const links = [
        { label : "Dashboard", href : "/" },
        { label : "Issues", href : "/issues"}
    ]
  return (
    <nav className='border-b py-4 mb-5 px-5'>
      <Container>
      <Flex justify="between">
        <Flex align="center" gap="4">
        <Link href="/"><AiFillBug/></Link>
        <ul className='flex space-x-5'>
            {links.map(link => 
            <li key={link.href}>
            <Link href={link.href} 
            className={classNames({
              'text-zinc-900' : link.href === pathName,
              'text-zinc-500' : link.href !== pathName,
              'hover:text-zinc-800 transition-colors' : true
            })}
>{link.label}</Link></li>)}
        </ul>
        </Flex>
        <Box>
        {status ==='authenticated' && <Link href="/api/auth/signout">Logout</Link>}
           {status ==='unauthenticated' && <Link href="/api/auth/signin">Login</Link>}
        </Box>
      </Flex>
      </Container>
        
  
    </nav>
  )
}

export default NavBar