import { useEffect, useState } from "react"
import { editKelas, getSemuaKelas, hapusKelas, tambahKelas } from "../../api/kelas"
import Container from "../../components/utils/Container"
import Modal from "../../components/modal"
import ButtonTambah from "../../components/buttons/ButtonTambah"
import Input from "../../components/form/Input"
import Input2 from "../../components/form/Input2"
import bindInput from "../../utils/bindInput"
import { toast } from "sonner"
import Table, { Td } from "../../components/tables"
import Hapus from "../../components/buttons/Hapus"
import Edit from "../../components/buttons/Edit"
import ModalHapus from "../../components/modal/ModalHapus"

const Kelas = () => {
    // menyimpan input user dari form
    // isOpen : untuk membuka tutup modal
    // form   : untuk menyimpan input user
    // id : jika null akan dianggap insert
    // id : jika ada isinya akan dianggap update
    const [form, setForm] = useState({
        isOpen: false,
        id: null,
        form: {
            nama: ""
        }
    })
    // modal hapus
    const [hapus, setHapus] = useState({
        isOpen: false,
        id: null
    })
    // menyimpan data dari laravel
    const [data, setData] = useState([])
    // menutup modal
    const closeModal = () => setForm(prev => ({ ...prev, isOpen: false, id: null }))
    // membuka modal
    const bukaModal = () => setForm(prev => ({ ...prev, isOpen: true, id: null }))
    // menutup modal hapus
    const closeModalHapus = () => setHapus(prev => ({ ...prev, isOpen: false }))
    // membuka modal hapus
    const bukaModalHapus = (id) => setHapus(prev => ({ ...prev, isOpen: true, id }))
    const bukaModalEdit = (item) => setForm(prev => ({ ...prev, isOpen: true, id: item.id, form: { nama: item.nama } }))
    // mengambil data kelas dari API get kelas
    const refetch = () => {
        getSemuaKelas().then((res) => {
            // simpan ke state react
            setData(res.data.data.map((x) => {
                return { ...x, search: `${x.id}${x.nama}`.toLowerCase() }
            }))

        })
    }
    // menyimpan data kelas ke laravel
    const simpan = () => {
        const _form = form.form
        // jika nama kosong
        if (_form.nama == "") {
            toast.error("Mohon Masukan Nama")
            // menghentikan proses agar tidak jalan
            return;
        }
        closeModal()
        // simpan ke laravel
        if (form.id === null) {
            // jika id null maka dia akan menyimpan datanya
            toast.promise(
                tambahKelas(_form),
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
                editKelas({ ..._form, id: form.id }),
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
            hapusKelas({ id: hapus.id }),
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
    useEffect(() => {
        refetch()
    }, [])
    return (
        <Container>

            <div className="max-w-2xl">


                <Table
                    data={data}
                    header={[
                        { key: "id", title: "ID", className: "text-center" },
                        { key: "nama", title: "Nama", className: "text-center" },
                        { key: "aksi", title: "Aksi", className: "text-center" },
                    ]}
                    TopContent={
                        <div>
                            <ButtonTambah
                                onClick={bukaModal}
                            />

                        </div>
                    }
                    row={(row, index) => {
                        return (
                            <tr key={index} className="odd:bg-stone-100 dark:odd:bg-stone-950/30">
                                <Td className="text-center">{row.id}</Td>
                                <Td className="text-center">{row.nama}</Td>
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

            {/* 🎈 Ini adalah form modal dari kelas */}
            <Modal
                isOpen={form.isOpen}
                close={closeModal}
                title="Form Kelas"
                simpan={simpan}
            >
                <div className="dark:text-white py-5">
                    <Input2
                        title="Nama Kelas"
                        name="nama"
                        placeholder="Masukan Nama Kelas"
                        value={form.form.nama}
                        onChange={(e) => bindInput({ target: e.target, setForm, form: form.form })}
                    />
                </div>
            </Modal>
            <ModalHapus
                isOpen={hapus.isOpen}
                close={closeModalHapus}
                simpan={simpanHapus}
            />
        </Container>
    )
}

export default Kelas 