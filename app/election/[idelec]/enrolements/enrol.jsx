"use client";

import { useState, useRef, useEffect } from "react";
import { QrCode, TableOfContents } from "lucide-react";
import { useParams } from "next/navigation";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function Enrole({ u, ia })
{
  const { idelec } = useParams();

  const [users, setUsers] = useState(
    u.map(x => ({ ...x, enrole: !!x.enrole }))
  );

  const [mode, setMode] = useState("manuel");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // =========================
  // STOP CAMERA
  // =========================
  function stopCamera()
  {
    if (videoRef.current?.srcObject)
    {
      videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      videoRef.current.srcObject = null;
    }
  }

  // =========================
  // FILTRE
  // =========================
  const filtered = users.filter(user =>
    `${user.nom} ${user.prenom} ${user.mail}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // =========================
  // ENROLL API
  // =========================
  async function enroll(user, blob = null)
  {
    try
    {
      const formData = new FormData();
      formData.append("idelec", idelec);

      if (ia && blob)
        formData.append("photo", blob, "img.png");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/enroll/online/${user.iduser}`,
        {
          method: "POST",
          body: formData,
          credentials: "include"
        }
      );

      const data = await res.json();
      setMessage(data.message);

      if (!data.error)
      {
        setUsers(prev =>
          prev.map(u =>
            u.iduser === user.iduser
              ? { ...u, idelec, enrole: true }
              : u
          )
        );
      }

      return data;
    }
    catch(e)
    {
      console.log(e);
    }
  }

  // =========================
  // REMOVE API
  // =========================
  async function remove(user)
  {
    const confirm = window.confirm(`Retirer ${user.nom} ?`);
    if (!confirm) return;

    try
    {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/enroll/online/${user.iduser}`,
        {
          method: "DELETE",
          credentials: "include"
        }
      );

      const data = await res.json();
      setMessage(data.message);

      if (!data.error)
      {
        setUsers(prev =>
          prev.map(u =>
            u.iduser === user.iduser
              ? { ...u, idelec: null, enrole: false }
              : u
          )
        );
      }
    }
    catch(e)
    {
      console.log(e);
    }
  }

  // =========================
  // AJOUT MANUEL
  // =========================
  function handleAdd(user)
  {
    const confirm = window.confirm(`Enrôler ${user.nom} ?`);
    if (!confirm) return;

    if (ia)
    {
      setSelectedUser(user);
      setShowModal(true);
    }
    else
    {
      enroll(user);
    }
  }

  // =========================
  // CAMERA INIT
  // =========================
  useEffect(() =>
  {
    if (showModal && ia)
    {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream =>
        {
          if (videoRef.current)
            videoRef.current.srcObject = stream;
        });
    }

    return () => stopCamera();

  }, [showModal]);

  // =========================
  // STOP CAMERA SI CHANGE MODE
  // =========================
  useEffect(() =>
  {
    if (mode !== "scanner")
      stopCamera();
  }, [mode]);

  // =========================
  // CAPTURE
  // =========================
  function capture()
  {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    canvas.toBlob(async (blob) =>
    {
      const res = await enroll(selectedUser, blob);

      if (!res.error)
      {
        stopCamera();
        setShowModal(false);
      }

    }, "image/png");
  }

  // =========================
  // QR SCAN
  // =========================
  async function handleScan(result)
  {
    if (!result) return;

    try
    {
      const id = parseInt(result[0].rawValue);

      const user = users.find(u => u.iduser === id);
      if (!user) return;

      if (ia)
      {
        setSelectedUser(user);
        setShowModal(true);
      }
      else
      {
        enroll(user);
      }
    }
    catch(e)
    {
      console.log(e);
    }
  }

  return (
    <main className="flex justify-center py-8">
      <div className="flex flex-col max-w-[1200px] w-full px-4 md:px-10 gap-8">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Enrôlement</h1>

          <div
            onClick={() =>
              setMode(mode === "manuel" ? "scanner" : "manuel")
            }
            className="py-1 px-1 gap-2 bg-gray-100 rounded-lg flex cursor-pointer"
          >
            <div className={`flex items-center gap-1 text-xs px-3 py-1 font-bold ${mode === "manuel" ? "bg-white rounded-md" : ""}`}>
              Manuel <TableOfContents size={16}/>
            </div>

            <div className={`flex items-center gap-1 text-xs px-3 py-1 font-bold ${mode !== "manuel" ? "bg-white rounded-md" : ""}`}>
              Scanner <QrCode size={16}/>
            </div>
          </div>
        </div>

        {/* MESSAGE */}
        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* MANUEL */}
          <div className="lg:col-span-7">

            {mode === "manuel" ? (
              <>
                <input
                  placeholder="Rechercher..."
                  className="w-full p-3 border rounded-lg mb-4"
                  onChange={(e) => setSearch(e.target.value)}
                />

                <div className="space-y-3">
                  {filtered.map(user => (
                    <div key={user.iduser} className="flex justify-between items-center bg-white p-4 rounded-xl shadow">

                      <div>
                        {user.nom} {user.prenom}
                      </div>

                      <div className="flex gap-2">
                        {console.log(user.enrole, user.nom)}
                        {user.enrole ? (
                          <button
                          
                            onClick={() => remove(user)}
                            className="px-4 py-2 bg-red-400 font-semibold font-sans text-white rounded"
                          >
                            Retirer
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAdd(user)}
                            className="px-4 py-2 bg-blue-500 font-semibold font-sans text-white rounded"
                          >
                            Ajouter
                          </button>
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              </>
            ) : (

              /* SCANNER */
              <div className="bg-white p-6 rounded-xl shadow text-center">
                <div className="h-[400px] rounded-lg overflow-hidden">
                  <Scanner
                    onScan={handleScan}
                    constraints={{ facingMode: "environment" }}
                  />
                </div>
              </div>

            )}

          </div>

          {/* MODAL CAMERA */}
          {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-xl w-[400px] flex flex-col gap-4">

                <h2 className="text-xl font-bold">
                  Enrôlement biométrique
                </h2>

                <p>Utilisateur: {selectedUser?.nom}</p>

                <video
                  ref={videoRef}
                  autoPlay
                  className="h-52 w-full rounded-lg object-cover"
                />

                <canvas ref={canvasRef} className="hidden"/>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      stopCamera();
                      setShowModal(false);
                    }}
                    className="flex-1 bg-gray-200 p-3 rounded"
                  >
                    Annuler
                  </button>

                  <button
                    onClick={capture}
                    className="flex-1 bg-blue-600 text-white p-3 rounded"
                  >
                    Capturer
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}