const NavigasiButton = ({
    // children itu maksudnya apapun yang ada 
    // diantara tagging element itu akan masuk ke children
    // misal <Komponen>yang didalamsini akan dianggap children</Komponen>
    children,
    onClick
}) => {
    return (
        <button
            onClick={onClick}
            className="w-12 h-12 cursor-pointer dark:bg-stone-700 dark:text-white bg-white/50 shadow-2xl flex justify-center items-center rounded-full">
            {children}
        </button>
    )
}

export default NavigasiButton