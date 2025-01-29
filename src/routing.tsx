import Main from './pages/main/main';
import Favorites from './pages/favorites/favorites';
import Offer from './pages/offer/offer';
import Login from './pages/login/login';
import Error404 from './pages/error-404/error-404';
import Layout from './components/layout/layout';
import PrivateRoute from './components/private-router/private-router';
import { AppRoute } from './const';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

type RoutingProps = {
  rentalOffer: number;
}

export default function Routing({ rentalOffer }: RoutingProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout />}>
            <Route index element={<Main rentalOffer={rentalOffer} />} />
            <Route path={AppRoute.Favorites} element={
              <PrivateRoute >
                <Favorites />
              </PrivateRoute>
            }
            />
            <Route path={AppRoute.Offer} element={<Offer />} />
            <Route path={AppRoute.Login} element={
              <PrivateRoute isLoginPage >
                <Login />
              </PrivateRoute>
            }
            />
          </Route>
          <Route path='*' element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
