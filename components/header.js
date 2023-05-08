import { ConnectButton } from "web3uikit";
import Link from "next/link";

export default function Header() {
    return (
        <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
            <h1 className="py-4 px-4 font-bold text-3xl">NFT MarketPlace</h1>{" "}
            <div className="flex flex-row items-center">
                <Link href="/sell-nft">
                    <a className="mr-4 p-6"> sell page </a>
                </Link>
                <Link href="/">
                    <a className="mr-4 p-6">home </a>
                </Link>
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>
    );
}
