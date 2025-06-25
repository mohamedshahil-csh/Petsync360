import axios from "axios";

const baseUrl = "https://shop.petsync.in";
const consumerKey = "ck_48a6ad0ec07dbffcd2c63179253fe4e21f4d4dcf";
const consumerSecret = "cs_6717ea8c32452aca32c878fe841a86f793e2827d";

const authString = btoa(`${consumerKey}:${consumerSecret}`);

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Basic ${authString}`,
    "Content-Type": "application/json",
  },
});

export const getCoupons = () => {
  return apiClient.get<any[]>("/wp-json/wc/v3/coupons");
};

export const getCouponsDetails = (couponId: number) => {
  return apiClient.get<any[]>("/wp-json/wc/v3/coupons/" + couponId);
};
export const getVendors = () => {
  return apiClient.get<any[]>("/wp-json/wcfmmp/v1/store-vendors");
};

export const getProducts = (params?: { page?: number; per_page?: number, search?: string }) => {
  return apiClient.get<any[]>("/wp-json/wc/v3/products", { params });
};

export const getProductDetails = (productId: number) => {
  return apiClient.get<any>(`/wp-json/wc/v3/products/${productId}`);
};

export const getProductVariations  = (productId: number) => {
  return apiClient.get<any>(`/wp-json/wc/v3/products/${productId}/variations`);
};


export const getProductCategories = () => {
  return apiClient.get<any[]>("/wp-json/wc/v3/products/categories");
}

export const getOrders = (params?: { page?: number; per_page?: number; status?: string; search?: string }) => {
  return apiClient.get<any[]>("/wp-json/wc/v3/orders", { params });
};

export const getOrderDetails = (orderId: number) => {
  return apiClient.get<any>(`/wp-json/wc/v3/orders/${orderId}`);
};

export const getCompletedOrdersWithinDateRange = (after: string, before: string, params?: { page?: number; per_page?: number }) => {
  return apiClient.get<any[]>("/wp-json/wc/v3/orders", {
    params: {
      status: "completed",
      after,
      before,
      ...params,
    },
  });
};
export const getOrderTotals = () => {
  return apiClient.get<any>(`/wp-json/wc/v3/reports/orders/totals`);
};

export const getProductTotals = () => {
  return apiClient.get<any>(`/wp-json/wc/v3/reports/products/totals`);
};
/**
 * Create a new coupon.
 * @param couponData - Object with coupon details as per WooCommerce API
 */
export const createCoupon = (couponData: Record<string, any>) => {
  return apiClient.post("/wp-json/wc/v3/coupons", couponData);
};

/**
 * Delete a coupon by ID.
 * @param couponId - The ID of the coupon to delete.
 * @param force - Whether to permanently delete the coupon (default: false, moves to trash).
 */
export const deleteCoupon = (couponId: number, force = false) => {
  return apiClient.delete(`/wp-json/wc/v3/coupons/${couponId}`, {
    params: {
      force, // true to permanently delete
    },
  });
};
