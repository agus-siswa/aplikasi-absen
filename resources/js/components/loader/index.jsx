import "../../../css/loader.css"

const Loader = () => {
    return (
        <div className="h-screen w-screen flex justify-center items-center content-center fixed top-0 left-0 bg-white">
            <div className="full-loader"></div>
        </div>
    )
}

export default Loader