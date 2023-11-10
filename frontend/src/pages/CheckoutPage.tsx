import React, { useState } from 'react';
import { Box, Text, Button, VStack, HStack, Input, Heading, Container, Center, Image, Spacer, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

  interface CheckoutPageProps {
    cartItems: {
      id: number;
      title: string;
      price: number;
      imageUrl: string;
    }[];
  }

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems }) => {
  const [quantities, setQuantities] = useState<{ [itemId: number]: number }>({});
  const maxQuantity = 3 ;
  const handleQuantityChange = (itemId: number, quantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: quantity,
    }));
  };

  const handleIncrement = (itemId: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) + 1,
    }));
  };

  const handleDecrement = (itemId: number) => {
    const currentQuantity = quantities[itemId] || 0;
    if (currentQuantity > 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: currentQuantity - 1,
      }));
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;
    for (const item of cartItems) {
      const quantity = quantities[item.id] || 0;
      total += item.price * quantity;
    }
    return total.toFixed(2);
  };

  const handleConfirm = () => {
    // Handle the confirm action, e.g., sending the order with quantities
  };

  return (
    <Container maxW='container.lg'>
        <Box p={4} >
        <Heading as="h2" size="lg" mb={10} mt={10}>
            Checkout
        </Heading>
        <VStack spacing={4} align="start" >
            {cartItems.map((item) => (
            <HStack
                key={item.id}
                spacing={4}
                align="center"
                bg="white"
                p={4}
                borderRadius="md"
                boxShadow="md"
                width={'100%'}
            >
                <Image src={item.imageUrl} alt={item.title} w="100px" h="80px" />
                <VStack spacing={1} align="start">
                    <Heading size='md'>{item.title}</Heading>
                    <Text fontSize="md" color="gray.600">
                        Price: ${item.price.toFixed(2)}
                    </Text>
                    
                </VStack>
                <Spacer/>
                <HStack>
                        <Button size="sm" onClick={() => handleDecrement(item.id)} colorScheme="blue">
                            -
                        </Button>
                        <Input
                        type="number"
                        min="1"
                        step="1"
                        placeholder="Quantity"
                        value={quantities[item.id] || 0}
                        isReadOnly
                        w="50px"
                        />
                        <Button size="sm" onClick={() => handleIncrement(item.id)} colorScheme="blue" isDisabled={quantities[item.id] === maxQuantity}>
                            +
                        </Button>
                    </HStack>
                <IconButton 
                size="sm"
                aria-label="Delete"
                icon={<DeleteIcon />}
                colorScheme="red"
                onClick={() => {}}
                />
            </HStack>
            ))}
        </VStack>
        <Text fontSize="lg" mt={4}>
            Total Price: ${calculateTotalPrice()}
        </Text>
        <Center>
            <Button colorScheme="blue" onClick={handleConfirm} mt={4}>
                Confirm
            </Button>
        </Center>
        
        </Box>
    </Container>
    
  );
};

export default CheckoutPage;
