import { test, expect } from "utils/fixtures";
import { PAGE_NAV } from "data-test/PageNav";
import { REVIEWS } from "data-test/Reviews";

test("Verify users can post a review", async ({
    homePage,
    loginPage,
    accountPage,
    productPage,
    detailPage,
}) => {
    // Step 1: Open browser and go to https://demo.testarchitect.com/
    await homePage.navigate();

    // Step 2 Login with valid credentials
    await homePage.goToLoginPage();
    await loginPage.login();
    
    // Step 3: Go to Shop page
    await accountPage.goToPage(PAGE_NAV.SHOP);

    // Step 4: Click on a product to view detail
    await productPage.chooseProduct('Bose SoundLink Mini');

    // Step 5: Scroll down then click on REVIEWS tab
    await detailPage.clickReview();

    // Step 6: Submit a review
    await detailPage.rating("5");
    await detailPage.writeReview(REVIEWS.PRD_REVIEW);
    await detailPage.submitReview();

    // Step 7: Verify new review
    await detailPage.clickReview();
    await expect(detailPage.getReview()).toBeVisible();
})