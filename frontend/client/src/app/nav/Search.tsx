'use client';

import {FaSearch} from "react-icons/fa";
import {useParamsStore} from "@/hooks/useParamsStore";
import React, {useCallback, useState} from "react";

export const Search = () => {
    const setParams = useParamsStore(state => state.setParams);
    const searchValue = useParamsStore(state => state.searchValue);
    const setSearchValue = useParamsStore(state => state.setSearchValue);

    const search = useCallback(() => {
        setParams({searchTerm: searchValue});
    }, [searchValue, setParams]);

    const onInputKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            search();
        }
    }, [search]);

    const onButtonClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        search();
    }, [search]);

    const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }, [setSearchValue]);


    return (
        <div className='flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm'>
            <input type='text'
                   value={searchValue}
                   placeholder='search for cars by make, model or color'
                   className='
                   flex-grow
                   pl-5
                   bg-transparent
                   focus:outline-none
                   border-transparent
                   focus:border-transparent
                   focus:ring-0
                   text-sm
                   text-gray-600
                   '
                   onChange={onInputChange}
                   onKeyDown={onInputKeyDown}/>
            <button onClick={onButtonClick}>
                <FaSearch
                    size={34}
                    className='
                bg-red-400
                text-white
                rounded-full
                p-2
                mx-2
                cursor-pointer
                '/>
            </button>
        </div>
    );
};