"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Quote, Star, Briefcase } from "lucide-react";
import axios from "axios";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";

type Testimonial = {
  _id: string;
  userName: string;
  profilePictureURL: string;
  designation: string;
  headline: string;
  description: string;
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get("/api/testimonial");
      const data = response.data?.testimonials;
      console.log("Fetched testimonials:", data);
      if (Array.isArray(data)) {
        setTestimonials(data);
      } else {
        console.warn("Unexpected testimonial data format:", data);
        setTestimonials([]);
      }
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={`${
            i < rating ? "text-gray-400 fill-gray-400" : "text-white/30"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="bg-black py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            Client <span className="text-gray-400">Testimonials</span>
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="w-16 h-1 bg-white"></div>
          </div>
          <p className="mt-4 max-w-2xl mx-auto text-white/70">
            &quot;Hear what my clients say about transforming their brand
            through design.&quot;
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-400">Loading testimonials...</p>
        ) : Array.isArray(testimonials) && testimonials.length === 0 ? (
          <p className="text-center text-white/60">No testimonials found.</p>
        ) : (
          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView={1.1}
            loop
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            speed={600}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1.5,
              slideShadows: true,
            }}
            modules={[EffectCoverflow, Autoplay]}
            breakpoints={{
              768: { slidesPerView: 2 },
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide
                key={testimonial._id}
                style={{ width: "70%", maxWidth: "800px" }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-gray-400/20">
                  <div className="flex flex-col md:flex-row">
                    {/* Left Side */}
                    <div className="md:w-2/5 bg-white/10 p-6 flex flex-col items-center justify-center text-center">
                      <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-gray-400/40 shadow-lg mb-4">
                        <img
                          src={
                            testimonial.profilePictureURL || "/placeholder.jpg"
                          }
                          alt={testimonial.userName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-gray-400 text-lg font-bold mb-1">
                        {testimonial.userName}
                      </h3>
                      <div className="flex items-center justify-center gap-2 text-white/70 mb-2">
                        <Briefcase size={14} className="opacity-70" />
                        <p className="text-sm">{testimonial.designation}</p>
                      </div>
                      <StarRating rating={5} />
                    </div>

                    {/* Right Side */}
                    <div className="md:w-3/5 p-6 flex flex-col justify-center">
                      <Quote
                        size={32}
                        className="text-gray-400 mb-4 opacity-50"
                      />
                      <p className="text-xl font-semibold mb-4 leading-relaxed">
                        &quot;{testimonial.headline}&quot;
                      </p>
                      <p className="text-sm text-white/70 mb-6 leading-relaxed">
                        {testimonial.description}
                      </p>
                      <div className="h-1 w-16 bg-white rounded-full opacity-30"></div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Testimonials;
