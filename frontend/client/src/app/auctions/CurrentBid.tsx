type CurrentBidProps = {
    amount?: number;
    reservePrice: number;
}
export const CurrentBid = ({
                               amount,
                               reservePrice
                           }: CurrentBidProps) => {

    const text = amount
        ? '$' + amount
        : 'No bids yet';

    const color = amount
        ? amount > reservePrice
            ? 'bg-green-600'
            : 'bg-amber-600'
        : 'bg-red-600';

    return (
        <div className={`border-2 border-white text-white py-1 px-2 rounded-lg flex justify-center ${color}`}>
            {text}
        </div>
    );
};