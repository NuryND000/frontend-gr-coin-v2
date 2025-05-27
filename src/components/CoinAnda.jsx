import React, { useEffect, useState, useContext, useCallback } from "react";
import AuthContext from "../context/AuthContext";

const CoinAnda = () => {
  const { coinChanges, coinTransactions } = useContext(AuthContext);
  const [totalKoin, setTotalKoin] = useState("0");

  useEffect(() => {
    const hitungTotalKoin = () => {
      try {
        const totalCoins = (coinChanges || []).reduce((sum, coin) => sum + coin.amount, 0);
        const totalTransaction = (coinTransactions || []).reduce((sum, t) => sum + t.amount, 0);
        setTotalKoin(formatUang(totalCoins - totalTransaction));
      } catch (error) {
        console.error("Error calculating total coins:", error);
      }
    };

    hitungTotalKoin();
  }, [coinChanges, coinTransactions]);

  // Fungsi untuk format uang dengan titik sebagai pemisah ribuan
  const formatUang = useCallback((nominal) => {
    if (!nominal) return "0";
    return nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }, []);

  return (
    <div className="card card-custom">
      <div className="card-content">
        <div className="content">
          <div className="columns">
            <div className="column has-text-left">
              <p className="is-size-4 mb-0 has-text-weight-bold has-text-black">
                Koin Anda :
              </p>
              <p>Gunakan GR Koin Anda untuk penukaran saldo E-Wallet DANA</p>
            </div>
            <div className="column has-text-centered">
              <div className="card">
                <div className="content">
                  <p className="title-no-1">{totalKoin}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinAnda;
