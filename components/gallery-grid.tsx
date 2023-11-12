// components/GalleryGrid.tsx
import Image from "next/image";

interface GalleryGridProps {
  images: { src: string; alt: string }[];
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div key={index} className="overflow-hidden rounded-lg shadow-lg">
          <Image
            src={image.src}
            alt={image.alt}
            width={500}
            height={300}
            objectFit="cover"
          />
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
