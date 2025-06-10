import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";
import { updateUser } from "../services/api";
import  AuthContext from "../context/AuthContext"; // Import AuthContext

const EditPelanggan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, token, fetchData } = useContext(AuthContext);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (users.length > 0) {
      const userData = users.find((user) => user.id === parseInt(id));
      if (userData) {
        setFormData({
          tlp: userData.tlp || "",
          password: "",
          username: userData.username || "",
          alamat: userData.alamat || "",
          wilayah: userData.wilayah || "",
          ewallet: userData.ewallet || "",
        });
      }
    }
  }, [users, id]);
  // Handle perubahan input
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

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Buat objek data yang akan dikirim
      const updateData = {
        username: formData.username,
        alamat: formData.alamat,
        wilayah: formData.wilayah,
        tlp: formData.tlp,
        ewallet: formData.ewallet,
      };

      console.log(updateData);
  
      // Jika pengguna mengisi password, tambahkan ke updateData
      if (formData.password.trim() !== "") {
        updateData.password = formData.password;
      }
  
      await updateUser(token, id, updateData);
      alert("Data pelanggan berhasil diperbarui!");
      fetchData();
      navigate(`/home-admin`);
    } catch (error) {
      console.error("Gagal memperbarui pelanggan:", error);
      alert("Terjadi kesalahan saat memperbarui pelanggan.");
    }
  };
  

  return (
    <div className="full-height">
      <NavbarAdmin />
      <div className="container mt-6">
        <div className="columns">
          <div className="column has-text-centered mt-4">
            <p className="title-no-2 has-text-weight-bold">Edit Data Pelanggan!</p>
            <p>Pastikan isian data pelanggan sudah benar sebelum disimpan!</p>

            <form onSubmit={handleSubmit}>
              <div className="field mt-5">
                <div className="control">
                  <input
                    className="input is-warning is-rounded"
                    type="text"
                    placeholder="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    style={{ maxHeight: "45px", width: "500px" }}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className="input is-warning is-rounded"
                    type="text"
                    placeholder="tlp WA"
                    name="tlp"
                    value={formData.tlp}
                    onChange={handleChange}
                    style={{ maxHeight: "45px", width: "500px" }}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className="input is-warning is-rounded"
                    type="text"
                    placeholder="ewallet"
                    name="ewallet"
                    value={formData.ewallet}
                    onChange={handleChange}
                    style={{ maxHeight: "45px", width: "500px" }}
                    required
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
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className="input is-warning is-rounded"
                    type="text"
                    placeholder="wilayah"
                    name="wilayah"
                    value={formData.wilayah}
                    onChange={handleChange}
                    style={{ maxHeight: "45px", width: "500px" }}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className="input is-warning is-rounded"
                    type="text"
                    placeholder="Password (Opsional)"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    style={{ maxHeight: "45px", width: "500px" }}
                  />
                </div>
              </div>

              <div className="buttons is-centered mt-4 mb-4">
                <button
                  type="submit"
                  className="button is-warning is-rounded"
                  style={{ maxHeight: "150px", width: "200px" }}
                >
                  Simpan
                </button>
                <Link
                  to={`/home-admin`}
                  className="button is-custom-danger is-rounded"
                  style={{ maxHeight: "150px", width: "200px" }}
                >
                  Batal
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPelanggan;
