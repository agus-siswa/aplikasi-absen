import { Bell, Flame, LogOut, Moon, Sun } from "lucide-react"
import { useContext } from "react"
import { GlobalConsumer } from "../../context/AuthContext"
import NavigasiButton from "../buttons/NavigasiButton"
import SearchNavigasi from "../input/SearchNavigasi"
import LeftBar from "./LeftBar"

// bikin navigasi hanya muncul ketika user udah login
const Navigasi = () => {
    const { user, isDark, setIsDark } = useContext(GlobalConsumer)


    return (
        <>
            <div className="h-37.5 p-10">
                <div className="flex flex-col md:flex-row  md:justify-between">
                    <div className="flex items-center gap-5">
                        <Flame size={50} className="text-[#506959] dark:text-stone-400" />
                        <div>
                            <div className="text-lg font-semibold text-stone-900 dark:text-white">Hello, {user.nama}</div>
                            <div className="text-[13px] text-stone-900 dark:text-white">Selamat Datang di Aplikasi Absen</div>
                        </div>
                    </div>

                    <div className="flex flex-row  gap-2 justify-end items-center">
                        <SearchNavigasi />
                        <div className="pt-2.5 md:pt-0">
                            <NavigasiButton onClick={() => setIsDark(!isDark)}>
                                {isDark ? <Moon size={20} /> : <Sun size={20} />}
                            </NavigasiButton>
                        </div>



                    </div>
                </div>
            </div>
            <LeftBar />
        </>
    )
}

export default Navigasi