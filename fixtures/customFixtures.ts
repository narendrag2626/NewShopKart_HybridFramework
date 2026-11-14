import {test as base} from '@playwright/test'
import { SignUpPage } from '../pages/signUpPage'
type myfixtyres={
    signuppage:SignUpPage
}
export const test=base.extend<myfixtyres>({
    signuppage:async({page},use)=>{
        const signuppage=new SignUpPage(page)
        await use(signuppage)
    }
})
test.beforeEach(async({page})=>{
    await page.goto('/')
})