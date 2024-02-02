'use client';

import {AuctionCard} from "@/app/auctions/AuctionCard";
import {useEffect, useState} from "react";
import {Auction} from "@/types/Auction";
import {AppPagination} from "@/app/components/AppPagination";
import {getData} from "@auctions/auctionAuctions";
import {PagedResult} from "@/types/pagedResult";
import {Filters} from "@/app/auctions/Filters";
import {shallow} from "zustand/shallow";
import {useParamsStore} from "@/hooks/useParamsStore";
import qs from "query-string";

export const Listings = () => {
    const [data, setData] = useState<PagedResult<Auction>>();

    const params = useParamsStore(state => ({
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        searchTerm: state.searchTerm,
        // orderBy: state.orderBy,
        // filterBy: state.filterBy,
        // seller: state.seller,
        // winner: state.winner
    }), shallow);

    const setParams = useParamsStore(state => state.setParams);
    const url = qs.stringifyUrl({url: '', query: params})

    const setPageNumber = (pageNumber: number) => {
        setParams({pageNumber})
    }

    useEffect(() => {
        getData(url).then((data: PagedResult<Auction>) => {
            setData(data);
        })
    }, [url]);

    if (!data) return <h3>Loading...</h3>

    return (
        <>
            <Filters/>
            <div className='grid grid-cols-4 gap-6'>
                {data && data.results.map((auction: Auction) => (
                    <AuctionCard auction={auction} key={auction.id}/>
                ))}
            </div>
            <div className='flex justify-center mt-4'>
                {
                    data.pageCount > 1 &&
                    <AppPagination currentPage={params.pageNumber}
                                   pageCount={data.pageCount}
                                   pageChanged={setPageNumber}/>
                }
            </div>
        </>
    );
};