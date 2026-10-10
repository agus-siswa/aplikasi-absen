import { createRoot } from "react-dom/client"
import "../css/app.css"
import Main from "./Main"
import { BrowserRouter } from "react-router"

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>
)