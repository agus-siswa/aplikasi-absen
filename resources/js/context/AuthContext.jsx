import { createContext, useEffect, useState } from "react"
import { getCurrentUser } from "../api/auth"
import { useLocation, useNavigate } from "react-router"
import Loader from "../components/loader"
// bikin global variable
export const GlobalConsumer = createContext()
// bikin provider
const GlobalProvider = ({
    children
}) => {
    // navigate digunakan untuk navigasi secara programatis
    const navigate = useNavigate()
    // location digunakan untuk mendapatkan lokasi saat ini
    const location = useLocation()
    // user digunakan untuk menyimpan data user
    const [user, setUser] = useState(null)
    // loader digunakan untuk menyimpan state loader agar tidak terjadi blank white screen
    const [loader, setLoader] = useState(true)
    // status dark mode pada aplikasi 
    const [isDark, setIsDark] = useState(localStorage.getItem("dark") === "1")
    // check apakah user udah login atau belum
    const init = () => {
        // promise -> tunggu hingga dia dapat response
        getCurrentUser().then((res) => {
            // jika response status true maka user login
            if (res.data.status) {
                setUser(res.data.data)
            }
            // set loader false
            setLoader(false)
        }).catch((e) => {
            // set loader false
            setLoader(false)
        })
    }
    // ketika document ready -> panggil function init
    useEffect(() => {
        init()
    }, [])
    // ketika state user dirubah -> otomatis navigasi
    useEffect(() => {
        // ℹ️ mengecek apakah user sudah login
        // user?.id itu tidak boleh null | undefined | 0 
        if (user?.id) {
            // jika user berada di url : /login maka diredirect ke dashboard
            if (location.pathname.includes("/login")) {
                // redirect ke dashboard
                navigate('/dashboard', { replace: true })
            }
        } else {
            // redirect ke /login 
            navigate('/login', { replace: true })
        }
    }, [user])

    // dark mode listener
    useEffect(() => {
        // ambil object html -> karena dark mode hanya di html
        const htmlSelector = document.getElementsByTagName("html")[0]
        // jika dark mode true 
        if (isDark) {
            // menyimpan ke penyimpanan local
            // agar ketika user refresh halaman, dark mode tetap ada
            localStorage.setItem("dark", '1')
            // menambahkan class dark pada html
            htmlSelector.setAttribute("class", "dark")
        } else {
            // jika dark mode false
            // menyimpan ke penyimpanan local
            // agar ketika user refresh halaman, dark mode tetap ada
            localStorage.setItem("dark", '0')
            // menghapus class dark pada html
            htmlSelector.removeAttribute("class")
        }
    }, [isDark])

    // ℹ️ mengembalikan GlobalConsumer.Provider dengan nilai user dan setUser
    return (
        <GlobalConsumer.Provider value={{ user, setUser, isDark, setIsDark }}>
            {
                // jika loader state itu true

                loader ?
                    // tampilkan halaman loader
                    <Loader />
                    :
                    // jika loader tidak true maka tampilkan halaman yang diminta user
                    children
            }
        </GlobalConsumer.Provider>
    )
}

export default GlobalProvider