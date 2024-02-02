import {Button} from "flowbite-react";
import {useParamsStore} from "@/hooks/useParamsStore";


const pageSizeButtons: number[] = [4, 8, 12]

export const Filters = () => {
    const pageSize = useParamsStore(state => state.pageSize);
    const setParams = useParamsStore(state => state.setParams);


    return (
        <div className='flex justify-between items-center mb-4'>
            <div>
                <span className='uppercase text-sm text-gray-500 mr-2'>Page size</span>
                <Button.Group>
                    {pageSizeButtons.map((size, index) => (
                        <Button
                            key={index}
                            color={`${pageSize === size ? 'red' : 'gray'}`}
                            className='focus:ring-0'
                            onClick={() => setParams({
                                pageSize: size,
                            })}>
                            {size}
                        </Button>
                    ))}
                </Button.Group>
            </div>
        </div>
    );
};