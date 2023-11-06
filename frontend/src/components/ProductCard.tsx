import { Button, ButtonGroup, CardBody, CardFooter, Divider, Heading, Stack ,Text,Image,Card, Badge} from "@chakra-ui/react";

export function ProductCard() {
    return(
        <Card flexShrink={0} maxW='sm' className="product-card">
        <CardBody>
            <Image
            src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            alt='Green double couch with wooden legs'
            borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
                <Heading size='md'>Living room Sofa</Heading>
                <Text color='blue.600' fontSize='2xl'>
                    $450
                    <Badge ml='1' colorScheme='green'>
                        in stock
                    </Badge>
                </Text>
            </Stack>
        </CardBody>
        <Divider />
        <CardFooter >
            <ButtonGroup spacing='2'>
            <Button  size='sm' variant='solid' colorScheme='blue'>
                Buy now
            </Button>
            <Button size='sm' variant='ghost' colorScheme='blue'>
                Add to cart
            </Button>
            
            </ButtonGroup>
        </CardFooter>
        </Card>
    )
}