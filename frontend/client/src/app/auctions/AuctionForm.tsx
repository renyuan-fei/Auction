'use client';

import { Button } from 'flowbite-react';
import React, {useCallback, useEffect} from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { usePathname, useRouter } from 'next/navigation';
import {Input} from "@components/Input";
import {createAuction, updateAuction} from "@auctions/auctionActions";
import {Auction} from "@/types/Auction";
import toast from "react-hot-toast";
import DateInput from "@components/DateInput";


type AuctionFormProps = {
    auction?: Auction
}
export const AuctionForm = ({ auction }: AuctionFormProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const {
        control,
        handleSubmit,
        setFocus,
        reset,
        formState: {
            isSubmitting,
            isValid,
            isDirty,
            errors
        }
    } = useForm({
        mode: 'onTouched'
    });

    useEffect(() => {
        if (auction) {
            const { make, model, color, mileage, year } = auction;
            reset({ make, model, color, mileage, year });
        }
        setFocus('make');
    }, [setFocus, reset, auction])

    const onFormSubmit = useCallback(async (data: FieldValues) => {
        try {
            let id = '';
            let res;
            if (pathname === '/auctions/create') {
                res = await createAuction(data);
                id = res.id;
            } else {
                if (auction) {
                    res = await updateAuction(data, auction.id);
                    id = auction.id;
                }
            }
            if (res.error) {
                throw res.error;
            }
            router.push(`/auctions/details/${id}`)
        } catch (error: any) {
            toast.error(error.status + ' ' + error.message)
        }

    }, [pathname, auction, router]);

    const onSubmit = async (data: FieldValues) => {
        console.log(data);
        try {
            let id = '';
            let res;
            if (pathname === '/auctions/create') {
                res = await createAuction(data);
                console.log(res);
                id = res.id;
            } else {
                if (auction) {
                    res = await updateAuction(data, auction.id);
                    id = auction.id;
                }
            }
            if (res.error) {
                console.log(res.error);
                throw res.error;
            }
            router.push(`/auctions/details/${id}`)
        } catch (error: any) {
            toast.error(error.status + ' ' + error.message)
        }
    }


    return (
        <form className='flex flex-col mt-3' onSubmit={handleSubmit(onFormSubmit)}>
            <Input label='Make'
                   name='make'
                   control={control}
                   rules={{required: 'Make is required'}}/>

            <Input label='Model'
                   name='model'
                   control={control}
                   rules={{required: 'Model is required'}}/>

            <Input label='Color'
                   name='color'
                   control={control}
                   rules={{required: 'Color is required'}}/>

            <div className='grid grid-cols-2 gap-3'>
                <Input label='Year'
                       name='year'
                       type='number'
                       control={control}
                       rules={{required: 'year is required'}}/>

                <Input label='Mileage'
                       name='mileage'
                       type='number'
                       control={control}
                       rules={{required: 'Mileage is required'}}/>
            </div>

            <Input label='Image URL' name='imageUrl' control={control}
                   rules={{required: 'Image URL is required'}}/>

            <div className='grid grid-cols-2 gap-3'>
                <Input label='Reserve Price (enter 0 if no reserve)'
                       name='reservePrice' control={control} type='number'
                       rules={{required: 'Reserve price is required'}}/>
                <DateInput
                    label='Auction end date/time'
                    name='auctionEnd'
                    control={control}
                    dateFormat='dd MMMM yyyy h:mm a'
                    showTimeSelect
                    rules={{required: 'Auction end date is required'}}/>
            </div>


            <div className='flex justify-between'>
                <Button outline={true} color='gray'> Cancel</Button>

                <Button isProcessing={isSubmitting}
                        disabled={!isValid}
                        type='submit'
                        outline={true}
                        color='success'>Submit</Button>
            </div>
        </form>
    )
        ;
};