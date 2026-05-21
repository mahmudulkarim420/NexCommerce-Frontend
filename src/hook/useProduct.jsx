import { demoProducts, simulateDelay } from "../data/demoData";

// product upload
export const ProductCreate = async (formData) => {
  try {
    await simulateDelay(1000);

    const newProduct = {
      _id: `prod${Date.now()}`,
      name: formData.name || "New Product",
      slug: formData.slug || formData.name?.toLowerCase().replace(/\s+/g, "-"),
      description: formData.description || "",
      price: parseFloat(formData.price) || 0,
      originalPrice: parseFloat(formData.originalPrice) || parseFloat(formData.price) || 0,
      discount: formData.discount || 0,
      stock: parseInt(formData.stock) || 0,
      categoryId: formData.categoryId || formData.category,
      subcategoryId: formData.subcategoryId || formData.subCategory,
      images: formData.images || [],
      rating: 0,
      reviews: 0,
      brand: formData.brand || "",
      tags: formData.tags || [],
      featured: formData.featured || false,
      active: true,
      createdAt: new Date().toISOString(),
    };

    demoProducts.push(newProduct);

    return {
      success: true,
      data: newProduct,
      message: "Product created successfully!",
    };
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// all product get
export const ProductAllGet = async (formData) => {
  try {
    await simulateDelay(600);

    let filteredProducts = [...demoProducts];

    // Apply filters if provided
    if (formData) {
      if (formData.category) {
        filteredProducts = filteredProducts.filter((p) => p.categoryId === formData.category);
      }
      if (formData.subCategory) {
        filteredProducts = filteredProducts.filter((p) => p.subcategoryId === formData.subCategory);
      }
      if (formData.featured !== undefined) {
        filteredProducts = filteredProducts.filter((p) => p.featured === formData.featured);
      }
      if (formData.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter((p) => p.price >= formData.minPrice);
      }
      if (formData.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter((p) => p.price <= formData.maxPrice);
      }
    }

    // Extract unique categories and subcategories
    const categories = new Set();
    const subCategories = new Set();

    filteredProducts.forEach((product) => {
      if (product.categoryId) categories.add(product.categoryId);
      if (product.subcategoryId) subCategories.add(product.subcategoryId);
    });

    return {
      success: true,
      products: filteredProducts,
      data: filteredProducts,
      categories: Array.from(categories),
      subCategories: Array.from(subCategories),
      total: filteredProducts.length,
    };
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

//  delete
export const ProductDelete = async (_id) => {
  try {
    await simulateDelay(600);

    const productIndex = demoProducts.findIndex((p) => p._id === _id);
    if (productIndex !== -1) {
      demoProducts.splice(productIndex, 1);
      return { success: true, message: "Product deleted successfully!" };
    }

    return { success: false, message: "Product not found" };
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
};

// update
export const ProductUpdate = async (formData) => {
  try {
    await simulateDelay(800);

    const productIndex = demoProducts.findIndex((p) => p._id === formData._id);
    if (productIndex !== -1) {
      demoProducts[productIndex] = {
        ...demoProducts[productIndex],
        ...formData,
        updatedAt: new Date().toISOString(),
      };
      return {
        success: true,
        data: demoProducts[productIndex],
        message: "Product updated successfully!",
      };
    }

    return { success: false, message: "Product not found" };
  } catch (error) {
    console.error("update error:", error);
    throw error;
  }
};

// socket io product update
export const ProductNotification = async (formData) => {
  try {
    await simulateDelay(300);

    // Simulate notification sent
    return {
      success: true,
      message: "Notification sent successfully!",
    };
  } catch (error) {
    console.error("update error:", error);
    throw error;
  }
};
