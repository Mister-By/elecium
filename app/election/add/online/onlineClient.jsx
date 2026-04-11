"use client";

import { useState } from "react";
import { Plus, Trash, User } from "lucide-react";


export default function onlineClient() {

  const [data, setData] = useState({
    lib: "",
    desc: "",
    ia: false,
    type: "l",
    urnes: [],
    dd: "",
    df: "",
    candidats: [
      { lib: "", desc: "", photo: null, preview: null },
      { lib: "", desc: "", photo: null, preview: null }
    ]
  });

  function updateField(field, value) {
    setData(prev => ({ ...prev, [field]: value }));
  }

  function updateCandidate(index, field, value) {
    const candidats = [...data.candidats];
    candidats[index][field] = value;
    setData({ ...data, candidats });
  }

  function handlePhoto(index, file) {
    if (!file) return;

    const preview = URL.createObjectURL(file);

    const candidats = [...data.candidats];
    candidats[index].photo = file;
    candidats[index].preview = preview;

    setData({ ...data, candidats });
  }

  function addCandidate() {
    setData({
      ...data,
      candidats: [...data.candidats, { lib: "", desc: "", photo: null, preview: null }]
    });
  }

  function removeCandidate(index) {
    if (data.candidats.length <= 2) return;

    const candidats = data.candidats.filter((_, i) => i !== index);
    setData({ ...data, candidats });
  }

  function addUrne() {
  setData(prev => ({
    ...prev,
    urnes: [...prev.urnes, { position: "" }]
  }));
}

function updateUrne(index, value) {
  const urnes = [...data.urnes];
  urnes[index].position = value;
  setData({ ...data, urnes });
}

function removeUrne(index) {
  const urnes = data.urnes.filter((_, i) => i !== index);
  setData({ ...data, urnes });
}

  async function getPayload() {

  const formData = new FormData();

  formData.append("lib", data.lib);
  formData.append("desc", data.desc);
  formData.append("ia", data.ia);
  formData.append("dd", data.dd);
  formData.append("df", data.df);
  formData.append("type", data.type);

  if (data.type === "p" || data.type === "h") {
  formData.append("urnes", JSON.stringify(data.urnes));
}

  data.candidats.forEach((c, i) => {

    formData.append(`lib_${i}`, c.lib);
    formData.append(`desc_${i}`, c.desc);

    if (c.photo) {
      formData.append(`photo_${i}`, c.photo);
    }

  });

  console.log([...formData.entries()]);
  const rep = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/api/election/add/online`,
    {
        method: "POST",
        body: formData,
        credentials: "include",
        
    }
  );
  const dat = await rep.json();
  console.log(dat);
  window.location.href = `/election`
  
  return formData;
}

  return (
    
    <div className="lg:col-span-8 space-y-8">

      {/* SECTION 1 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <span className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary font-bold">1</span>
          <h3 className="text-xl font-bold text-slate-900">Informations Générales</h3>
        </div>

        <div className="space-y-6">

          <label className="block">
  <span className="text-slate-900 text-base font-medium mb-2 block">
    Type d'élection
  </span>

  <select
    className="w-full h-12 px-4 rounded-lg border-slate-300 bg-slate-50"
    value={data.type}
    onChange={(e) => updateField("type", e.target.value)}
  >
    <option value="l">En ligne</option>
    <option value="p">Physique</option>
    <option value="h">Hybride</option>
  </select>
</label>

          <label className="block">
            <span className="text-slate-900 text-base font-medium mb-2 block">
              Libellé de l'élection
            </span>
            <input
              className="form-input flex w-full rounded-lg border-slate-300 bg-slate-50 text-slate-900 h-12 px-4"
              placeholder="ex: Conseil Étudiant 2024"
              type="text"
              onChange={(e) => updateField("lib", e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-slate-900 text-base font-medium mb-2 block">
              Description
            </span>
            <textarea
              className="form-textarea flex w-full rounded-lg border-slate-300 bg-slate-50 text-slate-900 min-h-[120px] px-4 py-3"
              placeholder="Entrez les détails..."
              onChange={(e) => updateField("desc", e.target.value)}
            />
          </label>

          {data.type !== "p" && (<div className="pt-2">
            <label className="inline-flex items-center gap-3 cursor-pointer">
              <input
                className="form-checkbox w-6 h-6 rounded border-slate-300 text-primary"
                type="checkbox"
                onChange={(e) => updateField("ia", e.target.checked)}
              />

              <div className="flex flex-col">
                <span className="text-slate-900 font-semibold">
                  Activer la reconnaissance faciale avec IA
                </span>

                <span className="text-slate-500 text-sm">
                  Vérification biométrique sécurisée des votants.
                </span>
              </div>
            </label>
          </div>)}

        </div>
      </div>


      {/* SECTION 2 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <span className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary font-bold">2</span>
          <h3 className="text-xl font-bold text-slate-900">Calendrier</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <label className="block">
            <span className="text-slate-900 text-base font-medium mb-2 block">
              Date de début
            </span>
            <input
              className="form-input w-full rounded-lg border-slate-300 bg-slate-50 h-12 px-4"
              type="datetime-local"
              onChange={(e) => updateField("dd", e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-slate-900 text-base font-medium mb-2 block">
              Date de fin
            </span>
            <input
              className="form-input w-full rounded-lg border-slate-300 bg-slate-50 h-12 px-4"
              type="datetime-local"
              onChange={(e) => updateField("df", e.target.value)}
            />
          </label>

        </div>
      </div>


      {/* SECTION 3 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary font-bold">3</span>
            <h3 className="text-xl font-bold text-slate-900">Candidats</h3>
          </div>

          <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Minimum 2 candidats
          </span>
        </div>

        <div className="space-y-4">

          {data.candidats.map((c, i) => (

            <div key={i} className="flex gap-4 items-start justify-center group">

              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-4">

  <div className=" flex gap-4 justify-center items-start">

    {/* PHOTO */}
    <div className="flex flex-col items-center gap-2">
      <label className="cursor-pointer">
        <div className="size-16 rounded-lg bg-slate-200 flex items-center justify-center overflow-hidden">
          {!c.preview && (<User className="text-slate-400"/>)}
          {c.preview && (
            <img src={c.preview} alt={c.lib} />
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e)=> handlePhoto(i, e.target.files[0])}
        />
      </label>
    </div>

    {/* LIBELLE */}
    <div className="flex-1">
<input
  className="form-input flex w-full rounded-lg border-slate-300 bg-white text-slate-900 focus:border-primary focus:ring-primary h-12 px-4 placeholder:text-slate-400"
  placeholder="Nom du candidat"
  type="text"
  value={c.lib} // ✅ important
  onChange={(e) => updateCandidate(i, "lib", e.target.value)} // ✅ important
/>
    </div>

    {/* DELETE */}
    <button
                className="mt-2 text-slate-400 hover:text-red-500 transition-colors"
                type="button"
                onClick={() => removeCandidate(i)}
              >
                <Trash />
              </button>

  </div>

  {/* DESCRIPTION */}
  <textarea
  className="form-textarea flex w-full rounded-lg border-slate-300 bg-white text-slate-900 focus:border-primary focus:ring-primary min-h-[80px] px-4 py-3 placeholder:text-slate-400"
  placeholder="Description du candidat..."
  value={c.desc} // ✅ important
  onChange={(e) => updateCandidate(i, "desc", e.target.value)} // ✅ important
/>

</div>


            </div>

          ))}

          {/* ADD */}
          <div className="flex justify-end">
            <button
              className="h-12 w-12 flex items-center justify-center bg-primary/10 hover:bg-primary/20 text-primary rounded-lg"
              type="button"
              onClick={addCandidate}
            >
              <Plus />
            </button>
          </div>

        </div>

      </div>
          {(data.type === "p" || data.type === "h") && (

  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">

    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary font-bold">4</span>
        <h3 className="text-xl font-bold text-slate-900">Urnes</h3>
      </div>

      <span className="text-sm text-slate-500">
        Optionnel
      </span>
    </div>

    <div className="space-y-3">

      {data.urnes.map((u, i) => (
        <div key={i} className="flex gap-3 items-center">

          <input
            className="flex-1 h-12 px-4 border rounded-lg bg-slate-50"
            placeholder="Position de l'urne (ex: Salle A)"
            value={u.position}
            onChange={(e) => updateUrne(i, e.target.value)}
          />

          <button
            type="button"
            onClick={() => removeUrne(i)}
            className="text-red-500"
          >
            <Trash />
          </button>

        </div>
      ))}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={addUrne}
          className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-lg"
        >
          <Plus />
        </button>
      </div>

    </div>

  </div>

)}
      <button
        onClick={getPayload}
        className="bg-primary text-white px-6 py-3 rounded-lg"
      >
        Créer
      </button>

    </div>
  );
}