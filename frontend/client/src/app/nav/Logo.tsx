'use client';

import {AiOutlineCar} from "react-icons/ai";
import {useParamsStore} from "@/hooks/useParamsStore";
import {useCallback} from "react";

export const Logo = () => {
    const reset = useParamsStore(state => state.reset);
    const onDivClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        reset();
    }, [reset]);

    return (
        <div
            className='
            flex
            items-center
            gap-2
            font-semibold
            text-red-500
            cursor-pointer'
            onClick={onDivClick}>
            <AiOutlineCar size={34}/>
            <div>Carsties Auctions</div>
        </div>
    );
}