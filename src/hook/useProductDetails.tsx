import { productService } from "../services/product.service";

/**
 * Fetch single product details from API
 */
export const getProductDetailsApi = async (productId: string) => {
  try {
    if (!productId) {
      console.error("Product ID is required");
      return null;
    }

    const product = await productService.getById(productId);
    return product || null;
  } catch (error: any) {
    console.error("Error fetching product details:", error.message || error);
    return null;
  }
};
