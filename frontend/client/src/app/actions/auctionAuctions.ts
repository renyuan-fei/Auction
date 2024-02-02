'use server';

import {PagedResult} from "@/types/pagedResult";
import {Auction} from "@/types/Auction";

export const getData = async (query: string) : Promise<PagedResult<Auction>> => {
    const response = await fetch(`http://localhost:6001/search${query}`);

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    return response.json();
}