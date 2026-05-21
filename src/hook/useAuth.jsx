import { demoUsers, demoAddresses, simulateDelay, getCurrentUser } from "../data/demoData";
import { userget } from "../redux/userSlice";

// Demo Auth Functions - Replace all API calls with demo data

// signup
export const UseAuth = async (formData, route) => {
  try {
    await simulateDelay(800);

    // Simulate successful signup
    const newUser = {
      _id: `user${Date.now()}`,
      name: formData.name || "Demo User",
      email: formData.email,
      phone: formData.phone || "",
      role: "customer",
      avatar: "https://i.pravatar.cc/150?img=5",
      isBlocked: false,
      createdAt: new Date().toISOString(),
    };

    route.push("/signin");
    return { success: true, data: newUser, message: "Signup successful!" };
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// signin
export const UserSignin = async (formData, route, dispatch) => {
  try {
    await simulateDelay(800);

    // Use demo user (Jane Smith)
    const user = getCurrentUser();

    dispatch(userget({ success: true, data: user }));
    route.push("/");
    return { success: true, data: user, message: "Login successful!" };
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// logout
export const Logout = async (route) => {
  try {
    await simulateDelay(500);

    route.push("/signin");
    return { success: true, message: "Logged out successfully!" };
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// reset password
export const sendOtp = async (formData) => {
  try {
    await simulateDelay(1000);

    // Simulate OTP sent
    return {
      success: true,
      message: "OTP sent successfully to your email!",
      otp: "123456", // Demo OTP
    };
  } catch (error) {
    console.error("Reset Password error:", error);
    throw error;
  }
};

// VERIFY OTP
export const verifyOtp = async (formData) => {
  try {
    await simulateDelay(800);

    // Accept any OTP for demo
    return {
      success: true,
      message: "OTP verified successfully!",
      verified: true,
    };
  } catch (error) {
    console.error("Verify OTP error:", error);
    throw error;
  }
};

// CHANGE PASSWORD
export const changePassword = async (formData) => {
  try {
    await simulateDelay(800);

    return {
      success: true,
      message: "Password changed successfully!",
    };
  } catch (error) {
    console.error("Change Password error:", error);
    throw error;
  }
};

// google sign in
export const googleSignIn = async (formData, route, dispatch) => {
  try {
    await simulateDelay(1000);

    // Use demo user
    const user = getCurrentUser();

    dispatch(userget({ success: true, data: user }));
    route.push("/");
    return { success: true, data: user, message: "Google signin successful!" };
  } catch (error) {
    console.error("Google Sign-In error:", error);
    throw error;
  }
};

// usergetprofile
export const getUserProfile = async () => {
  try {
    await simulateDelay(500);

    const user = getCurrentUser();
    return { success: true, data: user };
  } catch (error) {
    console.error("Get User Profile error:", error);
    throw error;
  }
};

// get all users
export const getAllUser = async () => {
  try {
    await simulateDelay(600);

    return { success: true, data: demoUsers };
  } catch (error) {
    console.error("Get All User error:", error);
    throw error;
  }
};

// update profile
export const updateUserProfile = async (id, formData) => {
  try {
    await simulateDelay(800);

    // Find and update demo user
    const userIndex = demoUsers.findIndex((u) => u._id === id);
    if (userIndex !== -1) {
      demoUsers[userIndex] = { ...demoUsers[userIndex], ...formData };
      return {
        success: true,
        data: demoUsers[userIndex],
        message: "Profile updated successfully!",
      };
    }

    return { success: false, message: "User not found" };
  } catch (error) {
    console.error("Update User Profile error:", error);
    throw error;
  }
};

// get addresses
export const getAddress = async () => {
  try {
    await simulateDelay(500);

    return { success: true, data: demoAddresses };
  } catch (error) {
    console.error("Get Address error:", error);
    throw error;
  }
};

// create address
export const createAddress = async (addressData) => {
  try {
    await simulateDelay(800);

    const newAddress = {
      _id: `addr${Date.now()}`,
      userId: getCurrentUser()._id,
      ...addressData,
      isDefault: demoAddresses.length === 0,
    };

    demoAddresses.push(newAddress);
    return { success: true, data: newAddress, message: "Address created successfully!" };
  } catch (error) {
    console.error("Create Address error:", error);
    throw error;
  }
};

// update address
export const updateAddress = async (addressData) => {
  try {
    await simulateDelay(800);

    const addressIndex = demoAddresses.findIndex((a) => a._id === addressData._id);
    if (addressIndex !== -1) {
      demoAddresses[addressIndex] = { ...demoAddresses[addressIndex], ...addressData };
      return {
        success: true,
        data: demoAddresses[addressIndex],
        message: "Address updated successfully!",
      };
    }

    return { success: false, message: "Address not found" };
  } catch (error) {
    console.error("Update Address error:", error);
    throw error;
  }
};

// delete user
export const deleteUser = async (id) => {
  try {
    await simulateDelay(600);

    const userIndex = demoUsers.findIndex((u) => u._id === id);
    if (userIndex !== -1) {
      demoUsers.splice(userIndex, 1);
      return { success: true, message: "User deleted successfully!" };
    }

    return { success: false, message: "User not found" };
  } catch (error) {
    console.error("Delete User error:", error);
    throw error;
  }
};
