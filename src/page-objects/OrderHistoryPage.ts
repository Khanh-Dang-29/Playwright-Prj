import { Page, Locator, expect } from "@playwright/test";
import DateUtils from "actions/DateUtils";

export default class OrderHistory {
    readonly orderHistoryTable: Locator = this.page.getByRole('table');
    readonly orderHistoryTableRows: Locator = this.page.getByRole('row');
    readonly orderHistoryTableHeaders: Locator = this.orderHistoryTable.locator("tr th");

    constructor(private page: Page) {}

    async verifyOrderHistory(productList: string[][]) {
        const date = DateUtils.getToday();
        for (let i = 0; i < productList.length; i++) {
            const row = this.orderHistoryTableRows.filter({ hasText: `${productList[i][0]}` });
            await expect(row).toBeVisible();
            
            await expect(row.locator('.woocommerce-orders-table__cell-order-date time'))
            .toHaveText(new RegExp(date, 'i'));

            await expect(row.locator('.woocommerce-orders-table__cell-order-status'))
            .toHaveText('On hold'); 

            await expect(row.locator('.woocommerce-orders-table__cell-order-total'))
            .toHaveText(`${productList[i][1]} for ${productList[i][2]} item`);

            // New way using Regular Expression
            // await expect(row.locator('.woocommerce-orders-table__cell-order-total'))
            // .toHaveText(new RegExp(`^${ productList[i][1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} for ${productList[i][2]} item$`, 'i'), {useInnerText: true});
        }
    }
}