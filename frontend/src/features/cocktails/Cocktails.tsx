import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectCocktails,
  selectCocktailsLoading,
  selectDeleteLoading,
  selectToggleCocktailPublishStatusLoading,
} from './cocktailsSlice';
import CoctailItem from './components/CocktailItem';
import { fetchCocktails, toggleCocktailPublishStatus } from './cocktailsThunks';
import { useEffect } from 'react';

const Cocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  console.log(cocktails);
  const isLoadingCocktails = useAppSelector(selectCocktailsLoading);
  const isLoadingDelete = useAppSelector(selectDeleteLoading);
  const isLoadingPublish = useAppSelector(
    selectToggleCocktailPublishStatusLoading,
  );

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

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

  if (isLoadingCocktails) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid
      item
      container
      spacing={2}
      justifyContent="center"
      alignItems="stretch"
    >
      {cocktails.length > 0 ? (
        cocktails.map((cocktail) => (
          <CoctailItem
            key={cocktail._id}
            cocktailId={cocktail._id}
            title={cocktail.title}
            image={cocktail.image}
            recipe={cocktail.recipe}
            isPublished={cocktail.isPublished}
            ontogglePublish={() => handleTogglePublish(cocktail._id)}
            isLoading={cocktail._id === isLoadingDelete}
            isPublish={cocktail._id === isLoadingPublish}
            userId={cocktail.user}
          />
        ))
      ) : (
        <Typography>No cocktails available</Typography>
      )}
    </Grid>
  );
};

export default Cocktails;
