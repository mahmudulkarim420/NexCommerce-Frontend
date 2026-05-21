import { demoSubcategories, simulateDelay } from "../data/demoData";
import { subcategoryGet } from "../redux/subcategorySlice";

// subcatagory add
export const SubCategoryCreate = async (formData) => {
  try {
    await simulateDelay(800);
    const newSubcategory = {
      _id: `sub${Date.now()}`,
      ...formData,
      active: true,
    };
    demoSubcategories.push(newSubcategory);
    return { success: true, data: newSubcategory, message: "Subcategory created successfully!" };
  } catch (error) {
    console.error("Subcategory create error:", error);
    throw error;
  }
};

// subcatagory ALL GET
export const SubCategoryAllGet = async (dispatch) => {
  try {
    await simulateDelay(600);
    dispatch(subcategoryGet(demoSubcategories));
    return { success: true, data: demoSubcategories };
  } catch (error) {
    console.error("Subcategory get error:", error);
    throw error;
  }
};

// get one subcategoti
export const SubCategoryGetOne = async (subcategoryId) => {
  try {
    await simulateDelay(500);
    const subcategory = demoSubcategories.find((s) => s._id === subcategoryId);
    return { success: true, data: subcategory };
  } catch (error) {
    console.error("Subcategory get one error:", error);
    throw error;
  }
};

// uplosd subcategoti
export const SubCategoryUploade = async (formData, subcategoryId) => {
  try {
    await simulateDelay(800);
    const index = demoSubcategories.findIndex((s) => s._id === subcategoryId);
    if (index !== -1) {
      demoSubcategories[index] = { ...demoSubcategories[index], ...formData };
      return {
        success: true,
        data: demoSubcategories[index],
        message: "Subcategory updated successfully!",
      };
    }
    return { success: false, message: "Subcategory not found" };
  } catch (error) {
    console.error("Subcategory update error:", error);
    throw error;
  }
};

// delete
export const SubCategoryDelete = async (subcategoryId) => {
  try {
    await simulateDelay(600);
    const index = demoSubcategories.findIndex((s) => s._id === subcategoryId);
    if (index !== -1) {
      demoSubcategories.splice(index, 1);
      return { success: true, message: "Subcategory deleted successfully!" };
    }
    return { success: false, message: "Subcategory not found" };
  } catch (error) {
    console.error("Subcategory delete error:", error);
    throw error;
  }
};
