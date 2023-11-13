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
import ProductListItem from './ProductListItem';
import Cart from '../models/Cart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart : Cart|undefined;
  onDeleteItem: (id:number) => void;
}

const ShoppingCart: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, onDeleteItem }) => {
  
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'md'}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Votre panier</DrawerHeader>

        <DrawerBody>
          <VStack spacing={1}>
            {cart ? ( // check if the shopping cart has items
              cart?.products.map((item) => (
                <ProductListItem
                    key={item.id}
                    product={item} onDelete={onDeleteItem}                    
                />
              ))
            ) : (
              <Text>Votre panier est vide.</Text>
            )}
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant='outline' mr={3} onClick={onClose}>
            Annuler
          </Button>
          <Button colorScheme='blue'>
            <a href='/checkout'>Commande</a>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
  
export default ShoppingCart;