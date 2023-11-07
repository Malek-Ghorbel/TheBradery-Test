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
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import {BsFillCartFill} from 'react-icons/bs';
import {CgProfile} from 'react-icons/cg'
import CartDrawer from './ShoppingCart';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState<any>(null); // User state, set to null when not signed in
  const [isCartOpen, setCartOpen] = useState(false);

  const handleSignOut = () => {
    // Implement your sign-out logic here
    setUser(null);
  };

  const handleOpenCart = () => {
    setCartOpen(true);
  };

  const handleCloseCart = () => {
    setCartOpen(false);
  };


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
              Home
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
        
        {user ? ( // Check if user is signed in
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
      <CartDrawer isOpen={isCartOpen} onClose={handleCloseCart} />

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