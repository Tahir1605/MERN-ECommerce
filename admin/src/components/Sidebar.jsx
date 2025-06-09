import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/admin_assets/assets'

function Sidebar() {
    return (
        <div className='w-[18%] min-h-screen border-r-2'>
            <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px] '>
                <NavLink className='flex items-center gap-2 p-3 text-gray-700 border-l border-t border-b '
                    to='/add'>
                    <img className='w-5 h-5' src={assets.add_icon} alt="" />
                    <p className='hidden md:block'>Add Items</p>
                </NavLink>
                 <NavLink className='flex items-center gap-2 p-3 text-gray-700 border-l border-t border-b '
                    to='/list'>
                    <img className='w-5 h-5' src={assets.order_icon} alt="" />
                    <p className='hidden md:block'>List Items</p>
                </NavLink>
                 <NavLink className='flex items-center gap-2 p-3 text-gray-700 border-l border-t border-b '
                    to='/orders'>
                    <img className='w-5 h-5' src={assets.order_icon} alt="" />
                    <p className='hidden md:block'>Orders</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar