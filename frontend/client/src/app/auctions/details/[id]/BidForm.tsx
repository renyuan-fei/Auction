'use client';

import {useBidStore} from "@store/userBidStore";
import {FieldValues, useForm} from "react-hook-form";
import {placeBidForAuction} from "@actions/auctionActions";
import {numberWithCommas} from "@/lib/numberWithComma";
import toast from "react-hot-toast";

type BidFormProps = {
    auctionId: string;
    highBid: number;
};

export const BidForm = ({auctionId, highBid}: BidFormProps) => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const addBid = useBidStore(state => state.addBid);

    const onSubmit = (data: FieldValues) => {
        if (data.amount <= highBid) {
            reset();
            return toast.error('Bid must be at least $' + numberWithCommas(highBid + 1))
        }

        placeBidForAuction(auctionId, +data.amount).then(bid => {
            if (bid.error) throw bid.error;
            addBid(bid);
            reset();
        }).catch(err => toast.error(err.message));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className='flex items-center border-2 rounded-lg py-2'>
            <input
                type='number'
                {...register('amount')}
                className='input-custom text-sm text-gray-600'
                placeholder={`Enter your bid (minimum bid is $${numberWithCommas(highBid + 1)})`}
            />
        </form>
    )
};