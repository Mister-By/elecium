import { cookies } from 'next/headers';
import LoginClient from '../../login/login';
import ElectionClient from './electionclient';


export default async function Election({params})
{
    const {idelec} = await params;
    
    try
    {   
        const cookieStore = await cookies();
        const token = await cookieStore.get("token")?.value;

        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/api/election/dash/${idelec}`, {
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

        if(data.error && data.error == false)
            return <LoginClient />;
        
        
        return <ElectionClient data={data.data} />;
        
    }
    catch(e)
    {
        console.log(e);
        return <LoginClient/>;
    }
    
}