import { Pencil } from "lucide-react"

const Edit = ({ onClick }) => {
    return (
        <button onClick={onClick}
            className="w-8 h-8 bg-yellow-600 hover:bg-yellow-500 p-1.5 text-white rounded-md shadow-md cursor-pointer">
            <Pencil className="w-full h-full" />
        </button>
    )
}

export default Edit 