import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import CoinAnda from "../components/CoinAnda";

const HomeUser = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Navbar />
      <div className="container mt-5 is-fullhd">
        <div className="columns mt-6 is-desktop">
          <div className="column is-two-fifths has-text-left">
            <p className="is-size-3 mb-0 mt-0 has-text-warning">
              Hi, {user?.username || "User"}!
            </p>
            <p className="title-no-1">GR Koin</p>
            <p className="title-no-2">SYSTEM</p>
            <p>Kumpulkan koin lebih banyak dan nikmati keuntungannya!</p>
            <img src="/Aset-website/home user.png" alt="Placeholder" className="image" />
          </div>

          <div className="column mt-6">
            <CoinAnda/>

            {/* Kartu Menu */}
            <div className="columns">
              <Link className="column" to="/tukar-koin">
                <div className="card card-custom mt-2" style={{ height: "250px" }}>
                  <div className="card-content">
                    <div className="card-image">
                      <figure className="image">
                        <img src="/Aset-website/koin.png" alt="Tukar Koin" />
                      </figure>
                    </div>
                    <div className="content has-text-centered">
                      <p className="is-size-6 mb-0 has-text-weight-bold has-text-black">Tukar Koin</p>
                      <p className="is-size-6">Minimal penukaran 10.000 koin</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link className="column" to="/riwayat-koin">
                <div className="card card-custom mt-2" style={{ height: "250px" }}>
                  <div className="card-content">
                    <div className="card-image">
                      <figure className="image">
                        <img src="/Aset-website/riwayat.png" alt="Riwayat Koin" />
                      </figure>
                    </div>
                    <div className="content has-text-centered">
                      <p className="is-size-6 mb-0 has-text-weight-bold has-text-black">Riwayat<br /> Koin</p>
                      <p className="is-size-6">Lihat transaksi</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link className="column" to="/pengaduan-saya">
                <div className="card card-custom mt-2" style={{ height: "250px" }}>
                  <div className="card-content">
                    <div className="card-image">
                      <figure className="image">
                        <img src="/Aset-website/pengaduan.png" alt="Pengaduan" />
                      </figure>
                    </div>
                    <div className="content has-text-centered">
                      <p className="is-size-6 mb-0 has-text-weight-bold has-text-black">Pengaduan</p>
                      <p className="is-size-6">Tentang Gerobak Rakyat</p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Menggunakan <a> agar bisa buka di tab baru */}
              <a
                className="column"
                href="https://wa.me/+6287761720627?text=Yang%20anda%20keluhkan%20soal%20website"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="card card-custom mt-2" style={{ height: "250px" }}>
                  <div className="card-content">
                    <div className="card-image">
                      <figure className="image">
                        <img src="/Aset-website/faq.png" alt="FAQ" />
                      </figure>
                    </div>
                    <div className="content has-text-centered">
                      <p className="is-size-6 mb-0 has-text-weight-bold has-text-black">FAQ</p>
                      <p className="is-size-6">WA admin Gerobak Rakyat</p>
                    </div>
                  </div>
                </div>
              </a>

              <Link className="column" to="/about-us">
                <div className="card card-custom mt-2" style={{ height: "250px" }}>
                  <div className="card-content">
                    <div className="card-image">
                      <figure className="image">
                        <img src="/Aset-website/about us(1).png" alt="About Us" />
                      </figure>
                    </div>
                    <div className="content has-text-centered">
                      <p className="is-size-6 mb-0 has-text-weight-bold has-text-black">About Us</p>
                      <p className="is-size-6">Tentang Gerobak Rakyat</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeUser;
