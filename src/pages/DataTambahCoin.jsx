import React, { useContext, useState } from "react";
import NavbarAdmin from "../components/NavbarAdmin";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { deleteCoinExchange } from "../services/api";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const DataTambahCoin = () => {
  const { users, coinChanges, token } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(""); // yyyy-mm-dd
  const [endDate, setEndDate] = useState(""); // yyyy-mm-dd
  const [sortOrder, setSortOrder] = useState("asc");

  // // Fungsi untuk cek apakah tanggal ada dalam rentang filter
  // const isWithinDateRange = (dateStr) => {
  //   if (!dateStr) return false;
  //   const date = new Date(dateStr);
  //   if (startDate && date < new Date(startDate)) return false;
  //   if (endDate && date > new Date(endDate + "T23:59:59")) return false; // Akhir hari endDate
  //   return true;
  // };
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;
  
  if (start) start.setHours(0, 0, 0, 0);
  if (end) end.setHours(23, 59, 59, 999);
  
  const filteredExchanges = coinChanges
    .filter((item) => {
      const user = users.find((user) => user.id === parseInt(item.userId));
      if (!user) return false;
  
      const transactionDate = new Date(item.date);
  
      const matchSearch =
      searchTerm === "" ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.tlp.includes(searchTerm);
  
      const matchDate =
        (!start || transactionDate >= start) &&
        (!end || transactionDate <= end);
  
      return matchSearch && matchDate;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  };

  const formatNumber = (num) => {
    if (!num) return "0";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleDelete = async (exchange) => {
    if (
      window.confirm(
        `Apakah Anda yakin ingin menghapus transaksi ${exchange.user.username} senilai ${exchange.amount}?`
      )
    ) {
      try {
        await deleteCoinExchange(token, exchange.id);
        alert("Transaksi berhasil dihapus.");
        window.location.reload();
      } catch (error) {
        console.error("Gagal menghapus transaksi:", error);
        alert("Terjadi kesalahan saat menghapus transaksi.");
      }
    }
  };

  const exportToExcel = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Data Tambah Koin");

  // Tambahkan judul dan periode tanggal
  worksheet.mergeCells("A1", "E1");
  worksheet.getCell("A1").value = "Data Tambah Koin Pelanggan Gerobak Rakyat";
  worksheet.getCell("A1").font = { size: 14, bold: true };
  worksheet.getCell("A1").alignment = { horizontal: "center" };

  worksheet.mergeCells("A2", "E2");
  worksheet.getCell("A2").value = `Data dari tanggal ${startDate || "-"} sampai ${endDate || "-"}`;
  worksheet.getCell("A2").alignment = { horizontal: "center" };

  worksheet.addRow([]);

  // Header tabel dimulai dari row ke-4
  const headerRowIndex = 4;
  worksheet.getRow(headerRowIndex).values = [
    "No",
    "Tanggal",
    "User",
    "No WA",
    "Jumlah Tambah Koin",
  ];

  worksheet.columns = [
    { key: "no", width: 5 },
    { key: "tanggal", width: 20 },
    { key: "user", width: 25 },
    { key: "noWA", width: 20 },
    { key: "jumlah", width: 20 },
  ];

  // Styling header
  worksheet.getRow(headerRowIndex).eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "F2AA4C" },
    };
    cell.alignment = { horizontal: "center" };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  // Tambahkan data
  let total = 0;
  filteredExchanges.forEach((item, index) => {
    const user = users.find((user) => user.id === parseInt(item.userId));
    total += item.amount || 0;
    worksheet.addRow({
      no: index + 1,
      tanggal: formatDate(item.date),
      user: user?.username || "-",
      noWA: user?.tlp || "-",
      jumlah: item.amount,
    });
  });

  // Styling isi tabel
  const startRow = headerRowIndex + 1;
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber >= startRow) {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        if (cell._column?.key === "jumlah") {
          cell.numFmt = "#,##0";
          cell.alignment = { horizontal: "right" };
        } else {
          cell.alignment = { horizontal: "left" };
        }
      });
    }
  });

  // Tambahkan total di bawah tabel
  const totalRow = worksheet.addRow([]);
  totalRow.getCell(4).value = "Total";
  totalRow.getCell(5).value = total;
  totalRow.getCell(4).font = { bold: true };
  totalRow.getCell(5).font = { bold: true };
  totalRow.getCell(5).numFmt = "#,##0";
  totalRow.getCell(4).alignment = { horizontal: "right" };
  totalRow.getCell(5).alignment = { horizontal: "right" };

  // Simpan file
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), "Data_Tambah_Koin.xlsx");
};


  return (
    <div className="full-height">
      <NavbarAdmin />
      <div className="container mt-6">
        <div className="columns mt-6">
          <div className="column has-text-centered mt-4">
            <p className="title-no-2 has-text-weight-bold">Data Tambah Koin!</p>
            <p>Cek seluruh riwayat penambahan koin pelanggan disini!</p>

            <div className="columns mt-5 is-centered is-vcentered">
              <div className="column is-3">
                <input
                  className="input is-warning is-rounded"
                  type="text"
                  placeholder="Cari Nama atau No WA"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="column is-3">
                <input
                  className="input is-warning is-rounded"
                  type="date"
                  placeholder="Tanggal Mulai"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="column is-3">
                <input
                  className="input is-warning is-rounded"
                  type="date"
                  placeholder="Tanggal Akhir"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="column is-2">
                <button
                  className="button is-warning is-rounded"
                  onClick={exportToExcel}
                >
                  Export Excel
                </button>
              </div>
            </div>

            <div
              className="table-container mt-3"
              style={{ maxHeight: "330px", overflowY: "auto" }}
            >
              <table className="table is-fullwidth is-striped">
                <thead>
                  <tr>
                    <th>No</th>
                    <th onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                      Tanggal {sortOrder === "asc" ? "↑" : "↓"}
                    </th>
                    <th>User</th>
                    <th>No WA</th>
                    <th>Jumlah Tambah Koin</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExchanges.length > 0 ? (
                    filteredExchanges.map((exchange, i) => {
                      const user = users.find((user) => user.id === parseInt(exchange.userId));
                      return (
                      <tr key={exchange.id}>
                        <td>{i + 1}</td>
                        <td>{formatDate(exchange.date)}</td>
                        <td>{user?.username || "-"}</td>
                        <td>{user?.tlp || "-"}</td>
                        <td>{formatNumber(exchange.amount)}</td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <Link
                              to={`/update-koin/${exchange.id}`}
                              className="button is-warning is-small"
                            >
                              <FaEdit />
                            </Link>
                            <button
                              onClick={() => handleDelete(exchange)}
                              className="button is-danger is-small"
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )})
                  ) : (
                    <tr>
                      <td colSpan="6" className="has-text-centered">
                        Tidak Ada Data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTambahCoin;