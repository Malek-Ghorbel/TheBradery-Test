// ProductListItem.tsx
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

interface ProductListItemProps {
  product: {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
  };
  onDelete: (id: number) => void;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product, onDelete }) => {
  return (
    <Box borderWidth="1px" borderRadius="md" p={2} m={2} display="flex" width="100%">
      <Image src={product.imageUrl} alt={product.title} w="50px" h="50px" />
      <Box ml={4}>
        <Heading fontSize="md">{product.title}</Heading>
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
