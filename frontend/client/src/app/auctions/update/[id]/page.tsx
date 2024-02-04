import { Heading } from "@components/Heading";
import {getDetailedViewData} from "@actions/auctionActions";
import {AuctionForm} from "@/app/auctions/AuctionForm";

type props = {
    params: {
        id: string;
    };
};
export default async ({params}:props) => {
    const data = await getDetailedViewData(params.id);

    return (
        <div className='mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg'>
            <Heading title='Update your auction' subtitle='Please update the details of your car' />
            <AuctionForm auction={data} />
        </div>
    )
};
