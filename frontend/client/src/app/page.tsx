import {Listings} from "@/app/auctions/Listings";

export default async function Home() {
    console.log('Server component')
  return (
    <div>
      <Listings/>
    </div>
  )
}
