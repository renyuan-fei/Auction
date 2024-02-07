'use server';
// use server means
// that the code will be executed only on the server side rather than the client side
// No CORS issues
import {PagedResult} from "@/types/pagedResult";
import {Auction} from "@/types/Auction";
import {fetchWrapper} from "@/lib/fetchWrapper";
import {FieldValues} from "react-hook-form";
import {revalidatePath} from "next/cache";
import {Bid} from "@/types/Bid";
import {getTokenWorkaround} from "@actions/authActions";

export const getData = async (query: string): Promise<PagedResult<Auction>> => {
    return await fetchWrapper.get(`search/${query}`);
}

export const createAuction = async (data: FieldValues): Promise<Auction> => {
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

export async function getBidsForAuction(id: string): Promise<Bid[]> {
    return await fetchWrapper.get(`bids/${id}`);
}

export async function placeBidForAuction(auctionId: string, amount: number) {
    return await fetchWrapper.post(`bids?auctionId=${auctionId}&amount=${amount}`, {})
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
            'Authorization': 'Bearer ' + token?.access_token
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