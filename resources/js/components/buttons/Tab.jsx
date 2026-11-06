const Tab = ({ children, onClick, active }) => {
    return (
        <button onClick={onClick} className={`
            ${active ? "bg-blue-700 text-white" : "dark:bg-stone-900 bg-stone-300"}
            w-full px-2 py-2 rounded-lg dark:text-white cursor-pointer
        `}>
            {children}
        </button>
    )
}

export default Tab