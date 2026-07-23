import { Page, Locator } from '@playwright/test'
import { CheckoutPage } from './CheckoutPage'

export class ShoppingCartPage {
    private readonly page: Page
    //Locators
    private readonly lblTotalPrice: Locator
    private readonly btnCheckout: Locator

    constructor(page: Page) {
        this.page = page
        //initialization of locators
        this.lblTotalPrice = page.locator("//strong[text()='Total:']/parent::td/following-sibling::td")
        this.btnCheckout = page.locator('.buttons.clearfix').getByRole("link", { name: 'Checkout' })
    }

    /**
     * Get the total price from the shopping cart
     * @returns Promise<string | null> - The total price text
    **/
    async getTotalPrice(): Promise<string | null> {
        try {
            return await this.lblTotalPrice.textContent()
        } catch (error) {
            console.log(`Unable to retrieve total price: ${error}`)
            return null;
        }
    }

    /**
     * Click on the Checkout button
     * @returns Promise<CheckoutPage> - CheckoutPage instance
    **/
    async clickCheckout(): Promise<CheckoutPage> {
        await this.btnCheckout.click()
        return new CheckoutPage(this.page)
    }

    /**
     * Verify if shopping cart page is loaded
     * @returns Promise<boolean> - true if page is loaded
    **/
    async isPageLoaded(): Promise<boolean> {
        try {
            return await this.btnCheckout.isVisible()
        } catch (error) {
            return false
        }
    }
}