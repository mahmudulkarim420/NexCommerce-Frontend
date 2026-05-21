import { demoWebsiteInfo, simulateDelay } from "../../data/demoData";

// websiteinfo add
export const WebsiteinfoCreate = async (formData) => {
  try {
    await simulateDelay(800);
    Object.assign(demoWebsiteInfo, formData);
    return { success: true, data: demoWebsiteInfo, message: "Website info created" };
  } catch (error) {
    console.error("websiteinfo error:", error);
    throw error;
  }
};

// websiteinfo ALL GET
export const WebsiteinfoAllGet = async () => {
  try {
    await simulateDelay(600);
    return { success: true, data: [demoWebsiteInfo] };
  } catch (error) {
    console.error("websiteinfo error:", error);
    throw error;
  }
};

// uplosd websiteinfo
export const WebsiteinfoUploade = async (formData, id) => {
  try {
    await simulateDelay(800);
    Object.assign(demoWebsiteInfo, formData);
    return { success: true, data: demoWebsiteInfo, message: "Website info updated" };
  } catch (error) {
    console.error("websiteinfo update error:", error);
    throw error;
  }
};

// delete websiteinfo
export const WebsiteinfoDelete = async (id) => {
  try {
    await simulateDelay(600);
    return { success: true, message: "Website info deleted" };
  } catch (error) {
    console.error("websiteinfo update error:", error);
    throw error;
  }
};
