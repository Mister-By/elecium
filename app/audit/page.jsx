export const dynamic = "force-dynamic";

import LandingPage from '@/components/layout/landingPage';
import Header from '@/components/layout/header';
import AuditForm from './auditform';
import {  MoveLeft } from 'lucide-react';
import Link from 'next/link';

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
                    <Link href={"/"} className='gap-2 text-xl mb-5 w-full flex mx-auto'><MoveLeft className='mt-1' /> <span>Audit</span></Link>
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