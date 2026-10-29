import { useEffect, useRef, useState } from "react"
import { getSemuaKelas } from "../../api/kelas"
import Container from "../../components/utils/Container"
import Modal from "../../components/modal"
import ButtonTambah from "../../components/buttons/ButtonTambah"
import { toast } from "sonner"
import Table, { Td } from "../../components/tables"
import Hapus from "../../components/buttons/Hapus"
import Edit from "../../components/buttons/Edit"
import ModalHapus from "../../components/modal/ModalHapus"
import Form from "./Form"
import { bulkSiswa, editSiswa, getSemuaSiswa, hapusSiswa, tambahSiswa } from "../../api/siswa"
import ButtonImport from "../../components/buttons/ButtonImport"
import * as XLSX from "xlsx"


const requiredHeaderExcel = [
    "username", "password", "nama", "id_kelas"

]
const Siswa = () => {
    const inputFile = useRef(null)
    const [previewExcelSiswa, setPreviewExcel] = useState({
        isOpen: false,
        data: [],
        jumlah_error: 0

    })

    // menyimpan input user dari form
    // isOpen : untuk membuka tutup modal
    // form   : untuk menyimpan input user
    // id : jika null akan dianggap insert
    // id : jika ada isinya akan dianggap update
    const [form, setForm] = useState({
        isOpen: false,
        id: null,
        form: {
            username: "", // required
            password: "", // required  
            nama: "", // required 
            no_hp: "",
            nip: "",
            id_kelas: ""// required
        }
    })

    // modal hapus
    const [hapus, setHapus] = useState({
        isOpen: false,
        id: null
    })
    // menyimpan dataKelas dari laravel
    const [dataKelas, setDataKelas] = useState([])
    // menyimpan data dari laravel
    const [data, setData] = useState([])
    // menutup modal
    const closeModal = () => setForm(prev => ({ ...prev, isOpen: false, id: null }))
    // membuka modal
    const bukaModal = () => setForm(prev => ({
        ...prev, isOpen: true, id: null, form: {
            id: null,
            form: {
                username: "", // required
                password: "", // required  
                nama: "", // required 
                no_hp: "",
                nip: "",
                id_kelas: ""// required
            }
        }
    }))
    // menutup modal hapus
    const closeModalHapus = () => setHapus(prev => ({ ...prev, isOpen: false }))
    const closeModalPreview = () => setPreviewExcel(prev => ({ ...prev, isOpen: false }))
    // membuka modal hapus
    const bukaModalHapus = (id) => setHapus(prev => ({ ...prev, isOpen: true, id }))
    const bukaModalEdit = (item) => setForm(prev => ({ ...prev, isOpen: true, id: item.id, form: { ...structuredClone(item) } }))
    // inisialisasi data kelas
    const initDataKelas = () => {
        getSemuaKelas().then((res) => {
            // simpan ke state react
            setDataKelas(res.data.data.map((x) => {
                return { ...x, search: `${x.id}${x.nama}`.toLowerCase() }
            }))

        })
    }
    // mengambil data kelas dari API get kelas
    const refetch = () => {
        getSemuaSiswa().then((res) => {

            if (res.status == 200) {
                setData(res.data.data.map((x) => ({
                    ...x,
                    search: `${x.id}${x.username}${x.nama}${x.no_hp}${x.nip}${x.role}${x.nama_kelas}`.toLowerCase()
                })))
            }

        })
    }
    // import siswa 
    const importSiswa = ({ target }) => {
        const file = target.files[0]
        const reader = new FileReader()
        // overwrite function
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const data_siswa = XLSX.utils.sheet_to_json(worksheet);
            let jumlah_error = 0
            const result = data_siswa.map((x) => {
                // warnings ini untuk menyimpan validasi dari seluruh field didalam row 
                let warnings = []

                // cek satu2 apakah headernya ada
                for (let rhe of requiredHeaderExcel) {
                    if (x[rhe] === undefined || x[rhe] == "" || x[rhe] == null) {
                        warnings.push(`${rhe} wajib diisi`)
                    }

                }

                if (warnings.length > 0) {
                    jumlah_error++
                }
                return { ...x, warnings }
            })
            setPreviewExcel(prev => ({
                ...prev,
                isOpen: true,
                data: result,
                jumlah_error
            }))
        }

        reader.readAsArrayBuffer(file);
    }

    const simpanBulk = () => {

        if (previewExcelSiswa.jumlah_error > 0) {
            // jangan submit jika error excel nya ada
            return;
        }
        const defaultHeader = [...requiredHeaderExcel, "nip", "no_hp"]
        const data = structuredClone(previewExcelSiswa.data).map((x) => {

            delete x.warnings

            for (let dh of defaultHeader) {
                if (x[dh] == "" || x[dh] == undefined) {
                    x[dh] = null
                }
            }
            return { ...x, role: "siswa" }
        })
        closeModalPreview()


        toast.promise(bulkSiswa(data), {
            loading: "Menyimpan Data...",
            success: (res) => {
                refetch()
                return res.data.message
            },
            error: (err) => {
                return err.response.data.message
            }
        })

    }
    // menyimpan data kelas ke laravel
    const simpan = () => {
        const _form = form.form
        // yang wajib diisi saat tambah dan edit
        const requireds = ["username", "nama", "id_kelas"]

        // jika bukan edit maka password required
        if (form.id == null) {
            requireds.push("password")
        }
        // mengecek form apakah sudah diisi semua
        for (let required of requireds) {
            if (_form[required] == "") {
                toast.error(`${required} tidak boleh kosong`)
                return
            }
        }
        // tutup modal
        closeModal()
        // simpan ke laravel
        if (form.id === null) {
            // jika id null maka dia akan menyimpan datanya
            toast.promise(
                tambahSiswa(_form),
                {
                    // tampilkan tulisan loading
                    loading: "Menyimpan Data...",
                    // jika berhasil
                    success: (res) => {
                        // panggil refetch agar data update
                        refetch()
                        // tampilkan tulisan berhasil
                        return "Data berhasil disimpan"
                    },
                    // jika error
                    error: (err) => {
                        // tampilkan tulisan error
                        return err.response.data.message
                    }
                }
            )
        } else {
            // jika id nya tidak null maka akan update datanya
            toast.promise(
                editSiswa({ ..._form, id: form.id }),
                {
                    // tampilkan tulisan loading
                    loading: "Mengupdate Data...",
                    // jika berhasil
                    success: (res) => {
                        // panggil refetch agar data update
                        refetch()
                        // tampilkan tulisan berhasil
                        return "Data berhasil diupdate"
                    },
                    // jika error
                    error: (err) => {
                        // tampilkan tulisan error
                        return err.response.data.message
                    }
                }
            )
        }

    }

    const simpanHapus = () => {
        // tutup modal hapus
        closeModalHapus()
        // minta laravel untuk hapus
        toast.promise(
            hapusSiswa({ id: hapus.id }),
            {
                // tampilkan tulisan loading
                loading: "Menghapus Data...",
                // jika berhasil
                success: (res) => {
                    // panggil refetch agar data update
                    refetch()
                    // tampilkan tulisan berhasil
                    return "Data berhasil dihapus"
                },
                // jika error
                error: (err) => {
                    // tampilkan tulisan error
                    return err.response.data.message
                }
            }
        )
    }
    // ketika document di load
    useEffect(() => {
        refetch()
        initDataKelas()
    }, [])
    return (
        <Container>

            <div >
                <input type="file" className=" hidden" onChange={importSiswa} accept=".xlsx" ref={inputFile} />
                {/* KOmponen Tabel */}
                <Table
                    data={data}
                    header={[
                        { key: "id", title: "ID", className: "text-center" },
                        { key: "nama", title: "Nama", className: "text-center" },
                        { key: "kelas", title: "Kelas", className: "text-center" },
                        { key: "username", title: "Username", className: "text-center" },
                        { key: "no_hp", title: "No HP", className: "text-center" },
                        { key: "nip", title: "No Identitas", className: "text-center" },
                        { key: "aksi", title: "Aksi", className: "text-center" },
                    ]}
                    TopContent={
                        <div className="md:w-32 flex gap-2">
                            <div>
                                <ButtonTambah
                                    onClick={bukaModal}
                                />
                            </div>
                            <div>
                                <ButtonImport
                                    onClick={() => inputFile.current?.click()}
                                />
                            </div>

                        </div>
                    }
                    row={(row, index) => {
                        return (
                            <tr key={index} className="odd:bg-stone-100 dark:odd:bg-stone-950/30">
                                <Td className="text-center">{row.id}</Td>
                                <Td className="text-center">{row.nama}</Td>
                                <Td className="text-center">{row.nama_kelas}</Td>
                                <Td className="text-center">{row.username}</Td>
                                <Td className="text-center">{row.no_hp}</Td>
                                <Td className="text-center">{row.nip}</Td>
                                <Td>
                                    <div className="flex gap-2 justify-center">
                                        <Hapus
                                            onClick={() => bukaModalHapus(row.id)}
                                        />
                                        <Edit
                                            onClick={() => bukaModalEdit(row)}
                                        />
                                    </div>
                                </Td>
                            </tr>
                        )
                    }}
                />
            </div>

            {/* 🎈 Ini adalah form modal dari siswa */}
            <Modal
                isOpen={form.isOpen}
                close={closeModal}
                title="Form Siswa"
                simpan={simpan}
            >
                <div className="dark:text-white py-5">
                    <Form
                        form={form}
                        setForm={setForm}
                        dataKelas={dataKelas}
                    />
                </div>
            </Modal>
            {/* 🎈 Ini adalah form modal dari hapus siswa */}
            <ModalHapus
                isOpen={hapus.isOpen}
                close={closeModalHapus}
                simpan={simpanHapus}
            />


            {/* 🎈 Ini adalah form modal dari Preview Import Siswa*/}
            <Modal
                isOpen={previewExcelSiswa.isOpen}
                close={closeModalPreview}
                title="Form Preview Import Siswa"
                simpan={simpanBulk}
                className=" max-w-5xl"
            >
                <div className="dark:text-white py-5 min-h-screen">

                    <Table
                        data={previewExcelSiswa.data}
                        TopContent={
                            <div>
                                {
                                    previewExcelSiswa.jumlah_error > 0 && (
                                        <div className="bg-yellow-500/20 p-2 text-[13px] w-fit px-4 rounded-md">
                                            <p className="text-yellow-700">{previewExcelSiswa.jumlah_error} Siswa Error</p>
                                        </div>
                                    )
                                }
                            </div>
                        }
                        header={[

                            { key: "username", title: "Username", className: "text-center" },
                            { key: "password", title: "Password", className: "text-center" },
                            { key: "nama", title: "nama", className: "text-center" },
                            { key: "no_hp", title: "No HP", className: "text-center" },
                            { key: "nip", title: "No Identitas", className: "text-center" },
                            { key: "id_kelas", title: "ID Kelas", className: "text-center" },
                        ]}


                        row={(row, index) => {


                            return (
                                <tr key={index} className={`odd:bg-stone-100 dark:odd:bg-stone-950/30 ${row.warnings.length > 0 && "!bg-amber-500/20"}`}>
                                    <Td className="text-center">{row.username}</Td>
                                    <Td className="text-center">{row.password}</Td>
                                    <Td className="text-center">{row.nama}</Td>
                                    <Td className="text-center">{row.no_hp}</Td>
                                    <Td className="text-center">{row.nip}</Td>
                                    <Td className="text-center">{row.id_kelas}</Td>
                                </tr>
                            )
                        }}
                    />
                </div>
            </Modal>
        </Container>
    )
}

export default Siswa 