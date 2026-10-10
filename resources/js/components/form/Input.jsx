import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

const Input = ({
    title,
    type,
    placeholder,
    name,
    value,
    onChange
}) => {

    const [show, setShow] = useState(false)
    return (
        <div>
            <div className="font-medium text-xs mb-2 mt-2">{title}</div>
            <div className="relative">
                <input 
                type={show === true ? "text" : type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full border text-xs focus:outline-0 border-stone-300 p-2 rounded-lg" />

                {
                    type === "password" && (
                        <button onClick={ () => setShow(!show) } className=" top-1.5 cursor-pointer right-1.5 absolute">
                            {
                                show == true  ?
                                    <Eye
                                        size={20}
                                    />
                                :           
                                    <EyeOff 
                                        size={20}
                                    />
                            }
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default Input