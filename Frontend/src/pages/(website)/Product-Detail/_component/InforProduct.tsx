import { IProduct } from '@/interfaces/product';
import { getCategory } from '@/services/category';
import { formatCurrency, getProductById } from '@/services/product';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
type Props = {
    data: IProduct
}
const InforProduct = ({ data }: Props) => {
    console.log(data)

    return (
        <>
            <div className="">
                <h3 className="text-[#05422C] text-xl lg:text-[24px] font-medium lg:font-semibold ">{data?.name}</h3>
                <p className="text-[#05422C]/60 font-medium text-base ">Danh mục: {(data?.category as any).name}</p>

                <div className="flex gap-2 lg:gap-4 py-3 lg:py-4">
                    <span className="text-xs leading-[150%] text-[#05422C] bg-[#F2F6F4] px-4 py-[8.5px] rounded-lg">Indica</span>
                    <span className="text-xs leading-[150%] text-[#05422C] bg-[#F2F6F4] px-4 py-[8.5px] rounded-lg">Sativa
                        100%</span>
                </div>
                <div className="flex justify-between">
                    <p className="flex items-center gap-2 lg:gap-3 text-[#EB2606] text-base lg:text-xl font-medium">
                        <span className="text-[#9D9EA2] text-xl lg:text-base line-through leading-[150%] font-normal">{formatCurrency(data?.price)}</span>
                        {formatCurrency(data?.price - data?.discount)}
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
            </div>
        </>
    )
}

export default InforProduct