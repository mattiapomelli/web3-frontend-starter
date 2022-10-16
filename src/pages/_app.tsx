import "../styles/globals.css";
import { useAtom } from "jotai";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import { configureChains, chain, createClient, WagmiConfig } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { ConnectModal } from "@components/connect-modal";
import { connectModalAtom } from "@hooks/use-connect-modal";
import { DefaultLayout } from "@layouts/default-layout";
import { ExtendedPage } from "@types";

import SEO from "../../next-seo.config";

import type { AppProps } from "next/app";

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
    publicProvider(),
  ],
);

const connectors = [
  new InjectedConnector({
    chains,
  }),
  new WalletConnectConnector({
    chains,
    options: {
      rpc: {
        [chain.mainnet
          .id]: `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
      },
    },
  }),
];

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [open, setOpen] = useAtom(connectModalAtom);

  const getLayout =
    (Component as ExtendedPage).getLayout ||
    ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <WagmiConfig client={client}>
      <ThemeProvider>
        <DefaultSeo {...SEO} />
        {getLayout(<Component {...pageProps} />)}
        <ConnectModal open={open} onClose={() => setOpen(false)} />
      </ThemeProvider>
    </WagmiConfig>
  );
}

export default MyApp;
