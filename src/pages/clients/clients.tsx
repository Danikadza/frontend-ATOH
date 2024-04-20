import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { Button, Heading, Flex } from "@chakra-ui/react";
import ClientsTable from '../../components/clientsTable';

interface Client {
    AccountNumber: number;
    LastName: string;
    FirstName: string;
    MiddleName: string;
    DateOfBirth: string;
    INN: number;
    ResponsibleFullName: string;
    Status: string;
}


const ClientsPage: React.FC = () => {
    const navigate = useNavigate();
    const [clients, setClients] = useState<Client[]>([]);
    const user = localStorage.getItem('user');

    const getClients = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/clients/${user}`);
            setClients(response.data);
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    };

    const fetchData = async () => {
        try {
            await getClients();
            navigate("/clients");
        } catch (error) {
            console.error('Ошибка при получении клиентов:', error);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchData()
        } else {
            navigate("/")
        }
    }, []);

    const onExit = () => {
        localStorage.clear();
        navigate("/")
    }

    return (
        <>
            <Flex align="center" justify="space-between" mb={4}>
                <Heading as="h2" size="md">Пользователь: {user}</Heading>
                <Button onClick={onExit} colorScheme="red">Выйти</Button>
            </Flex>
            {clients.length > 0 ? (
                <ClientsTable clients={clients} />
            ) : (
                <p>Загрузка...</p> 
            )}
        </>
    );
}

export default ClientsPage;