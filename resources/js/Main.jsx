import { Route, Routes } from "react-router"
import Login from "./pages/login"
import { Toaster } from "sonner"
import GlobalProvider from "./context/AuthContext"
import Dashboard from "./pages/dashboard"
import Navigasi from "./components/navigasi"

const Main = () => {
    return (
        <div className="min-h-screen bg-[#EAE9E3]">
            <GlobalProvider>
                <Navigasi />
                <Toaster />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </GlobalProvider>
        </div>
    )
}

export default Main