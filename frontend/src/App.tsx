import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Register from './features/users/Register';
import Login from './features/users/Login';
import Cocktails from './features/cocktails/Cocktails';
import CocktaileOne from './features/cocktails/CocktailOne';

const App = () => {
  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Cocktails />} />
            <Route path="/cocktails" element={<Cocktails />} />
            <Route path="/cocktails/:cocktailId" element={<CocktaileOne />} />
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
