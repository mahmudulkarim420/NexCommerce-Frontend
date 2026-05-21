import { demoBlogs, simulateDelay } from "../../data/demoData";

// blog add
export const BlogCreate = async (formData) => {
  try {
    await simulateDelay(800);
    const newBlog = {
      _id: `blog${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString(),
    };
    demoBlogs.push(newBlog);
    return { success: true, data: newBlog, message: "Blog created successfully" };
  } catch (error) {
    console.error("blog error:", error);
    throw error;
  }
};

// blog ALL GET
export const BlogAllGet = async () => {
  try {
    await simulateDelay(600);
    return { success: true, data: demoBlogs };
  } catch (error) {
    console.error("blog error:", error);
    throw error;
  }
};

// uplosd blog
export const blogUploade = async (formData, id) => {
  try {
    await simulateDelay(800);
    const index = demoBlogs.findIndex((b) => b._id === id);
    if (index !== -1) {
      demoBlogs[index] = { ...demoBlogs[index], ...formData };
      return { success: true, data: demoBlogs[index], message: "Blog updated successfully" };
    }
    return { success: false, message: "Blog not found" };
  } catch (error) {
    console.error("blog update error:", error);
    throw error;
  }
};

// delete blog
export const blogDelete = async (id) => {
  try {
    await simulateDelay(600);
    const index = demoBlogs.findIndex((b) => b._id === id);
    if (index !== -1) {
      demoBlogs.splice(index, 1);
      return { success: true, message: "Blog deleted successfully" };
    }
    return { success: false, message: "Blog not found" };
  } catch (error) {
    console.error("blog update error:", error);
    throw error;
  }
};
