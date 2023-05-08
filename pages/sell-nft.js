import { useMoralis, useWeb3Contract } from "react-moralis";
import { Form, useNotification } from "web3uikit";
import nftAbi from "../constants/basicNft.json";
import nftMarketPlaceAbi from "../constants/NftMarketPlace.json";
import networkMapping from "../constants/networkMapping.json";

export default function Home() {
    const { chainId } = useMoralis();
    const chainString = chainId ? parseInt(chainId).toString() : "31337";
    const { runContractFunction } = useWeb3Contract();
    const dispatch = useNotification();
    async function approveAndList(data) {
        const nftAddress = data.data[0].inputResult;
        const tokenId = data.data[1].inputResult;
        const price = ethers.utils.parseUnits(data.data[2].inputResult, "ether").toString();
        const marketPlaceAddress = networkMapping[chainString].nftMarketPlace[0];

        const approveOptions = {
            abi: nftAbi,
            contractAddress: nftAddress,
            functionName: approve,
            params: {
                to: marketPlaceAddress,
                tokenId: tokenId,
            },
        };

        await runContractFunction({
            params: approveOptions,
            onSuccess: () => handleApproveSuccess(nftAddress, tokenId, price),
            onError: (error) => console.log(error),
        });
    }
    async function handleApproveSuccess(nftAddress, tokenId, price) {
        const listOptions = {
            contractAddress: marketPlaceAddress,
            abi: nftMarketPlaceAbi,
            functionName: "listNFT",
            params: {
                nftAddress: nftAddress,
                tokenId: tokenId,
                price: price,
            },
        };
        await runContractFunction({
            params: listOptions,
            onSuccess: () => handleListSuccess(),
            onError: (error) => console.log(error),
        });
    }
    async function handleListSuccess() {
        dispatch({
            type: "success",
            message: "NFT Listed Successfully",
            title: " NFT Listed Successfully ",
            position: "topR",
        });
    }
    return (
        <div>
            <Form
                onSubmit={approveAndList}
                data={[
                    {
                        name: "NFT Address",
                        type: "text",
                        inputWidth: "50%",
                        value: "0x00",
                        key: "nftAddress",
                    },
                    {
                        name: "token Id",
                        type: "number",
                        inputWidth: "50%",
                        value: "",
                        key: "tokenId",
                    },
                    {
                        name: "Price (in ETH)",
                        type: "number",
                        inputWidth: "50%",
                        value: "",
                        key: "price",
                    },
                ]}
                title="Sell Your NFT"
                id="Main Form"
            />
            <div>Withdraw {proceeds} proceeds</div>
            {proceeds != "0" ? (
                <Button
                    onClick={() => {
                        runContractFunction({
                            params: {
                                abi: nftMarketplaceAbi,
                                contractAddress: marketplaceAddress,
                                functionName: "withdrawProceeds",
                                params: {},
                            },
                            onError: (error) => console.log(error),
                            onSuccess: handleWithdrawSuccess,
                        });
                    }}
                    text="Withdraw"
                    type="button"
                />
            ) : (
                <div>No proceeds detected</div>
            )}
        </div>
    );
}
