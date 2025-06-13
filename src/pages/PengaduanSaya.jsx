import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { createComplaint } from "../services/api"; 

const PengaduanSaya = () => {
  const { complaints, user, token, fetchData } = useContext(AuthContext);

  // State untuk input complaint
  const [complaint, setComplaint] = useState("");
  const [complaintss, setComplaints] = useState("");

useEffect(() => {
  if (user?.alamat) {
    setComplaint(`Terjadi keterlambatan di Wilayah ${user.wilayah}`);
  }
}, [user]);
  useEffect(() => {
    // Urutkan complaints berdasarkan status secara alfabetik (A-Z)
    const sortedComplaints = [...complaints].sort((a, b) => {
      if (a.status < b.status) return -1;
      if (a.status > b.status) return 1;
      return 0;
    });
  
    setComplaints(sortedComplaints);
  }, [complaints]);

  const handleChange = (e) => {
    setComplaint(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!complaint.trim()) {
      alert("Pengaduan tidak boleh kosong");
      return;
    }
    try {
      await createComplaint(token, user.id, complaint);
      alert("Pengaduan berhasil dikirim!");
      fetchData(); // Refresh data complaint
    } catch (error) {
      console.error("Gagal mengirim pengaduan:", error);
      alert("Terjadi kesalahan saat mengirim pengaduan.");
    }
  };

  const formatTanggal = (tanggal) => {
  const hari = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
  const bulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];

  const d = new Date(tanggal);
  const namaHari = hari[d.getDay()];
  const tanggalNum = d.getDate();
  const namaBulan = bulan[d.getMonth()];
  const tahun = d.getFullYear();

  const jam = d.getHours().toString().padStart(2, "0");
  const menit = d.getMinutes().toString().padStart(2, "0");

  return `${namaHari}, ${tanggalNum} ${namaBulan} ${tahun}. ${jam}:${menit}`;
};

  return (
    <div>
      <Navbar />
      <div className="container is-fullhd">
        <div className="columns mt-6 ">
          <div
  className="column is-two-fifths has-text-centered"
  style={{
    height: "480px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <p className="title-no-1">Komplain!</p>
  <form onSubmit={handleSubmit}>
    <div className="field mt-5">
      <div className="control">
  <input
    className="input is-warning is-rounded"
    type="text"
    placeholder="Tuliskan pengaduan Anda"
    name="complaint"
    value={complaint}
    onChange={handleChange}
    style={{
      maxHeight: "45px",
      width: "500px",
      textAlign: "center" // Tambahkan ini!
    }}
    autoComplete="off"
    required
  />
</div>

    </div>
    <div className="field mt-1">
      <div className="control">
        <button
          type="submit"
          className="button is-warning is-rounded is-small"
          style={{ maxHeight: "150px", width: "200px" }}
        >
          Adukan
        </button>
      </div>
    </div>
  </form>
</div>

          <div className="column mt-6">
            <div className="fixed-grid has-1-cols">
              <div className="grid">
                <div className="cell">
                  <div className="card card-custom mt-2 " style={{height : "480px", overflowX: 'auto'}}>
                    <div className="card-content">
                      {complaintss.length > 0 ? (
                        complaintss.map((t) => (
                          <div className="card mb-2" key={t.id}>
                            <div className="card-content">
                              <div className="content">
                                <div className="columns">
                                  <div className="column">
                                    <p className="title-no-3 m-0">{user.username}</p>
                                    <p className="is-size-7">
                                      {formatTanggal(t.date)}
                                      <br />
                                      {t.complaint}
                                    </p>
                                  </div>
                                  <div className="column has-text-right">
                                    {t.status === "pending" && (
                                      <span
                                        className="tag is-medium is-rounded mt-3 ml-4 is-custom-danger"
                                        style={{ maxHeight: "150px", width: "200px" }}
                                      >
                                        Diproses
                                      </span>
                                    )}

                                    {t.status === "selesai" && (
                                      <span
                                        className="tag is-medium is-rounded mt-3 ml-4 is-custom-success"
                                        style={{ maxHeight: "150px", width: "200px" }}
                                      >
                                        Selesai
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="card has-text-centered">
                          <div className="card-content">
                            <p className="title-no-3">Tidak ada Riwayat</p>
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
      </div>
    </div>
  );
};

export default PengaduanSaya;
