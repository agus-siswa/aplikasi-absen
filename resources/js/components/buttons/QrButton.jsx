import { QrCode, Trash } from "lucide-react"

const QrButton = ({ onClick }) => {
    return (
        <button onClick={onClick}
            className="w-8 h-8 bg-purple-700 hover:bg-purple-600 p-1.5 text-white rounded-md shadow-md cursor-pointer">
            <QrCode className="w-full h-full" />
        </button>
    )
}

export default QrButton 