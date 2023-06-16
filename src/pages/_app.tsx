import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ParallaxProvider } from "react-scroll-parallax";

import MobileMenu from "~/components/mobile/MobileMenu";
import MobileHamburger from "~/components/mobile/HamburgerMenu";
import Header from "~/components/Header";
import { useState } from "react";
import { api } from "~/utils/api";

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
  );
};

export default api.withTRPC(MyApp);
