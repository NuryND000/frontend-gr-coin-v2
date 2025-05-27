import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";
import AuthContext from "../context/AuthContext";
import { deleteUser } from "../services/api";

const DataPelanggan = () => {
  const { id } = useParams();
  const { token, users, coinChanges, coinTransactions } = useContext(AuthContext);

  // Cari user berdasarkan ID dari URL
  const user = users.find((u) => u.id === parseInt(id));

  if (!user) {
    return <p className="has-text-centered mt-6">Pelanggan tidak ditemukan</p>;
  }

  const hitungTotalKoin = () => {
    const totalCoins = (coinChanges || [])
      .filter((c) => c.userId === user.id)
      .reduce((sum, coin) => sum + coin.amount, 0);
    const totalTransaction = (coinTransactions || [])
      .filter((t) => t.userId === user.id)
      .reduce((sum, t) => sum + t.amount, 0);
    return totalCoins - totalTransaction;
  };

  const handleDelete = async () => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus ${user.username}?`)) {
      try {
        await deleteUser(token, user.id); // Panggil API untuk menghapus pengguna
        alert("Pengguna berhasil dihapus.");
        window.location.href = "/home-admin"; // Redirect ke halaman utama admin
      } catch (error) {
        console.error("Gagal menghapus pengguna:", error);
        alert("Terjadi kesalahan saat menghapus pengguna.");
      }
    }
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="container mt-6">
        <div className="columns mt-6 is-1">
          <div className="column is-half has-text-left">
            <p className="is-size-3 mb-0 mt-0 has-text-warning">Hi, Admin!</p>
            <p className="title-no-1">Lihat Data</p>
            <p className="title-no-2">{user.username}</p>
            <p>
              Pantau dan perbarui data pelanggan untuk menjaga layanan tetap
              optimal.
            </p>

            <div className="buttons is-centered mt-3">
              <div className="control">
                <a
                  href={`/edit-pelanggan/${user.id}`}
                  className="button is-warning is-rounded"
                  style={{ maxHeight: "150px", width: "200px" }}
                >
                  Edit
                </a>
              </div>
              <div className="control">
                <button
                  onClick={handleDelete}
                  className="button is-custom-danger is-rounded"
                  style={{ maxHeight: "150px", width: "200px" }}
                >
                  Hapus
                </button>
              </div>
            </div>
            <img
              src="/Aset-website/GR Koin (4).png"
              alt="Placeholder"
              className="image"
            />
          </div>

          <div className="column mt-6">
            <div className="card card-custom">
              <div className="card-content">
                <div className="content">
                  <div className="columns">
                    <div className="column has-text-left">
                      <p className="is-size-4 mb-0 has-text-weight-bold has-text-black">
                        Jumlah Koin :
                      </p>
                      <a
                        href={`/tambah-koin/${user.id}`}
                        className="button is-rounded is-custom-success"
                      >
                        Tambah
                      </a>
                    </div>
                    <div className="column has-text-centered">
                      <div className="card">
                        <div className="content">
                          <p className="title-no-1">
                            {hitungTotalKoin().toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <div className="card card-custom mt-2 ">
                  <div className="card-content">
                    <div className="content has-text-centered">
                      <div className="card">
                        <div className="card-content">
                          <div className="content">
                            <p className="title-no-4 mb-0">No WA</p>
                            <p>{user.tlp}</p>
                            <p className="title-no-4 mb-0">Nama</p>
                            <p>{user.username}</p>
                            <p className="title-no-4 mb-0">Alamat</p>
                            <p>{user.alamat || "Tidak ada data"}</p>
                            <p className="title-no-4 mb-0">Wilayah</p>
                            <p>{user.wilayah || "Tidak ada data"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="card card-custom mt-2 ">
                  <div className="card-content">
                    <div className="card-image"></div>
                    <div className="content has-text-centered">
                      <p className="title-no-3 mb-2">Riwayat :</p>
                      {(coinTransactions || [])
                        .filter((t) => t.userId === user.id)
                        .map((t, index) => (
                          <div
                            className="card mb-3"
                            key={index}
                          >
                            <div className="card-content">
                              <p className="title-no-4 mb-0">{t.type}</p>
                              <p className="text-small">
                                {new Date(t.date).toLocaleDateString()} <br />
                                {t.amount.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
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

export default DataPelanggan;
