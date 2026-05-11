import LandingPage from '@/components/layout/landingPage';
import Header from '@/components/layout/header';
import AuditForm from './auditform';

export default async function AuditPage()
{
    try
    {
        const rep = await fetch(
            `${process.env.URL_API}/api/allMail`,
            {
                cache: "no-store"
            }
        );

        const data = await rep.json();

        return (
            <main>
                <Header />

                <div className='mt-24'>
                    <AuditForm mails={data.mails} />
                </div>
            </main>
        );
    }
    catch(e)
    {
        console.log(e);

        return <LandingPage />;
    }
}