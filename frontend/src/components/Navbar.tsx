import { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Spacer,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  List,
  ListItem,
  Button,
  Icon,
  useToast,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import {BsFillCartFill} from 'react-icons/bs';
import {CgProfile} from 'react-icons/cg'
import CartDrawer from './ShoppingCart';
import Cart from '../models/Cart';
import { getShoppingCart, removefromShoppingCart } from '../services/shopping-cart-service';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<Cart>();
  // toast for displaying error messages
  const toast = useToast();

  const isUserLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token; // returns true if token is present, false otherwise
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  // fetch the cart items from backend when opening the drawer
  const handleOpenCart = () => {
    getShoppingCart()
      .then(data => setCart(data))
      .catch(() => toast({
        title: 'cannot display cart',
        description: 'you must be signed in',
        status: 'error',
        duration: 3000,
        isClosable: true,
    }))
    setCartOpen(true);
  };

  const handleCloseCart = () => {
    setCartOpen(false);
  };

  // define the delete item from cart function and pass it to the drawer
  const deleteItem = (id: number)=> {
    removefromShoppingCart(id)
    .then(data =>  setCart(data))
    .catch(error => toast({
      title: 'cannot delete froom cart',
      description: error.message,
      status: 'error',
      duration: 3000,
      isClosable: true,
    }))
  } 

  return (
    <Box boxShadow="lg" bg="white" p={4}>
      <Flex align="center">
        <IconButton aria-label='' icon={<HamburgerIcon />} onClick={onOpen} display={{ base: 'block', md: 'none' }} />
        <Heading as="h1" size="lg" mr={3}>
          The bradery
        </Heading>

        {/* Display navigation items in the main content for wider screens */}
        <List display={{ base: 'none', md: 'flex' }}>
          <ListItem>
            <Button variant="ghost" w="100%">
              <a href='/'> 
                Home
              </a>
            </Button>
          </ListItem>
          <ListItem>
            <Button variant="ghost" w="100%">
              <a href='/'>              
                Products
              </a>
            </Button>
          </ListItem>
          <ListItem>
            <Button variant="ghost" w="100%">
              About
            </Button>
          </ListItem>
          <ListItem>
            <Button variant="ghost" w="100%">
              Contact
            </Button>
          </ListItem>
        </List>

        <Spacer />
        <Button variant="ghost" mr={2} onClick={handleOpenCart}>
          <Icon boxSize={5} as={BsFillCartFill}/>
        </Button>
        
        {isUserLoggedIn() ? ( // Check if user is signed in
          <>
            <Button variant="ghost" mr={2}>
              <Icon boxSize={5} as={CgProfile}/>
            </Button>
            <Button variant="ghost" onClick={handleSignOut}>
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" colorScheme='blue' mr={2}>
              <a href='/login'>
                Sign In
              </a>
            </Button>
            <Button variant='solid' colorScheme='blue'>
              <a href='/signup'>
                Sign Up
              </a>
            </Button>
          </>
        )}
      </Flex>
      <CartDrawer isOpen={isCartOpen} onClose={handleCloseCart} cart={cart} onDeleteItem={deleteItem}/>

      {/* Display navigation items in the drawer for smaller screens */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <List >
              <ListItem>
                <Button variant="ghost" w="100%">
                  Home
                </Button>
              </ListItem>
              <ListItem>
                <Button variant="ghost" w="100%">
                  Products
                </Button>
              </ListItem>
              <ListItem>
                <Button variant="ghost" w="100%">
                  About
                </Button>
              </ListItem>
              <ListItem>
                <Button variant="ghost" w="100%">
                  Contact
                </Button>
              </ListItem>
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;