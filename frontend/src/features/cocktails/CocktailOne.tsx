import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import IngredientItem from './components/IngredientItem';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectCocktailById,
  selectToggleCocktailPublishStatusLoading,
} from './cocktailsSlice';
import { useParams } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectUser } from '../users/usersSlice';
import { apiURL } from '../../constants';
import { toggleCocktailPublishStatus } from './cocktailsThunks';

const Cocktail = () => {
  const { cocktailId } = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isLoadingPublish = useAppSelector(
    selectToggleCocktailPublishStatusLoading,
  );
  // const userId = cocktail.user

  console.log('cocktailId', cocktailId);

  const cocktail = useAppSelector((state) =>
    selectCocktailById(state, cocktailId),
  );

  console.log(cocktail);

  if (!cocktailId || !cocktail) {
    return <p>Cocktail not found</p>;
  }

  const cardImage = apiURL + '/' + cocktail.image;

  console.log(cocktail);

  const handleTogglePublish = (cocktailId: string) => {
    if (
      cocktailId &&
      confirm(
        'Are you sure you want to change the publication status of this cocktail?',
      )
    ) {
      dispatch(toggleCocktailPublishStatus(cocktailId));
    }
  };

  return (
    <Card>
      <Box sx={{ display: 'flex' }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={cardImage}
          alt="Live from space album cover"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {cocktail.title}
            </Typography>
            <ul>
              <Typography component="div" variant="h6">
                Ingredients
              </Typography>
              {cocktail.ingredients.map((ingredient, index) => (
                <IngredientItem
                  title={ingredient.title}
                  quantity={ingredient.quantity}
                  key={index}
                />
              ))}
            </ul>
          </CardContent>
        </Box>
      </Box>
      <CardActions sx={{ mt: 'auto' }}>
        {user && user._id === cocktail.user && (
          <Typography variant="body2" color="text.secondary">
            {!cocktail.isPublished && 'not published'}
          </Typography>
        )}
        {user && user.role === 'admin' && (
          <LoadingButton
            size="small"
            color="primary"
            onClick={() => handleTogglePublish(cocktailId)}
            loading={cocktail._id === isLoadingPublish}
            loadingPosition="start"
            startIcon={cocktail.isPublished ? <SaveIcon /> : <DeleteIcon />}
            variant="contained"
          >
            <span>{cocktail.isPublished ? 'Unpublish' : 'Publish'}</span>
          </LoadingButton>
        )}
      </CardActions>
    </Card>
  );
};

export default Cocktail;
