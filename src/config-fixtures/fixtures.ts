import { test as base, expect } from '@playwright/test';
import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage";
import ProductPage from "pages/ProductPage";
import DetailPage from "pages/DetailPage";
import AccountPage from "pages/AccountPage";
import CheckoutPage from "pages/CheckoutPage";
import OrderStatusPage from "pages/OrderStatusPage";
import OrderHistory from 'pages/OrderHistoryPage';
import CartPage from 'pages/CartPage';

export const test = base.extend<{ homePage: HomePage,
                        loginPage: LoginPage,
                        accountPage: AccountPage,
                        productPage: ProductPage, 
                        detailPage: DetailPage,
                        checkoutPage: CheckoutPage,
                        orderStatusPage: OrderStatusPage,
                        orderHistory: OrderHistory,
                        cartPage: CartPage }>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    loginPage: async ({ page }, use) => { 
        await use(new LoginPage(page));
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
    cartPage: async({ page }, use) => {
        await use(new CartPage(page));
    }
});

export { expect };