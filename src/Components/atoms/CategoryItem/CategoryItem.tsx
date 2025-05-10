interface CategoryItemProps {
  src: string;
  alt: string;
  onClick: () => void;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
  src,
  alt,
  onClick,
}) => (
  <div onClick={onClick} className="relative w-full cursor-pointer">
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </div>
);
