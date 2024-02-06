import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import ModalContextProvider from "@/context/ModalContextProvider";
import AppflowContextProvider from "@/context/appflow";
import "@/i18next";


export default function App({ Component, pageProps }: AppProps) {
  return (
<RecoilRoot>
  <AppflowContextProvider>
    <ModalContextProvider>
        <div className="scrollbar-container">
          <div>
          <Toaster
              position="top-left"
              reverseOrder={false}
            />
          </div>
          <Component {...pageProps} />
        </div>
    </ModalContextProvider>
    </AppflowContextProvider>
</RecoilRoot>
  );
}
