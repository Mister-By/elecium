import LandingPage from '@/components/layout/landingPage';
import RegisterClient from './register';

export default async function Register()
{
    try
    {
        const rep = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/api/allMail`);
        if(!rep.ok)
        {
            throw new Error("Problème");
        }
        const data = await rep.json();
        return <RegisterClient mails={data.mails} />;
    }
    catch(e)
    {
        console.log(e);
        return <LandingPage/>;
    }
    
}