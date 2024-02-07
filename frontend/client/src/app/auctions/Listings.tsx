'use client';

import {AuctionCard} from "@/app/auctions/AuctionCard";
import {useEffect, useState} from "react";
import {Auction} from "@/types/Auction";
import {AppPagination} from "@/app/components/AppPagination";
import {PagedResult} from "@/types/pagedResult";
import {Filters} from "@/app/auctions/Filters";
import {shallow} from "zustand/shallow";
import {EmptyFilter} from "@components/EmptyFilter";
import qs from "query-string";
import {useParamsStore} from "@store/useParamsStore";
import {useAuctionsStore} from "@store/useAuctionStore";
import {getData} from "@actions/auctionActions";

export const Listings = () => {
    const [loading, setLoading] = useState(true);

    const params = useParamsStore(state => ({
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        searchTerm: state.searchTerm,
        orderBy: state.orderBy,
        filterBy: state.filterBy,
        seller: state.seller,
        winner: state.winner,
    }), shallow);

    const data = useAuctionsStore(state => ({
        auctions: state.auctions,
        totalCount: state.totalCount,
        pageCount: state.pageCount,
    }), shallow);

    const setData = useAuctionsStore(state => state.setData);

    const url = qs.stringifyUrl({url: '', query: params})

    useEffect(() => {
        getData(url).then((data: PagedResult<Auction>) => {
            setData(data);
            setLoading(false);
        })
    }, [url]);

    if (loading) return <h3>Loading...</h3>

    return (
        <>
            <Filters/>
            {data.totalCount === 0
                ? (<EmptyFilter showReset={true}/>)
                : (<>
                    <div className='grid grid-cols-4 gap-6'>
                        {data && data.auctions.map((auction: Auction) => (
                            <AuctionCard auction={auction} key={auction.id}/>
                        ))}
                    </div>
                    <div className='flex justify-center mt-4'>
                        {
                            data.pageCount > 1 &&
                            <AppPagination currentPage={params.pageNumber}
                                           pageCount={data.pageCount}/>
                        }
                    </div>
                </>)
            }
        </>
    );
};