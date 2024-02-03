'use server';

import {PagedResult} from "@/types/pagedResult";
import {Auction} from "@/types/Auction";
import {getTokenWorkaround} from "@auctions/authActions";

export const getData = async (query: string) : Promise<PagedResult<Auction>> => {
    const response = await fetch(`http://localhost:6001/search${query}`);

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    return response.json();
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