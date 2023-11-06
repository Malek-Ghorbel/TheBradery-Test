import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { Center, Container, SimpleGrid, Spinner } from "@chakra-ui/react";

function ProductPage() {
    const itemElements = [];
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      
        return () => {
          clearTimeout(loadingTimeout);
        };
    }, []);
      

    for (let i = 0; i < 22; i++) {
        itemElements.push(
            <ProductCard/>
        );
    }

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
                    />
                </Center>
                
            ) : (
            
            <Container maxW={'container.xl'}>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={5} mt={10}>
                    {itemElements}

                </SimpleGrid>
            </Container>
            )}
        </div>
    );
}

export default ProductPage;