import { Locator, Page } from "@playwright/test";
import AccountPage from "../page-objects/account.page";
import ProductPage from "../page-objects/product.page";
import DetailPage from "../page-objects/detail.page";
import CheckoutPage from "../page-objects/checkout.page";
import { PAGE_NAV } from "../dataTest/pageNav";


export default class PlaceOrder {
    private accountPage; producPage; detailPage; checkoutPage;

    constructor(private page: Page) {
        this.accountPage = new AccountPage(page);
        this.producPage = new ProductPage(page);
        this.detailPage = new DetailPage(page);
        this.checkoutPage = new CheckoutPage(page);
    }
    
    async placeOrder(prdName: string, info: billingInfo) {
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

    async placeNumberOfOrders(productList: string[], billing: billingInfo) {
        for (let i = 0; i < productList.length; i++) {
            const product = productList[i];
            await this.placeOrder(product, billing);
            await this.accountPage.goToPage(PAGE_NAV.SHOP);
        }
    }
}
