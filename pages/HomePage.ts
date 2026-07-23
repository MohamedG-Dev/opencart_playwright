import { Page, Locator } from '@playwright/test'
import { LogoutPage } from './LogoutPage';

export class HomePage {
    private readonly page: Page;

    //locators
    private readonly linkMyAccount: Locator;
    private readonly linkMyRegister: Locator;
    private readonly linkLogin: Locator;
    private readonly txtSearchBox: Locator;
    private readonly btnSearch: Locator;
    private readonly linkLogout: Locator;

    //constructor
    constructor(page: Page) {
        this.page = page;
        this.linkMyAccount = page.getByTitle('My Account')
        this.linkMyRegister = page.getByRole('link', { name: 'Register' })
        this.linkLogin = page.getByRole('link', { name: 'Login' })
        this.txtSearchBox = page.getByRole('textbox', { name: 'Search' })
        this.btnSearch = page.locator('.input-group-btn>button');
        this.linkLogout = page.locator('#top-links').getByRole('link', { name: 'Logout' })
    }

    //action methods
    //check if homepage exists?
    async isHomePageExists() {
        const title: string = await this.page.title()
        if (title) {
            return true
        }
        return false;
    }

    //click on MyAccount Link
    async clickMyAccount() {
        try {
            await this.linkMyAccount.click()
        } catch (error) {
            console.log(`Exception occurred while clicking "My Account": ${error}`)
            throw error
        }
    }

    //click Login link
    async clickLogin() {
        try {
            await this.linkLogin.click()
        } catch (error) {
            console.log(`Exception occurred while clicking "Login Link": ${error}`)
            throw error
        }
    }

    //enter product name in the search box
    async enterProductName(productName: string) {
        try {
            await this.txtSearchBox.fill(productName)
        } catch (error) {
            console.log(`Exception occurred while Entering product name: ${error}`)
            throw error
        }
    }

    //click search button
    async clickSearchButton() {
        try {
            await this.btnSearch.click()
        } catch (error) {
            console.log(`Exception occurred while clicking "Search Button": ${error}`)
            throw error
        }
    }

    //click Registration button
    async clickRegisterButton() {
        try {
            await this.linkMyRegister.click()
        } catch (error) {
            console.log(`Exception occurred while clicking "Register Link": ${error}`)
            throw error
        }
    }

    //click logout link
    async clickLogout(): Promise<LogoutPage> {
        try {
            await this.linkLogout.click()
            return new LogoutPage(this.page)
        } catch (error) {
            console.log(`Exception occurred while clicking "Logout Link": ${error}`)
            throw error
        }
    }
}