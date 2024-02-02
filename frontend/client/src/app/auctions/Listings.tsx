'use client';

import {AuctionCard} from "@/app/auctions/AuctionCard";
import {useEffect, useState} from "react";
import {Auction} from "@/types/Auction";
import {AppPagination} from "@/app/components/AppPagination";
import {getData} from "@auctions/auctionAuctions";
import {PagedResult} from "@/types/pagedResult";

export const Listings = () => {
    const [auctions, setAuctions] = useState<Auction[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);

    useEffect(() => {
        getData(pageNumber).then((data: PagedResult<Auction>) => {
            setAuctions(data.results);
            setPageCount(data.pageCount);
        })
    }, [pageNumber]);

    if (auctions.length === 0) return <h3>Loading...</h3>

    return (
        <>
            <div className='grid grid-cols-4 gap-6'>
                {auctions && auctions.map((auction: Auction) => (
                    <AuctionCard auction={auction} key={auction.id}/>
                ))}
            </div>
            <div>
                <AppPagination currentPage={pageNumber} pageCount={pageCount} pageChanged={setPageNumber}/>
            </div>
        </>
    );
};