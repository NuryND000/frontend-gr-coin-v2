import React, { useContext, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CoinAnda from "../components/CoinAnda";
import AuthContext from "../context/AuthContext";
import { createTransactions } from "../services/api";

const TukarKoin = () => {
  const { token, coinChanges, coinTransactions, fetchData } = useContext(AuthContext);
  const [totalKoin, setTotalKoin] = useState("0");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const hitungTotalKoin = () => {
      try {
        const totalCoins = (coinChanges || []).reduce((sum, coin) => sum + coin.amount, 0);
        const totalTransaction = (coinTransactions || []).reduce((sum, t) => sum + t.amount, 0);
        setTotalKoin(totalCoins - totalTransaction);
      } catch (error) {
        console.error("Error calculating total coins:", error);
      }
    };

    hitungTotalKoin();
  }, [coinChanges, coinTransactions]);

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleTukarKoin = async () => {
    if (
      !amount ||
      isNaN(amount) ||
      Number(amount) < 10000 ||
      Number(amount) > totalKoin
    ) {
      setMessage(`Jumlah koin harus minimal 10.000 dan tidak lebih dari ${totalKoin} `);
      return;
    }

    try {
      const response = await createTransactions(token, amount);
      if (response?.status === 201) {
        fetchData();
        setMessage("Tukar koin berhasil!");
        setAmount(""); // Reset input setelah sukses
      } else {
        setMessage("Tukar koin gagal, coba lagi!");
      }
    } catch (error) {
      setMessage("Terjadi kesalahan, coba lagi nanti.");
      console.error("Error tukar koin:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-6">
        <div className="columns">
          {/* Kiri: Informasi */}
          <div className="column is-two-fifths has-text-left mt-6">
            <p className="title-no-1">Tukar Koin</p>
            <p>Pastikan jumlah minimal saldo Anda sebesar 10.000!</p>
            <img
              src={`${process.env.PUBLIC_URL}/Aset-website/tukar koin.png`}
              alt="Placeholder"
              className="image"
            />
          </div>

          {/* Kanan: Form Tukar Koin */}
          <div className="column mt-6">
            <CoinAnda />
            <div className="columns">
              <div className="column">
                <div className="card card-custom mt-2">
                  <div className="card-content">
                    <div className="card">
                      <div className="card-content">
                        <div className="content has-text-centered">
                          <p className="title-no-3">Tukar Koin</p>
                          <div className="field">
                            <div className="control">
                              <input
                                className="input is-warning is-rounded"
                                type="number"
                                placeholder="Masukkan Jumlah Koin"
                                name="amount"
                                value={amount}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          {message && (
                            <p className="has-text-danger">{message}</p>
                          )}
                          <div className="buttons is-centered">
                            <button
                              className="button is-warning is-rounded"
                              style={{ maxHeight: "150px", width: "200px" }}
                              onClick={handleTukarKoin}
                            >
                              Ya
                            </button>
                            <button
                              className="button is-danger is-rounded"
                              style={{ maxHeight: "150px", width: "200px" }}
                              onClick={() => setAmount("")}
                            >
                              Tidak
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TukarKoin;
