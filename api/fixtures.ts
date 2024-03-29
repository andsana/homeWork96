import mongoose from 'mongoose';
import config from './config';
import crypto from 'crypto';
import User from './models/User';
import Cocktail from './models/Сocktail';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ['users', 'cocktails'];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  const [user, _admin] = await User.create(
    {
      email: 'user@mail.local',
      displayName: 'user',
      password: '123',
      token: crypto.randomUUID(),
      role: 'user',
      image: 'fixtures/avatar.png',
    },
    {
      email: 'admin@mail.local',
      displayName: 'admin',
      password: '123',
      token: crypto.randomUUID(),
      role: 'admin',
      image: 'fixtures/avatar.png',
    },
  );

  await Cocktail.create(
    {
      user: user._id,
      title: 'Blue Lagoon',
      image: 'fixtures/laguna.jpg',
      recipe:
        'Это сладкий освежающий лонг на водке с добавлением ликёра блю кюрасао,  который придаёт коктейлю нежный голубой оттенок..',
      ingredients: [
        { title: 'водка', quantity: 50 },
        { title: 'Ликер блю кюрасао Fruko Schulz', quantity: 20 },
        { title: 'спрайт', quantity: 150 },
      ],
    },
    {
      user: user._id,
      title: 'Margarita',
      image: 'fixtures/margarita.jpg',
      recipe: 'Это солоноватый кислый коктейль на текиле с лаймовым соком.',
      ingredients: [
        { title: 'серебряная текила', quantity: 50 },
        { title: 'лаймовый сок', quantity: 30 },
        { title: 'сахарный сироп', quantity: 10 },
      ],
      isPublished: true,
    },
    {
      user: user._id,
      title: 'Mojito',
      image: 'fixtures/mojito.jpg',
      recipe:
        'Это освежающий сладкий лонг на основе рома с большим количеством мяты и лайма. Традиционно в коктейль добавляют газированную воду, но можно заменить её на спрайт.',
      ingredients: [
        { title: 'белый ром', quantity: 50 },
        { title: 'сахарный сироп', quantity: 15 },
        { title: 'содовая', quantity: 100 },
      ],
      isPublished: true,
    },
  );

  await db.close();
};

void run();
