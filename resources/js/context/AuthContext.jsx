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

    // ℹ️ mengembalikan GlobalConsumer.Provider dengan nilai user dan setUser
    return (
        <GlobalConsumer.Provider value={{ user, setUser }}>
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