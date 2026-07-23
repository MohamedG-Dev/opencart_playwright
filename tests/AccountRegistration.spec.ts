import { test, Page, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { RegistrationPage } from '../pages/RegistrationPage'
import { RandomDataUtil } from '../utils/randomDataGenerator'
import { TestConfig } from '../test.config'

let homePage: HomePage;
let registerPage: RegistrationPage;

test.beforeEach(async ({ page }) => {
    await page.goto(new TestConfig().appUrl);
    homePage = new HomePage(page)
    registerPage = new RegistrationPage(page)
})

test.afterEach(async ({ page }) => {
    await page.close()
})

test('New User Registration @master @sanity @regression', async () => {
    //click on myaccount and navigate to registration page
    await homePage.clickMyAccount()
    await homePage.clickRegisterButton();
    //enter the details for new user registration
    await registerPage.setFirstName(RandomDataUtil.getFirstName())
    await registerPage.setLastName(RandomDataUtil.getLastName())
    await registerPage.setEmail(RandomDataUtil.getEmail())
    await registerPage.setTelephone(RandomDataUtil.getPhoneNumber())
    const password: string = RandomDataUtil.getPassword()
    await registerPage.setPassword(password)
    await registerPage.setConfirmPassword(password)
    await registerPage.checkPrivacyPolicy()
    await registerPage.clickContinueButton()
    //validate the success message
    const message: string = await registerPage.getConfirmationMessage()
    expect(message).toContain('Your Account Has Been Created!')
})
