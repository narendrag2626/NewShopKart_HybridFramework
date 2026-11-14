import {randomUUID} from 'node:crypto'
import {expect} from '@playwright/test'
import {test} from '../fixtures/customFixtures'
import {signuptestdata} from '../testdata/signuptestdata.json'
const fullname=signuptestdata.fullname
const password=signuptestdata.password
const email=`${fullname}_${randomUUID()}@gmail.com`
//const createEmail=()=>`${fullname}_${randomUUID()}@gmail.com`
//Positive Registration Test
test("REG-001-verify signup functionality with valid Credentials",async({signuppage})=>{
    await signuppage.signUp(fullname,email,password)
})
//Negative Registration test without FullName
test("REG-002-Verify signup functionality without fullname",async({signuppage})=>{
    await signuppage.signUp("",email,password)
    await signuppage.verifyFullNameValidation()
})
//Negative Registration test without email
test("REG-003-Verify signup functionality without email",async({signuppage})=>{
    await signuppage.signUp(fullname,"",password)
    await signuppage.verifyEmailValidation()
})
//Negative Registration test without password
test("REG-004-Verify signup functionality without password",async({signuppage})=>{
    await signuppage.signUp(fullname,email,"")
    await signuppage.verifyPasswordValidation()
})
//Negative Registration test without passing any credentials
test("REG-005-Verify signup functionality without passing any credentials",async({signuppage})=>{
    await signuppage.signUpWithoutCredentials()
    await signuppage.verifyRequiredFieldValidations()
})

