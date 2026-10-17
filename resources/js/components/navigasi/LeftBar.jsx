import { NavLink, useLocation } from "react-router"
import dataNavigasi from "../../api/navigation_data"


const LeftBar = () => {
    // mendapatkan lokasi terkini
    const location = useLocation();
    return (
        <div className="fixed hidden md:block top-28 left-10 ">
            <div className="  py-2  bg-white dark:bg-stone-900  w-16  min-h-[calc(100vh-150px)] rounded-full shadow-md flex justify-center ">
                <div className="flex flex-col gap-2">
                    {
                        dataNavigasi.map((x, index) => {
                            const Icon = x.icon
                            const isActive = location.pathname.includes(x.url)
                            return (
                                <NavLink key={index} to={x.url}
                                    className={`${isActive ? "dark:bg-stone-500/50 text-stone-900 bg-stone-500" : " text-stone-900 dark:text-stone-400"} 
                            w-12 h-12 rounded-full flex justify-center items-center cursor-pointer
                            transition duration-300
                            `}>
                                    <Icon size={24} className={`${isActive ? "text-white dark:text-stone-400 dark:fill-stone-400 fill-white" : ""}`} />
                                </NavLink>
                            )
                        })
                    }
                </div>


            </div>
        </div>
    )
}
export default LeftBar