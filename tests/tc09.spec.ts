import { test, expect } from "../config-fixtures/fixtures";
import { PAGE_NAV } from "../dataTest/PageNav";

test("TC09 - Verify users can update quantity of product in cart", async ({
    homePage,
    loginPage,
    accountPage,
    productPage,
    detailPage,
    cartPage
}) => {
    // Step 1: Open browser and go to https://demo.testarchitect.com/
    // Step 2: Login with valid credentials
    // Step 3: Go to Shop page
    await accountPage.goToPage(PAGE_NAV.SHOP);

    // Step 4: Add a product
    await productPage.chooseProduct('DJI Phantom 4 Camera Drone');
    await detailPage.addToCart();
    const expectedQuantity = await detailPage.getQuantity();
    const prdPrice = await detailPage.getPrice();
    const prdName = await detailPage.getPrdName()
    // console.log(await detailPage.getPrice());

    // Step 5: Go to the cart
    await detailPage.goToCart();

    // Step 6: Verify quantity of added product
    let actualQuantity = await cartPage.getOrderedItemQuantity(prdName);
    await expect(expectedQuantity).toEqual(actualQuantity);
    // console.log(await cartPage.getOrderItemPrice(prdName));
    
    // Step 7: Click on Plus(+) button
    await cartPage.addQuantity();

    // Step 8: Verify quantity of product and SUB TOTAL price
    actualQuantity = await cartPage.getOrderedItemQuantity(prdName);
    let expectedPrice = prdPrice * actualQuantity;
    const actualPrice = await cartPage.getOrderItemPrice(prdName);
    expect(expectedQuantity + 1).toEqual(actualQuantity);
    expect(expectedPrice).toEqual(actualPrice);

    // Step 9: Enter 4 into quantity textbox then click on UPDATE CART button
    await cartPage.fillQuantity(prdName, '4');
    await cartPage.updateCart();

    // Step 10: Verify quantity of product is 4 and SUB TOTAL price
    // Step 11: Click on Minus(-) button
    // Step 12: Verify quantity of product and SUB TOTAL price

})