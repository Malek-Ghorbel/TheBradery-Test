import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    VStack,
    Text,
  } from '@chakra-ui/react'
import React from 'react'
import ProductListItem from './ProductListItem';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
  }

  const cartItems: any[] = [ 
    { id : 0 , title: 'test' , price : 2.4 , imageUrl :'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'},
    { id : 1 , title: 'test' , price : 2.4 , imageUrl :'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'},
    { id : 2 , title: 'test' , price : 2.4 , imageUrl :'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'}

   ];
  
  const ShoppingCart: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
    return (
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'md'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Cart</DrawerHeader>

          <DrawerBody>
            <VStack spacing={1}>
                {cartItems.length > 0 ? (
                cartItems.map((item) => (
                    <ProductListItem
                        key={item.id}
                        product={item} onDelete={function (id: number): void {
                            console.log("delete" + id);
                        } }                    
                    />
                ))
                ) : (
                <Text>Your cart is empty.</Text>
                )}
                
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Checkout</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  };
  
  export default ShoppingCart;