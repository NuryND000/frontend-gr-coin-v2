import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";
import { updateCoinExchange } from "../services/api";
import AuthContext from "../context/AuthContext";

const UpdateKoin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, fetchData, coinChanges } = useContext(AuthContext);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (coinChanges && id) {
      const coinChange = coinChanges.find((c) => c.id === Number(id) || c.id === id);
      if (coinChange) {
        setAmount(coinChange.amount.toString());
      }
    }
  }, [coinChanges, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const konfirmasi = window.confirm(`Apakah Anda yakin ingin mengupdate jumlah koin menjadi ${amount}?`);
    if (!konfirmasi) return;

    try {
      await updateCoinExchange(token, id, amount);
      fetchData();
      alert("Berhasil Update Koin!");
      navigate(`/data-tambah-koin`);
    } catch (error) {
      console.error("Gagal Update Koin:", error);
      alert("Terjadi kesalahan saat Update Koin.");
    }
  };

  return (
    <div className="full-height">
      <NavbarAdmin />
      <div className="container mt-6">
        <div className="columns mt-6">
          <div className="column has-text-centered mt-4">
            <p className="title-no-2 has-text-weight-bold">Update Koin!</p>
            <p>Pastikan jumlah koin sudah benar sebelum disimpan!</p>
            <form onSubmit={handleSubmit}>
              <div className="field mt-5">
                <div className="control">
                  <input
                    className="input is-warning is-rounded"
                    type="number"
                    placeholder="Masukkan Jumlah Koin Baru"
                    name="koin"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{ maxHeight: "45px", width: "500px" }}
                    required
                  />
                </div>
              </div>
              <div className="buttons is-centered mt-6">
                <div className="control">
                  <button
                    type="submit"
                    className="button is-warning is-rounded"
                    style={{ maxHeight: "150px", width: "200px" }}
                  >
                    Simpan
                  </button>
                </div>
                <div className="control">
                  <a
                    href={`/home-admin`}
                    className="button is-custom-danger is-rounded"
                    style={{ width: "200px" }}
                  >
                    Batal
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateKoin;
