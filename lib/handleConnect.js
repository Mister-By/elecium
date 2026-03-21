// utils/handleConnect.js
import { cookies } from "next/headers";

export async function handleConnect() {
  const cookieStore =await  cookies();
  const token = await cookieStore.get("token")?.value;

  if (!token) return false;

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/api`, {
    credentials: "include",
    headers: { Cookie: `token=${token}` },
    cache: "no-store",
  });

  const data = await res.json();
  return data.connect;
}
