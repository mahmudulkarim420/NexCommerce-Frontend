import { demoHomeBanners, simulateDelay } from "../data/demoData";

// HomeBanner add
export const HomeBannerCreate = async (formData) => {
  try {
    await simulateDelay(800);

    const newBanner = {
      _id: `banner${Date.now()}`,
      title: formData.title || "New Banner",
      subtitle: formData.subtitle || "",
      image: formData.image || "https://via.placeholder.com/1200x400",
      link: formData.link || "/shop",
      active: true,
      order: demoHomeBanners.length + 1,
      createdAt: new Date().toISOString(),
    };

    demoHomeBanners.push(newBanner);

    return {
      success: true,
      data: newBanner,
      message: "Home banner created successfully!",
    };
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// HomeBanner ALL GET
export const HomeBannerAllGet = async () => {
  try {
    await simulateDelay(500);

    return { success: true, data: demoHomeBanners };
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// upload HomeBanner
export const HomeBannerUploade = async (formData, id) => {
  try {
    await simulateDelay(800);

    const bannerIndex = demoHomeBanners.findIndex((b) => b._id === id);
    if (bannerIndex !== -1) {
      demoHomeBanners[bannerIndex] = {
        ...demoHomeBanners[bannerIndex],
        ...formData,
        updatedAt: new Date().toISOString(),
      };
      return {
        success: true,
        data: demoHomeBanners[bannerIndex],
        message: "Home banner updated successfully!",
      };
    }

    return { success: false, message: "Banner not found" };
  } catch (error) {
    console.error("HomeBanner update error:", error);
    throw error;
  }
};

// delete HomeBanner
export const HomeBannerDelete = async (categoryId) => {
  try {
    await simulateDelay(600);

    const bannerIndex = demoHomeBanners.findIndex((b) => b._id === categoryId);
    if (bannerIndex !== -1) {
      demoHomeBanners.splice(bannerIndex, 1);
      return { success: true, message: "Home banner deleted successfully!" };
    }

    return { success: false, message: "Banner not found" };
  } catch (error) {
    console.error("HomeBanner update error:", error);
    throw error;
  }
};
