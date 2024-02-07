'use client';

import {AiOutlineCar} from "react-icons/ai";
import React, {useCallback} from "react";
import {usePathname, useRouter} from "next/navigation";
import {useParamsStore} from "@store/useParamsStore";

export const Logo = () => {
    const router = useRouter();
    const pathname = usePathname();

    const reset = useParamsStore(state => state.reset);

    const onReset = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        if (pathname !== '/') {
            router.push('/');
        }
        reset();
    }, [reset, pathname, router]);

    return (
        <div
            className='
            flex
            items-center
            gap-2
            font-semibold
            text-red-500
            cursor-pointer'
            onClick={onReset}>
            <AiOutlineCar size={34}/>
            <div>Carsties Auctions</div>
        </div>
    );
}