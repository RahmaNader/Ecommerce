import Img4 from "@assets/HP_img4.svg";
import Img5 from "@assets/HP_img5.svg";

type categoryProps = {
  SectionName: string; // section name
};

const Category = ({ SectionName }: categoryProps) => {
  return (
    <>
    
        <div className="flex flex-col items-center my-16">
          <img src={Img4} alt="no des" />
          <p className="font-playball text-5xl leading-[60px] text-secondColor ">
            {SectionName}
          </p>
          <img src={Img5} alt="no des" />
        </div>
    </>
  );
};

export default Category;
