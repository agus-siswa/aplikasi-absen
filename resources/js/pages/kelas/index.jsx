import { useEffect, useState } from "react"
import { getSemuaKelas } from "../../api/kelas"
import Container from "../../components/utils/Container"
import Modal from "../../components/modal"
import ButtonTambah from "../../components/buttons/ButtonTambah"

const Kelas = () => {

    const [form, setForm] = useState({
        isOpen: false,
        form: {
            nama: ""
        }
    })
    const closeModal = () => setForm(prev => ({ ...prev, isOpen: false }))
    const bukaModal = () => setForm(prev => ({ ...prev, isOpen: true }))
    const refetch = () => {
        getSemuaKelas().then((res) => {
            console.log(res)
        })
    }

    useEffect(() => {
        refetch()
    }, [])
    return (
        <Container>
            <ButtonTambah
                onClick={bukaModal}
            />
            <Modal
                isOpen={form.isOpen}
                close={closeModal}
                title="Form Kelas"
            >
                <div>
                    Ini adalah modal
                </div>
            </Modal>
        </Container>
    )
}

export default Kelas 