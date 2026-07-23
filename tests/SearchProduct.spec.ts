import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { SearchResultsPage } from '../pages/SearchResultsPage'
import { TestConfig } from '../test.config'

//Declare variables
let config: TestConfig
let homePage: HomePage
let searchResultsPage: SearchResultsPage

//Playwright hooks - run before each test
test.beforeEach(async ({ page }) => {
    config = new TestConfig()
    await page.goto(config.appUrl)
    //Initialize page objects
    homePage = new HomePage(page)
    searchResultsPage = new SearchResultsPage(page)
})

// Playwright hook - runs after each test (optional cleanup)
test.afterEach(async ({ page }) => {
    await page.close()
})

test('Product search test @master @regression', async () => {
    const productName = config.productName
    // Step 2 & 3: Enter product name and click Search
    await homePage.enterProductName(productName)
    await homePage.clickSearchButton()

    // Step 4: Verify that the search results page is displayed
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy()

    // Step 5: Validate if the searched product appears in results
    expect(await searchResultsPage.isProductExists(productName)).toBeTruthy
})