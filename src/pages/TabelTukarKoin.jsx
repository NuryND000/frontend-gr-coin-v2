import React, { useState, useContext } from "react";
import NavbarAdmin from "../components/NavbarAdmin";
import AuthContext from "../context/AuthContext";
// eslint-disable-next-line no-unused-vars
import ExcelJS from "exceljs";
// eslint-disable-next-line no-unused-vars
import { saveAs } from "file-saver";

const TabelTukarKoin = () => {
  const { users, coinTransactions } = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const uang = (nominal) => nominal.toLocaleString("id-ID");

  const formatDate = (date) => {
    if (!date) return "-";
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(date).toLocaleDateString("id-ID", options);
  };

  const filteredTransactions = coinTransactions
    .filter((item) => {
      const user = users.find((user) => user.id === parseInt(item.userId));
      if (!user) return false;

      const transactionDate = new Date(item.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start) start.setHours(0, 0, 0, 0);
      if (end) end.setHours(23, 59, 59, 999);

      const matchSearch =
        search === "" ||
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.tlp.includes(search);

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

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Tukar Koin");

    // Header utama
    worksheet.mergeCells("A1:F1");
    worksheet.getCell("A1").value = "Data Tukar Koin Pelanggan Gerobak Rakyat";
    worksheet.getCell("A1").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("A1").font = { bold: true, size: 14, color: { argb: "187078" } };

    worksheet.mergeCells("A2:F2");
    worksheet.getCell("A2").value = `Periode: ${formatDate(startDate)} - ${formatDate(endDate)}`;
    worksheet.getCell("A2").alignment = { horizontal: "center", vertical: "middle" };

    // Header tabel
    const headers = ["No", "Tanggal", "Nama", "No WA", "Jumlah", "Status"];
    const headerRow = worksheet.addRow(headers);
    headerRow.eachCell((cell) => {
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "187078" } };
      cell.font = { bold: true, color: { argb: "FFFFFF" } };
      cell.alignment = { horizontal: "center", vertical: "middle" };
    });

    worksheet.getColumn(1).width = 5;
    worksheet.getColumn(2).width = 15;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(5).width = 15;
    worksheet.getColumn(6).width = 12;

    let totalPenarikan = 0;
    filteredTransactions.forEach((item, index) => {
      const user = users.find((user) => user.id === parseInt(item.userId));
      totalPenarikan += item.amount;
      const row = worksheet.addRow([
        index + 1,
        formatDate(item.date),
        user?.username || "-",
        user?.tlp || "-",
        uang(item.amount),
        item.status === "proses" ? "Proses" : "Selesai",
      ]);

      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    worksheet.addRow([]);
    const totalRow = worksheet.addRow(["", "", "", "Total Penarikan", uang(totalPenarikan)]);
    totalRow.getCell(4).font = { bold: true };
    totalRow.getCell(5).font = { bold: true };

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "Riwayat_Tukar_Koin.xlsx");
  };

  return (
    <div className="full-height">
      <NavbarAdmin />
      <div className="container mt-6">
        <div className="columns mt-6">
          <div className="column has-text-centered mt-4">
            <p className="title-no-2 has-text-weight-bold">Data Tukar Koin!</p>
            <p>Cek seluruh riwayat tukar koin pelanggan disini!</p>

            <div className="columns mt-5 is-centered">
              <div className="column is-3">
                <input
                  className="input is-warning is-rounded"
                  type="text"
                  placeholder="Cari Nama / No WA"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="column is-2">
                <input
                  className="input is-warning is-rounded"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <p className="title-no-4 mt-5">s/d</p>
              <div className="column is-2">
                <input
                  className="input is-warning is-rounded"
                  type="date"
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

            <div className="table-container mt-3">
              <table className="table is-fullwidth is-striped">
                <thead>
                  <tr>
                    <th>No</th>
                    <th onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                      Tanggal {sortOrder === "asc" ? "↑" : "↓"}
                    </th>
                    <th>Nama</th>
                    <th>No WA</th>
                    <th>Jumlah Tukar Koin</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((item, index) => {
                      const user = users.find((user) => user.id === parseInt(item.userId));
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{formatDate(item.date)}</td>
                          <td>{user?.username || "-"}</td>
                          <td>{user?.tlp || "-"}</td>
                          <td>{uang(item.amount)}</td>
                          <td>
                            <span
                              className={`tag ${
                                item.status === "proses"
                                  ? "is-warning"
                                  : "is-success"
                              }`}
                            >
                              {item.status === "proses" ? "Proses" : "Selesai"}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6">Tidak ada data yang ditemukan.</td>
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

export default TabelTukarKoin;