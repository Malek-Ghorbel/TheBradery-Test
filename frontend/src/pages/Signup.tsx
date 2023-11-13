import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Card,
  CardBody,
  CardHeader,
  Center,
  useToast,
} from '@chakra-ui/react';
import backgroundImage from '../assets/a.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth-service';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();
  // toast for displaying error messages
  const toast = useToast();

  const handleSubmit = async (event:any) => {
      event.preventDefault();
      registerUser(email, password, fullName)
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
    height: '115vh',
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
      <Card minW={'lg'} >
        <CardHeader>
            <Heading as="h2" size="xl" mb={2} >
                <Center>S'inscrire</Center>
            </Heading>
        </CardHeader>
        <CardBody>
        <form onSubmit={handleSubmit}>
          <FormControl id="email" isRequired mb={3}>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </FormControl>
          <FormControl id="name" isRequired mb={3}>
            <FormLabel>Nom complet</FormLabel>
            <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
          </FormControl>
          <FormControl id="password" isRequired mb={3}>
            <FormLabel>Mot de passe</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </FormControl>
          <FormControl id="confirmPassword" isRequired >
            <FormLabel>Confirmer le mot de passe</FormLabel>
            <Input type="password" />
          </FormControl>
          <Button colorScheme="blue" type="submit" size="md" mt={6}>
            S'inscrire
          </Button>
        </form>
        <Text mt={4}>Vous avez deja un compte? <a href="/login">Se connecter</a></Text>
      </CardBody> 
    </Card>
  </Box>
  );
};

export default Signup;
