import Image from "next/image";
import {CountdownTimer} from "@/app/auctions/CountdownTimer";

type AuctionCardProps = {
    auction: any;
};
export const AuctionCard = ({auction}: AuctionCardProps) => {
    return (
        <a href='#'>
            <div className='aspect-w-16 aspect-h-10 w-full bg-gray-200 aspect-video rounded-lg overflow-hidden'>
                <div>
                    <Image src={auction.imageUrl}
                           alt='image'
                           fill
                           priority
                           className='object-cover'
                           sizes='(max-width:768px) 100vw,(max-width:1200px) 50vw, 25vw'
                    />
                    <div className='absolute bottom-2 left-2'>
                        <CountdownTimer auctionEnd={auction.auctionEnd}/>
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center mt-4'>
                <h3 className='text-gray-700'>{auction.make} {auction.model}</h3>
                <p className='font-semibold text-sm'>{auction.year}</p>
            </div>
        </a>
    );
};