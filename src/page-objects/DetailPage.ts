import { Locator, Page } from "@playwright/test";
import { REVIEWS } from "data-test/Reviews";

export default class DetailPage {
    readonly addToCartButton: Locator = this.page.getByRole('button', { name: 'Add to cart' });
    readonly cartButton: Locator = this.page.getByRole('link').filter({ hasText: '$' });
    readonly checkoutButton: Locator= this.page.getByRole('link', { name: 'checkout' });
    readonly reviewButton: Locator = this.page.locator('#tab_reviews');
    readonly reviewTextbox: Locator = this.page.getByRole('textbox', { name: 'Your review *' });
    readonly submitReviewButton: Locator = this.page.getByRole('button', { name: 'Submit' });
    readonly review: Locator = this.page.locator('.comment-text .description p').getByText(REVIEWS.PRD_REVIEW, { exact: true } );

    constructor(private page: Page) {}

    async addToCart() {
        await this.addToCartButton.click();
        await this.page.waitForSelector("[data-type='success']");
    }

    async clickCart() {
        await this.cartButton.hover();
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

    async goToCart() {
        await this.cartButton.click();
        await this.page.reload();
    }

    async getQuantity() {
        const prdName = await this.getPrdName();
        return await this.page.getByRole('spinbutton', { name: `${prdName} quantity` }).getAttribute('value') ?? "";
    }

    getPrice() {
        return this.page.locator('.fixed-content .price .woocommerce-Price-amount').last().innerText();
    }

    getPrdName() {
        return this.page.locator('.product_title').first().innerText();
    }

    async clickReview() {
        await this.reviewButton.click();
    }

    async rating(numberOfStars: string) {
        await this.page.locator(`.stars .star-${numberOfStars}`).click();
    }

    async writeReview(review: string) {
        await this.reviewTextbox.fill(review);
    }

    async submitReview() {
        await this.submitReviewButton.click();
    }

    async getPrdInfoList() {
        return [await this.getPrdName(), await this.getPrice(), await this.getQuantity()];
    }
}