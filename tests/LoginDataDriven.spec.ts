import { expect, test } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { MyAccountPage } from '../pages/MyAccountPage'
import { DataProvider } from '../utils/dataProvider'
import { TestConfig } from '../test.config'
import { HomePage } from '../pages/HomePage'

//Load JSON test data from file - logindata.json
const jsonDataPath = 'testdata/logindata.json'
const jsonTestData = DataProvider.getTestDataFromJson(jsonDataPath)

for (const testData of jsonTestData) {
    test(`Valid Login Test: ${testData.testName} @datadriven using JSON file`, async ({ page }) => {
        const config = new TestConfig()
        await page.goto(config.appUrl)

        const homePage = new HomePage(page)
        await homePage.clickMyAccount()
        await homePage.clickLogin()

        const loginPage = new LoginPage(page)
        await loginPage.login(testData.email, testData.password)
        if (testData.expected.toLowerCase() === 'success') {
            const myAccountPage = new MyAccountPage(page)
            expect(await myAccountPage.isMyAccountPageExists()).toBe(true)
        } else {
            const errorMessage = await loginPage.getloginErrorMessage()
            expect(errorMessage).toBe('Warning: No match for E-Mail Address and/or Password.')
        }
    })
}

//Load CSV test data from file - login.csv
const csvDataPath = 'testdata/login.csv'
const csvTestData = DataProvider.getTestDataFromCSV(csvDataPath)

for (const testData of csvTestData) {
    test(`Valid Login Test: ${testData.testName} @datadriven @master using CSV file`, async ({ page }) => {
        const config = new TestConfig()
        await page.goto(config.appUrl)

        const homePage = new HomePage(page)
        await homePage.clickMyAccount()
        await homePage.clickLogin()

        const loginPage = new LoginPage(page)
        await loginPage.login(testData.email, testData.password)
        if (testData.expected.toLowerCase() === 'success') {
            const myAccountPage = new MyAccountPage(page)
            expect(await myAccountPage.isMyAccountPageExists()).toBe(true)
        } else {
            const errorMessage = await loginPage.getloginErrorMessage()
            expect(errorMessage).toBe('Warning: No match for E-Mail Address and/or Password.')
        }
    })
}


