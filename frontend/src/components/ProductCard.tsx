import { Button, CardBody, CardFooter, Divider, Heading, Stack ,Text,Image,Card, Badge, Center, useToast} from "@chakra-ui/react";
import { Product } from "../models/Product";
import { addToShoppingCart } from "../services/shopping-cart-service";
import image from '../assets/a.jpg';

interface ProductCartProps {
    product: Product;
}
const ProductCard: React.FC<ProductCartProps> = ({product}) => {
    // toast for displaying messages
    const toast = useToast()

    const addProductToCart = ()=> {
        addToShoppingCart(product.id)
            .then(() => toast({
                title: 'Product added',
                description: "We've added the product to your cart.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            }))
            .catch(() => toast({
                title: 'cannot add product',
                description: 'you must be signed in',
                status: 'error',
                duration: 3000,
                isClosable: true,
            }))
    }

    return(
        <Card flexShrink={0} maxW='sm' >
        <CardBody>
            <Image
            src={image}
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
            <Button 
                size='sm' 
                variant='solid' 
                colorScheme='blue' 
                onClick={addProductToCart} 
                ml={"20"}
                isDisabled={product.inventory === 0}
            >
                Add to cart
            </Button>
        </CardFooter>   
        </Card>
    )
}

export default ProductCard;