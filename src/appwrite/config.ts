import conf from "@/conf/config";
import {Client, Account, ID, Databases} from 'appwrite'

function generateSmallUniqueId(): number {
    return Math.floor(10 + Math.random() * 90); // For a 2-digit number
    // return Math.floor(100 + Math.random() * 900); // For a 3-digit number
}

const uniqueId = generateSmallUniqueId();
console.log(uniqueId); // Example: 78 (for 2 digits), or 347 (for 3 digits)

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const email = "example@email.com";

if (isValidEmail(email)) {
    console.log("Valid email");
} else {
    console.log("Invalid email");
}

type CreateUserAccount={
    email: string,
    password: string,
    name: string,
    contact_number: BigInteger,
    uniqueId: BigInteger
}

type LoginUserAccount = {
    email: string,
    password: string,
}

const appwriteClient = new Client()

appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)

export const account = new Account(appwriteClient)

export class AppwriteService{
    //create a new record of user inside appwrite
    async createUserAccount( {uniqueId, email, password, name, contact_number}:
        CreateUserAccount) {
            try{
                const userAccount = await account.create(uniqueId.toString(), email, password, name,);

                if (userAccount){
                    return this.login({email, password})
                }
                else{
                    return userAccount
                }
                
            }catch(error: any ){
                throw error
            }

        }
    async login({email, password}: LoginUserAccount){
        try{
            return await account.createSession(email, password)
        }
        catch (error:any){
            throw error
        }
    
    }
    async isLoggedIn(): Promise<boolean>{
        try {
            const data = await this.getCurrentUser();
            return Boolean(data)
        } catch (error){}
        return false
    }   
    async getCurrentUser(){
        try {
             return account.get()
        } catch (error) {
            console.log("getCurrentUser error" + error)
        }
    }
    async logout(){
        try {
            return await account.deleteSession("Current")
        } catch (error) {
            console.log("logout error" + error)
        }
    }

}

const appwriteService = new AppwriteService()

export default appwriteService


