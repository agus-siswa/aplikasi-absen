import { FileUp } from "lucide-react"

const ButtonImport = ({
    onClick
}) => {
    return (
        <button onClick={onClick} className="flex cursor-pointer w-full px-3 h-10 rounded-md shadow-md gap-2 justify-center items-center bg-[#506959]">
            <FileUp size={16} className="text-white stroke-3" />
            <div className="font-medium text-white text-[13px]">
                Import
            </div>
        </button>
    )
}

export default ButtonImport