import React from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  CardBody,
  Card,
  Center,
  CardHeader,
} from '@chakra-ui/react';
import backgroundImage from '../assets/a.jpg';

const Login = () => {
    const pageStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '91vh',
        };

    return (
        <Box
        style={pageStyle}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="80vh"
        >
            <Card minW={'md'} >
                <CardHeader>
                    <Heading as="h2" size="xl" mb={6} >
                        <Center>Login</Center>
                    </Heading>
                </CardHeader>
                <CardBody>
                    <FormControl id="email" isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" />
                    </FormControl>
                    <FormControl id="password" isRequired mt={4}>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" />
                    </FormControl>
                    <Button colorScheme="blue" size="lg" mt={6}>
                        Login
                    </Button>
                    <Text mt={4}>Don't have an account? <a href="/signup">Sign up</a></Text>
                </CardBody> 
            </Card>
        
        </Box>
    );
};

export default Login;
