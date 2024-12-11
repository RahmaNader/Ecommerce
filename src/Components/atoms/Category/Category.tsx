import Img4 from "@assets/HP_img4.svg";
import Img5 from "@assets/HP_img5.svg";
import { categoryProps } from "@types";

interface ModifiedCategoryProps extends categoryProps {
  mdMyValue?: string; 
}

const Category = ({ SectionName, mdMyValue }: ModifiedCategoryProps) => {
  return (
    <>
      <div className={`flex flex-col items-center my-8 ${mdMyValue || "md:my-16"}`}>
        <img src={Img4} alt="Top of section image " />
        <p className="font-playball text-3xl md:text-5xl leading-[60px] text-wine ">
          {SectionName}
        </p>
        <img src={Img5} alt="Bottom of section image" />
      </div>
    </>
  );
};

export default Category;
