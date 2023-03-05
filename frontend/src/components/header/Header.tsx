import { Button, Flex, Text, useColorMode } from "@chakra-ui/react";
import { CgGym } from 'react-icons/cg';
import { MdLightMode, MdModeNight } from 'react-icons/md'

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Flex color='white' bg='#3700B3' borderRadius='0 0 10px 10px' w='80%' p='10px' justifyContent='space-between'>
            <Flex w='80%'>
                <Text fontWeight='bold' ml='20px' fontSize='20px'>Gym menager</Text>
                <CgGym style={{ margin: '4px', height: '25px', width: '25px' }} />
            </Flex>
            <Button onClick={toggleColorMode} bg='#3700B3' p='0' _hover={{ bg: '#3700B3' }}>
                {colorMode === 'light' ? <MdLightMode /> : <MdModeNight />}
            </Button>
        </Flex>
    )
}

export default Header;
