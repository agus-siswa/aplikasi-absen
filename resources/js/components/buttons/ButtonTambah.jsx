import { Plus } from "lucide-react"

const ButtonTambah = ({
    onClick
}) => {
    return (
        <button onClick={onClick} className="flex cursor-pointer w-32 h-10 rounded-md shadow-md gap-2 justify-center items-center bg-[#506959]">
            <Plus size={20} className="text-white stroke-3" />
            <div className="font-medium text-white">
                Tambah
            </div>
        </button>
    )
}

export default ButtonTambah