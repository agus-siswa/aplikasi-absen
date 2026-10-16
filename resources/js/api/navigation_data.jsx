import { Home, HomeIcon, LayoutGrid, Users } from "lucide-react"

const dataNavigasi = [

    {
        nama: "Dashboard", url: "/dashboard", icon: LayoutGrid,
        roles: ["superadmin", "siswa", "guru", "operator"]
    },
    {
        nama: "Siswa", url: "/siswa", icon: Users,
        roles: ["superadmin", "siswa", "guru", "operator"]
    },
    {
        nama: "Kelas", url: "/kelas", icon: HomeIcon,
        roles: ["superadmin", "siswa", "guru", "operator"]
    }
]


export default dataNavigasi
