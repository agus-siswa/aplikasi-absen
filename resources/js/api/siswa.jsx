import { request } from "./config"


export const getSemuaSiswa = () => {
    return request().get("/api/siswa")
}

export const tambahSiswa = ({ username, password, id_kelas, nama, no_hp, nip }) => {
    return request().post("/api/siswa", { username, password, id_kelas, nama, no_hp, nip })
}

export const editSiswa = ({ id, username, password, id_kelas, nama, no_hp, nip }) => {
    return request().put("/api/siswa", { id, username, password, id_kelas, nama, no_hp, nip })
}

export const hapusSiswa = ({ id }) => {
    return request().delete(`/api/siswa/${id}`)
}


export const bulkSiswa = (data) => {
    return request().post(`/api/siswa/bulk`, data)
}