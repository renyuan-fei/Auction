'use client'

import React, {ReactNode, useEffect, useState} from "react";
import {User} from "next-auth";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {useAuctionsStore} from "@store/useAuctionStore";
import {useBidStore} from "@store/userBidStore";
import {Bid} from "@type/Bid";
import toast from "react-hot-toast";
import {getDetailedViewData} from "@actions/auctionActions";
import AuctionCreatedToast from "@components/AuctionCreatedToast";
import {Auction} from "@type/Auction";
import {AuctionFinished} from "@type/AuctionFinished";
import AuctionFinishedToast from "@components/AuctionFinishedToast";

type SignalRProviderProps = {
    children: ReactNode
    user: User | null
}

export const SignalRProvider = ({children, user}: SignalRProviderProps) => {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const setCurrentPrice = useAuctionsStore(state => state.setCurrentPrice);
    const addBid = useBidStore(state => state.addBid);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:6001/notifications')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    console.log('Connected to notification hub');

                    connection.on('BidPlaced', (bid: Bid) => {
                        if (bid.bidStatus.includes('Accepted')) {
                            setCurrentPrice(bid.auctionId, bid.amount);
                        }
                        addBid(bid);
                    });

                    connection.on('AuctionCreated', (auction: Auction) => {
                        if (user?.username !== auction.seller) {
                            return toast(<AuctionCreatedToast auction={auction}/>,
                                {duration: 10000})
                        }
                    });

                    connection.on('AuctionFinished', (finishedAuction: AuctionFinished) => {
                        const auction = getDetailedViewData(finishedAuction.auctionId);
                        return toast.promise(auction, {
                            loading: 'Loading',
                            success: (auction) =>
                                <AuctionFinishedToast
                                    finishedAuction={finishedAuction}
                                    auction={auction}
                                />,
                            error: (err) => 'Auction finished!'
                        }, {success: {duration: 10000, icon: null}})
                    })
                }).catch(error => console.log(error));
        }

        return () => {
            connection?.stop();
        }
    }, [connection, setCurrentPrice, addBid, user?.username]);

    return (children);
};