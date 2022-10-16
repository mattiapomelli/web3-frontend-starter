import "../styles/globals.css";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import { configureChains, chain, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import { DefaultLayout } from "@layouts/default-layout";
import { ExtendedPage } from "@types";

import SEO from "../../next-seo.config";

import type { AppProps } from "next/app";

const { provider, webSocketProvider } = configureChains(
  [chain.mainnet],
  [publicProvider()],
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout =
    (Component as ExtendedPage).getLayout ||
    ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <WagmiConfig client={client}>
      <ThemeProvider>
        <DefaultSeo {...SEO} />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </WagmiConfig>
  );
}

export default MyApp;
