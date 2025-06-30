import { test as base, expect } from "@playwright/test";
import { ENV } from "../env/env";
import { Departments } from "../env/departments";
import { Products } from "../env/products";
import { PAGE_NAV } from "../env/pageNav";
import HomePage from "../page-objects/home.page";
import LoginPage from "../page-objects/login.page";
import ProductPage from "../page-objects/product.page";
import DetailPage from "../page-objects/detail.page";
import AccountPage from "../page-objects/account.page";
import CheckoutPage from "../page-objects/checkout.page";
import OrderStatusPage from "../page-objects/orderStatus.page";
import ShopPage from "../page-objects/shop.page";

const test = base.extend<{ homePage: HomePage,
                        loginPage: LoginPage,
                        accountPage: AccountPage,
                        producPage: ProductPage, 
                        detailPage: DetailPage,
                        checkoutPage: CheckoutPage,
                        orderStatusPage: OrderStatusPage
                        shopPage: ShopPage }>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
        await homePage.goToLoginPage();
        await use(homePage);
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(ENV.USERNAME, ENV.PASSWORD);
        await use(loginPage);
    },

    accountPage: async ({ page }, use) => {
        await use(new AccountPage(page));
    },

    producPage: async ({ page }, use) => {
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
})

test("Verify users can buy an item successfully", async ({ page, accountPage, producPage, detailPage, checkoutPage, orderStatusPage }) => {

    // Step 1: Open browser and navigate to page
    // Step 2: Login with valid credentials
    // Step 3: Navigate to All departments section
    await accountPage.navigateToAllDepartmentsDropdown();

    // Step 4: Select Electronic Components & Supplies
    await accountPage.selectPage(Departments.ELECTRONIC_COMPONENT_AND_SUPPLIES);

    // Step 5: Verify the items should be displayed as a grid
    // const gridDisplayProductView = await producPage.getDisplayProductView('grid');
    // await expect(gridDisplayProductView).toBeVisible();

    // Step 6: Switch view to list
    // await producPage.changeDisplayView('list');

    // Step 7: Verify the items should be displayed as a list
    // const listDisplayProductView = await producPage.getDisplayProductView('list');
    // await expect(listDisplayProductView).toBeVisible();

    // Step 8: Select andy item randomly to purchase (DJI Mavic Pro Camera Drone)
    await producPage.chooseProduct(Products.PROD_1);
    // await producPage.chooseRandomProd();

    // Step 9: Click 'Add to Cart'
    await detailPage.addToCart();

    // Step 10: Go to the cart
    // Step 11: Verify item details in mini content (confirm w/)
    await detailPage.clickCart();

    // Step 12: Click on Checkout
    await detailPage.clickCheckout();

    // Step 13: Verify Checkbout page displays
    await expect(page).toHaveTitle('Checkout – TestArchitect Sample Website');

    // Step 14: Verify item details in order
    const itemOrdered = await checkoutPage.getItemOrdered(Products.PROD_1, 1);
    await expect(itemOrdered).toBeVisible();

    // Step 15: Fill the billing details with default payment method
    await checkoutPage.fillBillingDetails(ENV.FIRSNAME, ENV.LASTNAME, ENV.COUNTRY, ENV.STREET_ADDRESS, ENV.CITY, ENV.PHONE_NUMBER);

    // Step 16: Click on PLACE ORDER
    await checkoutPage.placeOrder();

    // Step 17: Verify Order status page displays
    await expect(page).toHaveURL(/.*order-received.*/);

    // Step 18: Verify the Order details with billing and item information
    const orderItem = await orderStatusPage.getItemName(Products.PROD_1);
    await expect(orderItem).toBeVisible();
})

test("Verify users can buy multiple item successfully", async ({ homePage, loginPage, accountPage, shopPage }) => {
    // Step 1: Open browser and navigate to page
    // Step 2: Login with valid credentials
    // Step 3: Go to Shop page
    await accountPage.goToPage(PAGE_NAV.SHOP);

    // Step 4: Select multiple items and add to cart
    await shopPage.chooseRandomProds(3);

    // Step 5: Go to the cart and verify all selected items


    // Step 6: Proceed to checkout and confirm order


    // Step 7: Verify order confirmation message


})