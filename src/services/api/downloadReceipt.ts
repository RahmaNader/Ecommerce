import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const downloadReceipt = async (orderId: string) => {
  const authToken = Cookies.get("authToken");
  if (!authToken) throw new Error("Missing auth token");

  const { data, headers } = await axios.get(
    `${baseUrl}/api/Invoice/invoice/${orderId}`,
    {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "*/*",
      },
    }
  );

  const disposition = headers["content-disposition"] as string | undefined;
  const matched = disposition?.match(/filename=["']?([^"';]+)["']?/i);
  const filename = matched?.[1] ?? `Invoice_${orderId}.pdf`;

  const blob = new Blob([data], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(url);
};
