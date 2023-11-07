import React from 'react';
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
} from '@chakra-ui/react';
import backgroundImage from '../assets/a.jpg';


const Signup = () => {
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
                <Center>Signup</Center>
            </Heading>
        </CardHeader>
        <CardBody>
        <FormControl id="email" isRequired mb={3}>
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
        </FormControl>
        <FormControl id="name" isRequired mb={3}>
          <FormLabel>Full name</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="phone" isRequired mb={3}>
          <FormLabel>Phone</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="adress" isRequired mb={3}>
          <FormLabel>Adress</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="password" isRequired mb={3}>
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
        <FormControl id="confirmPassword" isRequired >
          <FormLabel>Confirm Password</FormLabel>
          <Input type="password" />
        </FormControl>
        <Button colorScheme="blue" size="md" mt={6}>
          Signup
        </Button>
        <Text mt={4}>Already have an account? <a href="/login">Login</a></Text>
      </CardBody> 
    </Card>
  </Box>
  );
};

export default Signup;
