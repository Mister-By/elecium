import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req, { params }) {
  try {
    const { idcandid } = await params;

    // Récupérer le body (JSON ou FormData selon ton besoin)
    const body = await req.json(); 
    const { photo } = body;

    // Récupérer le cookie
    const cookieStore = await cookies();
    const token = await cookieStore.get("token")?.value;

    // Construire le FormData
    const formData = new FormData();
    formData.append("photo", photo);

    // Appel à ton API backend
    const apiRes = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/api/candidat/${idcandid}`, {
      method: "DELETE",
      headers: {
        Cookie: `token=${token}`
      },
      body: formData,
      cache: "no-store"
    });

    const data = await apiRes.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: true, message: "Erreur lors de la suppression" }, { status: 500 });
  }
}
