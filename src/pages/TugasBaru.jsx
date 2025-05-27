import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import NavbarAdmin from "../components/NavbarAdmin";
import { updateTransaction } from "../services/api";

const TugasBaru = () => {
  const { token, users, coinTransactions } = useContext(AuthContext);
  const [tugas, setTugas] = useState([]);

  // Filter tugas baru dengan status "proses"
  useEffect(() => {
    setTugas(coinTransactions.filter((t) => t.status === "proses"));
  }, [coinTransactions]);

  const Selesai = async (id) => {
    // Konfirmasi sebelum menyelesaikan tugas
    const konfirmasi = window.confirm("Apakah Anda yakin ingin menyelesaikan tugas ini?");
    if (!konfirmasi) return; // Jika batal, hentikan fungsi

    try {
      await updateTransaction(token, id);
      setTugas((prev) => prev.filter((t) => t.id !== id)); // Hapus dari state setelah update
      alert("Tugas berhasil diselesaikan!");
    } catch (error) {
      console.error("Gagal memperbarui:", error);
      alert("Terjadi kesalahan saat memperbarui.");
    }
  };

  const uang = (nominal) => {
    return nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="container mt-6">
        <div className="columns mt-6">
          <div className="column is-half has-text-left">
            <p className="is-size-3 mb-0 mt-0 has-text-warning">Hi, Admin!</p>
            <p className="title-no-1">Tugas Baru</p>
            <p className="title-no-2">Kelola Penukaran</p>
            <p>Pastikan setiap penukaran koin diproses dengan cepat dan akurat.</p>
            <img src="/Aset-website/home admin.png" alt="Admin" className="image" />
          </div>
          <div className="column mt-6">
            <div className="card card-custom">
              <div className="card-content">
                <div className="content">
                  {tugas.length > 0 ? (
                    tugas.map((t) => (
                      <div className="card mb-2" key={t.id}>
                        <div className="card-content has-text-left">
                          <div className="columns">
                            <div className="column">
                              <p className="title-no-4 mb-0">
                                {users.find((user) => user.id === parseInt(t.userId))?.tlp}
                              </p>
                              <p>Tukar koin {uang(t.amount)}</p>
                            </div>
                            <div className="column">
                              <a
                                href={`/data-pelanggan/${t.userId}`}
                                className="button is-custom-success is-rounded"
                                style={{ width: "150px" }}
                              >
                                Lihat Data
                              </a>
                            </div>
                            <div className="column">
                              <button
                                onClick={() => Selesai(t.id)}
                                className="button is-custom-danger is-rounded"
                                style={{ width: "150px" }}
                              >
                                Selesai
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="card has-text-centered">
                      <div className="card-content">
                        <p className="title-no-3">Tidak ada Tugas</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TugasBaru;
