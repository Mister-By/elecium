import LandingPage from '@/components/layout/landingPage';
import LoginClient from './login';

export default async function Login()
{
    try
    {   
        return <LoginClient />;
    }
    catch(e)
    {
        console.log(e);
        return <LandingPage/>;
    }
    
}