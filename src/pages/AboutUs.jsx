import React from "react";
import Navbar from "../components/Navbar";

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <div class="container mt-6">
        <div class="columns is-desktop">
          <div className="column mt-6">
            <figure className="image">
            <img
              src="/Aset-website/about us.png"
              alt="Placeholder"
              className="image has-ratio"
            /></figure>
          </div>

          <div class="column mt-6">
            <p className="is-size-3 mb-0 mt-0 has-text-warning">About Us!</p>
            <p className="title-no-1">Gerobak Rakyat</p>
            <p>
              Gerobak Rakyat adalah jasa angkut sampah menuju tempat pembuangan
              akhir (TPA) secara rutin dan terorganisir. Saat ini Gerobak Rakyat
              memiliki suatu sistem yaitu GR Koin. GR Koin adalah koin yang
              diberikan kepada pelanggan Gerobak Rakyat sebagai bentuk reward
              sekaligus kompensasi bagi pelanggan. Setiap keterlambatan
              pengambilan sampah dan ketertiban pembayaran, pelanggan akan
              diberikan 500 GR Koin. Sedangkan untuk keberhasilan menambah
              pelanggan baru, pelanggan akan diberikan 50.000 GR Koin. GR Koin
              dapat ditukar dengan saldo e-wallet DANA dengan minimal penukaran
              10.000 GR Koin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
