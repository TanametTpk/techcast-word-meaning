import {useState} from 'react'

type ModalHook = [boolean, Function, Function]

const useModal = (initialStatus: boolean = false): ModalHook => {
    let [isOpen, setOpen] = useState<boolean>(initialStatus)

    const open = () => {
        setOpen(true)
    }

    const close = () => {
        setOpen(false)
    }

    return [isOpen, open, close]
}

export default useModal