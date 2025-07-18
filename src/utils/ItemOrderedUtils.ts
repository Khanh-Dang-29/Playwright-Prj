import { Page } from "@playwright/test";
import { PAGE_NAV } from "data-test/PageNav";
import BILLING_INFO from "data-test/BillingInfo";
import AccountPage from "pages/AccountPage";
import ProductPage from "pages/ProductPage";
import DetailPage from "pages/DetailPage";
import CheckoutPage from "pages/CheckoutPage";
import OrderStatusPage from "pages/OrderStatusPage";

export default class ItemOrderUtils {
    readonly detailPage = new DetailPage(this.page);
    readonly checkoutPage = new CheckoutPage(this.page);
    readonly orderStatusPage = new OrderStatusPage(this.page);
    readonly accountPage = new AccountPage(this.page);
    readonly productPage = new ProductPage(this.page);

    constructor(private page: Page) {}
    /**
     * Places a specified number of random products orders.
     * Returns a list of order numbers, prices, and quantities for each order.
     *
     * @param numOfPrd - The number of products to order.
     * @param info - Billing information for the orders.
     * @returns A list of arrays containing order number, price, and quantity for each order.
     */
    async orderRandomPrd(numOfPrd: number, info: typeof BILLING_INFO): Promise<string[][]> {
        const prdNum: string[][] = [];
        for(let i = 0; i < numOfPrd; i++) {
            await this.accountPage.goToPage(PAGE_NAV.SHOP);
            await this.productPage.chooseRandomPrd();
            const prdName = await this.detailPage.getPrdName();
            await this.detailPage.addToCart();
            await this.detailPage.clickCart();
            await this.detailPage.clickCheckout();
            await this.checkoutPage.fillBillingDetails(info);
            await this.checkoutPage.placeOrder();
            const prdInfo: string[] = [
                await this.orderStatusPage.getOrderNumber(),
                await (await this.orderStatusPage.getItemPrice(prdName)).innerText(),
                (await (await this.orderStatusPage.getItemQuantity(prdName)).innerText()).replace(/[^0-9]/g, ''),
            ]
            prdNum.push(prdInfo);
        }
        return prdNum;
    }
}