'use client';

import Countdown, {zeroPad} from "react-countdown";
import {useBidStore} from "@store/userBidStore";
import {usePathname} from "next/navigation";

type rendererProps = {
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
    completed: boolean
}

type CountdownTimerProps = {
    auctionEnd: string
}

const renderer = ({days, hours, minutes, seconds, completed}: rendererProps) => {
    return (
        <div className={`border-2 
                        border-white 
                        text-white 
                        py-1 
                        px-2
                        rounded-lg 
                        flex 
                        justify-between
            ${completed
            ? "bg-red-600"
            : (days === 0 && hours < 10)
                ? 'bg-amber-600'
                : 'bg-green-600'}`
        }>
            {completed
                ? (<span>Auction finished</span>)
                : (<span suppressHydrationWarning={true}>
                        {zeroPad(days)}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
                </span>)}
        </div>
    )
};
export const CountdownTimer = ({auctionEnd}: CountdownTimerProps) => {
    const setOpen = useBidStore(state => state.setOpen);
    const pathname = usePathname();

    // once the auction is finished, set bid form to closed
    const auctionFinished = () => {
        if (pathname.startsWith('/auctions/details')) {
            setOpen(false)
        }
    }

    return (
        <div>
            <Countdown date={auctionEnd} renderer={renderer} onComplete={auctionFinished}/>
        </div>
    );
};