import { useEffect, useMemo, useState } from "react"
import Input2 from "../../components/form/Input2"
import bindInput from "../../utils/bindInput"
import { SearchAlert } from "lucide-react"
import Select from "../../components/form/Select"

const Form = ({
    form,
    setForm,
    dataKelas
}) => {
    const [showKelas, setShowKelas] = useState(false)
    // simpan data string dari cari kelas
    const [searchKelas, setSearchKelas] = useState("")


    const simpanKelas = (val) => {
        setSearchKelas(val.nama)
        bindInput({ target: { name: "id_kelas", value: val.id }, setForm, form: form.form })
    }

    useEffect(() => {
        // jika form di buka dan update maka cari nilai data kelas
        if (form.isOpen && form.id) {
            const getKelas = dataKelas.filter((f) => f.id == form.form.id_kelas)
            setSearchKelas(getKelas.length > 0 ? getKelas[0].nama : "")
        }

    }, [])
    // agar tidak selalu re render 
    const filterKelas = useMemo(() => {
        // ubah ke huruf kecil semua 
        const lowerSearch = searchKelas.toLowerCase();
        return lowerSearch == '' ? [] : dataKelas.filter((f) => {
            // mencari data
            return f.search.indexOf(lowerSearch) != -1
        })
    }, [searchKelas])


    return (
        <div className="pr-4">
            <Input2
                title="Username"
                name="username"
                placeholder="Masukan Username"
                value={form.form.username}
                onChange={(e) => bindInput({ target: e.target, setForm, form: form.form })}
            />
            <Input2
                title="Password"
                name="password"
                placeholder="Masukan Password"
                value={form.form.password}
                onChange={(e) => bindInput({ target: e.target, setForm, form: form.form })}
            />

            <div className=" my-2">
                <Select title="Pilih Role" name="role" value={form.form.role} onChange={(e) => bindInput({ target: e.target, setForm, form: form.form })}>
                    <option value="">Pilih Role</option>
                    <option value="superadmin">Superadmin</option>
                    <option value="guru">Guru</option>
                    <option value="operator">Operator</option>
                </Select>

            </div>
            <Input2
                title="Nama"
                name="nama"
                placeholder="Masukan Nama"
                value={form.form.nama}
                onChange={(e) => bindInput({ target: e.target, setForm, form: form.form })}
            />
            <Input2
                title="Nomor HP"
                name="no_hp"
                placeholder="Masukan Nomor HP"
                value={form.form.no_hp}
                onChange={(e) => bindInput({ target: e.target, setForm, form: form.form })}
            />
            <Input2
                title="NIP"
                name="nip"
                placeholder="Masukan NIP"
                value={form.form.nip}
                onChange={(e) => bindInput({ target: e.target, setForm, form: form.form })}
            />
        </div>
    )
}
export default Form