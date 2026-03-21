import { cookies } from "next/headers";
import LandingPage from '@/components/layout/landingPage';
import DashBoard from './dashboard'

export default async function Home() {

  const cookieStore = await cookies();
  const token = await cookieStore.get("token")?.value;
  

  // /dashboard avec middleware auth au milieu
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/api`, {
    headers: {
      Cookie: `token=${token}`
    },
    cache: "no-store"
  });

  const data = await res.json();
  
  //faire fetch pour recuperer donnée du dashboard
  return !data.connect ? <LandingPage/> : <DashBoard/>;
}