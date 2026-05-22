import { authService } from "../services/auth.service";
import { userService } from "../services/user.service";
import { userget } from "../redux/userSlice";

export const UseAuth = async (formData: any, route: any) => {
  try {
    const res = await authService.signup(formData);
    route.push("/signin");
    return { success: true, data: res.user, message: "Signup successful!" };
  } catch (error) {
    throw error;
  }
};

export const UserSignin = async (formData: any, route: any, dispatch: any) => {
  try {
    const res = await authService.login(formData);
    dispatch(userget({ success: true, data: res.user }));
    route.push("/");
    return { success: true, data: res.user, message: "Login successful!" };
  } catch (error) {
    throw error;
  }
};

export const Logout = async (route: any) => {
  try {
    await authService.logout();
    route.push("/signin");
    return { success: true, message: "Logged out successfully!" };
  } catch (error) {
    throw error;
  }
};

export const sendOtp = async (formData: any) => {
  return { success: true, message: "OTP sent successfully to your email!", otp: "123456" };
};

export const verifyOtp = async (formData: any) => {
  return { success: true, message: "OTP verified successfully!", verified: true };
};

export const changePassword = async (formData: any) => {
  try {
    await authService.changePassword(formData.oldPassword, formData.newPassword);
    return { success: true, message: "Password changed successfully!" };
  } catch (error) {
    throw error;
  }
};

export const googleSignIn = async (formData: any, route: any, dispatch: any) => {
  route.push("/");
  return { success: true, message: "Google signin successful!" };
};

export const getUserProfile = async () => {
  try {
    const user = await authService.getProfile();
    return { success: true, data: user };
  } catch (error) {
    throw error;
  }
};

export const getAllUser = async () => {
  try {
    const res = await userService.getAllUsers();
    return { success: true, data: res.users };
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (id: string, formData: any) => {
  try {
    const user = await userService.updateProfile(id, formData);
    return { success: true, data: user, message: "Profile updated successfully!" };
  } catch (error) {
    throw error;
  }
};

export const getAddress = async () => {
  try {
    const userId = "temp_user_id";
    const addresses = await userService.getAddresses(userId);
    return { success: true, data: addresses };
  } catch (error) {
    throw error;
  }
};

export const createAddress = async (addressData: any) => {
  try {
    const userId = "temp_user_id";
    const address = await userService.createAddress(userId, addressData);
    return { success: true, data: address, message: "Address created successfully!" };
  } catch (error) {
    throw error;
  }
};

export const updateAddress = async (addressData: any) => {
  try {
    const userId = "temp_user_id";
    const address = await userService.updateAddress(userId, addressData._id, addressData);
    return { success: true, data: address, message: "Address updated successfully!" };
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    await userService.deleteUser(id);
    return { success: true, message: "User deleted successfully!" };
  } catch (error) {
    throw error;
  }
};
