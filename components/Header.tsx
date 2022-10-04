import {Bars3Icon ,ArrowLongRightIcon} from '@heroicons/react/24/solid'
import { Dropdown } from "flowbite-react";
import { ContainImage } from './OptimizedImage';
import Link from 'next/link';

const Header = () => {
  return (
    <div className='sticky z-10 top-0'>
    <div className='flex items-center justify-between px-4 p-3'>
        <div className='flex items-center'>
          <Link href='/'><a> 
            <ContainImage src="/img/cu_logo.png" alt="coinunited logo" className="ms:w-48 w-40 h-10 hidden md:block" />            
            <ContainImage src="/img/cu_academy_logo.png" alt="coinunited logo" className="ms:w-48 w-40 h-12 md:hidden" />
            </a>
          </Link>
            <div className='flex mx-4 text-xs ms:text-sm pt-1 opacity-90 items-center space-x-3'>


            <div className='hidden md:flex ms:space-x-6 space-x-3 font-semibold items-center'>

                <img src="/img/menu.png" alt="menu icon" className='w-4 h-4'/>

                <button className='rounded-md hidden ms:inline-block bg-gradient-to-r from-sky-600 via-sky-500 to-sky-300 px-3 p-1 text-white'>Get 120 USD</button>
                
                <Dropdown label="Buy crypto" inline={true}>
                  <Dropdown.Item>
                    <span className='w-24 text-center'>Buy</span>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <span className='w-24 text-center'>Sell</span>
                  </Dropdown.Item>
                </Dropdown>

                <span >Markets</span>
                
                <Dropdown label="Trade" inline={true}>
                <Dropdown.Item>
                    <span className='w-24 text-center'>Buy</span>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <span className='w-24 text-center'>Sell</span>
                  </Dropdown.Item>
                </Dropdown>
                
                <Dropdown label="Earn" inline={true}>
                <Dropdown.Item>
                    <span className='w-24 text-center'>Buy</span>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <span className='w-24 text-center'>Sell</span>
                  </Dropdown.Item>
                </Dropdown>
                <a href="#">NFT</a>
            </div>  
          </div>
        </div>
        
        <Bars3Icon className="h-9 w-9 md:hidden" />


        <div className='md:flex hidden text-sm ms:space-x-4 space-x-3 opacity-90 font-semibold items-center'>
              <a href="#">Login</a>
              <button className='bg-amber-600 p-1 px-4 rounded-md text-white'>Register</button>

              <a href="#">Wallet</a>
              <Dropdown label="Download" inline={true}>
                <Dropdown.Item>
                    <span className='text-center'>Link 1</span>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <span className='text-center'>Link 2</span>
                  </Dropdown.Item>
              </Dropdown>
        </div>
    </div>
   
   <div className='bg-orange-100  flex justify-center font-semibold items-center p-3'>
        <div className='flex items-center text-sm ms:space-x-3 space-x-2'>
            <span>Sign up for $120 Bonus</span>
            <ArrowLongRightIcon  className='w-4 h-4'/>
            <button className='bg-amber-600 p-1 ms:px-4 px-2 rounded-md text-white'>Register now</button>
        </div>
   </div>
  </div>
  )
}

export default Header;