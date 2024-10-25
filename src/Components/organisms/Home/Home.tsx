import { Footer, HomeSections } from "@components/molecules";
import { Button } from "@components/atoms";
import kids from '@assets/HP_kids.svg';
import women from '@assets/HP_women.svg';
import men from '@assets/HP_men.svg';

// # loop on NavItems 

const HomeSection = () => {
  return (
    <>

    
          <div className="flex justify-center ">
          <div>  <img src={kids} alt="" /></div>
          <div>  <img src={women} alt="" /></div>
          <div>  <img src={men} alt="" /></div>
            
      
         </div>
        

        <div className="  ">
        <HomeSections  SectionName={"New Collection"}></HomeSections>
           <div className="flex justify-center mt-12">
           <Button label="View Collection"></Button>
           </div>
        <HomeSections SectionName={"Special Offers"}></HomeSections>
        <div className="flex justify-center mt-12">
           <Button label="View Collection"  ></Button>
           </div>
        <HomeSections SectionName={"Best Seller"}></HomeSections>
        <div className="flex justify-center mt-12">
           <Button label="View Collection"  ></Button>
           </div>
         
        </div>

      
    </>
  );
};

export default HomeSection;
