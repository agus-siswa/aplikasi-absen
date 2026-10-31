
const Select = ({
    title,

    name,
    value,
    onChange,

    children
}) => {


    return (
        <div>
            <div className="font-medium text-sm mb-2 mt-2">{title}</div>
            <div className="relative">
                <select onChange={onChange} name={name} value={value} className="w-full border text-sm focus:outline-0 border-stone-300 p-2 h-10 dark:border-stone-600 dark:bg-stone-800 rounded-lg">
                    {children}
                </select>


            </div>
        </div>
    )
}

export default Select