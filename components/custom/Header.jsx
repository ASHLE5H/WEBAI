import React, { useContext } from 'react';
import Image from 'next/image';

import { Button } from '../ui/button';
import Colors from '@/data/Colors';
import { UserDetailContext } from '@/context/UserDetailContext';

function Header() {

    const {userDetail, setuserDetail}=useContext(UserDetailContext)

    return(
        <div className='p-4 flex justify-between items-center'>
            <Image src={'/vercel.svg'}  alt='Logo' width={40} height={40} />
           { !userDetail?.name && 
           <div className='flex gap-5'>
                <Button variant="ghost">Sign In</Button>
                <Button
                className="text-white" style={{
                    backgroundColor:Colors.BLUE
                }}
                >Get started</Button>
            </div>
            }
        </div>
    )
}

export default Header;