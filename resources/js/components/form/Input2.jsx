
const Input2 = ({
    title,
    type,
    placeholder,
    name,
    value,
    onChange
}) => {


    return (
        <div>
            <div className="font-medium text-sm mb-2 mt-2">{title}</div>
            <div className="relative">
                <input
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full border text-sm focus:outline-0 border-stone-300 p-2 h-10 dark:border-stone-600 dark:bg-stone-800/40 rounded-lg" />

            </div>
        </div>
    )
}

export default Input2