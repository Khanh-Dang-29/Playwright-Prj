import { test, expect } from "@utils/fixtures";
import { PAGE_NAV } from "@data-test/PageNav";

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
    const expectedPrice = await detailPage.priceInNumber();
    const prdName = await detailPage.getPrdName();

    // Step 5: Go to the cart
    await detailPage.goToCart();

    // Step 6: Verify quantity of added product
    let actualQuantity = await cartPage.getOrderedItemQuantity(prdName);
    expect(actualQuantity).toEqual(expectedQuantity);

    // Step 7: Click on Plus(+) button
    await cartPage.addQuantity();

    // Step 8: Verify quantity of product and SUB TOTAL price
    actualQuantity = await cartPage.getOrderedItemQuantity(prdName);
    let actualPrice = await cartPage.getOrderItemPrice(prdName);

    expect(actualQuantity).toEqual('2');
    expect(actualPrice).toEqual(`$${expectedPrice * 2}`);
    // await expect(cartPage.plusBtn).toHaveText(`$${(prise * 2).toLocaleString()}`)

    // Step 9: Enter 4 into quantity textbox then click on UPDATE CART button
    await cartPage.fillQuantity(prdName, '4');
    await cartPage.updateCart();

    // Step 10: Verify quantity of product is 4 and SUB TOTAL price
    actualQuantity = await cartPage.getOrderedItemQuantity(prdName);
    actualPrice = await cartPage.getOrderItemPrice(prdName);
    expect(actualQuantity).toEqual('4');
    expect(actualPrice).toEqual(`$${expectedPrice * 4}`);

    // Step 11: Click on Minus(-) button
    await cartPage.reduceQuantity();

    // Step 12: Verify quantity of product and SUB TOTAL price
    actualQuantity = await cartPage.getOrderedItemQuantity(prdName);
    actualPrice = await cartPage.getOrderItemPrice(prdName);
    expect(actualQuantity).toEqual('1');
    expect(actualPrice).toEqual(`$${expectedPrice * 1}`);
})