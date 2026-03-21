import { cookies } from 'next/headers';
import ModifCandid from './modifcandid';
import LoginClient from '../../../../../login/login';


export default async function Candidat({params})
{
    const {idcandid} = await params;
    
    try
    {   
        const cookieStore = await cookies();
        const token = await cookieStore.get("token")?.value;

        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/api/candidat/${idcandid}`, {
            method: "GET",
            headers: {
            Cookie: `token=${token}`
            },
            cache: "no-store"
        });

        const data = await res.json();
        console.log(data);
        

        if(data.connect == false)
            return <LoginClient />;

        if(data.error == false)
            return <ModifCandid c={data.candidat} />;
        
        
        return <ModifCandid c={data.candidat} />;
        
    }
    catch(e)
    {
        console.log(e);
        return <LoginClient/>;
    }
    
}