import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { X } from 'lucide-react'

function Modal({
    isOpen = false,
    close,
    title,
    textSimpan = "SIMPAN",
    textBatal = "BATAL",
    hideSimpan = false,
    children,
    simpan
}) {

    return (
        <>
            <Dialog open={isOpen} onClose={close} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 z-50 bg-black/40 backdrop-blur-sm">
                    <DialogPanel className="max-w-2xl space-y-4 rounded-xl shadow-md w-full  bg-white dark:bg-stone-700 p-10">
                        <DialogTitle className="font-bold flex justify-between">
                            <div className='text-[#506959] dark:text-white'>
                                {title}
                            </div>
                            <div onClick={close} className="cursor-pointer -mt-4 hover:bg-gray-200 transition-all duration-300 w-10 h-10 rounded-full flex items-center justify-center" >
                                <X size={25} />
                            </div>
                        </DialogTitle>

                        {children}
                        <div className="flex gap-2 w-full justify-end ">
                            <button className='w-32 shadow-md bg-stone-400 dark:bg-stone-800 rounded-md cursor-pointer h-10 font-semibold text-white flex justify-center items-center' onClick={close}>{textBatal}</button>
                            {
                                !hideSimpan && (
                                    <button className='bg-[#506959]  shadow-md w-32 h-10 cursor-pointer flex justify-center items-center rounded-md font-medium text-white' onClick={simpan}>{textSimpan}</button>

                                )
                            }
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default Modal