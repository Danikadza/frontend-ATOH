import React from 'react';
import { useRouteError } from 'react-router-dom';
import {
    Flex,
} from '@chakra-ui/react'

const ErrorPage: React.FC = () => {
    const error = useRouteError();

    if (!error) {
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
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
            </Flex>
            </Flex>
        );
    }

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
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred:</p>
            <p>
                <i>{(error as Error).message}</i>
            </p>
            </Flex>
            </Flex>
    );
}

export default ErrorPage;
