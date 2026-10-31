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
import { editUser, getSemuaUser, hapusUser, tambahUser } from "../../api/user"


const User = () => {


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
            role: ""// required
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
            username: "", // required
            password: "", // required  
            nama: "", // required 
            no_hp: "",
            nip: "",
            role: ""// required

        }
    }))
    // menutup modal hapus
    const closeModalHapus = () => setHapus(prev => ({ ...prev, isOpen: false }))

    // membuka modal hapus
    const bukaModalHapus = (id) => setHapus(prev => ({ ...prev, isOpen: true, id }))
    const bukaModalEdit = (item) => setForm(prev => ({ ...prev, isOpen: true, id: item.id, form: { ...structuredClone(item) } }))


    // mengambil data kelas dari API get kelas
    const refetch = () => {
        getSemuaUser().then((res) => {

            if (res.status == 200) {
                setData(res.data.data.map((x) => ({
                    ...x,
                    search: `${x.id}${x.username}${x.nama}${x.no_hp}${x.nip}${x.role}`.toLowerCase()
                })))
            }

        })
    }



    // menyimpan data kelas ke laravel
    const simpan = () => {
        const _form = form.form
        // yang wajib diisi saat tambah dan edit
        const requireds = ["username", "nama", "role"]

        // jika bukan edit maka password required
        if (form.id == null) {
            requireds.push("password")
        }


        console.log(_form)
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
                tambahUser(_form),
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
                editUser({ ..._form, id: form.id }),
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
            hapusUser({ id: hapus.id }),
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

    }, [])
    return (
        <Container>

            <div >


                {/* KOmponen Tabel */}
                <Table
                    data={data}
                    header={[
                        { key: "id", title: "ID", className: "text-center" },
                        { key: "nama", title: "Nama", className: "text-center" },
                        { key: "role", title: "Role", className: "text-center" },
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



                        </div>
                    }
                    row={(row, index) => {
                        return (
                            <tr key={index} className="odd:bg-stone-100 dark:odd:bg-stone-950/30">
                                <Td className="text-center">{row.id}</Td>
                                <Td className="text-center">{row.nama}</Td>
                                <Td className="text-center">{row.role}</Td>
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



        </Container>
    )
}

export default User 