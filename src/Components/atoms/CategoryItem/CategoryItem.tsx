interface CategoryItemProps {
  src: string;
  alt: string;
  onClick: () => void;
  label?: string;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
  src,
  alt,
  onClick,
  label = "",
}) => (
  <div onClick={onClick} className="relative w-full cursor-pointer">
    <img src={src} alt={alt} className="w-full h-full object-cover" />
    <p className="font-playball text-3xl text-wine text-center ">{label}</p>
  </div>
);
