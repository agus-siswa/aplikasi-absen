import { Scanner } from '@yudiel/react-qr-scanner';
import Container from '../../components/utils/Container';

const Absen = () => {
    return (
        <Container>
            <div className='md:w-[500px]'>
                <Scanner
                    onScan={(result) => console.log(result)}
                    onError={(error) => console.log(error?.message)}
                />
            </div>
        </Container>
    )
}

export default Absen