import React from "react";
import "./AboutScreen.css";
import aboutSectionHero from "../../../assets/lady-good-mood-looks-into-camera-beige-background-beautiful-smiling-woman-with-big-bright-lips-red-beret-earrings-long-coat-posing_197531-18681.svg";
import AboutImage1 from "../../../assets/AboutImage1.svg";
import AboutImage2 from "../../../assets/AboutImage2.svg";
import AboutImage3 from "../../../assets/AboutImage3.svg";
import TwitterIcon from "../../../assets/Twitter-icon.svg";
import InstgramIcon from "../../../assets/Instgram-icon.svg";
import LinkedInIcon from "../../../assets/LinkedIn-icon.svg";
import DeliveryIcon from "../../../assets/icon-delivery.svg";
import CustomerServiceIcon from "../../../assets/Icon-Customer service.svg";
import SecureIcon from "../../../assets/Icon-secure.svg";


const AboutScreen: React.FC = () => {
  return (
    <div className="bg-customBeige min-h-screen">
      <div className="bg-customBeige min-h-screen flex-col xl:w-[85%] lg:w-full mx-auto">
        <div className="bg-customBeige lg:py-20 lg:px-28 md:px-6 md:py-12 sm:px-6 sm:py-6 xs:px-6 xs:py-6 ">
          <div className="flex justify-between items-center sm:flex-col xs:flex-col lg:flex-row">
            <div className="lg:w-1/2 md:w-full">
              <h1 className="text-5xl mb-10 text-wine font-playfair sm:w-full xs:w-full font-bold">
                Our Story
              </h1>
              <p className="text-md mb-5 text-wine font-Poppins">
                Launched in 2015, Exclusive is South Asia’s premier online
                shopping makterplace with an active presense in Bangladesh.
                Supported by wide range of tailored marketing, data and service
                solutions, Exclusive has 10,500 sallers and 300 brands and
                serves 3 millioons customers across the region.{" "}
              </p>
              <p className="text-md text-wine font-Poppins">
                Exclusive has more than 1 Million products to offer, growing at
                a very fast. Exclusive offers a diverse assotment in categories
                ranging from consumer.
              </p>
            </div>
            <div className="lg:w-1/2 md:w-full sm:w-full xs:w-full xl:px-8 lg:px-4 md:px-5">
              <img
                src={aboutSectionHero}
                className="float-right sm:py-6 mx-auto sm:w-full xs:w-full xs:py-6"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="flex lg:w-[95%] xl:w-[85%] md:w-[95%] mx-auto justify-between py-20 gap-5 md:flex-col sm:flex-col xs:flex-col lg:flex-row">
          <div className="border border-skin p-10 rounded-md md:w-5/6 sm:w-[95%] xs:w-[95%] mx-auto parent">
            <div className="flex justify-center items-center child1">
              <div className="w-20 h-20 bg-[#72101375] rounded-full flex justify-center items-center grandChild1">
                <div className="w-14 h-14 bg-wine rounded-full flex justify-center items-center grandChild2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="32"
                    viewBox="0 0 35 32"
                    fill="none"
                  >
                    <path
                      className="path"
                      d="M31.6416 1H24.9883L25.8216 9.33333C25.8216 9.33333 27.4883 11 29.9883 11C31.3006 11.0017 32.5684 10.524 33.5533 9.65667C33.6574 9.55938 33.735 9.43716 33.7787 9.30156C33.8224 9.16596 33.8309 9.02145 33.8033 8.88167L32.6266 1.83333C32.5873 1.60049 32.4668 1.38909 32.2865 1.23656C32.1062 1.08404 31.8778 1.00024 31.6416 1V1Z"
                      stroke="#F4EEE8"
                      stroke-width="2"
                    />
                    <path
                      className="path"
                      d="M24.9883 1L25.8216 9.33333C25.8216 9.33333 24.1549 11 21.6549 11C19.1549 11 17.4883 9.33333 17.4883 9.33333V1H24.9883Z"
                      stroke="#F4EEE8"
                      stroke-width="2"
                    />
                    <path
                      className="path"
                      d="M17.4896 1V9.33333C17.4896 9.33333 15.8229 11 13.3229 11C10.8229 11 9.15625 9.33333 9.15625 9.33333L9.98958 1H17.4896Z"
                      stroke="#F4EEE8"
                      stroke-width="2"
                    />
                    <path
                      className="path"
                      d="M9.98925 1H3.33758C3.10091 0.999912 2.87187 1.08377 2.69121 1.23666C2.51054 1.38955 2.38997 1.60157 2.35091 1.835L1.17591 8.88333C1.14845 9.02311 1.15699 9.16758 1.20072 9.30315C1.24445 9.43873 1.32195 9.56095 1.42591 9.65833C1.97258 10.1417 3.19425 11.0017 4.98925 11.0017C7.48925 11.0017 9.15591 9.335 9.15591 9.335L9.98925 1.00167V1Z"
                      stroke="#F4EEE8"
                      stroke-width="2"
                    />
                    <path
                      className="path"
                      d="M2.5 11V27.6667C2.5 28.5507 2.85119 29.3986 3.47631 30.0237C4.10143 30.6488 4.94928 31 5.83333 31H29.1667C30.0507 31 30.8986 30.6488 31.5237 30.0237C32.1488 29.3986 32.5 28.5507 32.5 27.6667V11"
                      stroke="#F4EEE8"
                      stroke-width="2"
                    />
                    <path
                      className="path"
                      d="M22.2227 30.9993V20.9993C22.2227 20.1153 21.8715 19.2674 21.2463 18.6423C20.6212 18.0172 19.7734 17.666 18.8893 17.666H15.556C14.6719 17.666 13.8241 18.0172 13.199 18.6423C12.5738 19.2674 12.2227 20.1153 12.2227 20.9993V30.9993"
                      stroke="#F4EEE8"
                      stroke-width="2"
                      stroke-miterlimit="16"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="child2">
              <h3 className="text-center mt-4 font-Poppins text-wine font-bold text-3xl">
                10.5K
              </h3>
              <h4 className="text-center mt-3 font-Poppins text-skin">
                Sallers active our site
              </h4>
            </div>
          </div>
          <div className="border border-skin p-10 rounded-md md:w-5/6 sm:w-[95%] xs:w-[95%] mx-auto parent">
            <div className="flex justify-center items-center child1">
              <div className="w-20 h-20 bg-[#72101375] rounded-full flex justify-center items-center grandChild1">
                <div className="w-14 h-14 bg-wine rounded-full flex justify-center items-center grandChild2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <path
                      className="path"
                      d="M19.9993 37.272C29.5388 37.272 37.272 29.5388 37.272 19.9993C37.272 10.4598 29.5388 2.72656 19.9993 2.72656C10.4598 2.72656 2.72656 10.4598 2.72656 19.9993C2.72656 29.5388 10.4598 37.272 19.9993 37.272Z"
                      stroke="#F4EEE8"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      className="path"
                      d="M25.0923 14.5463C24.763 13.9751 24.2844 13.5042 23.7079 13.184C23.1314 12.8639 22.4787 12.7064 21.8196 12.7286H18.1832C17.2188 12.7286 16.2939 13.1116 15.6119 13.7934C14.93 14.4751 14.5469 15.3998 14.5469 16.364C14.5469 17.3281 14.93 18.2528 15.6119 18.9345C16.2939 19.6163 17.2188 19.9993 18.1832 19.9993H21.8196C22.784 19.9993 23.7089 20.3823 24.3909 21.0641C25.0728 21.7458 25.456 22.6705 25.456 23.6346C25.456 24.5988 25.0728 25.5234 24.3909 26.2052C23.7089 26.8869 22.784 27.27 21.8196 27.27H18.1832C17.5241 27.2921 16.8714 27.1347 16.2949 26.8145C15.7184 26.4944 15.2399 26.0235 14.9105 25.4523"
                      stroke="#F4EEE8"
                      stroke-width="2.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      className="path"
                      d="M20 8.18164V12.121M20 27.8786V31.818"
                      stroke="#F4EEE8"
                      stroke-width="2.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="child2">
              <h3 className="text-center mt-4 font-Poppins text-wine font-bold text-3xl">
                33k
              </h3>
              <h4 className="text-center mt-3 font-Poppins  text-skin">
                Monthly Produduct Sale
              </h4>
            </div>
          </div>
          <div className="border border-skin p-10 rounded-md md:w-5/6 sm:w-[95%] xs:w-[95%] mx-auto parent">
            <div className="flex justify-center items-center child1">
              <div className="w-20 h-20 bg-[#72101375] rounded-full flex justify-center items-center grandChild1">
                <div className="w-14 h-14 bg-wine rounded-full flex justify-center items-center grandChild2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <path
                      className="path"
                      d="M11.668 11.6672V8.33387C11.668 7.36867 11.9474 6.42411 12.4724 5.61419C12.9974 4.80428 13.7457 4.16364 14.6268 3.76961C15.5079 3.37558 16.4842 3.24499 17.4379 3.39362C18.3916 3.54225 19.2819 3.96374 20.0013 4.60721C20.7207 3.96374 21.611 3.54225 22.5647 3.39362C23.5184 3.24499 24.4947 3.37558 25.3758 3.76961C26.2569 4.16364 27.0052 4.80428 27.5302 5.61419C28.0552 6.42411 28.3346 7.36867 28.3346 8.33387V11.6672H30.8346C31.4977 11.6672 32.1336 11.9306 32.6024 12.3994C33.0712 12.8683 33.3346 13.5042 33.3346 14.1672V30.8422C33.3346 32.3871 32.7209 33.8687 31.6285 34.9611C30.5361 36.0535 29.0545 36.6672 27.5096 36.6672H13.3346C11.5665 36.6672 9.87083 35.9648 8.62059 34.7146C7.37035 33.4643 6.66797 31.7687 6.66797 30.0005V14.1672C6.66797 13.5042 6.93136 12.8683 7.4002 12.3994C7.86904 11.9306 8.50493 11.6672 9.16797 11.6672H11.668ZM22.7263 34.1672C22.0464 33.1919 21.6828 32.0311 21.6846 30.8422V14.1672H9.16797V30.0005C9.16797 30.5477 9.27574 31.0895 9.48514 31.5951C9.69453 32.1006 10.0014 32.5599 10.3884 32.9468C10.7753 33.3337 11.2346 33.6406 11.7401 33.85C12.2456 34.0594 12.7875 34.1672 13.3346 34.1672H22.7263ZM19.168 11.6672V8.33387C19.168 7.67083 18.9046 7.03495 18.4357 6.56611C17.9669 6.09727 17.331 5.83387 16.668 5.83387C16.0049 5.83387 15.369 6.09727 14.9002 6.56611C14.4314 7.03495 14.168 7.67083 14.168 8.33387V11.6672H19.168ZM21.668 11.6672H25.8346V8.33387C25.8347 7.81927 25.6759 7.31718 25.38 6.89615C25.0841 6.47512 24.6655 6.15566 24.1813 5.98137C23.6971 5.80709 23.1709 5.78648 22.6746 5.92235C22.1782 6.05822 21.7359 6.34395 21.408 6.74054C21.5763 7.24054 21.668 7.77721 21.668 8.33387V11.6672ZM24.1846 30.8422C24.1846 31.7241 24.5349 32.5698 25.1585 33.1933C25.7821 33.8169 26.6278 34.1672 27.5096 34.1672C28.3915 34.1672 29.2372 33.8169 29.8608 33.1933C30.4843 32.5698 30.8346 31.7241 30.8346 30.8422V14.1672H24.1846V30.8422Z"
                      fill="#F4EEE8"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="child2">
              <h3 className="text-center mt-4 font-Poppins text-wine font-bold text-3xl">
                45.5k
              </h3>
              <h4 className="text-center mt-3 font-Poppins text-skin">
                Customer active in our site
              </h4>
            </div>
          </div>
          <div className="border border-skin p-10 rounded-md md:w-5/6 sm:w-[95%] xs:w-[95%] mx-auto parent">
            <div className="flex justify-center items-center child1">
              <div className="w-20 h-20 bg-[#72101375] rounded-full flex justify-center items-center grandChild1">
                <div className="w-14 h-14 bg-wine rounded-full flex justify-center items-center grandChild2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_1616_2939)">
                      <path
                        className="path"
                        d="M22.5223 19.9614V20.4614L23.0223 20.4614C23.7627 20.4614 24.485 20.691 25.0896 21.1184C25.6942 21.5459 26.1514 22.1503 26.3983 22.8484C26.421 22.9127 26.4308 22.9809 26.4271 23.049C26.4235 23.1172 26.4065 23.184 26.377 23.2457C26.3476 23.3073 26.3063 23.3625 26.2555 23.4081C26.2047 23.4538 26.1454 23.489 26.081 23.5117C26.0166 23.5345 25.9483 23.5443 25.8801 23.5407C25.8119 23.537 25.7451 23.52 25.6835 23.4906C25.5591 23.4311 25.4634 23.3246 25.4174 23.1945L25.4173 23.1943C25.2422 22.6991 24.9178 22.2703 24.4888 21.9672C24.0598 21.664 23.5474 21.5012 23.0221 21.5014L22.5223 21.5015V22.0014V26.0813V26.5813H23.0223C23.9717 26.5813 24.8823 26.9585 25.5537 27.6299C26.2251 28.3012 26.6022 29.2118 26.6022 30.1613C26.6022 31.1107 26.2251 32.0213 25.5537 32.6927C24.8823 33.3641 23.9717 33.7412 23.0223 33.7412H22.5223V34.2412V34.7612H21.4823V34.2412V33.7412L20.9823 33.7412C20.2418 33.7412 19.5196 33.5117 18.915 33.0842C18.3104 32.6567 17.8532 32.0523 17.6063 31.3542L17.6065 31.3541L17.6014 31.341C17.5764 31.2762 17.5647 31.2069 17.5669 31.1375C17.5691 31.068 17.5852 30.9996 17.6143 30.9365C17.6434 30.8733 17.6848 30.8166 17.7362 30.7698C17.7876 30.7229 17.8478 30.6869 17.9134 30.6637C17.9789 30.6405 18.0485 30.6308 18.1179 30.6349C18.1873 30.6391 18.2551 30.6572 18.3174 30.688C18.3797 30.7189 18.4352 30.7619 18.4806 30.8146C18.526 30.8673 18.5603 30.9285 18.5816 30.9947L18.5839 31.0018L18.5864 31.0088C18.9364 31.9956 19.8767 32.7013 20.9823 32.7013H21.4823V32.2013V28.1213V27.6213H20.9823C20.0328 27.6213 19.1223 27.2441 18.4509 26.5728C17.7795 25.9014 17.4023 24.9908 17.4023 24.0413C17.4023 23.0919 17.7795 22.1813 18.4509 21.5099C19.1223 20.8386 20.0328 20.4614 20.9823 20.4614H21.4823V19.9614V19.4414H22.5223V19.9614ZM21.4823 22.0014V21.5014H20.9823C20.3087 21.5014 19.6626 21.769 19.1863 22.2453C18.7099 22.7217 18.4423 23.3677 18.4423 24.0413C18.4423 24.715 18.7099 25.361 19.1863 25.8374C19.6626 26.3137 20.3087 26.5813 20.9823 26.5813H21.4823V26.0813V22.0014ZM22.5223 32.2013V32.7013H23.0223C23.6959 32.7013 24.342 32.4336 24.8183 31.9573C25.2946 31.481 25.5622 30.8349 25.5622 30.1613C25.5622 29.4876 25.2946 28.8416 24.8183 28.3652C24.342 27.8889 23.6959 27.6213 23.0223 27.6213H22.5223V28.1213V32.2013Z"
                        fill="#F4EEE8"
                        stroke="#F4EEE8"
                      />
                      <path
                        className="path"
                        d="M32.6777 7.76453L32.0925 8.61996L29.0764 13.0294L28.6637 12.7471L28.8312 13.2182C24.5246 14.7489 19.443 14.749 15.1373 13.2161L14.9832 13.1612L14.8913 13.026L12.933 10.1425L12.1868 9.04384L13.4722 9.37758C14.0466 9.5267 14.626 9.65546 15.2095 9.76362C17.5288 10.1914 19.993 10.2818 22.1855 9.64849L32.6777 7.76453ZM32.6777 7.76453L31.6439 7.83896M32.6777 7.76453L31.6439 7.83896M31.6439 7.83896C28.7955 8.04405 25.4228 8.71123 22.1858 9.64841L31.6439 7.83896ZM29.9842 13.8939L30.2148 14.1369C32.2992 16.3342 34.0428 18.8312 35.3877 21.5448L35.3887 21.5467C36.7899 24.4051 37.5746 27.3037 37.4464 29.8408L37.4464 29.8408C37.3213 32.3145 36.3369 34.4622 34.0961 36.046L34.0961 36.046C31.7881 37.6767 27.9871 38.8172 22.0399 38.8172C16.0879 38.8172 12.2713 37.6965 9.94391 36.0855L9.94368 36.0853C7.68777 34.522 6.6915 32.4028 6.55205 29.9585L29.9842 13.8939ZM29.9842 13.8939L29.6717 14.0147M29.9842 13.8939L29.6717 14.0147M29.6717 14.0147C24.8765 15.8691 19.1024 15.8691 14.3071 14.0167L14.1269 14.4831L13.7603 14.143C11.7638 16.295 9.90587 18.9355 8.57201 21.6842L8.57197 21.6843M29.6717 14.0147L8.57197 21.6843M8.57197 21.6843C7.17652 24.5611 6.40779 27.4464 6.55203 29.9583L8.57197 21.6843ZM30.6725 12.5382L30.4409 12.8768L30.7278 13.1701C32.8636 15.3536 34.8801 18.1413 36.3244 21.0893C37.7709 24.0421 38.6262 27.1201 38.486 29.8936C38.3469 32.6463 37.2298 35.1061 34.6977 36.8949C32.1436 38.6994 28.0983 39.8571 22.041 39.8571C15.9824 39.8571 11.924 38.7201 9.35334 36.9399C6.80544 35.1754 5.67085 32.7465 5.51489 30.0173C5.35769 27.2662 6.19717 24.1996 7.63788 21.2305C9.07618 18.2664 11.0966 15.435 13.2541 13.165L13.5318 12.8728L13.3052 12.5395L9.85442 7.46201C10.0401 7.35166 10.2472 7.23453 10.4748 7.11332L10.4748 7.11332L10.4765 7.1124C10.6867 6.99935 10.9134 6.88301 11.1566 6.76444L11.3723 6.65924C13.8475 5.47946 17.7722 4.14062 22.041 4.14062C26.3431 4.14062 30.2657 5.50021 32.711 6.68731L32.8484 6.75404C32.849 6.75431 32.8495 6.75458 32.8501 6.75484C33.3571 7.00565 33.7931 7.24523 34.1475 7.45832L30.6725 12.5382ZM15.3965 8.74058L15.397 8.74066C17.6313 9.15218 19.9161 9.222 21.8955 8.64861L21.8962 8.6484C24.0635 8.01703 26.2678 7.52048 28.4964 7.16159L28.5611 6.18918C26.649 5.61347 24.4046 5.1806 22.0399 5.1806C18.4387 5.1806 15.0934 6.18361 12.7585 7.17464L12.9539 7.6349L12.8113 8.11414C13.6424 8.36137 14.5123 8.57687 15.3965 8.74058Z"
                        fill="#F4EEE8"
                        stroke="#F4EEE8"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1616_2939">
                        <rect width="40" height="40" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            <div className="child2">
              <h3 className="text-center mt-4 font-Poppins text-wine font-bold text-3xl">
                25k
              </h3>
              <h4 className="text-center mt-3 font-Poppins  text-skin">
                Anual gross sale in our site
              </h4>
            </div>
          </div>
        </div>
        <div className="flex w-[80%] mx-auto justify-between sm:flex-col xs:flex-col md:flex-row ">
          <div className="flex-col sm:mb-8 xs:mb-8">
            <div className="flex justify-center">
              <img src={AboutImage1} className="w-2/3" alt="" />
            </div>
            <h3 className="text-center mt-4 font-Poppins text-wine">
              John Salem
            </h3>
            <h4 className="text-center mt-1 font-Poppins text-skin">
              Manager Director{" "}
            </h4>
            <div className="flex justify-around w-1/4 mx-auto mt-2">
              <img src={TwitterIcon} className="w-4" alt="" />
              <img src={InstgramIcon} className="w-4" alt="" />
              <img src={LinkedInIcon} className="w-3" alt="" />
            </div>
          </div>
          <div className="flex-col sm:mb-8 xs:mb-8">
            <div className="flex justify-center">
              <img src={AboutImage2} className="w-2/3" alt="" />
            </div>
            <h3 className="text-center mt-4 font-Poppins text-wine">
              John Salem
            </h3>
            <h4 className="text-center mt-1 font-Poppins text-skin">
              Manager Director{" "}
            </h4>
            <div className="flex justify-around w-1/4 mx-auto mt-2">
              <img src={TwitterIcon} className="w-4" alt="" />
              <img src={InstgramIcon} className="w-4" alt="" />
              <img src={LinkedInIcon} className="w-3" alt="" />
            </div>
          </div>
          <div className="flex-col sm:mb-8 xs:mb-8">
            <div className="flex justify-center">
              <img src={AboutImage3} className="w-2/3" alt="" />
            </div>
            <h3 className="text-center mt-4 font-Poppins text-wine">
              John Salem
            </h3>
            <h4 className="text-center mt-1 font-Poppins text-skin">
              Manager Director{" "}
            </h4>
            <div className="flex justify-around w-1/4 mx-auto mt-2">
              <img src={TwitterIcon} className="w-4" alt="" />
              <img src={InstgramIcon} className="w-4" alt="" />
              <img src={LinkedInIcon} className="w-3" alt="" />
            </div>
          </div>
        </div>
        <div className="flex w-[80%] mx-auto justify-between my-20 sm:flex-col xs:flex-col md:flex-row">
          <div className="sm:mb-8 xs:mb-8">
            <div className="flex justify-center items-center">
              <div className="w-20 h-20 bg-[#72101375] rounded-full flex justify-center items-center">
                <div className="w-14 h-14 bg-wine rounded-full  xl flex justify-center items-center">
                  <img src={DeliveryIcon} className="w-9" alt="" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-center mt-4 font-Poppins text-wine font-bold">
                FREE AND FAST DELIVERY
              </h3>
              <h4 className="text-center mt-1 font-Poppins font-semibold text-skin">
                Free delivery for all orders over $140
              </h4>
            </div>
          </div>
          <div className="sm:mb-8 xs:mb-8">
            <div className="flex justify-center items-center">
              <div className="w-20 h-20 bg-[#72101375] rounded-full flex justify-center items-center">
                <div className="w-14 h-14 bg-wine rounded-full  xl flex justify-center items-center">
                  <img src={CustomerServiceIcon} className="w-9" alt="" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-center mt-4 font-Poppins text-wine font-bold">
                24/7 CUSTOMER SERVICE
              </h3>
              <h4 className="text-center mt-1 font-Poppins font-semibold text-skin">
                Friendly 24/7 customer support
              </h4>
            </div>
          </div>
          <div className="sm:mb-8 xs:mb-8">
            <div className="flex justify-center items-center">
              <div className="w-20 h-20 bg-[#72101375] rounded-full flex justify-center items-center">
                <div className="w-14 h-14 bg-wine rounded-full  xl flex justify-center items-center">
                  <img src={SecureIcon} className="w-9" alt="" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-center mt-4 font-Poppins text-wine font-bold">
                MONEY BACK GUARANTEE
              </h3>
              <h4 className="text-center mt-1 font-Poppins font-semibold text-skin">
                We reurn money within 30 days
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutScreen;
