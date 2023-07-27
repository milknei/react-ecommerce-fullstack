import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ItemPage } from '@pages/item/index';
import { CheckoutPage } from '@pages/checkout/index';
import { CheckoutSuccessPage } from '@pages/checkout-success/index';
import { GamesPage } from '@pages/games/index';
import { ScrollToTop } from './lib/scroll-to-top';
import { CartMenu } from '@widgets/cart/index';
import { SignUp } from '@widgets/sing-up/index';
import { SingIn } from '@widgets/sing-in/index';
import { User, UserOrdersTab, UserWishListTab, UserSettingsTab } from '@pages/user/index';
import { WishList } from '@widgets/wish-list/index';
import { useSelector } from 'react-redux';
import { BasicLayout } from './lib/layouts/basic-layout';

export const AppRouter = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* <Navbar /> */}
      <CartMenu />
      <Routes>
        <Route path="/" element={<BasicLayout />}>
          <Route path="games" element={<GamesPage />} />
          <Route path="games/:itemSlug" element={<ItemPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="checkout/success" element={<CheckoutSuccessPage />} />
          <Route path="wishlist" element={<WishList />} />
        </Route>
        <Route path="registration" element={<SignUp />} />
        <Route path="login" element={<SingIn />} />
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
