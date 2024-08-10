import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from "swiper/types";

type Props = {
    data: string[]
}
const Album = ({ data }: Props) => {
    const swiperRef = useRef<SwiperType>();
    return (
        <>

            <div className="min-h-[100vh]">
                <div id="main-image" className=" px-10 relative w-full  border border-[#F4F4F4] shadow-lg rounded-[16px] lg:rounded-[24px] bg-[#FFFFFF] flex justify-center items-center ">
                    <Swiper
                        rewind={true}
                        pagination={{
                            type: 'fraction',
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                    >
                        {data.map((image) => (
                            <SwiperSlide key={image}>
                                <img src={image} className="px-5 py-14 object-cover" loading="lazy" alt="#" id="mainImage" />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <ArrowLeft
                        onClick={() => swiperRef?.current?.slidePrev()}
                        className="absolute top-1/2 lg:left-5 left-6 z-10 cursor-pointer"
                        size={34}
                    />

                    <ArrowRight
                        onClick={() => swiperRef?.current?.slideNext()}
                        className="absolute top-1/2 lg:right-7 right-6 z-10 cursor-pointer "
                        size={34}
                    />
                    {/* <button className="absolute right-6 bottom-6 p-[10px] border border-white bg-white rounded-full"><img src="./assets/icons/icons-pt.svg" alt="#" /></button> */}
                </div>
            </div>
        </>
    )
}

export default Album