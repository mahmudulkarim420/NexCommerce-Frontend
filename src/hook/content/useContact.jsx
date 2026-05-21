import { demoContactMessages, simulateDelay } from "../../data/demoData";

// Contact add
export const ContactCreate = async (formData) => {
  try {
    await simulateDelay(800);
    const newMessage = {
      _id: `msg${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString(),
    };
    demoContactMessages.push(newMessage);
    return { success: true, data: newMessage, message: "Message sent successfully" };
  } catch (error) {
    console.error("contact error:", error);
    throw error;
  }
};

// Contact get all
export const ContactGet = async () => {
  try {
    await simulateDelay(600);
    return { success: true, data: demoContactMessages };
  } catch (error) {
    console.error("contact error:", error);
    throw error;
  }
};

// Contacy delete
export const ContactDelete = async (id) => {
  try {
    await simulateDelay(600);
    const index = demoContactMessages.findIndex((m) => m._id === id);
    if (index !== -1) {
      demoContactMessages.splice(index, 1);
    }
    return { success: true, message: "Message deleted successfully" };
  } catch (error) {
    console.error("contact error:", error);
    throw error;
  }
};
