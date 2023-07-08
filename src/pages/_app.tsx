import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ParallaxProvider } from "react-scroll-parallax";

import MobileMenu from "~/components/mobile/MobileMenu";
import MobileHamburger from "~/components/mobile/HamburgerMenu";
import Header from "~/components/Header";
import { useState } from "react";
import { api } from "~/utils/api";
import Head from "next/head";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };
  return (
    <>
      <Head>
        <meta
          name="theme-color"
          content="#151719"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#151719"
          media="(prefers-color-scheme: dark)"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="On The Minute" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ParallaxProvider>
          <SessionProvider session={session}>
            <MobileHamburger mobileMenu={handleMobileMenu} />
            {mobileMenu ? (
              <MobileMenu
                mobileMenu={handleMobileMenu}
                mobileMenuShow={mobileMenu}
              />
            ) : (
              <Header />
            )}
            <Component {...pageProps} />
          </SessionProvider>
        </ParallaxProvider>
      </LocalizationProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
