import { demoCenterBanner, simulateDelay } from "../data/demoData";

// CenterBanner add
export const CenterBannerCreate = async (formData) => {
  try {
    await simulateDelay(800);

    const newBanner = {
      _id: `center${Date.now()}`,
      title: formData.title || "Center Banner",
      subtitle: formData.subtitle || "",
      image: formData.image || "https://via.placeholder.com/1000x400",
      link: formData.link || "/shop",
      active: true,
      createdAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: newBanner,
      message: "Center banner created successfully!",
    };
  } catch (error) {
    console.error("CenterBanner error:", error);
    throw error;
  }
};

// CenterBanner ALL GET
export const CenterBannerAllGet = async () => {
  try {
    await simulateDelay(500);

    return { success: true, data: [demoCenterBanner] };
  } catch (error) {
    console.error("CenterBanner error:", error);
    throw error;
  }
};

// upload CenterBanner
export const CenterBannerUploade = async (formData, id) => {
  try {
    await simulateDelay(800);

    Object.assign(demoCenterBanner, formData, { updatedAt: new Date().toISOString() });

    return {
      success: true,
      data: demoCenterBanner,
      message: "Center banner updated successfully!",
    };
  } catch (error) {
    console.error("CenterBanner update error:", error);
    throw error;
  }
};

// delete CenterBanner
export const CenterBannerDelete = async (categoryId) => {
  try {
    await simulateDelay(600);

    return { success: true, message: "Center banner deleted successfully!" };
  } catch (error) {
    console.error("CenterBanner update error:", error);
    throw error;
  }
};
