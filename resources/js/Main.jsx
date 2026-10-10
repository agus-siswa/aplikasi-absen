import { Route, Routes } from "react-router"
import Login from "./pages/login"
import { Toaster } from "sonner"

const Main = () => {
    return (
        <div>
            <Toaster />
            <Routes>
                <Route path="/" element={<Login />} />        
            </Routes>
        </div>
    )
}

export default Main