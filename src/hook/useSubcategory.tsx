import { subcategoryGet } from "../redux/subcategorySlice";
import { categoryService } from "../services/category.service";

/**
 * Create new subcategory
 */
export const SubCategoryCreate = async (formData: any) => {
  try {
    const newSubcategory = await categoryService.createSubcategory(formData);
    return {
      success: true,
      data: newSubcategory,
      message: "Subcategory created successfully!",
    };
  } catch (error: any) {
    console.error("Subcategory create error:", error);
    throw error;
  }
};

/**
 * Get all subcategories
 */
export const SubCategoryAllGet = async (dispatch: any) => {
  try {
    const subcategories = await categoryService.getAllSubcategories();
    dispatch(subcategoryGet(subcategories || []));
    return {
      success: true,
      data: subcategories || [],
    };
  } catch (error: any) {
    console.error("Subcategory get error:", error);
    throw error;
  }
};

/**
 * Get single subcategory
 */
export const SubCategoryGetOne = async (subcategoryId: string) => {
  try {
    if (!subcategoryId) return { success: false, data: null };

    // Note: Backend doesn't have direct endpoint for single subcategory
    // Fetch all and filter for now
    const allSubcategories = await categoryService.getAllSubcategories();
    const subcategory = allSubcategories.find((s: any) => s._id === subcategoryId);

    return {
      success: !!subcategory,
      data: subcategory,
    };
  } catch (error: any) {
    console.error("Subcategory get one error:", error);
    throw error;
  }
};

/**
 * Update subcategory
 */
export const SubCategoryUploade = async (formData: any, subcategoryId: string) => {
  try {
    const updatedSubcategory = await categoryService.updateSubcategory(subcategoryId, formData);
    return {
      success: true,
      data: updatedSubcategory,
      message: "Subcategory updated successfully!",
    };
  } catch (error: any) {
    console.error("Subcategory update error:", error);
    throw error;
  }
};

/**
 * Delete subcategory
 */
export const SubCategoryDelete = async (subcategoryId: string) => {
  try {
    await categoryService.deleteSubcategory(subcategoryId);
    return {
      success: true,
      message: "Subcategory deleted successfully!",
    };
  } catch (error: any) {
    console.error("Subcategory delete error:", error);
    throw error;
  }
};
