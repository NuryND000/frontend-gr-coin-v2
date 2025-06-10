import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import NavbarGuest from "../components/NavbarGuest";
import { loginUser } from "../services/api";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [tlp, setTlp] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const { token, user } = await loginUser({ tlp, password });
      login(token, user);
      if (user.role === "admin") {
        navigate("/home-admin");
    } else if (user.role === "user") {
        navigate("/home-user");
    } else {
        navigate("/");
    }
    } catch (error) {
      alert("Login gagal! Cek nomor WA atau password.");
    }
  };

  return (
    <div class="full-height">
      <NavbarGuest />
      <div class="container mt-6">
        <div class="columns mt-6">
          <div className="column">
            <figure className="image">
              <img
                src={`${process.env.PUBLIC_URL}/Aset-website/LOGIN.png`}
                alt="Placeholder"
              />
            </figure>
          </div>
          <div className="column is-two-fifths has-text-centered mt-6 mb-6">
            <p class="title-no-2 mt-6 has-text-weight-bold">LOGIN!</p>
            <p>Nikmati layanan terbaik dengan login sekarang</p>
            <div class="field mt-5">
              <div class="control">
                <input
                  class="input is-warning is-rounded"
                  type="text"
                  placeholder="Nomor WA"
                  name="tlp"
                  value={tlp}
                  onChange={(e) => setTlp(e.target.value)}
                  style={{ maxHeight: "45px", width: "350px" }}
                  required
                />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input
                  class="input is-warning is-rounded"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ maxHeight: "45px", width: "350px" }}
                  required
                />
              </div>
            </div>

            <div class="field is-grouped is-grouped-centered mt-5">
              <div class="control">
                <button
                  onClick={handleLogin}
                  class="button is-warning is-rounded"
                  style={{ maxHeight: "150px", width: "200px" }}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
