import { useState } from "react";
import { Input, Modal, useNotification } from "web3uikit";

import { useWeb3Contract } from "react-moralis";
import nftMarketPlaceAbi from "../constants/NftMarketPlace.json";
import { ethers } from "ethers";

export default function updateListing({
    nftAddress,
    tokenId,
    isVisible,
    maketPlaceAddress,
    onClose,
}) {
    const [PriceToUpdateListing, setPriceToUpdateListing] = useState(0);
    const dispatch = useNotification();
    const handleUpdateSuccess = async (tx) => {
        await tx.wait(1);
        dispatch({
            type: "success",
            message: "Listing Updated",
            title: " Listing Updated - please refresh ",
            position: "topR",
        });
        onClose && onClose();
        setPriceToUpdateListing("0");
    };

    const { runContractFunction: updateListing } = useWeb3Contract({
        abi: nftMarketPlaceAbi,
        contractAddress: maketPlaceAddress,
        functionName: "updateListing",
        params: {
            nftAddress: nftAddress,
            tokenId: tokenId,
            newPrice: ethers.utils.parseEther(PriceToUpdateListing || "0"),
        },
    });

    return (
        <Modal
            isVisible={isVisible}
            onCancel={onClose}
            onCloseButtonPressed={onClose}
            onOk={() => {
                updateListing({
                    onError: (error) => {
                        console.log(error);
                    },
                    onSuccess: () => {
                        handleUpdateSuccess();
                    },
                });
            }}
        >
            <Input
                type="number"
                label="update listing price in L1 currency (eth)"
                name="New listing price"
                onChange={(event) => {
                    setPriceToUpdateListing(event.target.value);
                }}
            />
        </Modal>
    );
}
