export const dynamic = "force-dynamic";

import LandingPage from '@/components/layout/landingPage';
import Header from '@/components/layout/header';
import AuditForm from './auditform';
import {  MoveLeft } from 'lucide-react';

export default async function AuditPage()
{
    try
    {
        const rep = await fetch(
            `${process.env.NEXT_PUBLIC_URL_API}/api/allMail`,
            {
                cache: "no-store"
            }
        );

        const data = await rep.json();

        return (
            <main>
                <Header />

                <div className='mt-20'>
                    <h1 className='gap-2 text-xl mb-5'><MoveLeft className='mt-1' /> Audit</h1>
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