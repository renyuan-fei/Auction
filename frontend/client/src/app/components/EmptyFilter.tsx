'use client';

import {Heading} from "@components/Heading";
import {Button} from "flowbite-react";
import {signIn} from "next-auth/react";
import {useParamsStore} from "@store/useParamsStore";

type EmptyFilterProps = {
    title?: string
    subtitle?: string
    showReset?: boolean
    showLogin?: boolean
    callbackUrl?: string
}
export const EmptyFilter = ({
                                title = 'No matches for this filter',
                                subtitle = 'Try changing or resetting the filter',
                                showReset,
                                showLogin,
                                callbackUrl
                            }: EmptyFilterProps) => {
    const reset = useParamsStore(state => state.reset);

    return (
        <div className='h-[40vh] flex flex-col gap-2 justify-center items-center shadow-lg'>
            <Heading title={title} subtitle={subtitle} center/>
            <div className='mt-4'>
                {showReset && (
                    <Button outline onClick={reset}>Remove Filters</Button>
                )}
                {showLogin && (
                    <Button outline
                            onClick={() => signIn('id-server', {callbackUrl})}>Login</Button>
                )}
            </div>
        </div>
    )
};