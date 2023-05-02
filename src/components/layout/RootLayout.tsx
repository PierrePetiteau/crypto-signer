import { NavLayout } from "@/src/components/layout/NavLayout/NavLayout";
import Head from "next/head";
import { ReactNode } from "react";

type RootLayoutProps = {
  children: ReactNode;
};

export const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Crypto Signer</title>
        <meta name="description" content="Trailing strategy trading backtesting tool" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ff23ac" />
      </Head>
      <div className="flex h-screen prose max-w-none">
        <NavLayout>
          <main id={"page-container"} className="flex-grow max-h-screen overflow-y-auto">
            {children}
          </main>
        </NavLayout>
      </div>
    </>
  );
};
