import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Navbar from "../components/Navbar";
import CoinAnda from "../components/CoinAnda";

const RiwayatKoin = () => {
  const { coinTransactions } = useContext(AuthContext);

  const uang = (nominal) => {
    var number_string = nominal.toString(),
      sisa = number_string.length % 3,
      rupiah = number_string.substr(0, sisa),
      ribuan = number_string.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
      var separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }
    return rupiah;
  };
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="columns mt-6">
          <div className="column is-two-fifths has-text-left mt-6">
            <p className="title-no-1">Riwayat</p>
            <p className="title-no-2">Tukar Koin</p>
            <p>Pantau semua penukaran koin Anda di sini!</p>
            <img
              src="/Aset-website/riwayat tukar koin.png"
              alt="Placeholder"
              className="image"
            />
          </div>

          <div className="column mt-6">
            <div className="fixed-grid has-1-cols">
              <div className="grid">
                <div className="cell mt-2 mb-4">
                  <CoinAnda />
                </div>
                <div className="cell">
                  <div className="card card-custom mt-2">
                    <div className="card-content">
                      {coinTransactions.length > 0 ? (
                        coinTransactions.map((transaction, index) => (
                          <div
                            className="card"
                            key={transaction.id}
                          >
                            <div className="card-content">
                              <div className="content">
                                <div className="columns">
                                  <div className="column">
                                    <p className="title-no-3 m-0">Tukar Koin</p>
                                    <p className="is-size-7">
                                      {new Date(
                                        transaction.date,
                                      ).toLocaleDateString("id-ID", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                      })}
                                      <br></br>
                                      Rp.{uang(transaction.amount)}
                                    </p>
                                  </div>
                                  <div className="column">
                                    {transaction.status === "proses" && (
                                      <span
                                        className="tag is-medium is-rounded mt-3 ml-4 is-custom-danger"
                                        style={{
                                          maxHeight: "150px",
                                          width: "200px",
                                        }}
                                      >
                                        Diproses
                                      </span>
                                    )}

                                    {transaction.status === "selesai" && (
                                      <span
                                        className="tag is-medium is-rounded mt-3 ml-4 is-custom-success"
                                        style={{
                                          maxHeight: "150px",
                                          width: "200px",
                                        }}
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

export default RiwayatKoin;
