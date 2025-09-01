import Image from "next/image";

export default function HeroImage() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Image
        src="/BANNERE_IMAGE.png" // Replace with your image path
        alt="Hero background"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority
        quality={100}
        className="brightness-90"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h1 className="text-white text-5xl md:text-7xl font-bold text-center px-4">
          Stunning Hero Section
        </h1>
      </div>
    </div>
  );
}
