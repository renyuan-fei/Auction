'use client';

import {Button, Dropdown} from "flowbite-react";
import Link from "next/link";
import {User} from "next-auth";
import {HiCog, HiUser} from "react-icons/hi";
import {AiFillCar, AiFillTrophy, AiOutlineLogout} from "react-icons/ai";
import {signOut} from "next-auth/react";

type UserActionProps = {
    user: Partial<User>
}

export const UserActions = ({user}: UserActionProps) => {
    return (
        <Dropdown
            inline
            label={`Welcome ${user.name}`}
        >
            <Dropdown.Item icon={HiUser}>
                My Auctions
            </Dropdown.Item>
            <Dropdown.Item icon={AiFillTrophy}>
                Auctions won
            </Dropdown.Item>
            <Dropdown.Item icon={AiFillCar}>
                <Link href='/'>
                    Sell my car
                </Link>
            </Dropdown.Item>
            <Dropdown.Item icon={HiCog}>
                <Link href='/session'>
                    Session (dev only)
                </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item icon={AiOutlineLogout} onClick={() => signOut({callbackUrl: '/'})}>
                Sign out
            </Dropdown.Item>
        </Dropdown>
    )
};