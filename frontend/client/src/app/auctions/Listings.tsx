'use client';

import {AuctionCard} from "@/app/auctions/AuctionCard";
import {useEffect, useState} from "react";
import {Auction} from "@/types/Auction";
import {AppPagination} from "@/app/components/AppPagination";
import {PagedResult} from "@/types/pagedResult";
import {Filters} from "@/app/auctions/Filters";
import {shallow} from "zustand/shallow";
import {useParamsStore} from "@/hooks/useParamsStore";
import {EmptyFilter} from "@components/EmptyFilter";
import {getData} from "@auctions/auctionActions";
import qs from "query-string";

export const Listings = () => {
    const [data, setData] = useState<PagedResult<Auction>>();

    const params = useParamsStore(state => ({
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        searchTerm: state.searchTerm,
        orderBy: state.orderBy,
        filterBy: state.filterBy,
        seller: state.seller,
        winner: state.winner,
    }), shallow);

    const url = qs.stringifyUrl({url: '', query: params})

    useEffect(() => {
        getData(url).then((data: PagedResult<Auction>) => {
            setData(data);
        })
    }, [url]);

    if (!data) return <h3>Loading...</h3>

    if (data.totalCount === 0) return <EmptyFilter showReset={true}/>

    return (
        <>
            <Filters/>
            {data.totalCount === 0
                ? (<EmptyFilter showReset={true}/>)
                : (<>
                    <div className='grid grid-cols-4 gap-6'>
                        {data && data.results.map((auction: Auction) => (
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