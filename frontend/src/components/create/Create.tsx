import { useState } from 'react';
import {
    Box, Button, Flex, FormLabel, Input, InputGroup, Modal, ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader, ModalOverlay, Select, Text, useDisclosure, useToast
} from "@chakra-ui/react";
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import { MdAdd } from "react-icons/md";
import api from '../../api';

interface createProps {
    getRecords: () => any
}

const Create: React.FC<createProps> = ({ getRecords }) => {
    const [name, setName] = useState<string>('')
    const [code, setCode] = useState<number>(0)
    const [date, setDate] = useState<string>('')
    const [plane, setPlane] = useState<string>('Básico')

    const { isOpen, onOpen, onClose } = useDisclosure()

    const toast = useToast()

    const handleName = (e: any) => setName(e.target.value)
    const handleCode = (e: any) => setCode(e.target.value)
    const handleDate = (e: any) => setDate(e.target.value)
    const handlePlane = (e: any) => setPlane(e.target.value)

    const handleCreate = () => {
        api.post('/create', {
            name: name,
            code: code,
            date: date,
            plane: plane,
        })
            .then(() => {
                toast({
                    title: 'Item adicionado com sucesso',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
                getRecords()
                setCode(0)
            }).catch((err) => {
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
        return setCode(randomNumber)
    }

    return (
        <>
            <Box position='fixed' w='40px' h='40px'
                p='8px' bottom='2%' right='6%' bg='#3700B3' boxShadow='xl' zIndex='2'
                color='whitesmoke' borderRadius='2xl' cursor='pointer' onClick={onOpen}
                _hover={{ transition: '0.5s', transform: 'scale(1.1)' }}>
                <MdAdd style={{ width: '25px', height: '25px' }} />
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent p='20px'>
                    <ModalCloseButton />
                    <ModalHeader textAlign='center'>Digite os dados do aluno</ModalHeader>
                    <FormLabel>Nome do aluno</FormLabel>
                    <Input placeholder="Ex: joão silva"
                        onChange={(e) => handleName(e)} />
                    <InputGroup flexDirection='column'>
                        <FormLabel mt='5px'>Cógido do aluno</FormLabel>
                        <Flex flexDirection='row'>
                            <Button color='white' p='0' mr='5px' bg='#3700B3' _hover={{ bg: '#6738d2' }}
                                onClick={randomCodeGenerator}>
                                <GiPerspectiveDiceSixFacesRandom />
                            </Button>
                            <Input type='number' maxLength={4} placeholder="Ex: 1234" value={code}
                                onChange={(e) => handleCode(e)} />
                        </Flex>
                    </InputGroup>
                    <FormLabel mt='5px'>Data de inicio</FormLabel>
                    <Input cursor='pointer' type='date'
                        onChange={(e) => handleDate(e)} />
                    <FormLabel mt='5px'>Plano</FormLabel>
                    <Select cursor='pointer' onChange={(e) => handlePlane(e)}>
                        <option>Básico</option>
                        <option>Padrão</option>
                        <option>Plus</option>
                    </Select>
                    <ModalFooter justifyContent='center'>
                        <Button bg='#3700B3' w='60%' color='whitesmoke' _hover={{ transform: 'scale(1.1)' }}
                            onClick={handleCreate}>
                            Salvar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Create;
