import { useCallback } from 'react';
import { Pagination } from "flowbite-react";
import { useParamsStore } from "@/hooks/useParamsStore";

type AppPaginationProps = {
    currentPage: number,
    pageCount: number,
}

export const AppPagination = ({
                                  currentPage,
                                  pageCount,
                              }: AppPaginationProps) => {
    const setParams = useParamsStore(state => state.setParams);

    // 使用 useCallback 包装 onPageChange 处理函数
    const onPageChange = useCallback((pageNumber: number) => {
        setParams({ pageNumber });
    }, [setParams]);

    return (
        <Pagination currentPage={currentPage}
                    totalPages={pageCount}
                    layout='pagination'
                    showIcons={true}
                    className='text-blue-500 mb-5'
                    onPageChange={onPageChange}>
        </Pagination>
    );
};
