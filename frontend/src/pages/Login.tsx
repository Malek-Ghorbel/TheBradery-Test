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
  useToast,
} from '@chakra-ui/react';
import backgroundImage from '../assets/a.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth-service';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // toast for displaying error messages
    const toast = useToast();
    
    // Login when submiting form
    const handleSubmit = async (event:any) => {
        event.preventDefault();
        loginUser(email, password)
        .then((data) => {
            localStorage.setItem('token', data.token); // Save the token
            navigate('/');// Navigate to the home page
            window.location.reload();
        } )
        .catch((error) => toast({
            title: 'Error',
            description: error.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
        }))
    };

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
                        <Center>Se connecter</Center>
                    </Heading>
                </CardHeader>

                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </FormControl>
                        <FormControl id="password" isRequired mt={4}>
                            <FormLabel>Mot de passe</FormLabel>
                            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </FormControl>
                        <Button colorScheme="blue" type='submit' size="lg" mt={6}>
                            Se connecter
                        </Button>
                    </form>
                    <Text mt={4}>Vous n'acez pas de compte? <a href="/signup">S'inscrire</a></Text>
                </CardBody> 
            </Card>
        </Box>
    );
};

export default Login;
