import { Trash } from "lucide-react"

const Hapus = ({ onClick }) => {
    return (
        <button onClick={onClick}
            className="w-8 h-8 bg-rose-700 hover:bg-rose-600 p-1.5 text-white rounded-md shadow-md cursor-pointer">
            <Trash className="w-full h-full" />
        </button>
    )
}

export default Hapus 