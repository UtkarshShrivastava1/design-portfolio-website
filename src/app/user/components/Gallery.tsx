"use client"
import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  EffectCoverflow,
  Navigation,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import axios from "axios";
import Image from "next/image";

const GallerySection = () => {
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);
  const swiperRef = useRef<import("swiper").Swiper | null>(null);
  interface GalleryImage {
    id: string;
    src: string;
    alt: string;
    title: string;
    description: string;
    category?: string;
  }
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (swiperRef.current) {
    console.log("Swiper is initialized:", swiperRef.current);
  }
}, [galleryImages]);


  const fetchGallery = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/gallery/");
      // console.log("Gallery : ",response.data.data);
      
      // Since your console shows the data is directly an array, not wrapped in gallery property
      if (response.data.gallery && Array.isArray(response.data.gallery)) {
        // Transform backend data to match component structure
        interface GalleryImage {
          id: string;
          src: string;
          alt: string;
          title: string;
          description: string;
          category?: string;
        }

        interface BackendGalleryItem {
          _id: string;
          imageURL: string;
          title: string;
          description: string;
          catogery?: string;
        }

        const transformedImages: GalleryImage[] = (response.data.gallery as BackendGalleryItem[]).map((item: BackendGalleryItem): GalleryImage => ({
          id: item._id,
          src: item.imageURL,
          alt: item.title,
          title: item.title,
          description: item.description,
          category: item.catogery // Note: keeping the typo from backend
        }));
        setGalleryImages(transformedImages);
      }
    } catch (error) {
      console.error("Error fetching gallery:", error);
      // Fallback to empty array or show error message
      setGalleryImages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 py-16 relative">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
            <p className="mt-2 text-gray-600">Loading gallery...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black py-16 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="relative text-center mb-16">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-black/5"></div>
          <h2 className="relative inline-block text-3xl md:text-4xl font-bold text-white">
            Work <span className="text-yellow-500">Gallery</span>
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="w-16 h-1 bg-yellow-500"></div>
          </div>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-sm sm:text-base">
            Explore my work Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, aperiam?
          </p>
        </div>

        {/* Swiper Carousel */}
        {galleryImages.length > 0 ? (
          <div className="relative">
            <Swiper
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              loop={true}
             onSwiper={(swiperInstance) => {
  swiperRef.current = swiperInstance;
}}

              coverflowEffect={{
                rotate: 20,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: true,
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              navigation={false}
              modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {galleryImages.map((image) => (
                <SwiperSlide
                  key={image.id}
                  style={{ width: "85%", maxWidth: "500px", height: "400px" }}
                >
                  <div
                    className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                    onClick={() => setActiveImage(image)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      // width={100}
                      // height={100}
                      className="w-full h-full object-cover transition duration-300 hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/500x400/cccccc/666666?text=Image+Not+Found";
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 sm:p-6">
                      <h3 className="text-yellow-400 font-semibold text-lg sm:text-xl mb-1">
                        {image.title}
                      </h3>
                      <p className="text-white/80 text-xs sm:text-sm">
                        {image.description}
                      </p>
                      {image.category && (
                        <span className="inline-block bg-yellow-500 text-black text-xs px-2 py-1 rounded-full mt-1">
                          {image.category}
                        </span>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Buttons */}
            <button
              className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 bg-yellow-500 hover:bg-yellow-600 shadow-lg rounded-full p-2 ml-2 sm:ml-4 transition-colors"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous Slide"
            >
              <svg
                className="w-6 h-6 text-black"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 bg-yellow-500 hover:bg-yellow-600 shadow-lg rounded-full p-2 mr-2 sm:mr-4 transition-colors"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next Slide"
            >
              <svg
                className="w-6 h-6 text-black"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No images found in gallery.</p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setActiveImage(null)}
          onKeyDown={(e) => e.key === "Escape" && setActiveImage(null)}
          tabIndex={0}
          aria-hidden="true"
        >
          <div className="max-w-4xl w-[90%] md:w-auto bg-white rounded-lg overflow-hidden shadow-lg relative">
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              className="w-full h-auto max-h-[90vh] object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
              <h3 className="text-yellow-400 font-semibold text-xl mb-2">
                {activeImage.title}
              </h3>
              <p className="text-white/90 text-sm mb-2">
                {activeImage.description}
              </p>
              {activeImage.category && (
                <span className="inline-block bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
                  {activeImage.category}
                </span>
              )}
            </div>
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-3 right-3 bg-yellow-500 hover:bg-yellow-600 rounded-full shadow p-2 transition-colors"
            >
              <svg
                className="w-6 h-6 text-black"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GallerySection;