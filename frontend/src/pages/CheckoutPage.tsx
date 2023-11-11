import { useEffect, useState } from 'react';
import { Box, Text, Button, VStack, HStack, Input, Heading, Container, Center, Image, Spacer, IconButton, Spinner } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Product } from '../models/Product';
import { getShoppingCart } from '../services/shopping-cart-service';
import image from '../assets/a.jpg';
import { createOrder } from '../services/order-service';
import { CreateOrderDto, OrderItemDto } from '../models/order-dto';
import { useNavigate } from 'react-router-dom';


function CheckoutPage()  {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    getShoppingCart(1)
    .then(data => setProducts(data.products))
    .catch(error => console.error(error))
    .finally(() => setIsLoading(false))
  }, []);

  const [quantities, setQuantities] = useState<{ [itemId: number]: number }>({});

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
    for (const item of products || []) {
      const quantity = quantities[item.id] || 0;
      total += item.price * quantity;
    }
    return total;
  };

  const handleConfirm = () => {
    // make the items in the dto format
    const orderItems: OrderItemDto[] = [];
    Object.keys(quantities).forEach(key => {
      const itemId = Number(key); // Convert key back to number
      const value = quantities[itemId];
      orderItems.push({productId : itemId ,quantity: value})
    });

    // create the order
    const order : CreateOrderDto = {
      userId: 1 ,
      total : calculateTotalPrice(),
      items :  orderItems
    };
    
    // send the request
    createOrder(order)
    .then(data => {console.log(data) ; setProducts([]); navigate('/') })
    .catch(err => console.error(err));
  };

  return (
    <div >
      {isLoading ? (
        <Center>
            <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
            mt={'20'}
            />
        </Center>
      ) : (
      <Container maxW='container.lg'>
        <Box p={4} >
          <Heading as="h2" size="lg" mb={10} mt={10}>
            Checkout
          </Heading>
          <VStack spacing={4} align="start" >
            {products?.map((item) => (
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
              <Image src={image} alt={item.name} w="100px" h="80px" />
              <VStack spacing={1} align="start">
                <Heading size='md'>{item.name}</Heading>
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
                <Button size="sm" onClick={() => handleIncrement(item.id)} colorScheme="blue" isDisabled={quantities[item.id] === products.find((e) => e.id == item.id)?.inventory }>
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
      )}
    </div>
  );
};

export default CheckoutPage;
