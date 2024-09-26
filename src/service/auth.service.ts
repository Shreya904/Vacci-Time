import client from "@/config/appwrite.config";

class AuthService{
    private static instance: AuthService;

    public static getInstance = () => {
        if(!AuthService.instance){
            AuthService.instance = new AuthService();
        }
        
        return AuthService.instance;
    }
    public login = async (email: string, password: string) => {
        alert('Email: ${email} Password: ${password}')
    }
    public register = async (data: any) => {
        const {email, password, username, mobile_number, relation_with_the_child} : any=data;
        alert('Email: ${email} Password: ${password}')
    }
}

export default AuthService