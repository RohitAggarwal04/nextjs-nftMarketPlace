import Head from "next/head";
import { UseMoralisQuery, useMoralis } from "react-moralis";
import NFTBox from "../components/NFTBox";
import networkMapping from "../constants/networkMapping.json";
import GET_ACTIVE_ITEMS from "../constants/subgraphQueries";
import { useQuery } from "@apollo/client";

export default function Home() {
    const { isWeb3Enabled, account, chainId } = useMoralis();
    const chainString = chainId ? parseInt(chainId).toString() : null;
    const marketPlaceAddress = "0x5BD3ed4C10794Fb125aFF918f6880e7fcF2e3c4C";

    const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS);

    return (
        <div className="container mx-auto">
            <Head>
                <title>NFT MarketPlace</title>
                <meta name="description" content="NFT MarketPlace" />
            </Head>
            <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
            <div className="flex flex-wrap">
                {isWeb3Enabled && chainId ? (
                    loading || !listedNfts ? (
                        <div>loading... </div>
                    ) : (
                        listedNfts.activeItems.map((nft) => {
                            const { price, tokenId, nftAddress, owner } = nft;
                            console.log(nft);
                            return marketPlaceAddress ? (
                                <NFTBox
                                    price={price}
                                    nftAddress={nftAddress}
                                    tokenId={tokenId}
                                    marketplaceAddress={marketPlaceAddress}
                                    owner={owner}
                                    key={`${nftAddress}${tokenId}`}
                                />
                            ) : (
                                <div>Network error, please switch to a supported network. </div>
                            );
                        })
                    )
                ) : (
                    <div>Web3 currently not Enabled</div>
                )}
            </div>
        </div>
    );
}
