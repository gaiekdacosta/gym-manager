import { Center, Flex, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { BsCash } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai'
import { MdDateRange } from 'react-icons/md';
import Header from '././components/header/Header';
import Create from '././components/create/Create';
import api from './api';
import Trash from "./components/trash/Trash";
import Edit from "./components/edit/Edit";
import moment from "moment"
import SearchBar from "./components/searchBar/searchBar";
import Void from "./components/void/void";

const App = () => {
  const [customer, setCustomer] = useState<any[]>([])
  const [searchBar, setSearchBar] = useState<string>('')

  const getRecords = () => {
    api.get('/records').then((response) => {
      setCustomer(response.data)
      console.log(response.data)
    })
      .catch((err) => {
        console.error("ops! ocorreu um erro : " + err);
      });
  }

  const searchLowerCase = searchBar.toLocaleLowerCase()
  const searchFilter = customer.filter((customerFiltred: any) =>
    customerFiltred.name.toLowerCase().includes(searchLowerCase))

  useEffect(() => {
    getRecords()
  }, [])

  return (
    <Flex h='100vh' justifyContent='flex-start' alignItems='center' flexDirection='column'>
      <Header />
      <SearchBar setSearchBar={setSearchBar} />
      {searchFilter.map((item, i: any) =>
        <Center w='80%' m='1%' key={i} borderRadius='md' bg='#ededed' boxShadow='xl'>
          <Flex m='20px' w='100%' flexDirection='column' color='#121212'>
            <Text fontWeight='semibold'>Nome: {item.name}</Text>
            <Flex h='10%' top='8px' justifyContent='left'>
              <AiOutlineUser style={{ margin: '3px 2px 0 0' }} />
              <Text mr='10px'>Matricula: {item.code}</Text>
              <MdDateRange style={{ margin: '3px 2px 0 0' }} />
              <Text mr='10px'>
                Data de inicio: {moment(item.date).format('DD/MM/YYYY')}
              </Text>
              <BsCash style={{ margin: '4px 3px 0 0' }} />
              <Text>Plano: {item.plane}</Text>
            </Flex>
          </Flex>
          <Flex w='10%'>
            <Edit name={item.name} date={item.date} plane={item.plane}
              code={item.code} getRecords={getRecords} />
            <Trash code={item.code} getRecords={getRecords} />
          </Flex>
        </Center>)}
      <Create getRecords={getRecords} />
    </Flex>
  )
}

export default App
