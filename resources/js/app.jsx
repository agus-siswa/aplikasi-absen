// ℹ️ mengimport react untuk memrendering komponen
import { createRoot } from "react-dom/client"
// ℹ️ mengimport css untuk styling
import "../css/app.css"
// ℹ️ mengimport komponen Main yang berisi komponen utama
import Main from "./Main"
// ℹ️ mengimport BrowserRouter untuk routing
import { BrowserRouter } from "react-router"

// ℹ️ membuat root untuk react dan merender komponen utama
createRoot(document.getElementById("root")).render(
    // ℹ️ menggunakan BrowserRouter untuk routing
    <BrowserRouter>
        {/* ℹ️ merender komponen utama */}
        <Main />
    </BrowserRouter>
)