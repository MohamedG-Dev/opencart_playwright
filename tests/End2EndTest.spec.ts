import { expect, test, Page } from '@playwright/test'
import { RegistrationPage } from '../pages/RegistrationPage'
import { HomePage } from '../pages/HomePage'
import { RandomDataUtil } from '../utils/randomDataGenerator'
import { TestConfig } from '../test.config'
import { LogoutPage } from '../pages/LogoutPage'
import { LoginPage } from '../pages/LoginPage'
import { MyAccountPage } from '../pages/MyAccountPage'
import { SearchResultsPage } from '../pages/SearchResultsPage'
import { ProductPage } from '../pages/ProductPage'
import { ShoppingCartPage } from '../pages/ShoppingCartPage'
import { CheckoutPage } from '../pages/CheckoutPage'

// Function to register a new user account
let performRegistration = async (page: Page): Promise<{ email: string, password: string }> => {
    const homePage = new HomePage(page)
    await homePage.clickMyAccount()
    await homePage.clickRegisterButton()

    const registration = new RegistrationPage(page)
    await registration.setFirstName(RandomDataUtil.getFirstName())
    await registration.setLastName(RandomDataUtil.getLastName())
    const email = RandomDataUtil.getEmail()
    await registration.setEmail(email)
    await registration.setTelephone(RandomDataUtil.getPhoneNumber())
    const password = RandomDataUtil.getPassword()
    await registration.setPassword(password)
    await registration.setConfirmPassword(password)
    await registration.checkPrivacyPolicy()
    await registration.clickContinueButton()
    expect(await registration.getConfirmationMessage()).toBe('Your Account Has Been Created!')
    return { email, password }
}

// Function to log out the current user
async function performLogout(page: Page) {
    const homePage = new HomePage(page)
    await homePage.clickMyAccount()
    const logout = await homePage.clickLogout()
    // Ensure the "Continue" button is visible
    expect(await logout.isContinueButtonVisible()).toBeTruthy()
    //Click "Continue" and verify redirection to HomePage
    await logout.clickContinue()
    expect(await homePage.isHomePageExists()).toBe(true)
}

// Function to log in using the registered email
async function performLogin(page: Page, email: string, password: string) {
    //const config = new TestConfig()
    //await page.goto(config.appUrl)//reload homepage

    const homePage = new HomePage(page)
    await homePage.clickMyAccount()
    await homePage.clickLogin()

    const loginPage = new LoginPage(page)
    await loginPage.login(email, password)
    // Verify login by checking My Account page
    expect(await new MyAccountPage(page).isMyAccountPageExists()).toBeTruthy()
}

// Function to search for a product and add it to cart
let addProductToCart = async (page: Page) => {
    const config = new TestConfig()
    const productName = config.productName
    const quantity = config.productQuantity

    const homePage = new HomePage(page)
    await homePage.enterProductName(productName)
    await homePage.clickSearchButton()

    const searchResultsPage = new SearchResultsPage(page)
    // Validate search results page
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy()
    // Validate that the desired product exists in the results
    expect(await searchResultsPage.isProductExists(productName)).toBe(true)

    // Select product and set quantity
    const productPage = await searchResultsPage.selectProduct(productName)
    await productPage?.setQuantity(quantity)
    await productPage?.addToCart()
    // Confirm product was added
    expect(await productPage?.isConfirmationMessageVisible()).toBeTruthy()
}

// Function to verify the shopping cart details
const verifyShoppingCart = async (page: Page) => {
    const productPage = new ProductPage(page)
    // Navigate to shopping cart from product page
    await productPage.clickItemsToNavigate()
    const shoppingCart: ShoppingCartPage = await productPage.clickViewCart()
    console.log("🛒 Navigated to shopping cart!");
    const config = new TestConfig();
    // Validate that total price is correct (based on config)
    expect(await shoppingCart.getTotalPrice()).toBe(config.totalPrice)
    await shoppingCart.clickCheckout()
}

// Function to perform checkout (disabled for demo site)
async function performCheckout(page: Page) {
    const checkout = new CheckoutPage(page)
    await checkout.isCheckoutPageExists()
}

//write the End2End test method
test('End to End test flow @master @end2end @regression', async ({ page }) => {
    const config = new TestConfig()
    await page.goto(config.appUrl)
    // Step 1: Register a new account and capture the generated email and password
    const { email, password } = await performRegistration(page)
    console.log("✅ Registration is completed!");
    // Step 2: Logout after successful registration
    await performLogout(page)
    console.log("✅ Logout is completed!");
    // Step 3: Login with the registered email
    await performLogin(page, email, password)
    console.log("✅ Login is completed!");
    // Step 4: Search for a product and add it to the cart
    await addProductToCart(page)
    console.log("✅ Product added to cart!");
    // Step 5: Verify the contents of the shopping cart
    await verifyShoppingCart(page)
    // Step 6: Perform checkout (skipped for demo site)
    await performCheckout(page)
})

