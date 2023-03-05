import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { BsSearch } from "react-icons/bs"

interface SearchBarProps {
    setSearchBar: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchBar }) => {
    const handleSearch = (e: any) => setSearchBar(e.target.value)

    return (
        <Flex w='40%' mt='1%'>
            <InputGroup bg='#dedede' color='#121212' _hover={{ transform: 'scale(1.1)', transition: '0.5s' }}
                borderRadius='2xl'>
                <InputLeftElement
                    pointerEvents='none'
                    children={<BsSearch />} />
                <Input border='1px solid whitesmoke' onChange={handleSearch} placeholder="Pesquisar" />
            </InputGroup>
        </Flex>
    )
}

export default SearchBar;
