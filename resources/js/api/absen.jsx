import { request } from "./config"


export const getSemuaAbsen = () => {
    return request().get("/api/absen/all")
}

export const absenMasuk = ({
    id_user = 1
}) => {
    return request().post("/api/absen/masuk", {
        id_user
    })
}

export const absenKeluar = ({
    id_user = 1
}) => {
    return request().post("/api/absen/keluar", {
        id_user
    })
}