import {Auction} from "@/types/Auction";
import {PagedResult} from "@/types/pagedResult";
import {createWithEqualityFn} from "zustand/traditional";

type State = {
    auctions: Auction[],
    totalCount: number,
    pageCount: number,
}

type Actions = {
    setData: (data: PagedResult<Auction>) => void
    setCurrentPrice: (auctionId: string, price: number) => void
}

const initialState: State = {
    auctions: [],
    totalCount: 0,
    pageCount: 1,
}

export const useAuctionsStore = createWithEqualityFn<State & Actions>()((set) => ({
    ...initialState,

    setData: (data: PagedResult<Auction>) => {
        set({
            auctions: data.results,
            totalCount: data.totalCount,
            pageCount: data.pageCount
        })
    },

    setCurrentPrice: (auctionId: string, amountPrice: number) => {
        set((state) => ({
            auctions: state.auctions.map((auction) =>
                auction.id === auctionId
                    ? {...auction, currentHighBid: amountPrice} : auction)
        }))
    }
}))