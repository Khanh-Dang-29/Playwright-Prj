import { Locator, Page } from "@playwright/test";
import { REVIEWS } from "@data-test/Reviews";

export default class DetailPage {
    readonly addToCartBtn: Locator;
    readonly cartBtn: Locator;
    readonly checkoutBtn: Locator;
    readonly reviewBtn: Locator;
    readonly reviewTbx: Locator;
    readonly submitReviewBtn: Locator;

    constructor(private page: Page) {
        this.addToCartBtn = page.getByRole('button', { name: 'Add to cart' });
        this.cartBtn = page.getByRole('link').filter({ hasText: '$' });
        this.checkoutBtn = page.getByRole('link', { name: 'checkout' });
        this.reviewBtn = page.locator('#tab_reviews');
        this.reviewTbx = page.getByRole('textbox', { name: 'Your review *'});
        this.submitReviewBtn = page.getByRole('button', { name: 'Submit' })
    }

    async addToCart() {
        await this.addToCartBtn.click();
        await this.page.waitForSelector("[data-type='success']");
    }

    async clickCart() {
        await this.cartBtn.hover();
    }

    async clickCheckout() {
        await this.checkoutBtn.click();
    }

    async goToCart() {
        await this.cartBtn.click();
        await this.page.reload();
    }

    async getQuantity() {
        const prdName = await this.getPrdName();
        return await this.page.getByRole('spinbutton', { name: `${prdName} quantity` }).getAttribute('value') ?? "";
    }

    async getPrice() {
        return await this.page.locator('.fixed-content .price .woocommerce-Price-amount').last().innerText();
    }

    async getPrdName() {
        return this.page.locator('.product_title').innerText();
    }

    async clickReview() {
        await this.reviewBtn.click();
    }

    async rating(numberOfStars: string) {
        await this.page.locator(`.stars .star-${numberOfStars}`).click();
    }

    async writeReview(review: string) {
        await this.reviewTbx.fill(review);
    }

    async submitReview() {
        await this.submitReviewBtn.click();
    }

    async getReview() {
        return this.page.locator('.comment-text .description p').getByText(REVIEWS.PRD_REVIEW, { exact: true } );
    }

    async getPrdInfoList() {
        return [await this.getPrdName(), await this.getPrice(), await this.getQuantity()];
    }
}