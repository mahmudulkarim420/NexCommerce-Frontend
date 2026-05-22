const demoReviews = [] as any[];
const simulateDelay = (ms: number) => new Promise(r => setTimeout(r, ms));
const getCurrentUser = [] as any[];


// 1ï¸âƒ£ Submit a new review (status: pending)
export const submitReview = async (productId, reviewData) => {
  try {
    await simulateDelay(800);
    const user = getCurrentUser();
    const newReview = {
      _id: `rev${Date.now()}`,
      productId,
      userId: user._id,
      userName: user.name,
      userAvatar: user.avatar,
      rating: reviewData.rating,
      comment: reviewData.comment,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    demoReviews.push(newReview);
    return { success: true, data: newReview, message: "Review submitted for approval" };
  } catch (error) {
    console.error("Submit Review Error:", error);
    throw error;
  }
};

// 6ï¸âƒ£ Get all reviews (admin - approved + pending + rejected)
export const getAllReviews = async () => {
  try {
    await simulateDelay(600);
    return demoReviews;
  } catch (error) {
    console.error("Get All Reviews Error:", error);
    return [];
  }
};

// 2ï¸âƒ£ Get all approved reviews for a product
export const getApprovedReviews = async (productId) => {
  try {
    await simulateDelay(500);
    return demoReviews.filter((r) => r.productId === productId);
  } catch (error) {
    console.error("Get Approved Reviews Error:", error);
    return [];
  }
};

// 3ï¸âƒ£ Get pending reviews (admin)
export const getPendingReviews = async () => {
  try {
    await simulateDelay(600);
    return demoReviews.filter((r) => r.status === "pending");
  } catch (error) {
    console.error("Get Pending Reviews Error:", error);
    return [];
  }
};

// 4ï¸âƒ£ Approve review (admin)
export const approveReview = async (reviewId) => {
  try {
    await simulateDelay(500);
    const index = demoReviews.findIndex((r) => r._id === reviewId);
    if (index !== -1) {
      demoReviews[index].status = "approved";
      return { success: true, message: "Review approved" };
    }
    return { success: false, message: "Review not found" };
  } catch (error) {
    console.error("Approve Review Error:", error);
    throw error;
  }
};

// 5ï¸âƒ£ Reject review (admin)
export const rejectReview = async (reviewId) => {
  try {
    await simulateDelay(500);
    const index = demoReviews.findIndex((r) => r._id === reviewId);
    if (index !== -1) {
      demoReviews[index].status = "rejected";
      return { success: true, message: "Review rejected" };
    }
    return { success: false, message: "Review not found" };
  } catch (error) {
    console.error("Reject Review Error:", error);
    throw error;
  }
};

// 7ï¸âƒ£ Delete review (user â€“ own review / admin)
export const deleteReview = async (reviewId) => {
  try {
    await simulateDelay(600);
    const index = demoReviews.findIndex((r) => r._id === reviewId);
    if (index !== -1) {
      demoReviews.splice(index, 1);
      return { success: true, message: "Review deleted" };
    }
    return { success: false, message: "Review not found" };
  } catch (error) {
    console.error("Delete Review Error:", error);
    throw error;
  }
};
