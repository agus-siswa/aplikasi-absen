import { Scanner } from '@yudiel/react-qr-scanner';
import Container from '../../components/utils/Container';
import Tab from '../../components/buttons/Tab';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { absenKeluar, absenMasuk } from '../../api/absen';


const Absen = () => {
    const readyRef = useRef(true)
    const [absenMode, setAbsenMode] = useState("absen_masuk")
    const absen = async (result) => {
        console.log(result)
        // jika request ke laravel belum selesai jangan kirim lagi tunggu dulu
        // if (!readyRef.current) {

        //     return
        // }
        if (result.length > 0) {
            readyRef.current = false
            const { rawValue } = result[0]

            if (absenMode == "absen_keluar") {
                const loading = toast.loading("Mohon Tunggu")
                await absenKeluar({ id_user: rawValue })
                toast.dismiss(loading)
                toast.success("Absen Berhasil")
            } else if (absenMode == "absen_masuk") {
                const loading = toast.loading("Mohon Tunggu")
                await absenMasuk({ id_user: rawValue })
                toast.dismiss(loading)
                toast.success("Absen Berhasil")
            }
            // readyRef.current = true

        }
    }
    return (
        <Container>
            <div className='md:w-[500px]'>

                <div className='flex gap-2 mb-2'>
                    <Tab active={absenMode == "absen_masuk"} onClick={() => setAbsenMode("absen_masuk")}>
                        Absen Masuk
                    </Tab>
                    <Tab active={absenMode == "absen_keluar"} onClick={() => setAbsenMode("absen_keluar")}>
                        Absen Keluar
                    </Tab>
                </div>
                <Scanner
                    onScan={(result) => absen(result)}
                    onError={(error) => console.log(error?.message)}
                    paused={false}
                />
            </div>
        </Container>
    )
}

export default Absen