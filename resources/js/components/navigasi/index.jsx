import { Bell, Flame, LogOut } from "lucide-react"
import { useContext } from "react"
import { GlobalConsumer } from "../../context/AuthContext"
import NavigasiButton from "../buttons/NavigasiButton"
import SearchNavigasi from "../input/SearchNavigasi"
import LeftBar from "./LeftBar"

// bikin navigasi hanya muncul ketika user udah login
const Navigasi = () => {
    const { user } = useContext(GlobalConsumer)


    return (
        <>
            <div className="h-37.5 p-10">
                <div className="flex flex-col md:flex-row  md:justify-between">
                    <div className="flex items-center gap-5">
                        <Flame size={50} className="text-[#506959]" />
                        <div>
                            <div className="text-lg font-semibold">Hello, {user.nama}</div>
                            <div className="text-[13px]">Selamat Datang di Aplikasi Absen</div>
                        </div>
                    </div>

                    <div className="flex sm:flex-row flex-col gap-2 justify-end">
                        <SearchNavigasi />
                        <NavigasiButton>
                            <Bell size={20} />
                        </NavigasiButton>


                    </div>
                </div>
            </div>
            <LeftBar />
        </>
    )
}

export default Navigasi