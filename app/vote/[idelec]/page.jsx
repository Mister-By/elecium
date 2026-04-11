import { cookies } from 'next/headers';
import Header from "@/components/layout/header";
import ModalError from '../../../components/layout/modalerror';
import LoginClient from '../../login/login';
import Vivacite from './vivacite';
import VoteClient from './voteclient';

export default async function Vote({params})
{
    const {idelec} = await params;
    try
    {   
        const cookieStore = await cookies();
        const token = await cookieStore.get("token")?.value;
        console.log(token);
        

        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/api/election/dataforvoting/${idelec}`, {
            method: "GET",
            headers: {
            Cookie: `token=${token}`,
            "content-type" : "application/json"
            },
            cache: "no-store"
        });

        const data = await res.json();
        console.log(data);
        

        if(data.connect == false)
            return <LoginClient />;
        
        console.log("condition", data.error == false && data.election.ia == true);
        
        return(
            <main>
                <Header/>
                <div className='mt-23'>
                    {data.error == true && (
                    <ModalError message={data.message}/>
                )}
                {data.error == false && data.election.ia == true &&(
                    <Vivacite election={data.election} />
                )}
                {data.error == false && data.election.ia == false &&(
                    <VoteClient formData={new FormData()} election={data.election} />
                )}
                </div>
                
            </main>
        )
    }
    catch(e)
    {
        console.log(e);
        return <LoginClient/>;
    }
    
}