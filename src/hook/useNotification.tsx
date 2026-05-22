const demoNotifications = [] as any[];
const simulateDelay = (ms: number) => new Promise(r => setTimeout(r, ms));


// sockeet io product update
export const CreateNotification = async (formData) => {
  try {
    await simulateDelay(500);
    const newNotification = {
      _id: `notif${Date.now()}`,
      ...formData,
      read: false,
      createdAt: new Date().toISOString(),
    };
    demoNotifications.push(newNotification);
    return { success: true, data: newNotification };
  } catch (error) {
    console.error("Create notification error:", error);
    throw error;
  }
};

// all notification get
export const NotificationAllGet = async () => {
  try {
    await simulateDelay(600);
    return { success: true, data: demoNotifications };
  } catch (error) {
    console.error("Get notifications error:", error);
    throw error;
  }
};

//  mark single read
export const NotificationSingleRead = async (id) => {
  try {
    await simulateDelay(400);
    const notification = demoNotifications.find((n) => n._id === id);
    if (notification) {
      notification.read = true;
    }
    return { success: true, message: "Notification marked as read" };
  } catch (error) {
    console.error("Mark read error:", error);
    throw error;
  }
};

// mark-all-read
export const NotificationAllRead = async () => {
  try {
    await simulateDelay(500);
    demoNotifications.forEach((n) => (n.read = true));
    return { success: true, message: "All notifications marked as read" };
  } catch (error) {
    console.error("Mark all read error:", error);
    throw error;
  }
};

// delete
export const NotificationDelete = async (id) => {
  try {
    await simulateDelay(400);
    const index = demoNotifications.findIndex((n) => n._id === id);
    if (index !== -1) {
      demoNotifications.splice(index, 1);
    }
    return { success: true, message: "Notification deleted" };
  } catch (error) {
    console.error("Delete notification error:", error);
    throw error;
  }
};
