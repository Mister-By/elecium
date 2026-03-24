import { cookies } from "next/headers";
import LandingPage from '@/components/layout/landingPage';
import DashBoard from './dashboard'

export default async function Home() {

  const cookieStore = await cookies();
  const token = await cookieStore.get("token")?.value;
  
  if(!token)
  {
    return <LandingPage/>
  }

  // /dashboard avec middleware auth au milieu
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/api/election/all/vote`, {
    headers: {
      Cookie: `token=${token}`
    },
    cache: "no-store"
  });

  const data = await res.json();
  if(data.connect == false)
            return <LandingPage />;

        if(data.error == false)
            return <DashBoard elections={data.elections} />
        
        
        return <DashBoard elections={data.elections} />

}