import { Page, Locator } from '@playwright/test'
export class LoginPage {
    private readonly page: Page
    //Locators
    private readonly txtEmailAddress: Locator
    private readonly txtPassword: Locator
    private readonly btnLogin: Locator
    private readonly txtErrorMsg: Locator
    //constructor
    constructor(page: Page) {
        this.page = page
        //Initialize Locators
        this.txtEmailAddress = page.getByPlaceholder('E-Mail Address')
        this.txtPassword = page.getByPlaceholder('Password', { exact: true })
        this.btnLogin = page.getByRole('button', { name: 'Login' })
        this.txtErrorMsg = page.locator('.alert.alert-danger.alert-dismissible')
    }

    /**
     * Sets the email address in the email field
     * @param email - Email address to enter
    **/
    async setEmail(email: string) {
        await this.txtEmailAddress.fill(email)
    }

    /**
      * Sets the password in the password field
      * @param pwd - Password to enter
    **/
    async setPassword(password: string) {
        await this.txtPassword.fill(password)
    }

    /**
     * Clicks the login button
    **/
    async clickLoginButton() {
        await this.btnLogin.click()
    }

    /**
      * Performs complete login action
      * @param email - Email address to enter
      * @param password - Password to enter
     */
    async login(email: string, password: string) {
        await this.setEmail(email);
        await this.setPassword(password);
        await this.clickLoginButton();
    }

    async getloginErrorMessage(): Promise<null | string> {
        return (this.txtErrorMsg.textContent());
    }
}