import {faker} from '@faker-js/faker'

export class RandomDataUtil{
    static getFirstName(){
        return faker.person.firstName()
    }
    static getLastName(){
        return faker.person.lastName()
    }

    static getFullName(){
        return faker.person.fullName()
    }

    static getEmail(){
        return faker.internet.email()
    }

    static getPhoneNumber(){
        return faker.phone.number()
    }

    static getUserName(){
        return faker.internet.username()
    }

    static getPassword(){
        return faker.internet.password()
    }

    static getCountry(){
        return faker.location.country()
    }

    static getState(){
        return faker.location.state()
    }

    static getZipCode(){
        return faker.location.zipCode()
    }

    static getAddress(){
        return faker.location.streetAddress()
    }

    static getRandomPassword(length:number=10):string{
        return faker.internet.password({length})
    }

    static getRandomAlphanumeric(length:number):string{
        return faker.string.alphanumeric({length})
    }

    static getRandomNumeric(length:number):string{
        return faker.string.numeric({length})
    }

    static getRandomUUID():string{
        return faker.string.uuid()
    }
}