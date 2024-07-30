import React from 'react'

const ProductDetail = () => {
    return (
        <>
            <section className="mt-6 lg:mt-10">
                <div className="container-large">
                    <div className="grid lg:grid-cols-2 lg:gap-8">
                        {/* box-img */}
                        <div className="lg:pr-16 mb-10 lg:mb-0">
                            <div id="main-image" className=" relative w-full  border border-[#F4F4F4] rounded-[16px] lg:rounded-[24px] bg-[#F4F4F4] flex justify-center items-center ">
                                <img src="./assets/images/products/product1.png" className="w-[240px] h-[240px] lg:w-[400px] lg:h-[400px] object-cover  m-[51px] lg:mx-[86.5px] lg:my-[60px]" alt="#" id="mainImage" />
                                <button className="absolute right-6 bottom-6 p-[10px] border border-white bg-white rounded-full"><img src="./assets/icons/icons-pt.svg" alt="#" /></button>
                            </div>
                            <div className="w-full flex gap-4 pt-4 justify-center" id="hover-images">
                                <div className="border-[#F4F4F4] rounded-[8px]  p-2 bg-[#F4F4F4]">
                                    <img src="./assets/images/products/product2.png" alt="#" className="w-[40px] h-[40px] shrink-0 thumbnail" id="thumbnail-image" />
                                </div>
                                <div className="border-[#F4F4F4] rounded-[8px]  p-2 bg-[#F4F4F4]">
                                    <img src="./assets/images/products/product3.png" alt="#" className="w-[40px] h-[40px] shrink-0 thumbnail" id="thumbnail-image" />
                                </div>
                                <div className="border-[#F4F4F4] rounded-[8px]  p-2 bg-[#F4F4F4]">
                                    <img src="./assets/images/products/product4.png" alt="#" className="w-[40px] h-[40px] shrink-0 thumbnail" id="thumbnail-image" />
                                </div>
                                <div className="border-[#F4F4F4] rounded-[8px]  p-2 bg-[#F4F4F4]">
                                    <img src="./assets/images/products/product1.png" alt="#" className="w-[40px] h-[40px] shrink-0 thumbnail" id="thumbnail-image" />
                                </div>
                            </div>
                        </div>
                        {/* box-right */}
                        <div className="#">
                            <p className="text-[#9D9EA2] text-xs lg:text-sm leading-[150%] tracking-[2px] lg:tracking-[4px]">
                                CONCENTRATES</p>
                            <h3 className="text-[#060709] text-xl lg:text-[32px] font-medium lg:font-semibold leading-[150%]  lg:-tracking-[1.5px] py-3 lg:py-4">
                                Mix And Match
                                Shatter/Budder <br className=" lg:hidden" /> 28g <br className="hidden lg:block" />
                                (4 X 7G)</h3>
                            <div className="flex gap-2 lg:gap-4 py-3 lg:py-4">
                                <span className="text-xs leading-[150%] text-[#05422C] bg-[#F2F6F4] px-4 py-[8.5px] rounded-lg">Indica</span>
                                <span className="text-xs leading-[150%] text-[#05422C] bg-[#F2F6F4] px-4 py-[8.5px] rounded-lg">Sativa
                                    100%</span>
                            </div>
                            <div className="flex justify-between">
                                <p className="flex items-center gap-2 lg:gap-3 text-[#EB2606] text-base lg:text-xl font-medium">
                                    <span className="text-[#9D9EA2] text-sm lg:text-base line-through leading-[150%] font-normal">$200.00</span>$120.00
                                </p>
                                <div className="flex text-sm lg:text-base text-[#060709]">
                                    <p className="flex items-center "><i className="fa-solid fa-star text-[#F2BC1B]" /> 4.6/5</p>
                                    <span className="text-[#C8C9CB] px-3 lg:px-4">|</span>
                                    <p className="flex items-center gap-2">135 <span className="text-xs lg:text-sm text-[#9D9EA2]">Reviews</span></p>
                                </div>
                            </div>
                            <div className="mt-5 py-5 px-5 lg:px-6 border border-[#F4F4F4] rounded-xl ">
                                <div className="flex  gap-4">
                                    <div className="w-8"><img src="./assets/icons/effect.svg" alt="#" /></div>
                                    <div className="#">
                                        <p className="text-[#717378] text-xs leading-[150%] font-light tracking-[1px]">EFFECTS</p>
                                        <p className="text-[#060709] text-sm leading-[150%] pt-2">Calming, Creative, Happy,
                                            Relaxing,
                                            Sleepy, Uplifting
                                        </p>
                                    </div>
                                </div>
                                <div className="flex  gap-4 py-5">
                                    <div className="w-8"><img src="./assets/icons/may.svg" alt="#" className="w-full" /></div>
                                    <div className="#">
                                        <p className="text-[#717378] text-xs leading-[150%] font-light tracking-[1px]">MAY RELIEVE
                                        </p>
                                        <p className="text-[#060709] text-sm leading-[150%] pt-2">Anxiety, Arthritis, Chronic Pain,
                                            Depression, Fatigue, Inflammation, Insomnia, Irregular Bowel Movements, Migraines,
                                            Mood Swings
                                        </p>
                                    </div>
                                </div>
                                <div className="flex  gap-4">
                                    <div className="#"><img src="./assets/icons/aromas.svg" alt="#" /></div>
                                    <div className="#">
                                        <p className="text-[#717378] text-xs leading-[150%] font-light tracking-[1px]">AROMAS</p>
                                        <p className="text-[#060709] text-sm leading-[150%] pt-2">Chemical, Citrus, Earthy, Pungent,
                                            Sour
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-[#717378] mt-5 text-xs font-light uppercase leading-[150%] tracking-[1px]">
                                DESCRIPTION</p>
                            <p className="text-[#46494F] text-sm leading-[150%] pt-3 border-b border-[#F4F4F4] pb-6">Jungle Diamonds
                                is a slightly indica
                                dominant
                                hybrid strain (60%
                                indica/40% sativa)
                                created through crossing the infamous Slurricane X Gorilla Glue #4 strains.</p>
                            <div className="lg:flex lg:justify-between lg:gap-6 mb-6">
                                <div className="mb-6 lg:mb-0">
                                    <p className="text-[#717378] text-xs font-light uppercase leading-[150%] tracking-[1px]">WEIGHT
                                    </p>
                                    <ul className="mt-3 flex space-x-4">
                                        <li><a href="#" className="text-[#060709] text-xs leading-[150%] px-[14px] py-[8.5px] bg-[#F3FBF4] border border-primary rounded-[4px]">28g</a>
                                        </li>
                                        <li><a href="#" className="text-[#060709] text-xs leading-[150%] px-[14px] py-[8.5px] bg-[#F4F4F4] border border-[#F4F4F4] rounded-[4px]">1/2lb</a>
                                        </li>
                                        <li><a href="#" className="text-[#060709] text-xs leading-[150%] px-[14px] py-[8.5px] bg-[#F4F4F4] border border-[#F4F4F4] rounded-[4px]">1/4lb</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="#">
                                    <p className="text-[#717378] text-xs font-light uppercase leading-[150%] tracking-[1px]">Add
                                        Integra Pack
                                    </p>
                                    <div className="flex justify-between  gap-8 mt-3">
                                        <div className="flex items-center">
                                            <input id="default-checkbox" type="checkbox" className="w-[22px] h-[22px] rounded-[6px] focus:ring-primary" />
                                            <label htmlFor="default-checkbox">4g (+$2.00)</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input id="default-checkbox" type="checkbox" className="w-[22px] h-[22px] rounded-[6px] focus:ring-primary" />
                                            <label htmlFor="default-checkbox">8g (+$3.00)</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end attribute */}
                            <span className="text-sm leading-[150%] px-[14px] py-[7px] border border-[#FEF8E8] bg-[#FEF8E8] text-[#46494F] rounded-full">Purchase
                                this product now and earn 80
                                Points!</span>
                            {/* productDT info */}
                            <div className="border border-[F4F4F4] p-5 lg:p-6 rounded-2xl mt-5">
                                <div className="flex justify-between">
                                    <p className="text-[46494F] text-sm leading-[150%] flex items-center gap-4">Khalifa Kush (AAAA)
                                        <span className="text-[#9D9EA2]">2x</span>
                                    </p>
                                    <p className="text-[#060709] text-sm">$120.00</p>
                                </div>
                                <div className="flex justify-between mt-3 mb-6">
                                    <p className="text-[46494F] text-sm leading-[150%] flex items-center gap-4">Add Integra Pack -
                                        4g
                                    </p>
                                    <p className="text-[#060709] text-sm">$20.00</p>
                                </div>
                                {/* addtocart */}
                                <div className="lg:flex justify-between border-t border-b border-[#F4F4F4] py-5 mb-6">
                                    <div className="flex items-center border border-[#F4F4F4] rounded-[10px] py-[10px] pl-[16px] pr-6 mt-4">
                                        <form className="flex  items-center text-xs">
                                            <button className="w-[36px] h-[36px] flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                            </svg>
                                            </button>
                                            <input type="text" className="bg-[#F4F4F4] w-[36px] h-[36px] flex justify-center" defaultValue={4} />
                                            <button className="w-[36px] h-[36px]     flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                            </button>
                                        </form>
                                        <p className="text-[#F4F4F4] text-xl pl-4">| <span className="text-xs text-primary leading-[150%] pl-4">In
                                            Stock</span></p>
                                    </div>
                                    <a href="#" className="btn-default py-4 px-8">Add to Cart <span className="px-4">|</span>
                                        $242.00</a>
                                </div>
                                {/* end addtocart */}
                                <div className="flex items-center gap-2 pb-3 ">
                                    <img src="./assets/icons/checked.svg" alt="#" />
                                    <p className="text-sm text-[#46494F] leading-[150%]">Free Xpress Shipping on orders over
                                        <span className="text-[#F2BC1B]">$149</span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 pb-3 ">
                                    <img src="./assets/icons/checked.svg" alt="#" />
                                    <p className="text-sm text-[#46494F] leading-[150%]">Order before 12:00pm for same day dispatch
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 pb-3 ">
                                    <img src="./assets/icons/checked.svg" alt="#" />
                                    <p className="text-sm text-[#46494F] leading-[150%]">Order before 12:00pm for same day dispatch
                                    </p>
                                </div>
                            </div>
                            {/* end info */}
                            <div className="lg:flex justify-between lg:gap-6 pt-6">
                                <div className="flex items-center">
                                    <p className="text-[#717378] text-xs font-light leading-[150%] tracking-[1px] w-[92px]">SKU</p>
                                    <span className="px-4 text-[#717378]">:</span>
                                    <p className="text-[#060709] text-sm font-normal">N/A</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-[#717378] text-xs font-light leading-[150%] tracking-[1px] w-[92px]">
                                        Categories</p>
                                    <span className="px-4 text-[#717378]">:</span>
                                    <p className="text-primary text-sm font-normal pr-[51px] "> AAAA Weed, Indica</p>
                                </div>
                            </div>
                            {/*  */}
                            <div className="border-t border-[#C8C9CB] mt-10">
                                <div className="tabs overflow-hidden pt-10  pb-6 border-b border-[#F4F4F4]">
                                    <ul className="grid lg:grid-cols-3 gap-8 text-[#46494F]">
                                        <li><a href="#" className="tab-title-active col-span-1 ">Description</a></li>
                                        <li><a href="#" className="tab-title flex items-center">Reviews <span className="text-[#9D9EA2] text-xs">(350)</span></a>
                                        </li>
                                        <li><a href="#" className="tab-title">Refer a Friend </a></li>
                                    </ul>
                                </div>
                                <p className="text-[#46494F] text-sm pt-6">
                                    Jungle Diamonds is a slightly indica dominant hybrid strain (60% indica/40% sativa) created
                                    through crossing the infamous Slurricane X Gorilla Glue #4 strains. Named for its gorgeous
                                    appearance and breeder, Jungle Diamonds is a favorite of indica and hybrid lovers alike
                                    thanks to its delicious taste and tingly, arousing high. Jungle Diamonds buds have sparkling
                                    oversized spade-shaped olive green nugs with vivid amber hairs and a thick frosty blanket of
                                    glittering tiny blue-tinted white crystal trichomes. As you pull apart each sticky little
                                    nugget, aromas of spicy mocha coffee and fruity herbs are released.
                                </p>
                                <p className="text-[#46494F] text-sm pt-6">
                                    The flavor is of sweet chocolate with hints of fresh ripe berries to it, too. The Jungle
                                    Diamonds high is just as delicious, with happy effects that will boost the spirits and kick
                                    negative thoughts and moods to the curb. You’ll feel a tingly sense in your body from start
                                    to finish that serves to remove any aches or pains while leaving you pretty aroused at
                                    times. This is accompanied by a blissfully unfocused heady lift that leaves your head in the
                                    clouds without causing sedation. With these effects and its pretty high 17-24% THC level,
                                    Jungle Diamonds is ideal for experienced patients with chronic pain, cramps or muscle spasms
                                    and appetite loss or nausea.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default ProductDetail