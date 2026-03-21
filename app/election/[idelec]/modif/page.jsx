import { cookies } from 'next/headers';
import LoginClient from '../../../login/login';
import ModifElec from './modifection';


export default async function Election({params})
{
    const {idelec} = await params;
    
    try
    {   
        const cookieStore = await cookies();
        const token = await cookieStore.get("token")?.value;

        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/api/election/${idelec}`, {
            method: "GET",
            headers: {
            Cookie: `token=${token}`
            },
            cache: "no-store"
        });

        const data = await res.json();
        

        if(data.connect == false)
            return <LoginClient />;

        if(data.error == false)
            return <ModifElec e={data.election} />;
        
        
        return <ModifElec e={data.election} />;
        
    }
    catch(e)
    {
        console.log(e);
        return <LoginClient/>;
    }
    
}