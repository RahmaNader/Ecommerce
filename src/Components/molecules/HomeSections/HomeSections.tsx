import { Card } from "@components/atoms";
import {Category }from "@components/atoms";
import Img1 from '@assets/HP_img1.svg'
import Img2 from '@assets/HP_img2.svg'
import Img3 from '@assets/HP_img3.svg'

type SectionsProps={
    SectionName:string;

}
const HomeSections =({SectionName}:SectionsProps) => {
    return <>
    <div className="">
    <Category SectionName={SectionName}></Category>
    <div className="flex flex-wrap justify-between">
     <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center">
     <Card src={Img1} alt="Image 1 " name={"Classic Jacket"} DisPrice="200EGP" NormalPrice="200EGP"></Card>
     </div>
     <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center">
     <Card src={Img2} alt="Image 2 " name={"Classic Jacket"} DisPrice="200EGP" NormalPrice="200EGP"></Card>
     </div>
     <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center ">
     <Card src={Img1} alt="Image 1 " name={"Classic Jacket"} DisPrice="200EGP" NormalPrice="200EGP"></Card>
     </div>
     <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center ">
     <Card src={Img3} alt="Image 3 " name={"Classic Jacket"} DisPrice="200EGP" NormalPrice="200EGP"></Card>
     </div>
    
     </div>
     

    </div>
  

    </>
  };
  
  export default HomeSections;