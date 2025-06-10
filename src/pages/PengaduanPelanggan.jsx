import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import NavbarAdmin from "../components/NavbarAdmin";
import { updateComplaint  } from "../services/api";

const PengaduanPelanggan = () => {
  const { token, users, complaints, fetchData } = useContext(AuthContext);
  const [complaint, setComplaints] = useState([]);

  // Filter complaint baru dengan status "proses"
  useEffect(() => {
    // Urutkan complaints berdasarkan status secara alfabetik (A-Z)
    const sortedComplaints = [...complaints].sort((a, b) => {
      if (a.status < b.status) return -1;
      if (a.status > b.status) return 1;
      return 0;
    });
  
    setComplaints(sortedComplaints);
  }, [complaints]);
  

  const Selesai = async (id) => {
  const konfirmasi = window.confirm("Apakah Anda yakin ingin menyelesaikan Pengaduan ini?");
  if (!konfirmasi) return;

  try {
    await updateComplaint(token, id, "", "selesai");
    alert("Complaint berhasil diselesaikan!");
    fetchData();
  } catch (error) {
    console.error("Gagal memperbarui:", error);
    alert("Terjadi kesalahan saat memperbarui.");
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
      <NavbarAdmin />
      <div className="container mt-6 is-fullhd">
        <div className="columns mt-6">
          <div className="column  is-one-third has-text-left">
            <p className="is-size-3 mb-0 mt-0 has-text-warning">Hi, Admin!</p>
            <p className="title-no-1">Data</p>
            <p className="title-no-2">Komplain</p>
            <p>Selesaikan komplain pelanggan secepatnya!</p>
            <img src={`${process.env.PUBLIC_URL}/Aset-website/home admin.png`} alt="Admin" className="image" />
          </div>
          <div className="column mt-6">
            <div className="card card-custom">
              <div className="card-content" style={{height : "480px", overflowX: 'auto'}}>
                <div className="content">
                  {complaint.length > 0 ? (
                    complaint.map((t) => (
                      <div className="card mb-2" key={t.id}>
                        <div className="card-content has-text-left">
                          <div className="columns">
                            <div className="column">
                              <p className="title-no-4 mb-0">
                                {users.find((user) => user.id === parseInt(t.userId))?.username}
                              </p>
                              <p>
                                {formatTanggal(t.date)}
                                <br />
                                {t.complaint}
                              </p>

                            </div>
                            <div className="column has-text-right">
                            {t.status === "pending" ? (
																<button
																	onClick={() => Selesai(t.id)}
																	className="button is-custom-danger is-rounded"
																	style={{ width: "150px" }}
																>
																	Selesai
																</button>
															) : (
																<button
																	className="button is-custom-success is-rounded"
																	style={{ width: "150px" }}
																	disabled
																>
																	Selesai
																</button>
															)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="card has-text-centered">
                      <div className="card-content">
                        <p className="title-no-3">Tidak ada complaint</p>
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

export default PengaduanPelanggan;
