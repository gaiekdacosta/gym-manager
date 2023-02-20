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

const App = () => {
  const [customer, setCustomer] = useState<any[]>([])

  const getRecords = () => {
    api.get('/records').then((response) => {
      setCustomer(response.data)
    })
      .catch((err) => {
        console.error("ops! ocorreu um erro : " + err);
      });
  }

  useEffect(() => {
    getRecords()
  }, [])

  return (
    <>
      <Center h='100vh' justifyContent='flex-start' flexDirection='column'>
        <Header />
        {customer.map((item, i: any) =>
          <Center w='80%' m='15px' key={i} borderRadius='md' bg='#ededed' boxShadow='xl'>
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
      </Center>
    </>
  )
}

export default App
