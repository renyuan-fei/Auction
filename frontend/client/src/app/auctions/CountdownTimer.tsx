'use client';

import Countdown, {zeroPad} from "react-countdown";

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
    return (
        <div>
            <Countdown date={auctionEnd} renderer={renderer}/>
        </div>
    );
};