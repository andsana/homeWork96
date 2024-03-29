import express from 'express';
import mongoose from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import user from '../middleware/user';
import permit from '../middleware/permit';
import { imagesUpload } from '../multer';
import Cocktail from '../models/Сocktail';
import { CocktailMutation } from '../types';

const cocktailsRouter = express.Router();
cocktailsRouter.get('/', user, async (req: RequestWithUser, res, next) => {
  try {
    const user = req.user;
    let filter = {};

    if (user && user.role === 'admin') {
      filter = {};
    } else if (user) {
      filter = {
        $or: [{ isPublished: true }, { user: user._id }],
      };
    } else {
      filter = { isPublished: true };
    }

    const cocktails = await Cocktail.find(filter);
    return res.send(cocktails);
  } catch (e) {
    return next(e);
  }
});

cocktailsRouter.get('/:id', user, async (req: RequestWithUser, res, next) => {
  try {
    const cocktailId = req.params.id;
    const user = req.user;
    let filter = {};

    if (user && user.role === 'admin') {
      filter = {};
    } else if (user) {
      filter = {
        $or: [{ isPublished: true }, { user: user._id }],
      };
    } else {
      filter = { isPublished: true };
    }

    const cocktail = await Cocktail.findOne({ _id: cocktailId }).find(filter);

    if (!cocktail) {
      return res.status(404).send({ error: 'Not found cocktail!' });
    }

    return res.send(cocktail);
  } catch (e) {
    return next(e);
  }
});

cocktailsRouter.post(
  '/',
  auth,
  permit('admin', 'user'),
  imagesUpload.single('image'),
  async (req: RequestWithUser, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).send({ error: 'Unauthorized' });
      }

      const cocktailData: CocktailMutation = {
        user: req.user._id.toString(),
        title: req.body.title,
        image: req.file ? req.file.filename : null,
        recipe: req.body.recipe,
        ingredients: req.body.ingredients,
      };

      const cocktail = new Cocktail(cocktailData);
      await cocktail.save();

      res.send(cocktail);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }

      next(e);
    }
  },
);

cocktailsRouter.delete(
  '/:id',
  auth,
  permit('admin'),
  async (req: RequestWithUser, res, next) => {
    try {
      const cocktailId = req.params.id;

      const cocktail = await Cocktail.findById(cocktailId);

      if (!cocktail) {
        return res.status(404).send({ error: 'Not found cocktail!' });
      }

      await cocktail.deleteOne();

      return res.send(cocktail);
    } catch (e) {
      return next(e);
    }
  },
);

export default cocktailsRouter;
