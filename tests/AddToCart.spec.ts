import { expect, test } from '@playwright/test'
import { TestConfig } from '../test.config'
import { HomePage } from '../pages/HomePage'
import { SearchResultsPage } from '../pages/SearchResultsPage'
import { ProductPage } from '../pages/ProductPage'

let config: TestConfig
let homePage: HomePage
let searchResultsPage: SearchResultsPage
let productPage: ProductPage

test.beforeEach(async ({ page }) => {
    config = new TestConfig()
    await page.goto(config.appUrl)
    //Initialize Objects
    homePage = new HomePage(page)
    searchResultsPage = new SearchResultsPage(page)
    productPage = new ProductPage(page)
})

test.afterEach(async ({ page }) => {
    await page.close()
})

test('Add product to cart test @master @regression', async () => {
    // Step 2: Enter product name in search box
    await homePage.enterProductName(config.productName)
    // Step 3: Click the search button
    await homePage.clickSearchButton()
    // Step 4: Verify search results page is displayed
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy()
    // Step 5: Verify that the product exists in the results
    expect(await searchResultsPage.isProductExists(config.productName)).toBeTruthy()
    // Step 6-7-8: Select product → Set quantity → Add to cart → Verify confirmation
    if (await searchResultsPage.isProductExists(config.productName)) {
        await searchResultsPage.selectProduct(config.productName)
        await productPage.setQuantity(config.productQuantity)
        await productPage.addToCart()
        expect(await productPage.isConfirmationMessageVisible()).toBeTruthy
    }
})