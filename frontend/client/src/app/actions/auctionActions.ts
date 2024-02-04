'use server';

import {PagedResult} from "@/types/pagedResult";
import {Auction} from "@/types/Auction";
import {getTokenWorkaround} from "@auctions/authActions";
import {fetchWrapper} from "@/lib/fetchWrapper";
import {FieldValues} from "react-hook-form";
import {revalidatePath} from "next/cache";

export const getData = async (query: string) : Promise<PagedResult<Auction>> => {
    return await fetchWrapper.get(`search/${query}`);
}

export const createAuction = async (data: FieldValues) : Promise<Auction> => {
    return await fetchWrapper.post('auctions', data);
}

export async function getDetailedViewData(id: string): Promise<Auction> {
    return await fetchWrapper.get(`auctions/${id}`);
}

export async function updateAuction(data: FieldValues, id: string) {
    const res = await fetchWrapper.put(`auctions/${id}`, data);
    revalidatePath(`/auctions/${id}`);
    return res;
}

export async function deleteAuction(id: string) {
    return await fetchWrapper.del(`auctions/${id}`);
}
export const updateAuctionTest = async () => {
    const data = {
        mileage: Math.floor(Math.random() * 100000) + 1
    }

    const token = await getTokenWorkaround();

    const response = await fetch('http://localhost:6001/auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+ token?.access_token
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        return {
            status: response.status,
            statusText: response.statusText
        }
    }

    return response.statusText;
}