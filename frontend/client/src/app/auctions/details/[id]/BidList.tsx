'use client';

import {User} from "next-auth";
import {Auction} from "@type/Auction";
import React, {useCallback, useEffect, useState} from "react";
import {useBidStore} from "@store/userBidStore";
import {getBidsForAuction} from "@actions/auctionActions";
import {Bid} from "@type/Bid";
import toast from "react-hot-toast";
import {Heading} from "@components/Heading";
import {BidItem} from "@/app/auctions/details/[id]/BidItem";
import {BidForm} from "@/app/auctions/details/[id]/BidForm";
import {numberWithCommas} from "@lib/numberWithComma";
import {EmptyFilter} from "@components/EmptyFilter";
import {LoginButton} from "@/app/nav/LoginButton";
import Link from "next/link";
import {signIn} from "next-auth/react";

type BidListProps = {
    user: User | null
    auction: Auction
}

export const BidList = ({user, auction}: BidListProps) => {
    const [loading, setLoading] = useState(true);
    const bids = useBidStore(state => state.bids);
    const setBids = useBidStore(state => state.setBids);
    const open = useBidStore(state => state.open);
    const setOpen = useBidStore(state => state.setOpen);
    const openForBids = new Date(auction.auctionEnd) > new Date();

    const highBid = bids.reduce((prev, current) => prev > current.amount
        ? prev
        : current.bidStatus.includes('Accepted')
            ? current.amount
            : prev, 0)

    const onButtonClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        return signIn('id-server', {callbackUrl: '/'},
            {prompt: 'login'});
    }, []);

    useEffect(() => {
        getBidsForAuction(auction.id)
            .then((res: any) => {
                if (res.error) {
                    throw res.error
                }
                setBids(res as Bid[]);
            }).catch(err => {
            toast.error(err.message);
        }).finally(() => {
            setLoading(false)
        });
    }, [auction.id, setLoading, setBids]);

    useEffect(() => {
        setOpen(openForBids);
    }, [openForBids, setOpen]);

    if (loading) return <span>Loading bids...</span>

    return (
        <div className='rounded-lg shadow-md'>
            <div className='py-2 px-4 bg-white'>
                <div className='sticky top-0 bg-white p-2'>
                    <Heading title={`Current high bid is $${numberWithCommas(highBid)}`}/>
                </div>
            </div>

            <div className='overflow-auto h-[400px] flex flex-col-reverse px-2'>
                {bids.length === 0 ? (
                    <EmptyFilter title='No bids for this item'
                                 subtitle='Please feel free to make a bid'/>
                ) : (
                    <>
                        {bids.map(bid => (
                            <BidItem key={bid.id} bid={bid}/>
                        ))}
                    </>
                )}
            </div>

            <div className='px-2 pb-2 text-gray-500'>
                {!open ? (
                    <div className='flex items-center justify-center p-2 text-lg font-semibold'>
                        This auction has finished
                    </div>
                ) : !user ? (
                    <div className='flex items-center justify-center p-2 text-lg font-semibold'>
                        Please&nbsp;
                        <span className='text-cyan-700 cursor-pointer hover:text-cyan-500'
                              onClick={onButtonClick}>
                            login
                        </span>&nbsp;
                        to make a bid
                    </div>
                ) : user && user.username === auction.seller ? (
                    <div className='flex items-center justify-center p-2 text-lg font-semibold'>
                        You cannot bid on your own auction
                    </div>
                ) : (
                    <BidForm auctionId={auction.id} highBid={highBid}/>
                )}
            </div>
        </div>
    )
};