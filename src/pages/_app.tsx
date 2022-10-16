import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";

import { AuthGuard } from "@components/auth-guard";
import { DefaultLayout } from "@layouts/default-layout";
import { ExtendedPage } from "@types";
import { AuthProvider } from "contexts/auth-provider";

import SEO from "../../next-seo.config";

import type { AppProps } from "next/app";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout =
    (Component as ExtendedPage).getLayout ||
    ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <DefaultSeo {...SEO} />
          {getLayout(
            <AuthGuard auth={(Component as ExtendedPage).auth}>
              <Component {...pageProps} />
            </AuthGuard>,
          )}
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
