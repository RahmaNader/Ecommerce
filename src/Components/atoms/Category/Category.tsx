import Img4 from "@assets/HP_img4.svg";
import Img5 from "@assets/HP_img5.svg";

type categoryProps = {
  SectionName: string;
};

const Category = ({ SectionName }: categoryProps) => {
  return (
    <>
    
        <div className="flex flex-col items-center my-16">
          <img src={Img4} alt="Top of section image " />
          <p className="font-playball text-3xl md:text-5xl leading-[60px] text-secondColor ">
            {SectionName}
          </p>
          <img src={Img5} alt="down of section image" />
        </div>
    </>
  );
};

export default Category;
