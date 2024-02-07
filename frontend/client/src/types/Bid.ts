export enum bidStatus {
    ACCEPTED = 'Accepted',
    ACCEPTED_BELOW_RESERVE = 'AcceptedBelowReserve',
    TOO_LOW = 'TooLow'
}

export type Bid = {
    id: string
    auctionId: string
    bidder: string
    bidTime: string
    amount: number
    bidStatus: bidStatus
}