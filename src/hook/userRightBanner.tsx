const demoRightBanner = [] as any[];
const simulateDelay = (ms: number) => new Promise(r => setTimeout(r, ms));


// RightBanner add
export const RightBannerCreate = async (formData) => {
  try {
    await simulateDelay(800);

    const newBanner = {
      _id: `right${Date.now()}`,
      title: formData.title || "Right Banner",
      subtitle: formData.subtitle || "",
      image: formData.image || "https://via.placeholder.com/500x600",
      link: formData.link || "/shop",
      active: true,
      createdAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: newBanner,
      message: "Right banner created successfully!",
    };
  } catch (error) {
    console.error("RightBanner error:", error);
    throw error;
  }
};

// RightBanner ALL GET
export const RightBannerAllGet = async () => {
  try {
    await simulateDelay(500);

    return { success: true, data: [demoRightBanner] };
  } catch (error) {
    console.error("RightBanner error:", error);
    throw error;
  }
};

// upload RightBanner
export const RightBannerUploade = async (formData, id) => {
  try {
    await simulateDelay(800);

    Object.assign(demoRightBanner, formData, { updatedAt: new Date().toISOString() });

    return {
      success: true,
      data: demoRightBanner,
      message: "Right banner updated successfully!",
    };
  } catch (error) {
    console.error("RightBanner update error:", error);
    throw error;
  }
};

// delete RightBanner
export const RightBannerDelete = async (categoryId) => {
  try {
    await simulateDelay(600);

    return { success: true, message: "Right banner deleted successfully!" };
  } catch (error) {
    console.error("RightBanner update error:", error);
    throw error;
  }
};
