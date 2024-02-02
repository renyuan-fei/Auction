'use client';

import Image from "next/image";
import {useState} from "react";

type CarImageProps = {
    imageUrl: string
}

export const CarImage = ({imageUrl}: CarImageProps) => {

    const [isLoaded, setIsLoaded] = useState(true);

    return (
        <Image src={imageUrl}
               alt='image'
               fill
               priority
               className={`
                   object-cover
                   group-hover:opacity-75
                   duration-700
                   ease-in-out
                   ${isLoaded
                   ? 'grayscale blur-2xl scale-110'
                   : 'grayscale-0 blu0 scale-100'}
                   `}
               sizes='(max-width:768px) 100vw,(max-width:1200px) 50vw, 25vw'
               onLoadingComplete={() => setIsLoaded(false)}
        />
    );
};