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
                title: 'Produit ajouté',
                description: "On a ajouté le produit a votre panier.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            }))
            .catch(() => toast({
                title: 'Erreur',
                description: 'vous devez etre connecté',
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
                        €{product.price}
                        {
                            (product.inventory > 0) 
                            ?
                            <Badge ml='1' colorScheme='green'>
                                En stock
                            </Badge> 
                            :
                            <Badge ml='1' colorScheme='red'>
                                Epuisé
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
                Ajouter au panier
            </Button>
        </CardFooter>   
        </Card>
    )
}

export default ProductCard;