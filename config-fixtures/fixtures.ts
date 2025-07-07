import { test as base, expect } from '@playwright/test';
import HomePage from "../page-objects/HomePage";
import LoginPage from "../page-objects/LoginPage";
import ProductPage from "../page-objects/ProductPage";
import DetailPage from "../page-objects/DetailPage";
import AccountPage from "../page-objects/AccountPage";
import CheckoutPage from "../page-objects/CheckoutPage";
import OrderStatusPage from "../page-objects/OrderStatusPage";
import ShopPage from "../page-objects/ShopPage";
import CartPage from "../page-objects/CartPage";

export const test = base.extend<{ homePage: HomePage,
                        loginPage: LoginPage,
                        accountPage: AccountPage,
                        productPage: ProductPage, 
                        detailPage: DetailPage,
                        checkoutPage: CheckoutPage,
                        orderStatusPage: OrderStatusPage,
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

    shopPage: async ({ page }, use) => {
        await use(new ShopPage(page));
    },

    cartPage: async({ page }, use) => {
        await use(new CartPage(page));
    }
});

export { expect };