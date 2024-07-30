import React from "react";
import MainMenu from "./MainMenu";

type Props = {};

const Header = (props: Props) => {
    return <>
        <header>
            {/* header-top */}
            <div className="bg-zinc-800">
                <div className="container  mx-auto">
                    <p className="lg:hidden text-xs  text-white/70 text-center py-2 ">LIMITED OFFER: 30% OFF. Use
                        RABBIT30 at... <span className="text-white pl-4 ">23 :
                            15 : 00</span>
                    </p>
                    <p className="hidden lg:block text-sm  text-white/70 text-center py-2 ">LIMITED OFFER: 30% OFF. Use
                        RABBIT30 at
                        Checkout. <span className="text-white pl-4 ">23 :
                            15 : 00</span>
                    </p>
                </div>
            </div>
            {/* header-main */}
            <div className="lg:border-b  py-4">
                <div className="container-large">
                    <div className="flex flex-wrap lg:flex-nowrap justify-between">
                        <div className="order-1 flex space-x-4 items-center ">
                            <button className="absolute lg:hidden"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            </button>
                            {/* logo */}
                            <a href="#" className=" w-[167px] h-10">
                                <img srcSet="./assets/images/logo.png 2x" alt="#" className="w-[119px] lg:w-full lg:-ml-4" />
                            </a>
                        </div>
                        {/* search */}
                        <form className=" order-3 lg:order-2 border-t border-neutral-400 lg:border-none mt-4 pt-4 lg:mt-0 lg:pt-0  w-full lg:w-auto justify-center flex gap-2 ">
                            <input type="text" placeholder="Search" className="w-full pl-7 pr-1 py-3 border border-[#F4F4F4]  focus:outline-none focus:border-gray-300 lg:w-[400px] rounded-[100px] text-base text-[#C8C9CB] pl-6 py-1" />
                            <button className="border border-primary bg-primary rounded-full px-[14px] ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-white ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </button>
                        </form>
                        {/* account */}
                        <div className="order-2 lg:order-3 flex items-center gap-4 lg:gap-6  ">
                            <a href="#" className="text-sm lg:text-base text-[#46494F] ">Your Account</a> |
                            <button className="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                                <span className="absolute text-xs text-white border border-[#EB2606] bg-[#EB2606] w-4 h-4 rounded-full top-3">1</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* nav mobile */}
            <div className="hidden absolute top-0 w-[80%] h-full bg-[#F2F6F4] lg:hidden">
                <div className="container mx-auto">
                    <nav >
                        <ul className="*:text-[#46494F]">
                            <li><a >Shop All</a></li>
                            <li><a >Flower</a></li>
                            <li><a >Edibles</a></li>
                            <li><a >Concentrates</a></li>
                            <li><a >Mushrooms</a></li>
                            <li><a >Promotions/Bundles</a></li>
                            <li><a >Support</a></li>
                            <li><a >Rewards</a></li>
                            <li><a >Blog</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
            {/* nav web */}
            <div className="hidden lg:block">
                <div className="container mx-auto">
                    <MainMenu />
                </div>
            </div>
        </header>

    </>;
};

export default Header;
