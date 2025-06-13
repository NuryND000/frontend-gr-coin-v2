import axios from "axios";

const API_URL = "https://gr-coins.myuniv.cloud/api"; // URL backend

// Membuat instance axios dengan konfigurasi default
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Fungsi untuk menambahkan token ke header Authorization
const setAuthHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// ======= AUTENTIKASI =======
export const registerUser = async (userData) => {
  try {
    return await axiosInstance.post("/register", userData);
  } catch (error) {
    console.error("Register Error:", error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/login", credentials);
    return { token: response.data.token, user: response.data.user };
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};

export const getUser = async (token) => {
  try {
    return await axiosInstance.get("/users", setAuthHeader(token));
  } catch (error) {
    console.error("Get User Error:", error.response?.data || error.message);
    throw error;
  }
};

export const updateUser = async (token, id, userData) => {
    try {
      return await axiosInstance.put(`/user/${id}`, userData,  setAuthHeader(token));
    } catch (error) {
      console.error("Update User Error:", error.response?.data || error.message);
      throw error;
    }
  };

  export const deleteUser = async (token, id) => {
    try {
      return await axiosInstance.delete(`/user/${id}`,  setAuthHeader(token));
    } catch (error) {
      console.error("Delete User Error:", error.response?.data || error.message);
      throw error;
    }
  };

  export const changePassword = async (token,  oldPassword, newPassword) => {
  try {
    return await axiosInstance.post("/changepassword",
      { oldPassword, newPassword }, setAuthHeader(token));
  } catch (error) {
    console.error("Change Password Error:", error.response?.data || error.message);
    throw error;
  }
};

// ======= COIN EXCHANGE =======
export const getCoinExchanges = async (token) => {
  try {
    return await axiosInstance.get("/coinexchange", setAuthHeader(token));
  } catch (error) {
    console.error("Get Coin Exchange Error:", error.response?.data || error.message);
    throw error;
  }
};

export const getCoinExchangesAll = async (token) => {
  try {
    return await axiosInstance.get("/coinexchange/all", setAuthHeader(token));
  } catch (error) {
    console.error("Get Coin Exchange All Error:", error.response?.data || error.message);
    throw error;
  }
};

export const createCoinExchange = async ( token, id, amount) => {
  try {
    return await axiosInstance.post(`/coinexchange/${id}`, { amount }, setAuthHeader(token));
  } catch (error) {
    console.error("Create Coin Exchange Error:", error.response?.data || error.message);
    throw error;
  }
};

export const updateCoinExchange = async (token, id, amount) => {
    try {
      return await axiosInstance.put(`/coinexchange/${id}`, { amount }, setAuthHeader(token));
    } catch (error) {
      console.error("Update Coins Error:", error.response?.data || error.message);
      throw error;
    }
  };
  
export const deleteCoinExchange = async (token, id) => {
    try {
      return await axiosInstance.delete(`/coinexchange/${id}`, setAuthHeader(token));
    } catch (error) {
      console.error("delete Coins Error:", error.response?.data || error.message);
      throw error;
    }
  };

// ======= COIN TRANSACTION =======
export const getCoinTransactions = async (token) => {
  try {
    return await axiosInstance.get("/cointransaction", setAuthHeader(token));
  } catch (error) {
    console.error("Get Coin Transaction Error:", error.response?.data || error.message);
    throw error;
  }
};

export const getCoinTransactionsAll = async (token) => {
  try {
    return await axiosInstance.get("/cointransaction/all", setAuthHeader(token));
  } catch (error) {
    console.error("Get Coin Transaction All Error:", error.response?.data || error.message);
    throw error;
  }
};

export const createTransactions = async (token, amount) => {
  try {
    return await axiosInstance.post("/cointransaction", { amount }, setAuthHeader(token));
  } catch (error) {
    console.error("Create Transaction Error:", error.response?.data || error.message);
    throw error;
  }
};

export const updateTransaction = async (token, id) => {
    try {
      return await axiosInstance.put(`/cointransaction/${id}`, { status: "selesai" }, setAuthHeader(token));
    } catch (error) {
      console.error("Update Transaction Error:", error.response?.data || error.message);
      throw error;
    }
  };
  
export const deleteTransaction = async (token, id) => {
    try {
      return await axiosInstance.delete(`/cointransaction/${id}`, setAuthHeader(token));
    } catch (error) {
      console.error("delete Transaction Error:", error.response?.data || error.message);
      throw error;
    }
  };

  // ======= COMPLAINT =======

export const getComplaints = async (token) => {
  try {
    return await axiosInstance.get("/complaint", setAuthHeader(token));
  } catch (error) {
    console.error("Get Complaint Error:", error.response?.data || error.message);
    throw error;
  }
};

export const getComplaintsAll = async (token) => {
  try {
    return await axiosInstance.get("/complaint/all", setAuthHeader(token));
  } catch (error) {
    console.error("Get All Complaints Error:", error.response?.data || error.message);
    throw error;
  }
};

export const createComplaint = async (token, userId, complaintText) => {
  try {
    return await axiosInstance.post(
      `/complaint/${userId}`,
      { complaint: complaintText },
      setAuthHeader(token)
    );
  } catch (error) {
    console.error("Create Complaint Error:", error.response?.data || error.message);
    throw error;
  }
};

export const updateComplaint = async (token, complaintId, complaintText, status) => {
  try {
    return await axiosInstance.put(
      `/complaint/${complaintId}`,
      { complaint: complaintText, status },
      setAuthHeader(token)
    );
  } catch (error) {
    console.error("Update Complaint Error:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteComplaint = async (token, complaintId) => {
  try {
    return await axiosInstance.delete(
      `/complaint/${complaintId}`,
      setAuthHeader(token)
    );
  } catch (error) {
    console.error("Delete Complaint Error:", error.response?.data || error.message);
    throw error;
  }
};
