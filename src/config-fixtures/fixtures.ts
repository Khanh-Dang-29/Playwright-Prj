import { test as base, expect } from '@playwright/test';
import HomePage from "@pages/HomePage";
import LoginPage from "@pages/LoginPage";
import ProductPage from "@pages/ProductPage";
import DetailPage from "@pages/DetailPage";
import AccountPage from "@pages/AccountPage";
import CheckoutPage from "@pages/CheckoutPage";
import OrderStatusPage from "@pages/OrderStatusPage";
import ShopPage from "@pages/ShopPage";
import CartPage from "@pages/CartPage";
import OrderHistory from '@pages/OrderHistoryPage';

export const test = base.extend<{ homePage: HomePage,
                        loginPage: LoginPage,
                        accountPage: AccountPage,
                        productPage: ProductPage, 
                        detailPage: DetailPage,
                        checkoutPage: CheckoutPage,
                        orderStatusPage: OrderStatusPage,
                        orderHistory: OrderHistory,
                        shopPage: ShopPage,
                        cartPage: CartPage }>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
        await homePage.goToLoginPage();
        await use(homePage);
    },

    loginPage: async ({ page }, use) => { 
        const loginPage = new LoginPage(page);
        await loginPage.login();
        await use(loginPage);
    },

    accountPage: async ({ page }, use) => {
        await use(new AccountPage(page));
    },

    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },

    detailPage: async ({ page }, use) => {
        await use(new DetailPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },

    orderStatusPage: async ({ page }, use) => {
        await use(new OrderStatusPage(page));
    },

    orderHistory: async ({ page }, use) => {
        await use(new OrderHistory(page));
    },

    shopPage: async ({ page }, use) => {
        await use(new ShopPage(page));
    },

    cartPage: async({ page }, use) => {
        await use(new CartPage(page));
    }
});

export { expect };