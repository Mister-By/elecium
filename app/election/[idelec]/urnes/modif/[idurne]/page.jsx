import { cookies } from 'next/headers';
import ModifUrne from './modifUrne';
import LoginClient from '../../../../../login/login';


export default async function Urne({params})
{
    const {idurne} = await params;
    console.log(idurne);
    
    try
    {   
        const cookieStore = await cookies();
        const token = await cookieStore.get("token")?.value;
        

        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/api/urne/${idurne}/`, {
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
            return <ModifUrne u={data.urne} />;
        
        
        return <ModifUrne u={data.urne} />;
        
    }
    catch(e)
    {
        console.log(e);
        return <LoginClient/>;
    }
    
}