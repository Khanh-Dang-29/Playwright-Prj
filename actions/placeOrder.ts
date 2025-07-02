import { Locator, Page } from "@playwright/test";
import { PAGE_NAV } from "../dataTest/PageNav";
import { BILLING_INFO } from "../dataTest/BillingInfo";
import AccountPage from "../page-objects/AccountPage";
import ProductPage from "../page-objects/ProductPage";
import DetailPage from "../page-objects/DetailPage";
import CheckoutPage from "../page-objects/CheckoutPage";

export default class PlaceOrder {
    private accountPage; producPage; detailPage; checkoutPage;

    constructor(private page: Page) {
        this.accountPage = new AccountPage(page);
        this.producPage = new ProductPage(page);
        this.detailPage = new DetailPage(page);
        this.checkoutPage = new CheckoutPage(page);
    }
    
    async placeOrder(prdName: string, info: BILLING_INFO) {
        await this.producPage.chooseProduct(`${prdName}`);
        await this.detailPage.addToCart();
        await this.detailPage.clickCart();
        await this.detailPage.clickCheckout();
        await this.checkoutPage.fillBillingDetails(info);
        await this.checkoutPage.placeOrder();
    }

    async storeOrderDetail() {
        const orderNumber = await this.page.locator('.order strong').first().innerText(); // update selector as needed
        const orderDate = await this.page.locator('.woocommerce-order-overview__date strong').innerText();
        const productNameConfirmed = await this.page.locator('.order-details .product-name').innerText();
    }

    async placeNumberOfOrders(productList: string[], billing: BILLING_INFO) {
        for (let i = 0; i < productList.length; i++) {
            const product = productList[i];
            await this.placeOrder(product, billing);
            await this.accountPage.goToPage(PAGE_NAV.SHOP);
        }
    }
}
