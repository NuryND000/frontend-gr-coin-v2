import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";
import { createCoinExchange } from "../services/api";
import AuthContext from "../context/AuthContext"; // Import AuthContext

const TambahPelanggan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, fetchData, use } = useContext(AuthContext);
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Konfirmasi sebelum menyimpan
    const konfirmasi = window.confirm(`Apakah Anda yakin ingin menambah ${amount} koin untuk pelanggan ini?`);
    if (!konfirmasi) return; // Jika batal, hentikan fungsi

    try {
      await createCoinExchange(token, id, amount);
      fetchData();
      alert("Berhasil Tambah Koin!");
      navigate(`/home-admin`);
    } catch (error) {
      console.error("Gagal Tambah Koin:", error);
      alert("Terjadi kesalahan saat Tambah Koin.");
    }
  };

  return (
    <div className="full-height">
      <NavbarAdmin />
      <div className="container mt-6">
        <div className="columns mt-6">
          <div className="column has-text-centered mt-4">
            <p className="title-no-2 has-text-weight-bold">Tambah Koin!</p>
            <p>Pastikan isian data pelanggan sudah benar sebelum disimpan!</p>
            <form onSubmit={handleSubmit}>
                          <div className="field mt-5">
                <div className="control">
                  <input
                    className="input is-warning is-rounded"
                    type="number"
                    placeholder="Masukkan Jumlah Koin"
                    name="koin"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{ maxHeight: "45px", width: "500px" }}
                    required
                  />
                </div>
              </div>
              <div className="field mt-5">
                <div className="control">
                  <input
                    className="input is-warning is-rounded"
                    type="number"
                    placeholder="Masukkan Jumlah Koin"
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

export default TambahPelanggan;
