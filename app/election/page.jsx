import { cookies } from 'next/headers';
import LoginClient from '../login/login';
import AllElectionClient from './allElectionClient';

export default async function AllElection()
{
    try
    {   
        const cookieStore = await cookies();
        const token = await cookieStore.get("token")?.value;

        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/api/election/all`, {
            method: "GET",
            headers: {
            Cookie: `token=${token}`
            },
            cache: "no-store"
        });

        const data = await res.json();
        console.log(data);
        

        if(data.connect && data.connect == false)
            return <LoginClient />;

        if(data.error && data.error == false)
            return <LoginClient />;
        
        const elections = (Array.isArray(data.elections))? data.elections : []  ;
        return <AllElectionClient elections={elections} />;
        
    }
    catch(e)
    {
        console.log(e);
        return <LoginClient/>;
    }
    
}