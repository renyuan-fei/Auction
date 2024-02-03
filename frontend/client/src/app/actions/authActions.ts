'use server'

import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {getToken} from "next-auth/jwt";
import {NextApiRequest} from "next";
import {cookies, headers} from "next/headers";

export const getSession = async () => {
    return await getServerSession(authOptions);
}

export const getCurrentUser = async () => {
    try {
        const session = await getSession();

        if (!session) {
            return null;
        }

        return session.user;
    } catch (e) {
        return null;
    }
}

export async function getTokenWorkaround() {
    const req = {
        headers: Object.fromEntries(headers() as Headers),
        cookies: Object.fromEntries(
            cookies()
                .getAll()
                .map(c => [c.name, c.value])
        )
    } as NextApiRequest;

    return await getToken({req});
}