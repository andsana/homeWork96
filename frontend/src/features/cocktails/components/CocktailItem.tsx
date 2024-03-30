import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { apiURL } from '../../../constants';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';

interface Props {
  title: string;
  image: string;
  recipe: string;
  isPublished: boolean;
  isPublish: boolean;
  ontogglePublish: (cocktailId: string) => void;
  isLoading: boolean;
  cocktailId: string;
  userId: string;
}

const Cocktail: React.FC<Props> = ({
  title,
  image,
  recipe,
  isPublished,
  cocktailId,
  userId,
  ontogglePublish,
  isPublish,
}) => {
  const user = useAppSelector(selectUser);
  const cardImage = apiURL + '/' + image;

  return (
    <Grid item xs={12} sm={6} md={3} lg={3}>
      <Card
        sx={{
          maxWidth: 345,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CardMedia
          sx={{ height: 250, objectFit: 'contain' }}
          component="img"
          image={cardImage}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {recipe}
          </Typography>
        </CardContent>
        <CardActions sx={{ mt: 'auto' }}>
          {user && user._id === userId && (
            <Typography variant="body2" color="text.secondary">
              {!isPublished && 'not published'}
            </Typography>
          )}
          {user && user.role === 'admin' && (
            <LoadingButton
              size="small"
              color="primary"
              onClick={() => ontogglePublish(cocktailId)}
              loading={isPublish}
              loadingPosition="start"
              startIcon={isPublished ? <SaveIcon /> : <DeleteIcon />}
              variant="contained"
            >
              <span>{isPublished ? 'Unpublish' : 'Publish'}</span>
            </LoadingButton>
          )}
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Cocktail;
