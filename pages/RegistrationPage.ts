import { Page, expect,Locator } from '@playwright/test'

export class RegistrationPage {
    private readonly page: Page;

    //Locators of Registration Page
    private readonly txtFirstName: Locator;
    private readonly txtLastName: Locator;
    private readonly txtEmail: Locator;
    private readonly txtTelephone: Locator;
    private readonly txtPassword: Locator;
    private readonly txtConfirmPassword: Locator;
    private readonly chkPolicy: Locator;
    private readonly msgConfirmation: Locator;
    private readonly btnContinue: Locator;

    constructor(page: Page) {
        this.page = page;
        this.txtFirstName = page.getByPlaceholder('First Name')
        this.txtLastName = page.getByPlaceholder('Last Name')
        this.txtEmail = page.getByPlaceholder('E-Mail')
        this.txtTelephone = page.getByPlaceholder('Telephone')
        this.txtPassword = page.getByPlaceholder('Password',{exact:true})
        this.txtConfirmPassword = page.getByPlaceholder('Password Confirm')
        this.chkPolicy = page.locator('input[name="agree"]')
        this.btnContinue = page.getByRole('button', { name: 'Continue' })
        this.msgConfirmation = page.getByRole('heading', { name: 'Your Account Has Been Created!' })
    }

    /**
     * Sets the first name in the registration form
     * @param fname - First name to enter
    */
    async setFirstName(fname: string): Promise<void> {
        await this.txtFirstName.fill(fname)
    }

    /**
     * Sets the last name in the registration form
     * @param lname - Last name to enter
    */
    async setLastName(lname: string): Promise<void> {
        await this.txtLastName.fill(lname)
    }

    /**
     * Sets the email in the registration form
     * @param email - Email to enter
    */
    async setEmail(email: string): Promise<void> {
        await this.txtEmail.fill(email)
    }

    /**
      * Sets the telephone number in the registration form
      * @param tel - Telephone number to enter
    */
    async setTelephone(phone: string): Promise<void> {
        await this.txtTelephone.fill(phone)

    }

    /**
     * Sets the password in the registration form
     * @param pwd - Password to enter
    */
   async setPassword(password:string):Promise<void>{
    await this.txtPassword.fill(password)
   }

   /**
     * Sets the confirm password in the registration form
     * @param pwd - Password to confirm
    */
   async setConfirmPassword(cnfPassword:string):Promise<void>{
    await this.txtConfirmPassword.fill(cnfPassword)
   }

   /**
     * Checks the privacy policy checkbox
    */
   async checkPrivacyPolicy():Promise<void>{
    await this.chkPolicy.check()
   }

   /**
     * Clicks the Continue button
    */
   async clickContinueButton():Promise<void>{
    await this.btnContinue.click()
   }

   /**
     * Gets the confirmation message text
     * @returns Promise<string> - Confirmation message text
    */
   async getConfirmationMessage():Promise<string>{
    return await this.msgConfirmation.textContent()??''
   }

   /**
     * Complete registration workflow
     * @param userData - Object containing registration data
    */
   async completeRegistration(userData:{
    firstName:string;
    lastName:string;
    email:string;
    telephone:string;
    password:string;
   }):Promise<void>{
    await this.setFirstName(userData.firstName)
    await this.setLastName(userData.lastName)
    await this.setEmail(userData.email)
    await this.setTelephone(userData.telephone)
    await this.setPassword(userData.password)
    await this.setConfirmPassword(userData.password)
    await this.checkPrivacyPolicy()
    await this.clickContinueButton()
    await expect(this.msgConfirmation).toBeVisible();
   }
}