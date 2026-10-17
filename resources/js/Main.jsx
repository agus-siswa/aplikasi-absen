// ℹ️ mengimport Route dan Routes untuk routing
import { Route, Routes } from "react-router"
// ℹ️ mengimport komponen Login
import Login from "./pages/login"
// ℹ️ mengimport Toaster untuk menampilkan pesan notifikasi
import { Toaster } from "sonner"
// ℹ️ mengimport GlobalProvider untuk menyimpan state global
import GlobalProvider from "./context/AuthContext"
// ℹ️ mengimport komponen Dashboard
import Dashboard from "./pages/dashboard"
// ℹ️ mengimport komponen Navigasi
import Navigasi from "./components/navigasi"
import Kelas from "./pages/kelas"

const Main = () => {
    return (
        <div className="min-h-screen bg-[#EAE9E3] dark:bg-stone-800">
            {/* ℹ️ GlobalProvider digunakan untuk menyimpan state global */}
            <GlobalProvider>
                {/* ℹ️ Navigasi digunakan untuk navigasi */}
                <Navigasi />
                {/* ℹ️ Toaster digunakan untuk menampilkan pesan notifikasi */}
                <Toaster richColors />
                {/* ℹ️ Routes digunakan untuk routing */}
                <Routes>
                    {/* ℹ️ Route untuk halaman login */}
                    <Route path="/" element={<Login />} />
                    {/* ℹ️ Route untuk halaman login (ada 2 agar slash doang sama /login bisa masuk) */}
                    <Route path="/login" element={<Login />} />
                    {/* ℹ️ Route untuk halaman dashboard */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/kelas" element={<Kelas />} />
                </Routes>
            </GlobalProvider>
        </div>
    )
}

export default Main