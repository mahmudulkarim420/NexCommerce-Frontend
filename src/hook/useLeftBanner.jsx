import { demoLeftBanner, simulateDelay } from "../data/demoData";

// LeftBanner add
export const LeftBannerCreate = async (formData) => {
  try {
    await simulateDelay(800);

    const newBanner = {
      _id: `left${Date.now()}`,
      title: formData.title || "Left Banner",
      subtitle: formData.subtitle || "",
      image: formData.image || "https://via.placeholder.com/500x600",
      link: formData.link || "/shop",
      active: true,
      createdAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: newBanner,
      message: "Left banner created successfully!",
    };
  } catch (error) {
    console.error("LeftBanner error:", error);
    throw error;
  }
};

// LeftBanner ALL GET
export const LeftBannerAllGet = async () => {
  try {
    await simulateDelay(500);

    return { success: true, data: [demoLeftBanner] };
  } catch (error) {
    console.error("LeftBanner error:", error);
    throw error;
  }
};

// upload LeftBanner
export const LeftBannerUploade = async (formData, id) => {
  try {
    await simulateDelay(800);

    Object.assign(demoLeftBanner, formData, { updatedAt: new Date().toISOString() });

    return {
      success: true,
      data: demoLeftBanner,
      message: "Left banner updated successfully!",
    };
  } catch (error) {
    console.error("LeftBanner update error:", error);
    throw error;
  }
};

// delete LeftBanner
export const LeftBannerDelete = async (categoryId) => {
  try {
    await simulateDelay(600);

    return { success: true, message: "Left banner deleted successfully!" };
  } catch (error) {
    console.error("LeftBanner update error:", error);
    throw error;
  }
};
