import { demoProducts, simulateDelay } from "../data/demoData";

// Fetch single product details
export const getProductDetailsApi = async (productId) => {
  try {
    if (!productId) return null;
    await simulateDelay(500);

    const product = demoProducts.find((p) => p._id === productId);
    return product || null;
  } catch (error) {
    console.error("Get product details error:", error);
    throw error;
  }
};
