import {test,expect} from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { MyAccountPage } from '../pages/MyAccountPage'
import { TestConfig } from '../test.config'
import { log } from 'node:console'

let config:TestConfig
let homePage:HomePage
let login:LoginPage
let myaccountPage:MyAccountPage

test.beforeEach(async ({page})=>{
    config = new TestConfig();//Load Config - url, login credentials
    await page.goto(config.appUrl)//Navigate to the application url
    //initialize page objects
    homePage = new HomePage(page)
    login = new LoginPage(page)
    myaccountPage = new MyAccountPage(page)
})

//Optional clean up after each test
test.afterEach(async({page})=>{
    await page.close()///close the browser tab (good practice in local/dev env)
})

test('User Login Test @master @sanity @regression',async({page})=>{
    //Navigate to Login Page via Home Page
    await homePage.clickMyAccount()
    await homePage.clickLogin()
    //Enter valid credentials and log in
    await login.login(config.email,config.password)
    //Verify successful login by checking 'My Account' page presence
    expect(await myaccountPage.isMyAccountPageExists()).toBe(true)

})




