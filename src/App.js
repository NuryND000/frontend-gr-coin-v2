import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import Beranda from "./pages/Beranda";
import Login from "./pages/Login";
import HomeUser from "./pages/HomeUser";
import TukarKoin from "./pages/TukarKoin";
import RiwayatKoin from "./pages/RiwayatKoin";
import AboutUs from "./pages/AboutUs";
import HomeAdmin from "./pages/HomeAdmin";
import TambahPelanggan from "./pages/TambahPelanggan";
import DataPelanggan from "./pages/DataPelanggan";
import TambahKoin from "./pages/TambahKoin";
import EditKoin from "./pages/EditKoin";
import EditPelanggan from "./pages/EditPelanggan";
import TugasBaru from "./pages/TugasBaru";
import PengaduanPelanggan from "./pages/PengaduanPelanggan";
import PengaduanSaya from "./pages/PengaduanSaya";
import TabelTukarKoin from "./pages/TabelTukarKoin";
import AboutUsGr from "./pages/About-Us";
import ChangePassword from "./pages/GantiPassword";
import DataTambahCoin from "./pages/DataTambahCoin";
// Private Route dengan akses berdasarkan role
function PrivateRoute({ element, allowedRoles }) {
    const { token, user } = useContext(AuthContext);

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(user.role)) {
        if (user.role === "admin") {
            return <Navigate to="/home-admin" />;
        } else if (user.role === "user") {
            return <Navigate to="/home-user" />;
        } else {
            return <Navigate to="/" />;
        }
    }

    return element;
}

function PublicRoute({ element }) {
    const { token, user } = useContext(AuthContext);
    if (token) {
        if (user.role === "admin") {
            return <Navigate to="/home-admin" />;
        } else if (user.role === "user") {
            return <Navigate to="/home-user" />;
        } else {
            return <Navigate to="/" />;
        }
    }
    return element;
}

function App() {
    return (
        <Router basename="/gr-coin">
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Beranda />} />
                    <Route path="/about-us/gr-coin" element={<AboutUsGr />} />
                    <Route path="/login" element={<PublicRoute element={<Login />} />} />

                    {/* Role: User */}
                    <Route path="/home-user" element={<PrivateRoute element={<HomeUser />} allowedRoles={["user"]} />} />
                    <Route path="/tukar-koin" element={<PrivateRoute element={<TukarKoin />} allowedRoles={["user"]} />} />
                    <Route path="/riwayat-koin" element={<PrivateRoute element={<RiwayatKoin />} allowedRoles={["user"]} />} />
                    <Route path="/about-us" element={<PrivateRoute element={<AboutUs />} allowedRoles={["user"]} />} />
                    <Route path="/pengaduan-saya" element={<PrivateRoute element={<PengaduanSaya />} allowedRoles={["user"]} />} />
                    <Route path="/ganti-password" element={<PrivateRoute element={<ChangePassword />} allowedRoles={["user"]} />} />

                    {/* Role: Admin */}
                    <Route path="/home-admin" element={<PrivateRoute element={<HomeAdmin />} allowedRoles={["admin"]} />} />
                    <Route path="/tambah-pelanggan" element={<PrivateRoute element={<TambahPelanggan />} allowedRoles={["admin"]} />} />
                    <Route path="/data-pelanggan/:id" element={<PrivateRoute element={<DataPelanggan />} allowedRoles={["admin"]} />} />
                    <Route path="/tambah-koin/:id" element={<PrivateRoute element={<TambahKoin />} allowedRoles={["admin"]} />} />
                    <Route path="/update-koin/:id" element={<PrivateRoute element={<EditKoin />} allowedRoles={["admin"]} />} />
                    <Route path="/edit-pelanggan/:id" element={<PrivateRoute element={<EditPelanggan />} allowedRoles={["admin"]} />} />
                    <Route path="/tugas-baru" element={<PrivateRoute element={<TugasBaru />} allowedRoles={["admin"]} />} />
                    <Route path="/pengaduan-pelanggan" element={<PrivateRoute element={<PengaduanPelanggan />} allowedRoles={["admin"]} />} />
                    <Route path="/tabel-tukar-koin" element={<PrivateRoute element={<TabelTukarKoin />} allowedRoles={["admin"]} />} />
                    <Route path="/data-tambah-koin" element={<PrivateRoute element={<DataTambahCoin />} allowedRoles={["admin"]} />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
