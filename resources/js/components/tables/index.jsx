import { useMemo, useState } from "react"

export const Td = ({ children, className }) => {
    return (
        <td className={`${className} border p-2 text-sm border-stone-300 dark:border-stone-600 dark:text-white`}>
            {children}
        </td>
    )
}
const Table = ({ data, header, row, TopContent }) => {
    const [cari, setCari] = useState("")
    const [menampilkan, setMenampilkan] = useState(10)


    const result = useMemo(() => {
        if (cari == "") {
            return data
        } else {
            return data.filter((f) => {
                return f.search.includes(cari.toLowerCase())
            })
        }
    }, [cari, data])
    return (
        <div>
            <div className="flex gap-2 justify-between items-center mb-2">
                <div className="flex bg-white dark:bg-stone-700 dark:text-white rounded-lg shadow-md h-10 px-2   items-center text-[13px] gap-2">
                    <div className="">
                        Menampilkan
                    </div>
                    <select value={menampilkan}
                        onChange={(e) => setMenampilkan(e.target.value)}
                        className="  p-2 text-[13px] rounded-lg">
                        <option value="10">10 Baris</option>
                        <option value="20">20 Baris</option>
                        <option value="50">50 Baris</option>
                        <option value="100">100 Baris</option>
                    </select>
                </div>
                <div className="grow">
                    {TopContent}
                </div>

                <div className="flex items-center gap-2 bg-white dark:bg-stone-700 dark:text-white rounded-lg shadow-md ">
                    <input type="text"
                        placeholder="Cari"
                        value={cari}
                        onChange={(e) => setCari(e.target.value)}
                        className="w-full pl-3 border text-[13px] focus:outline-0 border-stone-300 p-2 h-10 dark:border-stone-600 dark:bg-stone-800/40 rounded-lg" />
                </div>
            </div>
            <div className="bg-white shadow-md dark:bg-stone-900 rounded-md p-2">

                <table className="w-full">
                    <thead>
                        <tr>
                            {
                                header.map((row, index) => {
                                    return <td className={`${row.className} dark:text-white border p-2 text-[13px] border-stone-300 dark:border-stone-700 bg-stone-200 dark:bg-stone-800`} key={index}>{row.title}</td>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {/* ℹ️ baris data */}
                        {
                            result.map(row)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table