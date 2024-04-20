import React, { useState } from 'react';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, Select } from "@chakra-ui/react";

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

const statusOptions = ["Не в работе", "В работе", "Отказ", "Сделка закрыта"];

const ClientsTable: React.FC<{ clients: Client[] }> = ({ clients }) => {
    const [editedClients, setEditedClients] = useState<Client[]>(clients);

    const handleStatusChange = async (index: number, newStatus: string) => {
        try {
            const updatedClients = [...editedClients];
            updatedClients[index].Status = newStatus;
            setEditedClients(updatedClients);

            const { AccountNumber } = updatedClients[index];
            await axios.post('/clients', { AccountNumber, Status: newStatus });
        } catch (error) {
            console.error('Ошибка при отправке запроса на обновление статуса:', error);
        }
    };


    return (
        <Table variant="striped" colorScheme="teal" mt={4}>
            <TableCaption>Список клиентов</TableCaption>
            <Thead>
                <Tr>
                    <Th>Номер счета</Th>
                    <Th>Фамилия</Th>
                    <Th>Имя</Th>
                    <Th>Отчество</Th>
                    <Th>Дата рождения</Th>
                    <Th>ИНН</Th>
                    <Th>Ответственное лицо</Th>
                    <Th>Статус</Th>
                </Tr>
            </Thead>
            <Tbody>
                {editedClients.map((client, index) => (
                    <Tr key={index}>
                        <Td>{client.AccountNumber}</Td>
                        <Td>{client.LastName}</Td>
                        <Td>{client.FirstName}</Td>
                        <Td>{client.MiddleName}</Td>
                        <Td>{client.DateOfBirth}</Td>
                        <Td>{client.INN}</Td>
                        <Td>{client.ResponsibleFullName}</Td>
                        <Td>
                            <Select
                                value={client.Status}
                                onChange={(e) => handleStatusChange(index, e.target.value)}
                            >
                                {statusOptions.map((option, optionIndex) => (
                                    <option key={optionIndex} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </Select>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}

export default ClientsTable;
