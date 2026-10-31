import { Home, HomeIcon, LayoutGrid, QrCode, User2, Users } from "lucide-react"

const dataNavigasi = [

    {
        nama: "Dashboard", url: "/dashboard", icon: LayoutGrid,
        roles: ["superadmin", "siswa", "guru", "operator"]
    },
    {
        nama: "Siswa", url: "/siswa", icon: Users,
        roles: ["superadmin"]
    },
    {
        nama: "Kelas", url: "/kelas", icon: HomeIcon,
        roles: ["superadmin"]
    },
    {
        nama: "User", url: "/user", icon: User2,
        roles: ["superadmin"]
    },
    {
        nama: "Absen", url: "/absen", icon: QrCode,
        roles: ["guru"]
    },
]


export default dataNavigasi
