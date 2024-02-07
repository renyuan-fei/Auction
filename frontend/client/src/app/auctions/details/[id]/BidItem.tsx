'use client';

import {Bid, bidStatus} from "@/types/Bid";
import {format} from "date-fns";
import {numberWithCommas} from "@/lib/numberWithComma";

type BidItemProps = {
    bid: Bid;
}
export const BidItem = ({bid}: BidItemProps) => {

    const getBidInfo = () => {
        let bgColor = '';
        let text = '';

        switch (bid.bidStatus) {
            case bidStatus.ACCEPTED:
                bgColor = 'bg-green-500';
                text = 'Bid Accepted';
                break;
            case bidStatus.ACCEPTED_BELOW_RESERVE:
                bgColor = 'bg-amber-500';
                text = 'Reserve not met';
                break;
            case bidStatus.TOO_LOW:
                bgColor = 'bg-red-500';
                text = 'Bid too low';
                break;
            default:
                bgColor = 'bg-red-500';
                text = 'Bid placed after auction finished';
                break;
        }
        return {bgColor, text};
    }

    return (
        <div className={`
            border-gray-300 border-2 px-3 py-2 rounded-lg 
            flex justify-between items-center mb-2 ${getBidInfo().bgColor}
        `}>
            <div className='flex flex-col'>
                <span>Bidder: {bid.bidder}</span>
                <span className='text-gray-700 text-sm'>
                    Time:{format(new Date(bid.bidTime), 'dd MMM yyyy h:mm a')}
                </span>
            </div>

            <div className='flex flex-col text-right'>
                <div className='text-xl font-semibold'>
                    ${numberWithCommas(bid.amount)}
                </div>
                <div className='flex flex-row items-center'>
                    <span>{getBidInfo().text}</span>
                </div>
            </div>
        </div>
    );
};