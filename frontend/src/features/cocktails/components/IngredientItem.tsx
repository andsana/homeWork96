import React from 'react';
import { Typography } from '@mui/material';
interface Props {
  title: string;
  quantity: number;
}

const IngredientItem: React.FC<Props> = ({ title, quantity }) => {
  return (
    <Typography variant="body1" color="text.secondary">
      {title} - {quantity} ml
    </Typography>
  );
};

export default IngredientItem;
