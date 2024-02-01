import {AuctionCard} from "@/app/auctions/AuctionCard";
import {Suspense} from "react";

const getData = async () => {
    const response = await fetch('http://localhost:6001/search?pageSize=10');

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    return response.json();
}
export const Listings = async () => {
    const data = await getData();

    return (
        <div className='grid grid-cols-4 gap-6'>
            {data && data.results.map((auction:any) => (
                <AuctionCard auction={auction} key={auction.id}/>
            ))}
        </div>
    );
};