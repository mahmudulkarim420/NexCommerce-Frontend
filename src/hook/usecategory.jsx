import { demoCategories, simulateDelay } from "../data/demoData";
import { categoryGet } from "../redux/categorySlice";

// category add
export const CategoryCreate = async (formData) => {
  try {
    await simulateDelay(800);

    const newCategory = {
      _id: `cat${Date.now()}`,
      name: formData.name || "New Category",
      slug: formData.slug || formData.name?.toLowerCase().replace(/\s+/g, "-"),
      image: formData.image || "https://via.placeholder.com/400",
      description: formData.description || "",
      metaTitle: formData.metaTitle || `${formData.name} - NexCommerce`,
      metaDescription: formData.metaDescription || "",
      active: true,
      createdAt: new Date().toISOString(),
    };

    demoCategories.push(newCategory);

    return {
      success: true,
      data: newCategory,
      message: "Category created successfully!",
    };
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// category ALL GET
export const CategoryAllGet = async (dispatch) => {
  try {
    await simulateDelay(500);

    dispatch(categoryGet(demoCategories));
    return { success: true, data: demoCategories };
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// upload category
export const CategoryUploade = async (formData, categoryId) => {
  try {
    await simulateDelay(800);

    const categoryIndex = demoCategories.findIndex((c) => c._id === categoryId);
    if (categoryIndex !== -1) {
      demoCategories[categoryIndex] = {
        ...demoCategories[categoryIndex],
        ...formData,
        updatedAt: new Date().toISOString(),
      };
      return {
        success: true,
        data: demoCategories[categoryIndex],
        message: "Category updated successfully!",
      };
    }

    return { success: false, message: "Category not found" };
  } catch (error) {
    console.error("Category update error:", error);
    throw error;
  }
};

// delete category
export const CategoryDelete = async (categoryId) => {
  try {
    await simulateDelay(600);

    const categoryIndex = demoCategories.findIndex((c) => c._id === categoryId);
    if (categoryIndex !== -1) {
      demoCategories.splice(categoryIndex, 1);
      return { success: true, message: "Category deleted successfully!" };
    }

    return { success: false, message: "Category not found" };
  } catch (error) {
    console.error("Category update error:", error);
    throw error;
  }
};
