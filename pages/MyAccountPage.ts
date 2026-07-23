import { Page, Locator } from '@playwright/test'
//import {LogoutPage} from 

export class MyAccountPage {
    private readonly page: Page;

    //Locators Definition
    private readonly msgHeading: Locator;

    //constructor
    constructor(page: Page) {
        this.page = page;
        //Initialization of Locator
        this.msgHeading = page.locator('h2:has-text("My Account")')
    }

    /**
     * Verifies if My Account page is displayed
     * @returns Promise<boolean> - Returns true if heading is visible
    **/
    async isMyAccountPageExists(): Promise<boolean> {
        try {
            return await this.msgHeading.isVisible()
        } catch (error) {
            console.log(`Error checking My Account page heading visibility: ${error}`);
            return false;
        }
    }

    /**
     * Alternative method to return page exists using title
     * @returns Promise<boolean> - Returns true if page title matches
    **/
    async getTitle(): Promise<string> {
        return await this.page.title()
    }
}