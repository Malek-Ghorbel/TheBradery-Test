import { Button, CardBody, CardFooter, Divider, Heading, Stack ,Text,Image,Card, Badge, Center, useToast} from "@chakra-ui/react";
import { Product } from "../models/Product";
import { addToShoppingCart } from "../services/shopping-cart-service";

interface ProductCartProps {
    product: Product;
}
const ProductCard: React.FC<ProductCartProps> = ({product}) => {
    const toast = useToast()

    const addProductToCart = ()=> {
        addToShoppingCart(1, product.id)
            .then(data => toast({
                title: 'Product added',
                description: "We've added the product to your cart.",
                status: 'success',
                duration: 3000,
                isClosable: true,
              }))
            .catch(error => toast({
                title: 'cannot add product',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
              }))
    }

    return(
        <Card flexShrink={0} maxW='sm' >
        <CardBody>
            <Image
            src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            alt={product.name}
            borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
                <Center>
                    <Heading size='md'>{product.name}</Heading>
                </Center>
                <Center>
                    <Text color='blue.600' fontSize='2xl'>
                        ${product.price}
                        {
                            (product.inventory > 0) 
                            ?
                            <Badge ml='1' colorScheme='green'>
                                in stock
                            </Badge> 
                            :
                            <Badge ml='1' colorScheme='red'>
                                out of stock
                            </Badge>
                        }
                    </Text>
                </Center>
            </Stack>
        </CardBody>
        <Divider />
        <CardFooter >
            <Center>
                <Button size='sm' variant='solid' colorScheme='blue' onClick={addProductToCart} ml={"20"}>
                    Add to cart
                </Button>
            </Center>
        </CardFooter>   
        </Card>
    )
}

export default ProductCard;