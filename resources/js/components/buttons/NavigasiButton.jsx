const NavigasiButton = ({
    // children itu maksudnya apapun yang ada 
    // diantara tagging element itu akan masuk ke children
    // misal <Komponen>yang didalamsini akan dianggap children</Komponen>
    children
}) => {
    return (
        <button className="w-12 h-12 bg-white/50 shadow-2xl flex justify-center items-center rounded-full">
            {children}
        </button>
    )
}

export default NavigasiButton