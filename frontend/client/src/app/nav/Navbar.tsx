import {AiOutlineCar} from 'react-icons/ai'

export const Navbar = () => {
    return (
        <header
            className={
                "sticky top-0 z-50 flex justify-between bg-white p-5 items-center text-gray-800 shadow-md"
            }>
            <div className={"flex items-center gap-2 font-semibold text-red-500"}>
                <AiOutlineCar size={34}/>
                <div>Carsties Auctions</div>
            </div>
            <div>Middle</div>
            <div>Right</div>
        </header>
    );
};