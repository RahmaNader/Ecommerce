import { ToggleRadioButton } from "@components/atoms";

interface ShippingMethodProps {
  selectedShippingMethod: string;
  onShippingMethodChange: (method: string) => void;
}

const ShippingMethod = ({
  selectedShippingMethod,
  onShippingMethodChange,
}: ShippingMethodProps) => {
  return (
    <div className="space-y-2 my-5 lg:px-12 md:w-full">
      <h2 className="text-xl font-semibold text-wine">Shipment Method</h2>

      {/* Delivery Regular option */}
      <div className="py-5 flex border-b border-b-gray-300 text-wine">
        <div className="w-full flex justify-between items-center">
          <div className="w-full flex justify-between">
            <div>
              <ToggleRadioButton
                label="Delivery Regular"
                isChecked={selectedShippingMethod === "regular"} // Check if this is the selected option
                onChange={() => onShippingMethodChange("regular")} // Update shipping method selection
              />
            </div>
            <div className="text-lg text-wine px-8 font-semibold">
              <p>01 Feb, 2023</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fast Delivery option */}
      <div className="py-5 flex text-wine">
        <div className=" w-full flex justify-between items-center">
          <div className="w-full flex justify-between">
            <div>
              <ToggleRadioButton
                label="Fast Delivery +50 EGP"
                isChecked={selectedShippingMethod === "fast"} // Check if this is the selected option
                onChange={() => onShippingMethodChange("fast")} // Update shipping method selection
              />
            </div>
            <div className="text-lg text-wine px-8 font-semibold">
              <p>28 Jan, 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingMethod;
