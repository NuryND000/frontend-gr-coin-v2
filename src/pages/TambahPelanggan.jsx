import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";
import { registerUser } from "../services/api"; // Pastikan ada fungsi ini di API service
import AuthContext from "../context/AuthContext"; // Import AuthContext

const TambahPelanggan = () => {
  const navigate = useNavigate();
  const { token, fetchData } = useContext(AuthContext);
  const [sameAsPhone, setSameAsPhone] = useState(false);
  // State untuk menyimpan input form
  const [formData, setFormData] = useState({
    tlp: "",
    password: "",
    username: "",
    alamat: "",
    wilayah: "",
    ewallet: "",
    role: "user",
  });

  // Handle perubahan input form
  const handleChange = (e) => {
  const { name, value } = e.target;
      if (name === "tlp" || name === "ewallet") {
    // Jika bukan angka, hentikan perubahan
    if (!/^\d*$/.test(value)) return;
  }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleCheckbox = () => {
  const newValue = !sameAsPhone;
  setSameAsPhone(newValue);
  if (newValue) {
    // Kalau dicentang, samakan ewallet dengan tlp
    setFormData({ ...formData, ewallet: formData.tlp });
  }
};

useEffect(() => {
  if (sameAsPhone) {
    setFormData((prev) => ({ ...prev, ewallet: prev.tlp }));
  }
}, [formData.tlp, sameAsPhone]);

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const user = await registerUser(formData);
      fetchData();
      alert("Pelanggan berhasil ditambahkan!");
      navigate(`/home-admin`); // Arahkan ke halaman data pelanggan setelah sukses
    } catch (error) {
      console.error("Gagal menambahkan pelanggan:", error);
      alert("Terjadi kesalahan saat menambahkan pelanggan.");
    }
  };

  return (
    <div className="full-height">
      <NavbarAdmin />
      <div className="container mt-6">
        <div className="columns">
          <div className="column has-text-centered mt-4">
            <p className="title-no-2 has-text-weight-bold">Tambah Pelanggan!</p>
            <p>Pastikan isian data pelanggan sudah benar sebelum disimpan!</p>

            <form onSubmit={handleSubmit}>
            <div className="field mt-5">
                <div className="control">
                  <input
                    className="input is-warning is-rounded"
                    type="text"
                    placeholder="Nama"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    style={{ maxHeight: "45px", width: "500px" }}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className="input is-warning is-rounded"
                    type="text"
                    placeholder="Nomor WA"
                    name="tlp"
                    value={formData.tlp}
                    onChange={handleChange}
                    style={{ maxHeight: "45px", width: "500px" }}
                    required
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="field">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={sameAsPhone}
                  onChange={handleCheckbox}
                  style={{ marginRight: "8px" }}
                />
                E-wallet sama dengan Nomor WA
              </label>
            </div>


              <div className="field">
                <div className="control">
                   <input
                      className="input is-warning is-rounded"
                      type="text"
                      placeholder="E-wallet"
                      name="ewallet"
                      value={formData.ewallet}
                      onChange={handleChange}
                      style={{ maxHeight: "45px", width: "500px" }}
                      required
                      autoComplete="off"
                      disabled={sameAsPhone}
                    />

                </div>
              </div>

              
              <div className="field">
                <div className="control">
                  <input
                    className="input is-warning is-rounded"
                    type="text"
                    placeholder="Alamat"
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    style={{ maxHeight: "45px", width: "500px" }}
                    required
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className="input is-warning is-rounded"
                    type="text"
                    placeholder="Wilayah"
                    name="wilayah"
                    value={formData.wilayah}
                    onChange={handleChange}
                    style={{ maxHeight: "45px", width: "500px" }}
                    required
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className="input is-warning is-rounded"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    style={{ maxHeight: "45px", width: "500px" }}
                    required
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <div className="buttons is-centered mt-6 mb-6">
                <button
                  type="submit"
                  className="button is-warning is-rounded"
                  style={{ maxHeight: "150px", width: "200px" }}
                >
                  Simpan
                </button>
                <a
                  href="/home-admin"
                  className="button is-custom-danger is-rounded"
                  style={{ maxHeight: "150px", width: "200px" }}
                >
                  Batal
                </a>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahPelanggan;
