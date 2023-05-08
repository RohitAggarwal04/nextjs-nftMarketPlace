import { gql } from "@apollo/client";

const GET_ACTIVE_ITEMS = gql`
    {
        activeItems(first: 1) {
            id
            buyer
            owner
            price
            nftAddress
            tokenId
        }
    }
`;

export default GET_ACTIVE_ITEMS;
