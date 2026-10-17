import { Search } from "lucide-react"

const SearchNavigasi = () => {
    return (
        <div className="bg-white dark:bg-stone-700 transition-all duration-150 mt-3 md:mt-0 relative rounded-full h-12 w-full md:w-[320px] flex items-center justify-between">
            <input
                type="text"
                placeholder="Cari..."
                className="outline-none w-full px-3 pl-5 text-[13px] dark:text-white"
            />
            <button className="h-10 w-10 right-1 rounded-full flex justify-center items-center absolute bg-black">
                <Search size={20} className="text-white opacity-50" />
            </button>
        </div>
    )
}

export default SearchNavigasi