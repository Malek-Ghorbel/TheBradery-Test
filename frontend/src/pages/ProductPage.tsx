import { useEffect, useState } from "react";
import  ProductCard  from "../components/ProductCard";
import { Center, Container, Heading, SimpleGrid, Spinner, useToast } from "@chakra-ui/react";
import { Product } from "../models/Product";
import { fetchProducts } from "../services/product-service";

function ProductPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>();
    // toast for displaying messages
    const toast = useToast();

    useEffect(() => {
        fetchProducts()
        .then(data => setProducts(data))
        .catch(error => toast({
          title: 'cannot fetch products',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        }))
        .finally(() => setIsLoading(false))
    }, []);

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
            
            <Container maxW={'container.xl'} mb={10} >
                <Heading as="h2" size="lg" mb={10} mt={10}>
                    Nos produits
                </Heading>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={5} mt={10}>
                    {
                        products?.map((product: Product) => 
                            <ProductCard product={product} key={product.id}/>
                        )
                    }
                </SimpleGrid>
            </Container>
            )}
        </div>
    );
}

export default ProductPage;