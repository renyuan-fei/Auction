import {CountdownTimer} from "@/app/auctions/CountdownTimer";
import {CarImage} from "@/app/auctions/CarImage";
import {Auction} from "@/types/Auction";
import Link from "next/link";

type AuctionCardProps = {
    auction: Auction;
};
export const AuctionCard = ({auction}: AuctionCardProps) => {
    return (
        <Link href={`/auctions/details/${auction.id}`} className='group'>
            <div className='aspect-w-16 aspect-h-10 w-full bg-gray-200 aspect-video rounded-lg overflow-hidden'>
                <div>
                     <CarImage  imageUrl={auction.imageUrl}/>
                    <div className='absolute bottom-2 left-2'>
                        <CountdownTimer auctionEnd={auction.auctionEnd}/>
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center mt-4'>
                <h3 className='text-gray-700'>{auction.make} {auction.model}</h3>
                <p className='font-semibold text-sm'>{auction.year}</p>
            </div>
        </Link>
    );
};