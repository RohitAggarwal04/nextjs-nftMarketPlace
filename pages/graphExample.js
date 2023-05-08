import { useQuery, gql } from "@apollo/client";

const GET_ACTIVE_ITEMS = gql`
    {
        activeItems(first: 5, where: { buyer: "0x00000000" }) {
            id
            buyer
            owner
            price
            nftAddress
            tokenId
        }
    }
`;
export default function GraphExample() {
    const { loading, error, data } = useQuery(GET_ACTIVE_ITEMS);
    console.log(data);
}
