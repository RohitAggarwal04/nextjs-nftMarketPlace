import { MoralisProvider } from "react-moralis";
import Header from "../components/header.js";
import "../styles/globals.css";
import Head from "next/head";
import { NotificationProvider } from "web3uikit";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://api.studio.thegraph.com/query/42571/nftmarketplace/v0.0.3",
});

function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>NFT MarketPlace</title>
                <meta name="description" content="NFT MarketPlace" />
            </Head>
            <MoralisProvider initializeOnMount={false}>
                <ApolloProvider client={client}>
                    <NotificationProvider>
                        <Header></Header>
                        <Component {...pageProps} />
                    </NotificationProvider>
                </ApolloProvider>
            </MoralisProvider>
        </>
    );
}
export default App;
