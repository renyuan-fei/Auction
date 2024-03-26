import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import {Navbar} from "@/app/nav/Navbar";
import {ToasterProvider} from "@providers/ToasterProvider";
import {SignalRProvider} from "@providers/SignalRProvider";
import {getCurrentUser} from "@actions/authActions";
import React from "react";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Auction Service',
    description: 'auctions for cars',
    icons: []
}

export default async function RootLayout({children,}: { children: React.ReactNode }) {
    const user = await getCurrentUser();

    return (
        <html lang="en">
            <body className={inter.className}>
                <ToasterProvider />
                <Navbar/>
                <main className={"container mx-auto px-5 pt-10"}>
                    <SignalRProvider user={user}>
                        {children}
                    </SignalRProvider>
                </main>
            </body>
        </html>
    )
}
