import React from 'react';
import {
  Box,
  Image,
  Text,
  HStack,
  Spacer,
  IconButton,
  Heading,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Product } from '../models/Product';
import image from '../assets/a.jpg';

interface ProductListItemProps {
  product: Product;
  onDelete: (id: number) => void;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product, onDelete }) => {
  // receive a product as props and display it as a list item
  return (
    <Box borderWidth="1px" borderRadius="md" p={2} m={2} display="flex" width="100%">
      <Image src={`${image}`} alt={product.name} w="50px" h="50px" />
      <Box ml={4}>
        <Heading fontSize="md">{product.name}</Heading>
        <Text fontSize="sm">${product.price.toFixed(2)}</Text>
      </Box>
      <Spacer />
      <HStack spacing={2}>
      <IconButton 
          size={'sm'}
          aria-label="Delete"
          icon={<DeleteIcon />}
          colorScheme="red"
          onClick={() => onDelete(product.id)}
        />
      </HStack>
    </Box>
  );
};

export default ProductListItem;
