import React from "react";
import { Link } from "react-router-dom";
import NavbarGuest from "../components/NavbarGuest";

const Beranda = () => {
  return (
    <div className="full-height">
      <NavbarGuest />
      <div className="container mt-6">
        <div className="columns">
          <div className="column is-two-fifths has-text-left mt-6">
            <p className="is-size-3 has-text-warning mt-6">Hello!</p>
            <p className="title-no-1">GR Koin</p>
            <p className="title-no-2">SYSTEM</p>
            <p>
              Sistem Penukaran Koin Pelanggan Gerobak Rakyat Ubah koinmu jadi
              saldo e-wallet dengan mudah. Yuk, mulai sekarang!
            </p>

            <div className="buttons is-centered">
              <div className="control">
                <button
                  className="button is-warning is-rounded is-outlined"
                  style={{ maxHeight: "150px", width: "200px" }}
                  onClick={() => window.open(
                    'https://wa.me/+6287761720627?text=Nama:%0ANomor%20WA:%0AAlamat:',
                    '_blank'
                  )}
                >
                  More Info
                </button>

              </div>
              <div className="control">
              <Link
                  to="/login"
                  className="button is-warning is-rounded"
                  style={{ maxHeight: "150px", width: "200px" }}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
          <div className="column">
            <figure className="image">
            <img
                src={`${process.env.PUBLIC_URL}/Aset-website/beranda.png`}
                alt="Placeholder"
              />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beranda;
