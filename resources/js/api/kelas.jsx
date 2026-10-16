import { request } from "./config"


export const getSemuaKelas = () => {
    return request().get("/api/kelas")
}

export const tambahKelas = ({ nama }) => {
    return request().post("/api/kelas", { nama })
}

export const editKelas = ({ id, nama }) => {
    return request().put("/api/kelas", { id, nama })
}

export const hapusKelas = ({ id }) => {
    return request().delete(`/api/kelas/${id}`)
}