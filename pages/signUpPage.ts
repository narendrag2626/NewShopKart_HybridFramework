import { Page,Locator,expect} from "@playwright/test";
export class SignUpPage{
    page:Page
    dropDownButton:Locator
    signUpLink:Locator
    signUpButton:Locator
    fullNameInput:Locator
    emailAddressInput:Locator
    passwordInput:Locator
    createAccountButton:Locator
    signInEmail:Locator
    constructor(page:Page)
    {
        this.page=page
        this.dropDownButton=this.page.locator("button").filter({
            has:this.page.locator(".lucide.lucide-chevron-down.w-3.h-3")})
        this.signUpLink=this.page.locator(".text-sm.font-bold.text-flipkart-blue")
        this.signUpButton=this.page.getByRole('button',{name:"Sign Up",exact:true})
        this.fullNameInput=this.page.getByPlaceholder("Enter your full name")
        this.emailAddressInput=this.page.getByPlaceholder("Enter your email")
        this.passwordInput=this.page.getByPlaceholder("Create a password (min 6 chars)")
        this.createAccountButton=this.page.getByRole('button',{name:"Create Account"})
        this.signInEmail=this.page.locator(".text-sm.font-bold.text-foreground.truncate")

    }
    private async openSignUpForm():Promise<void>{
        await this.dropDownButton.click()
        await this.signUpLink.click()
        await this.signUpButton.click()
    }
    async signUp(fullname:string,email:string,password:string):Promise<void>{
        await this.openSignUpForm()
        await this.fullNameInput.fill(fullname)
        await this.emailAddressInput.fill(email)
        await this.passwordInput.fill(password)
        await this.createAccountButton.click()
    }
    async signUpWithoutCredentials():Promise<void>{
        await this.openSignUpForm()
        await this.createAccountButton.click()
    }
    async verifyFullNameValidation():Promise<void>{
        const isMissing = await this.fullNameInput.evaluate(
            (input:HTMLInputElement) => input.validity.valueMissing
        )
        expect(isMissing).toBe(true)
    }
    async verifyEmailValidation():Promise<void>{
        const isMissing = await this.emailAddressInput.evaluate(
            (input:HTMLInputElement) => input.validity.valueMissing
        )
        expect(isMissing).toBe(true)
    }
    async verifyPasswordValidation():Promise<void>{
        const isMissing = await this.passwordInput.evaluate(
            (input:HTMLInputElement) => input.validity.valueMissing
        )
        expect(isMissing).toBe(true)
    }
    async verifyRequiredFieldValidations():Promise<void>{
        await this.verifyFullNameValidation()
        await this.verifyEmailValidation()
        await this.verifyPasswordValidation()
    }
    async verifysigninemail(expectedemail:string):Promise<void>{
         await this.page.waitForTimeout(6000)
        await this.dropDownButton.click()
        await this.signInEmail.waitFor({state:"visible"})
        await expect(this.signInEmail).toContainText(expectedemail)
    }
    

}
