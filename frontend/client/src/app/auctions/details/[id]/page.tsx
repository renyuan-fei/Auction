import {getDetailedViewData} from "@actions/auctionActions";
import {getCurrentUser} from "@actions/authActions";
import {CarImage} from "@/app/auctions/CarImage";
import {Heading} from "@components/Heading";
import {CountdownTimer} from "@/app/auctions/CountdownTimer";
import {EditButton} from "@/app/auctions/details/[id]/EditButton";
import {DeleteButton} from "@/app/auctions/details/[id]/DeleteButton";
import {DetailedSpecs} from "@/app/auctions/details/[id]/DetailedSpecs";
import {BidList} from "@/app/auctions/details/[id]/BidList";

type props = {
    params: {
        id: string;
    };
};

export default async ({params}: props) => {
    const data = await getDetailedViewData(params.id);
    const user = await getCurrentUser();

    return (
        <div>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <Heading title={`${data.make} ${data.model}`}/>
                    {user?.username === data.seller && (
                        <>
                            <EditButton id={data.id}/>
                            <DeleteButton id={data.id}/>
                        </>

                    )}
                </div>

                <div className='flex gap-3'>
                    <h3 className='text-2xl font-semibold'>Time remaining:</h3>
                    <CountdownTimer auctionEnd={data.auctionEnd}/>
                </div>
            </div>

            <div className='grid grid-cols-2 gap-6 mt-3 mb-20'>
                <div className='w-full bg-gray-200 aspect-h-10 aspect-w-16 rounded-lg overflow-hidden'>
                    <CarImage imageUrl={data.imageUrl}/>
                </div>
                <BidList user={user} auction={data}/>
            </div>


            <div className='mt-3 grid grid-cols-1 rounded-lg'>
                <DetailedSpecs auction={data}/>
            </div>

        </div>
    );
};
