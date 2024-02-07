'use client';

import {Dropdown} from "flowbite-react";
import Link from "next/link";
import {User} from "next-auth";
import {HiCog, HiUser} from "react-icons/hi";
import {AiFillCar, AiFillTrophy, AiOutlineLogout} from "react-icons/ai";
import {signOut} from "next-auth/react";
import {usePathname, useRouter} from "next/navigation";
import {useCallback} from "react";
import {useParamsStore} from "@store/useParamsStore";

type UserActionProps = {
    user: User
}

export const UserActions = ({user}: UserActionProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const setParams = useParamsStore(state => state.setParams);

    const handleSetWinner = useCallback(() => {
        setParams({winner: user.username, seller: undefined});
        if (pathname !== '/') {
            router.push('/');
        }
    }, [setParams, user.username, pathname, router]);

    const handleSetSeller = useCallback(() => {
        setParams({winner: undefined, seller: user.username});
        if (pathname !== '/') {
            router.push('/');
        }
    }, [setParams, user.username, pathname, router]);


    return (
        <Dropdown
            inline
            label={`Welcome ${user.name}`}
        >
            <Dropdown.Item icon={HiUser} onClick={handleSetSeller}>
                My Auctions
            </Dropdown.Item>
            <Dropdown.Item icon={AiFillTrophy} onClick={handleSetWinner}>
                Auctions won
            </Dropdown.Item>
            <Dropdown.Item icon={AiFillCar}>
                <Link href='/auctions/create'>
                    Sell my car
                </Link>
            </Dropdown.Item>
            {/*<Dropdown.Item icon={HiCog}>*/}
            {/*    <Link href='/session'>*/}
            {/*        Session (dev only)*/}
            {/*    </Link>*/}
            {/*</Dropdown.Item>*/}
            <Dropdown.Divider/>
            <Dropdown.Item icon={AiOutlineLogout}
                           onClick={() => signOut({callbackUrl: '/'})}>
                Sign out
            </Dropdown.Item>
        </Dropdown>
    )
};