import { cookies } from 'next/headers';
import LoginClient from '../../../login/login';
import AllCandid from './allCandid';


export default async function Candidat({params})
{
    const {idelec} = await params;
    
    try
    {   
        const cookieStore = await cookies();
        const token = await cookieStore.get("token")?.value;

        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/api/election/candidat/${idelec}`, {
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
            return <AllCandid c={data.candidats} />;
        
        
        return <AllCandid c={data.candidats} />;
        
    }
    catch(e)
    {
        console.log(e);
        return <LoginClient/>;
    }
    
}