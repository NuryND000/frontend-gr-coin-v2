import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { changePassword } from "../services/api"; // pastikan ada fungsi ini di API service
import AuthContext from "../context/AuthContext";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi sederhana confirm password
    if (formData.newPassword !== formData.confirmNewPassword) {
      setError("Password baru dan konfirmasi tidak cocok");
      return;
    }

    try {
      console.log(formData);
      await changePassword(token, formData.oldPassword, formData.newPassword);
      alert("Password berhasil diubah!");
      navigate("/home-admin"); // atau halaman lain sesuai kebutuhan
    } catch (err) {
      console.error("Gagal mengganti password:", err);
      setError(err.response?.data?.error || "Terjadi kesalahan");
    }
  };

  return (
    <div className="full-height">
      <Navbar />
      <div className="container mt-6">
        <div className="columns">
          <div className="column has-text-centered mt-4">
            <p className="title-no-2 has-text-weight-bold">Ganti Password</p>
            <p>Pastikan password baru sudah benar sebelum disimpan!</p>

            <form onSubmit={handleSubmit}>
              <div className="field mt-5">
                <div className="control">
                  <input
                    className="input is-warning is-rounded"
                    type="password"
                    placeholder="Password Lama"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    style={{ maxHeight: "45px", width: "500px" }}
                    autoComplete="current-password"
                    required
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className="input is-warning is-rounded"
                    type="password"
                    placeholder="Password Baru"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    style={{ maxHeight: "45px", width: "500px" }}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className="input is-warning is-rounded"
                    type="password"
                    placeholder="Konfirmasi Password Baru"
                    name="confirmNewPassword"
                    value={formData.confirmNewPassword}
                    onChange={handleChange}
                    style={{ maxHeight: "45px", width: "500px" }}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="has-text-danger" style={{ marginBottom: "1rem" }}>
                  {error}
                </p>
              )}

              <div className="buttons is-centered mt-6 mb-6">
                <button
                  type="submit"
                  className="button is-warning is-rounded"
                  style={{ maxHeight: "150px", width: "200px" }}
                >
                  Ganti Password
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/home-admin")}
                  className="button is-custom-danger is-rounded"
                  style={{ maxHeight: "150px", width: "200px" }}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
