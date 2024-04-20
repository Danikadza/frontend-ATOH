import React, {useState, useEffect} from 'react';
import {
    Button,
    Input,
    FormControl,
    FormLabel,
    Flex,
    InputGroup,
    InputRightElement
} from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const [show, setShow] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const handleClick = () => setShow(!show)
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          navigate("/clients")
        } else {
            navigate("/")
        }
    }, []);

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/auth', {
                login,
                password
            });
            const data = response.data;
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', data.FullName);
            return navigate("/clients")
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    };

    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            height="100vh"
        >
            <Flex direction="column"
                p={4}
                rounded={6}
                boxShadow="md"
                bg="white"
            >
                <FormControl>
                    <FormLabel>Login</FormLabel>
                    <Input type='text' value={login} onChange={(e) => setLogin(e.target.value)}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button mt={4} colorScheme='teal' variant='solid' onClick={handleLogin}>Button</Button>
            </Flex>
        </Flex>
    );
}

export default LoginPage;