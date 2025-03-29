"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/Header";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";

function Provider({ children }) {
    const [messages, setMessages] = useState();
    const [userDetail, setuserDetail] = useState();
    const convex = useConvex();

    useEffect(() => {
        IsAuthenticated();
    }, []); // ✅ Added dependency array to prevent infinite calls

    const IsAuthenticated = async () => {
        if (typeof window !== "undefined") {
            const userData = localStorage.getItem("user");
            console.log("User data from localStorage:", userData);
    
            if (!userData) return;  // ✅ Prevents error if no user data
    
            const user = JSON.parse(userData);
            console.log("Parsed User:", user);
    
            if (user && user.email) {
                const result = await convex.query(api.users.getuser, {
                    email: user.email,
                });
                console.log("Result from API:", result);
    
                setuserDetail(result || {});  // ✅ Ensure userDetail is never undefined
            }
        }
    };
    

    return (
        <div>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}>
                <UserDetailContext.Provider value={{ userDetail, setuserDetail }}>
                    <MessagesContext.Provider value={{ messages, setMessages }}>
                        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                            <Header />
                            {children}
                        </NextThemesProvider>
                    </MessagesContext.Provider>
                </UserDetailContext.Provider>
            </GoogleOAuthProvider>
        </div>
    );
}

export default Provider;
