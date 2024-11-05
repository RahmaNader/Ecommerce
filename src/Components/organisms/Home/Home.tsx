import { HomeSections } from "@components/molecules";
import { Button } from "@components/atoms";
import kids from "@assets/HP_kids.svg";
import women from "@assets/HP_women.svg";
import men from "@assets/HP_men.svg";

const Home = () => {

   const handleImageClick = (category: string) => {
      console.log(`Image clicked: ${category}`);
      // Add your custom logic here
    };

  return (
    <>
      {/* <div className="mb-9 md:w-[80%] border-b border-black mx-auto"/> */}
      
      <div className="flex justify-center my-10">
        
        <div>
          <img 
            src={kids}
            alt="kids-image"
            className="cursor-pointer hover:opacity-80 my-10"
            onClick={() => handleImageClick('kids')}/>
        </div>

        <div>
          <img 
            src={women}
            alt="women-image"
            className="cursor-pointer hover:opacity-80 my-10"
            onClick={() => handleImageClick('women')}/>
        </div>

        <div>
          <img
            src={men}
            alt="men-image"
            className="cursor-pointer hover:opacity-80 my-10"
            onClick={() => handleImageClick('men')}/>
        </div>

      </div>

      {/* <div className="my-9 md:w-[80%] border-b border-black mx-auto"/> */}

      <div>

        <HomeSections SectionName={"New Collection"}></HomeSections>

        <div className="flex justify-center mt-12">
          <Button label="View Collection"></Button>
        </div>

        <HomeSections SectionName={"Special Offers"}></HomeSections>

        <div className="flex justify-center mt-12">
          <Button label="View Collection"></Button>
        </div>

        <HomeSections SectionName={"Best Seller"}></HomeSections>

        <div className="flex justify-center mt-12">
          <Button label="View Collection"></Button>
        </div>

      </div>
    </>
  );
};

export default Home;
