import { useEffect, useState, useRef, useMemo } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import nftMarketPlaceAbi from "../constants/NftMarketPlace.json";
import nftAbi from "../constants/basicNft.json";
import Image from "next/image";
import { Card, useNotification } from "web3uikit";
import { ethers } from "ethers";
import UpdateListing from "./updateListingModal";

const truncateStr = (fullStr, strLen) => {
    if (fullStr.length <= strLen) return fullStr;

    const separator = "...";
    const seperatorLength = separator.length;
    const charsToShow = strLen - seperatorLength;
    const frontChars = Math.ceil(charsToShow / 2);
    const backChars = Math.floor(charsToShow / 2);
    return (
        fullStr.substring(0, frontChars) + separator + fullStr.substring(fullStr.length - backChars)
    );
};

export default function NFTBox({ price, nftAddress, tokenId, marketplaceAddress, owner }) {
    const imageURIRef = useRef("");
    let { isWeb3Enabled, account } = useMoralis();
    const dispatch = useNotification();
    const [imageURI, setImageURI] = useState("");
    const [imageURI1, setImageURI1] = useState("");
    const [tokenName, setTokenName] = useState("");
    const [tokenDescription, setTokenDescription] = useState("");
    const [showModal, setShowModal] = useState(false);

    function hideModal() {
        setShowModal(false);
    }

    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: nftAbi,
        contractAddress: nftAddress,
        functionName: "TOKEN_URI",
    });

    const { runContractFunction: buyNFT } = useWeb3Contract({
        abi: nftMarketPlaceAbi,
        contractAddress: marketplaceAddress,
        functionName: "buyNFT",
        msgValue: price,
        params: {
            nftAddress: nftAddress,
            tokenId: tokenId,
        },
    });

    async function updateUI() {
        const tokenURI = await getTokenURI();
        console.log("The token URI is " + tokenURI);

        if (tokenURI) {
            const requestUrl = tokenURI.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/");
            const tokenURIResponse = await (await fetch(requestUrl)).json();
            const imageUri = tokenURIResponse.image;
            const imageUriUrl = imageUri.replace("ipfs.io", "cloudflare-ipfs.com");

            imageURIRef.current = imageUriUrl;
            console.log(imageURIRef.current);

            setTokenName(tokenURIResponse.name);
            console.log(imageUriUrl);
            setTokenDescription(tokenURIResponse.description);
            console.log("bye");
        }
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            async function updateImageURI() {
                await updateUI();
                console.log("updated UI");
            }
            updateImageURI();
        }
        console.log("i fire ");
    }, [isWeb3Enabled, imageURI]);

    function handleCardClick() {
        isOwnedByUser
            ? setShowModal(true)
            : buyNFT({
                  onError: (error) => console.log(error),
                  onSuccess: () => handleBuyItemSuccess(),
              });
    }

    const handleBuyItemSuccess = async () => {
        dispatch({
            type: "success",
            message: "NFT Bought",
            title: " NFT Bought ",
            position: "topR",
        });
    };

    const isOwnedByUser = owner === account || owner === undefined;
    const formattedOwner = isOwnedByUser ? "you" : truncateStr(owner || "", 15);

    return (
        <div>
            {imageURI ? (
                <div>
                    <UpdateListing
                        onClose={hideModal()}
                        isVisible={showModal}
                        tokenId={tokenId}
                        nftAddress={nftAddress}
                        marketplaceAddress={marketplaceAddress}
                    />
                    <Card
                        title={tokenName}
                        description={tokenDescription}
                        onClick={handleCardClick}
                    >
                        <div className="p-3">
                            <div className="italic text-sm">owned by {formattedOwner}</div>
                            <div className="flex flex-col items-end gap-2">
                                <div># {tokenId}</div>
                                <img src={imageURI} alt="NFT" height="200" width="200" />

                                <div className="font-bold">
                                    {" "}
                                    {ethers.utils.formatUnits(price, "ether")} ETH{" "}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            ) : (
                <div>hii...</div>
            )}
        </div>
    );
}
