import LandingPage from '@/components/layout/landingPage';
import Header from '@/components/layout/header';
import Audit from './auditform';

export default async function Register()
{
    try
    {
        const rep = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/api/allMail`);
        const data = await rep.json();
        return (
            <main>
                <Header/>
                <div className='mt-24'>
                    <AuditForm mails={data.mails} />
                </div>
                
            </main>
            
        );
    }
    catch(e)
    {
        console.log(e);
        return <LandingPage/>;
    }
    
}