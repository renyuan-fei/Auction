'use client';

import {useState} from "react";
import {useRouter} from "next/navigation";
import {deleteAuction} from "@actions/auctionActions";
import toast from "react-hot-toast";
import {Button} from "flowbite-react";

type DeleteButtonProps = {
    id: string

}

export const DeleteButton = ({id}: DeleteButtonProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    function doDelete() {
        setLoading(true);
        deleteAuction(id)
            .then(res => {
                if (res.error) throw res.error;
                router.push('/');
            }).catch(error => {
            toast.error(error.status + ' ' + error.message)
        }).finally(() => setLoading(false))
    }

    return (
        <Button color='failure' isProcessing={loading} onClick={doDelete}>
            Delete Auction
        </Button>
    )
};