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
    const navigate = useNavigate()
    const location = useLocation()
    const [user, setUser] = useState(null)
    const [loader, setLoader] = useState(true)
    // check apakah user udah login atau belum
    const init = () => {
        // promise -> tunggu hingga dia dapat response
        getCurrentUser().then((res) => {
            if (res.data.status) {
                setUser(res.data.data)
            }
            setLoader(false)

        }).catch((e) => {
            setLoader(false)

        })
    }
    // ketika document ready 
    useEffect(() => {
        init()
    }, [])
    // ketika state user dirubah
    useEffect(() => {
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