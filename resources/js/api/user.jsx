import { request } from "./config"


export const getSemuaUser = () => {
    return request().get("/api/user")
}

export const tambahUser = ({ username, password, role, nama, no_hp, nip }) => {
    return request().post("/api/user", { username, password, role, nama, no_hp, nip })
}

export const editUser = ({ id, username, password, role, nama, no_hp, nip }) => {
    return request().put("/api/user", { id, username, password, role, nama, no_hp, nip })
}

export const hapusUser = ({ id }) => {
    return request().delete(`/api/user/${id}`)
}

