import { cookies } from 'next/headers';
import LoginClient from '../../../login/login';
import Enrole from './enrol';

export default async function Enrol({params})
{   
    const {idelec} = await params;
    
    try
    {   
        const cookieStore = await cookies();
        const token = await cookieStore.get("token")?.value;
console.log(token);

        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/api/allUsers/${idelec}`, {
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
            return <Enrole u={data.users} ia={data.ia} />;
        
        
        return <Enrole u={data.users} ia={data.ia} />;
        
    }
    catch(e)
    {
        console.log(e);
        return <LoginClient/>;
    }
    
}