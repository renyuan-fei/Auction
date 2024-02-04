'use client'

import { Button } from 'flowbite-react'
import Link from 'next/link'
import React from 'react'

type EditButtonProps = {
    id: string
}

export const EditButton = ({id}: EditButtonProps) => {
    return (
        <Button outline>
            <Link href={`/auctions/update/${id}`}>Update Auction</Link>
        </Button>
    )
}
