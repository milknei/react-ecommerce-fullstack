import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@pages/home/index';
import { ItemPage } from '@pages/item/index';
import { CheckoutPage } from '@pages/checkout/index';
import { CheckoutSuccessPage } from '@pages/checkout-success/index';
import { GamesPage } from '@pages/games/index';
import { Navbar } from '@widgets/navbar/index';
import { ScrollToTop } from './lib/scroll-to-top';
import { CartMenu } from '@widgets/cart/index';
import { SignUp } from '@widgets/sing-up/index';
import { SingIn } from '@widgets/sing-in/index';
import { SidebarLayout } from './ui/sidebar-layout';
import { User, UserOrdersTab, UserWishListTab, UserSettingsTab } from '@pages/user/index';
import { WishList } from '@widgets/wish-list/index';
import { useSelector } from 'react-redux';

export const AppRouter = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <BrowserRouter>
      <Navbar />
      <CartMenu />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="games" element={<GamesPage />} />
        <Route path="games/:itemSlug" element={<ItemPage />} />
        <Route path="registration" element={<SignUp />} />
        <Route path="login" element={<SingIn />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="checkout/success" element={<CheckoutSuccessPage />} />
        <Route path="wishlist" element={<WishList />} />
        {isLoggedIn ? (
          <Route path="user" element={<User />}>
            <Route path="orders" element={<UserOrdersTab />} />
            <Route path="wishlist" element={<UserWishListTab />} />
            <Route path="settings" element={<UserSettingsTab />} />
          </Route>
        ) : (
          <Route path="user" element={<SingIn />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};
