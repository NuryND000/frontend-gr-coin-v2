import React, { useContext, useState } from "react";
import NavbarAdmin from "../components/NavbarAdmin";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./HomeAdmin.css";
import { FaEdit, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import { deleteUser } from "../services/api";

const HomeAdmin = () => {
  const { user, users, coinChanges, coinTransactions, token } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  console.log(coinChanges);
  const hitungTotalKoin = (id) => {
    try {
      const totalCoins = (coinChanges || [])
        .filter((i) => i.userId === id)
        .reduce((sum, coin) => sum + coin.amount, 0);
      const totalTransaction = (coinTransactions || [])
        .filter((i) => i.userId === id)
        .reduce((sum, t) => sum + t.amount, 0);
      return formatUang(totalCoins - totalTransaction);
    } catch (error) {
      console.error("Error calculating total coins:", error);
      return "0";
    }
  };

  const formatUang = (nominal) => {
    if (!nominal) return "0";
    return nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.tlp.includes(searchTerm) ||  user.wilayah.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (user) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus ${user.username}?`)) {
      try {
        await deleteUser(token, user.id); // Panggil API untuk menghapus pengguna
        alert("Pengguna berhasil dihapus.");
        navigate('/home-admin');
      } catch (error) {
        console.error("Gagal menghapus pengguna:", error);
        alert("Terjadi kesalahan saat menghapus pengguna.");
      }
    }
  };

  return (
    <>
      <NavbarAdmin />
      <div className="container mt-4 is-fullhd">
        <div className="columns mt-6 p-0 is-fullwidth">
          <div className="column is-one-third has-text-left is-fullwidth">
            <p className="is-size-3 mb-0 mt-0 has-text-warning">Hi, {user.username}!</p>
            <p className="title-no-5">GR Koin</p>
            <p className="title-no-5">SYSTEM</p>
            <p>Kelola sistem dan pantau aktivitas pelanggan di sini.</p>
            
              <img src={`${process.env.PUBLIC_URL}/Aset-website/home admin.png`} alt="Placeholder" className="image" />
            
          </div>

          <div className="column" style={{ overflowX: 'auto', maxWidth: '100%' }}>
            <p className="title-no-5  has-text-centered">Data Pelanggan</p>
            <div className="card card-custom mt-4">
  <div className="card-content">
                <div className="content">
                  <div className="field">
                    <div className="columns">
                      <div className="column is-four-fifths">
                        <div className="control">
                          <input
                            className="input is-rounded is-small"
                            type="text"
                            placeholder="Cari Username atau Nomor Whatsapp atau Wilayah"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="column">
                        <div className="control">
                          <Link to="/tambah-pelanggan" className="button is-rounded is-custom-success is-small">
                            Tambah Pelanggan
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                  <div className="card-content">
<div className="table-container" style={{ overflowY: 'auto', maxHeight: '330px' }}>
  <table className="table is-striped is-fullwidth">
<thead>
  <tr>
    <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>No</th>
    <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>Nama</th>
    <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>No WhatsApp</th>
    <th style={{ whiteSpace: "nowrap", textAlign: "center" , width: "250px" }}>Alamat</th>
    <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>Wilayah</th>
    <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>E-Wallet</th>
    <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>Jumlah Koin</th>
    <th style={{ whiteSpace: "nowrap", textAlign: "center" }}>Aksi</th>
  </tr>
</thead>

    <tbody>
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user, i) => (
          <tr key={user.id}>
            <td>{i + 1}</td>
            <td>{user.username}</td>
            <td>{user.tlp}</td>
            <td style={{ width: "250px" }}>{user.alamat}</td>
            <td className=" has-text-centered">{user.wilayah || "-"}</td>
            <td className=" has-text-centered">{user.ewallet || "-"}</td>
            <td className=" has-text-centered">{hitungTotalKoin(user.id)}</td>
            <td style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
  <button
    onClick={() => handleDelete(user)}
    className="button is-danger is-small"
  >
    <FaTrashAlt />
  </button>
  <Link
    to={`/edit-pelanggan/${user.id}`}
    className="button is-warning is-small "
  >
    <FaEdit />
  </Link>
  <Link
    to={`/tambah-koin/${user.id}`}
    className="button is-info is-small"
  >
    <FaPlusCircle />
  </Link>
</td>

          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="7" className="has-text-centered">Tidak Ada Data</td>
        </tr>
      )}
    </tbody>
  </table>
</div>
</div>
</div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeAdmin;
