import { useState } from 'react';
import {
    Button, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
    useDisclosure, Input, FormLabel, InputGroup, Select, ModalFooter, Flex
} from "@chakra-ui/react"
import { BsPen } from "react-icons/bs"
import api from "../../api"
import moment from "moment"
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';

interface editProps {
    name: string,
    date: string,
    plane: string,
    code: number,
    getRecords: () => any
}


const Edit: React.FC<editProps> = ({ name, date, plane, code, getRecords }) => {
    const [nameEdit, setNameEdit] = useState<string>(name)
    const [codeEdit, setCodeEdit] = useState<number>(code)
    const [dateEdit, setDateEdit] = useState<string>(date)
    const [planeEdit, setPlaneEdit] = useState<string>(plane)

    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleNameEdit = (e: any) => setNameEdit(e.target.value)
    const handleCodeEdit = (e: any) => setCodeEdit(e.target.value)
    const handleDateEdit = (e: any) => setDateEdit(e.target.value)
    const handlePlaneEdit = (e: any) => setPlaneEdit(e.target.value)

    const handleDelete = () => {
        api.patch('/edit', {
            code: code
        })
            .then(() => {
                toast({
                    title: 'O item foi editado com sucesso',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
                getRecords()
            }).catch(() => {
                toast({
                    title: 'Ops, ocorreu um erro!',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            })
    }

    const randomCodeGenerator = () => {
        let randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        return setCodeEdit(randomNumber)
    }


    return (
        <>
            <Button bg='#3700B3' color='whitesmoke' _hover={{ bg: '#6738d2' }}
                onClick={onOpen}>
                <BsPen />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent p='20px'>
                    <ModalHeader textAlign='center'>Editar registros</ModalHeader>
                    <ModalCloseButton />
                    <FormLabel>Nome do aluno</FormLabel>
                    <Input placeholder="Ex: joão silva" value={nameEdit}
                        onChange={(e) => handleNameEdit(e)} />
                    <InputGroup flexDirection='column'>
                        <FormLabel mt='5px'>Cógido do aluno</FormLabel>
                        <Flex flexDirection='row'>
                            <Button color='white' p='0' mr='5px' bg='#3700B3' _hover={{ bg: '#6738d2' }}
                                onClick={randomCodeGenerator}>
                                <GiPerspectiveDiceSixFacesRandom />
                            </Button>
                            <Input type='number' maxLength={4} value={codeEdit} placeholder="Ex: 1234"
                                onChange={(e) => handleCodeEdit(e)} />
                        </Flex>
                    </InputGroup>
                    <FormLabel mt='5px'>Data de inicio</FormLabel>
                    <Input cursor='pointer' type='date' value={moment(dateEdit).format('YYYY-MM-DD')}
                        onChange={(e) => handleDateEdit(e)} />
                    <FormLabel mt='5px'>Plano</FormLabel>
                    <Select cursor='pointer' value={planeEdit}
                        onChange={(e) => handlePlaneEdit(e)}>
                        {plane === 'Básico' &&
                            <>
                                <option>Básico</option>
                                <option>Padrão</option>
                                <option>Plus</option>
                            </>}
                        {plane === 'Padrão' &&
                            <>
                                <option>Padrão</option>
                                <option>Plus</option>
                                <option>Básico</option>
                            </>}
                        {plane === 'Plus' &&
                            <>
                                <option>Plus</option>
                                <option>Padrão</option>
                                <option>Básico</option>
                            </>}
                    </Select>
                    <ModalFooter justifyContent='center'>
                        <Button bg='#3700B3' color='whitesmoke' w='60%' _hover={{ transform: 'scale(1.1)' }}>
                            Salvar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Edit;
