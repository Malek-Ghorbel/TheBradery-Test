import { useEffect, useState } from "react";
import  ProductCard  from "../components/ProductCard";
import { Center, Container, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import { Product } from "../models/Product";
import { fetchProducts } from "../services/product-service";

function ProductPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>();

    useEffect(() => {
        const fetchData = async () => {
        try {
            const data = await fetchProducts();
            setProducts(data);
        } catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
        };

        fetchData();
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
                    Our Products
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