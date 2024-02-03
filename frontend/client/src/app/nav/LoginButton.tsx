'use client';
import {Button} from "flowbite-react";
import {useCallback} from "react";
import {signIn} from "next-auth/react";

export const LoginButton = () => {
    const onButtonClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        return signIn('id-server', {callbackUrl: '/'});
    }, []);

    return (
        <Button outline={true} onClick={onButtonClick}>
            Login
        </Button>
    );
};