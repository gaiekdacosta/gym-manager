import {
    Button, Popover, PopoverBody, PopoverCloseButton,
    PopoverContent, PopoverTrigger, Text, useToast
} from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";
import api from "../../api";

interface trashProps {
    code: number,
    getRecords: () => any
}

const Trash: React.FC<trashProps> = ({ code, getRecords }) => {

    const toast = useToast()

    const handleDelete = () => {
        api.patch('/trash', {
            code: code
        })
            .then(() => {
                toast({
                    title: 'Item removido com sucesso',
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

    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <Button bg='#3700B3' m='0 5px 0 5px' color='whitesmoke' _hover={{ bg: '#6738d2' }}>
                        <BsTrash />
                    </Button>
                </PopoverTrigger>
                <PopoverContent w='100%'>
                    <PopoverCloseButton />
                    <PopoverBody m='10px' display='flex' alignItems='center' flexDirection='column'>
                        <Text mt='2px'>Tem certeza que deseja excluir esse aluno?</Text>
                        <Button bg='#E53935' fontWeight='normal' color='white'
                            w='40%' h='25px' _hover={{ background: '#f53f3b' }}
                            onClick={handleDelete}>
                            Excluir
                        </Button>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </>
    )
}

export default Trash;
