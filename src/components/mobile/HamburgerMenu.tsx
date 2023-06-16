const MobileHamburger = (props: MobileMenuProps) => {
  const { mobileMenu } = props;

  return (
    <>
      <nav className="z-10 flex w-full items-center justify-end  bg-black lg:hidden">
        <div className="">
          <button
            className=" z-10 flex items-center p-3 text-[#fd3594ff]"
            onClick={mobileMenu}
          >
            <svg
              className="z-10 block h-8 w-8 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
};

interface MobileMenuProps {
  mobileMenu: () => void;
}
export default MobileHamburger;
