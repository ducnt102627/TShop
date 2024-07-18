import React from "react";

type Props = {};

const Footer = (props: Props) => {
    return <>
        {/* -mt-[166.8px] lg:-mt-[235px] */}
        <footer className="bg-[#231F20]  z-0 w-full">
            <div className="container">
                <div className="grid grid-cols-12 gap-6 lg:gap-28 *:text-[#9D9EA2] *:text-sm *:lg:text-base *:leading-[150%] pt-">
                    {/* box1 */}
                    <div className="col-span-12 lg:col-span-4">
                        <img src="./assets/images/Logo-ft.png" alt="#" />
                        <p className=" pt-6">
                            #1 Canadian top rated online dispensary that meets the customers needs in every single medical
                            marijuana aspect. The team here at TopShelfBC is heavily involved in the Canadian cannabis
                            industry for over 15 years. We strive to provide the top quality products, service and care at
                            the lowest prices you’ll ever find.
                        </p>
                    </div>
                    {/* box2 */}
                    <div className="col-span-12 lg:col-span-8">
                        <div className="#">
                            <h3 className="text-[20px] font-medium leading-[30px] text-white">QUICK LINK</h3>
                            <div className="grid  grid-cols-2">
                                <ul className="pt-6 *:pb-4">
                                    <li><a href="#">Track Your Order</a></li>
                                    <li><a href="#">Shop All</a></li>
                                    <li><a href="#">Flower</a></li>
                                    <li><a href="#">Edibles</a></li>
                                    <li><a href="#">Concentrates</a></li>
                                    <li><a href="#">Refunds</a></li>
                                </ul>
                                <ul className="pt-6 *:pb-4">
                                    <li><a href="#">Mushrooms</a></li>
                                    <li><a href="#">Promotions / Bundles</a></li>
                                    <li><a href="#">Support</a></li>
                                    <li><a href="#">Edibles</a></li>
                                    <li><a href="#">Blog</a></li>
                                    <li><a href="#">Shipping</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-10">
                            <h3 className="text-[20px] font-medium leading-[30px] text-white">CONTACT US</h3>
                            <p className="pt-4">info@topshelfbc.cc</p>
                        </div>
                        <div className="mt-10">
                            <h3 className="text-[20px] font-medium leading-[30px] text-white">MORE</h3>
                            <div className="grid  grid-cols-2">
                                <ul className="pt-6 *:pb-4">
                                    <li><a href="#">Track Your Order</a></li>
                                    <li><a href="#">Shop All</a></li>
                                    <li><a href="#">Flower</a></li>
                                    <li><a href="#">Edibles</a></li>
                                    <li><a href="#">Concentrates</a></li>
                                    <li><a href="#">Refunds</a></li>
                                </ul>
                                <ul className="pt-6 *:pb-4">
                                    <li><a href="#">Mushrooms</a></li>
                                    <li><a href="#">Promotions / Bundles</a></li>
                                    <li><a href="#">Support</a></li>
                                    <li><a href="#">Edibles</a></li>
                                    <li><a href="#">Blog</a></li>
                                    <li><a href="#">Shipping</a></li>
                                </ul>
                                <img src="https://owen.cdn.vccloud.vn/static/version1717643526/frontend/Owen/owen2021/vi_VN/images/pay.png" alt="#" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <hr class="#"  > */}
                <div className="border-t border-[#46494F] mt-16 py-10 flex justify-between text-sm text-[#717378]">
                    <p className="#">© 2022 Top Shelf BC. All Rights Reserved. </p>
                    <div className="flex space-x-[33px]">
                        <span className="#">Out Of Stock</span>
                        <span className="#">Privacy Policy</span>
                        <span className="#">Terms &amp; Conditions</span>
                    </div>
                </div>
            </div>
        </footer>


    </>;
};

export default Footer;
