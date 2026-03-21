import { cookies } from 'next/headers';
import LoginClient from '../../../../login/login';
import AjoutCandid from './ajoutcandid';


export default async function AjoutCandidat({params})
{
    
    try
    {   
        const cookieStore = await cookies();
        const token = await cookieStore.get("token")?.value;

        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/api`, {
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
            return <AjoutCandid  />;
        
        
        return <AjoutCandid  />;
        
    }
    catch(e)
    {
        console.log(e);
        return <LoginClient/>;
    }
    
}