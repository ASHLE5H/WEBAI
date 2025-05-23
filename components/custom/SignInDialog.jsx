import React, { useContext } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Lookup from '@/data/Lookup';
import { Button } from '../ui/button';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import uuid4 from 'uuid4';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

function SignInDialog({ openDialog, closeDialog }) {

    const { userDetail, setuserDetail } = useContext(UserDetailContext);
    const CreateUser = useMutation(api.users.createUser);

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse);
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: 'Bearer ' + tokenResponse?.access_token } },
            );

            console.log(userInfo);
            const user = userInfo.data;
            await CreateUser({
                name:user?.name,
                email:user?.email,
                picture:user?.picture,
                uid:uuid4()
            })

            if(typeof window!==undefined){
                localStorage.setItem('user',JSON.stringify(user))
            }

            setuserDetail(userInfo?.data);
            closeDialog(false);
        },
        onError: errorResponse => console.log(errorResponse),
    });

    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{Lookup.SIGNIN_HEADING}</DialogTitle>
                    <DialogDescription>
                        {Lookup.SIGNIN_SUBHEADING} {/* ✅ Only inline text */}
                    </DialogDescription>
                </DialogHeader>

                {/* ✅ Move this outside DialogDescription */}
                <div className="flex flex-col items-center justify-center">
                    <Button 
                        className="bg-blue-500 text-white hover:bg-blue-400 mt-3" 
                        onClick={googleLogin}
                    >
                        Sign In With Google
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                        {Lookup?.SIGNIn_AGREEMENT_TEXT}
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default SignInDialog;
