'use client';

import {Pagination} from "flowbite-react";
import {useState} from "react";

type AppPaginationProps = {
    currentPage: number,
    pageCount: number,
    pageChanged: (page: number) => void
}

export const AppPagination = ({
                                  currentPage,
                                  pageCount,
                                  pageChanged
                              }: AppPaginationProps) => {
    return (
        <Pagination currentPage={currentPage}
                    totalPages={pageCount}
                    layout='pagination'
                    showIcons={true}
                    className='text-blue-500 mb-5'
                    onPageChange={e => pageChanged(e)}>
        </Pagination>
    );
};