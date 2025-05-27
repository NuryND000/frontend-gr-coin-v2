import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  getCoinExchanges, 
  getCoinExchangesAll, 
  getCoinTransactions, 
  getCoinTransactionsAll,
  getUser,
  getComplaintsAll,
  getComplaints 
} from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [coinChanges, setCoinChanges] = useState([]);
  const [coinTransactions, setCoinTransactions] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Simpan token dan user ke localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [token, user]);

  // Ambil data transaksi & koin setelah user diperbarui
  useEffect(() => {
    if (token && user?.role) {
      fetchData();
    }
  }, [token, user]);

  // Ambil data transaksi & koin berdasarkan role user
  const fetchData = async () => {
    try {
      if (user?.role === "admin") {
        const [coinChangeRes, coinTransactionRes, usersRes, complaintsRes] = await Promise.all([
          getCoinExchangesAll(token),
          getCoinTransactionsAll(token),
          getUser(token),
          getComplaintsAll(token)
        ]);
        setCoinChanges(coinChangeRes?.data || []);
        setCoinTransactions(coinTransactionRes?.data || []);
        setUsers(usersRes?.data || []);
        setComplaints(complaintsRes?.data || []);
      } else {
        const [coinChangeRes, coinTransactionRes, complaintsRes] = await Promise.all([
          getCoinExchanges(token),
          getCoinTransactions(token),
          getComplaints(token),
        ]);
        setCoinChanges(coinChangeRes?.data || []);
        setCoinTransactions(coinTransactionRes?.data || []);
        setComplaints(complaintsRes?.data || []);
      }
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
  };

  const login = (token, user) => {
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    setToken("");
    setUser(null);
    setCoinChanges([]);
    setCoinTransactions([]);
    setComplaints([]);
    setUsers([]);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, users, coinChanges, coinTransactions, complaints, fetchData, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
