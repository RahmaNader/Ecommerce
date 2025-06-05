import { FC } from "react";
import { SuccessAlert } from "@components/atoms";
import shoppingCart from "@assets/shoppingCart.svg";
import { ProductPreference } from "@components/molecules";
import {
  useProductCardLogic,
  UseProductCardLogicProps,
} from "../../../hooks/useProductCardLogic";

interface ProductCardProps extends UseProductCardLogicProps {
  averageRate: number | null;
  productImages: UseProductCardLogicProps["productImages"];
}

export const ProductCard: FC<ProductCardProps> = (props) => {
  const logic = useProductCardLogic(props);

  return (
    <article className="relative flex flex-col text-center h-full">
      {logic.alertVisible && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <SuccessAlert message={logic.t("card.addedToCart")} />
        </div>
      )}
      {logic.showPreference && (
        <ProductPreference
          product={{
            productVarients: props.productVarients,
            productPrice: props.productPrice,
            priceAfterDiscount: props.priceAfterDiscount,
            productImages: props.productImages,
            name: logic.displayName,
            productID: props.productID,
          }}
          onSubmit={logic.handlePreferenceSubmit}
          onCancel={logic.closePreference}
        />
      )}
      <div
        onClick={logic.handleCardClick}
        className="relative w-full aspect-[3/4] overflow-visible rounded-t-[999px] cursor-pointer"
      >
        <div className="absolute inset-0 overflow-hidden rounded-t-[999px]">
          <img
            src={logic.imageUrl}
            alt={logic.imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 border-2 border-[#D4B24C] rounded-t-[999px] pointer-events-none" />
        <button
          onClick={logic.handleAddToCartIconClick}
          aria-label={logic.t("card.addToCart")}
          className={`absolute -bottom-4 right-6 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-transform duration-150 hover:scale-105 ${
            logic.isInCart ? "bg-ForthColor" : "bg-wine"
          }`}
        >
          <img
            src={shoppingCart}
            alt={logic.t("card.addToCart")}
            className="w-5 h-5"
          />
        </button>
      </div>
      <div className="flex flex-col flex-1 pt-4">
        <h3 className="font-playfair font-medium text-xl truncate">
          {logic.displayName}
        </h3>
        <p className="font-playfair font-semibold text-2xl text-ForthColor">
          {logic.t("card.priceInCurrency", { price: logic.priceAfterDiscount })}
        </p>
        <p className="font-playfair font-medium text-lg line-through text-FifthColor">
          <>
            {logic.t("card.priceInCurrency", {
              price: props.productPrice,
            })}
          </>
        </p>
      </div>
      {/* <div className="flex justify-center mt-2">
        <CustomRating rate={props.averageRate ?? 0} mode="hide" />
      </div> */}
    </article>
  );
};
