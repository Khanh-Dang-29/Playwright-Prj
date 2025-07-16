import { Locator, Page } from "@playwright/test";
import { REVIEWS } from "data-test/Reviews";

export default class DetailPage {
    readonly addToCartButton: Locator;
    readonly cartButton: Locator;
    readonly checkoutButton: Locator;
    readonly reviewButton: Locator;
    readonly reviewTextbox: Locator;
    readonly submitReviewButton: Locator;

    constructor(private page: Page) {
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.cartButton = page.getByRole('link').filter({ hasText: '$' });
        this.checkoutButton = page.getByRole('link', { name: 'checkout' });
        this.reviewButton = page.locator('#tab_reviews');
        this.reviewTextbox = page.getByRole('textbox', { name: 'Your review *'});
        this.submitReviewButton = page.getByRole('button', { name: 'Submit' })
    }

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

    getReview() {
        return this.page.locator('.comment-text .description p').getByText(REVIEWS.PRD_REVIEW, { exact: true } );
    }

    async getPrdInfoList() {
        return [await this.getPrdName(), await this.getPrice(), await this.getQuantity()];
    }
}