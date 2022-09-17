import "../styles/globals.css";
import { SWRConfig } from "swr";
import type { AppProps } from "next/app";
import useUser from "@libs/client/useUser";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="w-full max-w-lg mx-auto">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
