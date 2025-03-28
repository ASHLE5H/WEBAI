"use client"

import React, { useState } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import Header from '@/components/custom/Header'
import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';

function Provider({children}) {

    const [messages ,setMessages] = useState();
    const [userDetail,setuserDetail]= useState();

    return (
        <div>
            <UserDetailContext.Provider value={{userDetail,setuserDetail}}>
            <MessagesContext.Provider value={{messages, setMessages}}>
            <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header/>
            {children}
            </NextThemesProvider>
            </MessagesContext.Provider>
            </UserDetailContext.Provider>
        </div>
    )
}

export default Provider
