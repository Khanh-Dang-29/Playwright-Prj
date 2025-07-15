import { test, expect } from "utils/fixtures";
import { BILLING_INFO } from "data-test/BillingInfo";
import { PAGE_NAV } from "data-test/PageNav";
import GetDate from "actions/GetDate";

const billingDetails: BILLING_INFO = {
        firstName: 'Alice',
        lastName: 'Smith',
        country: 'United States (US)',
        StrAdd: 'Oak Avenue',
        city: 'Los Angeles',
        phoneNum:'9876543210',
        zipCode: '123456789',
        state: 'California',
        stateInShort: 'CA',
        email: process.env.USER_NAME!
};

test("TC05 - Verify orders appear in order history", async ({ 
    homePage,
    loginPage,
    accountPage,
    productPage,
    detailPage,
    checkoutPage,
    orderStatusPage,
    orderHistory
}) => {
    // Step 1: Go to My Account page
    await homePage.navigate();
    await homePage.goToLoginPage();
    await loginPage.login();

    // Step 2: Click on Orders in left navigation
    // Step 3: Verify order details (The orders are displayed in the user’s order history)
    await accountPage.goToPage(PAGE_NAV.SHOP);
    await productPage.chooseProduct('AirPods');
    let expectedQuantity = await detailPage.getQuantity();
    let expectedPrice = await detailPage.getPrice();

    await detailPage.addToCart();
    await detailPage.clickCart();
    await detailPage.clickCheckout();
    await checkoutPage.fillBillingDetails(billingDetails);
    await checkoutPage.placeOrder();
    let ordNum = await orderStatusPage.getOrderNumber();

    await homePage.goToMyAccountPage();
    await accountPage.selectPage(PAGE_NAV.ORDERS);

    const getDate = new GetDate();
    const date = await getDate.getToday();

    expect(await orderHistory.getOrderNumberInTable()).toEqual(`#${ordNum}`);
    expect(await orderHistory.getOrderDateInTable()).toMatch(new RegExp(`^${date}$`, "i"));
    expect(await orderHistory.getOrderStatusInTable()).toEqual('ON HOLD');
    expect(await orderHistory.getOrderPriceAndQuantityInTable()).toEqual(`${expectedPrice} FOR ${expectedQuantity} ITEM`);

    await accountPage.goToPage(PAGE_NAV.SHOP);
    await productPage.chooseProduct('Bose SoundLink Mini');
    expectedQuantity = await detailPage.getQuantity();
    expectedPrice = await detailPage.getPrice();

    await detailPage.addToCart();
    await detailPage.clickCart();
    await detailPage.clickCheckout();
    await checkoutPage.fillBillingDetails(billingDetails);
    await checkoutPage.placeOrder();
    ordNum = await orderStatusPage.getOrderNumber();

    await homePage.goToMyAccountPage();
    await accountPage.selectPage(PAGE_NAV.ORDERS);

    expect(await orderHistory.getOrderNumberInTable()).toEqual(`#${ordNum}`);
    expect(await orderHistory.getOrderDateInTable()).toMatch(new RegExp(`^${date}$`, "i"));
    expect(await orderHistory.getOrderStatusInTable()).toEqual('ON HOLD');
    expect(await orderHistory.getOrderPriceAndQuantityInTable()).toEqual(`${expectedPrice} FOR ${expectedQuantity} ITEM`);
})