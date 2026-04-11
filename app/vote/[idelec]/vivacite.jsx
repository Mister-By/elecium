"use client";

import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import VoteClient from "./voteclient";

const INSTRUCTION_DUREE = 6000;
const NB_INSTRUCTIONS   = 3;

const ACTIONS = [
  "REGARD_GAUCHE",
  "REGARD_DROITE",
  "REGARD_HAUT",
  "REGARD_BAS",
  "INCLINER_GAUCHE",
  "INCLINER_DROITE",
  "RAPPROCHER",
  "OUVRIR_BOUCHE",
];

const LABELS = {
  REGARD_GAUCHE:    "Regardez à gauche",
  REGARD_DROITE:    "Regardez à droite",
  REGARD_HAUT:      "Regardez vers le haut",
  REGARD_BAS:       "Regardez vers le bas",
  INCLINER_GAUCHE:  "Inclinez la tête à gauche",
  INCLINER_DROITE:  "Inclinez la tête à droite",
  RAPPROCHER:       "Rapprochez-vous de la caméra",
  OUVRIR_BOUCHE:    "Ouvrez la bouche",
};

export default function Vivacite({ onSuccess, onFailure, election }) {
    const streamRef = useRef(null);
  const videoRef  = useRef(null);
  const canvasRef = useRef(null);
const [formDataState, setFormDataState] = useState(null);
  const [phase, setPhase]               = useState("init");
  const [message, setMessage]           = useState("Chargement des modèles...");
  const [progression, setProgression]   = useState(0);
  const [tempsRestant, setTempsRestant] = useState(INSTRUCTION_DUREE / 1000);
  const [envoi, setEnvoi]               = useState(null); // null | "envoi" | "ok" | "erreur"

  const phaseRef         = useRef("init");
  const instructionRef   = useRef("");
  const actionValideeRef = useRef(false);
  const progressionRef   = useRef(0);

  const baseRef = useRef({
    nezX: null, nezY: null,
    faceWidth: null, faceHeight: null,
    rollAngle: null, mouthGap: null,
  });

  const intervalDetRef = useRef(null);
  const timerRef       = useRef(null);
  const countdownRef   = useRef(null);
  const synthRef       = useRef(null); // SpeechSynthesis utterance en cours

  function setPhaseSync(p)       { phaseRef.current = p; setPhase(p); }
  function setInstructionSync(i) { instructionRef.current = i; }

  // ─── Lecture vocale ────────────────────────────────────────────────────────
  function lire(texte) {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texte);
    u.lang = "fr-FR";
    u.rate = 1.05;
    synthRef.current = u;
    window.speechSynthesis.speak(u);
  }

  // ─── Capture photo depuis le flux brut (non miroir) ───────────────────────
  async function capturerEtEnvoyer() {
    const video = videoRef.current;
    if (!video) return;

    // Canvas temporaire invisible — capture le flux brut non miroir
    const snap = document.createElement("canvas");
    snap.width  = video.videoWidth  || 640;
    snap.height = video.videoHeight || 480;
    const ctx = snap.getContext("2d");
    ctx.drawImage(video, 0, 0, snap.width, snap.height);

    setEnvoi("envoi");

    snap.toBlob(async (blob) => {
      try {
        const formData = new FormData();
        formData.append("photo", blob, "vivacite.png");
        setFormDataState(formData);
        // const res = await fetch(
        //   `${process.env.NEXT_PUBLIC_URL_API}/api/compare`,
        //   { method: "POST", body: formData }
        // );

        // if (res.ok) {
        //   setEnvoi("ok");
        //   if (onSuccess) onSuccess();
        // } else {
        //   setEnvoi("erreur");
        //   if (onFailure) onFailure();
        // }
      } catch (e) {
        console.error("Erreur envoi photo:", e);
        setEnvoi("erreur");
        if (onFailure) onFailure();
      }
    }, "image/png");
  }
  

  // ─── Init ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    demarrer();
    return () => {
  clearInterval(intervalDetRef.current);
  clearTimeout(timerRef.current);
  clearInterval(countdownRef.current);
  stopCamera();
  window.speechSynthesis?.cancel();
};
  }, []);

  async function demarrer() {
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      const msg = "Placez votre visage dans le cadre";
      setMessage("📷 " + msg + "...");
      lire(msg);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
        });

        streamRef.current = stream; // 🔥 important
        videoRef.current.srcObject = stream;

      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play();
        attendreVisage();
      };
    } catch (e) {
      setMessage("❌ Erreur caméra : " + e.message);
    }
  }

function stopCamera() {
  if (streamRef.current) {
    streamRef.current.getTracks().forEach(track => track.stop());
    streamRef.current = null;
  }

  
  if (videoRef.current) {
    videoRef.current.srcObject = null;
  }
}

  async function attendreVisage() {
    setPhaseSync("init");
    const iv = setInterval(async () => {
      const det = await detecter();
      if (!det) { setMessage("🟠 Placez votre visage dans le cadre..."); return; }
      clearInterval(iv);
      setMessage("✅ Visage détecté — calibration...");
      lire("Visage détecté, calibration en cours");
      calibrer();
    }, 300);
  }

  async function calibrer() {
    setPhaseSync("calibration");
    const samples = { nezX: [], nezY: [], faceW: [], faceH: [], roll: [], mouth: [] };

    const iv = setInterval(async () => {
      const det = await detecter();
      if (!det) return;

      const lms   = det.landmarks;
      const box   = det.detection.box;
      const nez   = lms.getNose();
      const jaw   = lms.getJawOutline();
      const mouth = lms.getMouth();

      samples.nezX.push(nez[3].x);
      samples.nezY.push(nez[3].y);
      samples.faceW.push(box.width);
      samples.faceH.push(box.height);
      samples.roll.push(rollAngle(jaw));
      samples.mouth.push(mouthOpenness(mouth));

      dessiner(det);

      if (samples.nezX.length >= 12) {
        clearInterval(iv);
        const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
        baseRef.current = {
          nezX:       avg(samples.nezX),
          nezY:       avg(samples.nezY),
          faceWidth:  avg(samples.faceW),
          faceHeight: avg(samples.faceH),
          rollAngle:  avg(samples.roll),
          mouthGap:   avg(samples.mouth),
        };
        setMessage("Prêt !");
        lire("Prêt");
        setTimeout(() => {
          progressionRef.current = 0;
          setProgression(0);
          prochaineInstruction();
        }, 600);
      }
    }, 120);
  }

  async function prochaineInstruction() {
    if (progressionRef.current >= NB_INSTRUCTIONS) {
      terminer(true);
      return;
    }

    const snap = await detecter();
    if (!snap) {
      setMessage("⚠️ Visage perdu — repositionnez-vous");
      lire("Visage perdu, repositionnez-vous");
      setTimeout(prochaineInstruction, 1500);
      return;
    }

    const lms   = snap.landmarks;
    const box   = snap.detection.box;
    const nez   = lms.getNose();
    const jaw   = lms.getJawOutline();
    const mouth = lms.getMouth();

    baseRef.current = {
      nezX:       nez[3].x,
      nezY:       nez[3].y,
      faceWidth:  box.width,
      faceHeight: box.height,
      rollAngle:  rollAngle(jaw),
      mouthGap:   mouthOpenness(mouth),
    };

    actionValideeRef.current = false;

    let action;
    do {
      action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
    } while (action === instructionRef.current);

    setInstructionSync(action);
    setPhaseSync("instruction");

    const label = LABELS[action];
    setMessage(label);
    lire(label); // ← lecture vocale de l'instruction

    setTempsRestant(INSTRUCTION_DUREE / 1000);

    clearInterval(countdownRef.current);
    let t = INSTRUCTION_DUREE / 1000;
    countdownRef.current = setInterval(() => {
      t = Math.max(0, t - 1);
      setTempsRestant(t);
    }, 1000);

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (!actionValideeRef.current) {
        clearInterval(countdownRef.current);
        clearInterval(intervalDetRef.current);
        terminer(false);
      }
    }, INSTRUCTION_DUREE);

    clearInterval(intervalDetRef.current);
    intervalDetRef.current = setInterval(async () => {
      if (phaseRef.current !== "instruction") return;
      const det = await detecter();
      if (!det) return;
      dessiner(det);
      verifierAction(det);
    }, 100);
  }

  function verifierAction(det) {
    if (actionValideeRef.current) return;

    const action = instructionRef.current;
    const lms    = det.landmarks;
    const nez    = lms.getNose();
    const jaw    = lms.getJawOutline();
    const mouth  = lms.getMouth();
    const box    = det.detection.box;

    const fw = baseRef.current.faceWidth  || 200;
    const fh = baseRef.current.faceHeight || 200;

    const dx = nez[3].x - baseRef.current.nezX;
    const dy = nez[3].y - baseRef.current.nezY;
    const seuilXY     = fw * 0.08;
    const seuilRoll   = 8;
    const seuilMouth  = fh * 0.06;
    const seuilRapproch = fw * 0.12;

    const rollActuel = rollAngle(jaw);
    const dRoll      = rollActuel - baseRef.current.rollAngle;
    const dMouth     = mouthOpenness(mouth) - baseRef.current.mouthGap;
    const dFaceW     = box.width - baseRef.current.faceWidth;

    switch (action) {
      case "REGARD_GAUCHE":   if (dx >  seuilXY)      valider(); break;
      case "REGARD_DROITE":   if (dx < -seuilXY)      valider(); break;
      case "REGARD_HAUT":     if (dy < -seuilXY)      valider(); break;
      case "REGARD_BAS":      if (dy >  seuilXY)      valider(); break;
      case "INCLINER_GAUCHE": if (dRoll >  seuilRoll) valider(); break;
      case "INCLINER_DROITE": if (dRoll < -seuilRoll) valider(); break;
      case "RAPPROCHER":      if (dFaceW > seuilRapproch) valider(); break;
      case "OUVRIR_BOUCHE":   if (dMouth > seuilMouth)    valider(); break;
    }
  }

  function valider() {
    if (actionValideeRef.current) return;
    actionValideeRef.current = true;

    clearTimeout(timerRef.current);
    clearInterval(intervalDetRef.current);
    clearInterval(countdownRef.current);

    progressionRef.current += 1;
    setProgression(progressionRef.current);
    setMessage("✅ Bien joué !");
    lire("Bien joué");

    setTimeout(prochaineInstruction, 800);
  }

async function terminer(reussi) {
  clearInterval(intervalDetRef.current);
  clearTimeout(timerRef.current);
  clearInterval(countdownRef.current);

  if (reussi) {
    setPhaseSync("succes");
    setInstructionSync("");
    setMessage("🎉 Vivacité confirmée !");
    lire("Vivacité confirmée");
    lire("Stabiliser vous ")
    setTimeout(()=>{
      
    },2000);
    setTimeout(async()=>{
    await capturerEtEnvoyer();
    stopCamera();
    },2000);

  } else {
    stopCamera();

    setPhaseSync("echec");
    setInstructionSync("");
    setMessage("❌ Échec — veuillez réessayer");
    lire("Échec, veuillez réessayer");

    if (onFailure) onFailure();
  }
}

  function rollAngle(jaw) {
    const p1 = jaw[0], p2 = jaw[16];
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
  }

  function mouthOpenness(mouth) {
    return Math.abs(mouth[9].y - mouth[3].y);
  }

  async function detecter() {
    const video = videoRef.current;
    if (!video) return null;
    return faceapi
      .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 320 }))
      .withFaceLandmarks();
  }

  function dessiner(det) {
    const canvas = canvasRef.current;
    const video  = videoRef.current;
    if (!canvas || !video) return;
    const size = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, size);
    const resized = faceapi.resizeResults(det, size);
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resized);
    faceapi.draw.drawFaceLandmarks(canvas, resized);
  }

  const couleur = {
    init:        "#888",
    calibration: "#f0a500",
    instruction: "#1a73e8",
    succes:      "#2e7d32",
    echec:       "#c62828",
  }[phase] ?? "#888";

  if (formDataState) {
  return (
    <VoteClient formData={formDataState} election={election} />
  );
}

  return (
    <div style={{ textAlign: "center", fontFamily: "sans-serif", padding: 20 }}>
      <h2>🧠 Vérification de vivacité</h2>

      {/* Progression */}
      <div style={{ display: "flex", justifyContent: "center", gap: 12, margin: "12px 0" }}>
        {Array.from({ length: NB_INSTRUCTIONS }).map((_, i) => (
          <div key={i} style={{
            width: 34, height: 34, borderRadius: "50%",
            background: i < progression ? "#2e7d32" : "#e0e0e0",
            border: `2px solid ${i < progression ? "#2e7d32" : "#bbb"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: i < progression ? "white" : "#999",
            fontWeight: "bold", fontSize: 15, transition: "all 0.3s",
          }}>
            {i < progression ? "✓" : i + 1}
          </div>
        ))}
      </div>

      {/* Message */}
      <h3 style={{ color: couleur, fontSize: 22, margin: "8px 0" }}>{message}</h3>

      {/* Countdown */}
      {phase === "instruction" && (
        <div style={{
          fontSize: 14,
          color: tempsRestant <= 2 ? "#c62828" : "#555",
          fontWeight: tempsRestant <= 2 ? "bold" : "normal",
          marginBottom: 6,
        }}>
          ⏱ {tempsRestant}s
        </div>
      )}

      {/* Statut envoi photo */}
      {envoi === "envoi"  && <p style={{ color: "#f0a500" }}>📤 Envoi de la photo...</p>}
      {envoi === "ok"     && <p style={{ color: "#2e7d32" }}>✅ Photo envoyée</p>}
      {envoi === "erreur" && <p style={{ color: "#c62828" }}>❌ Échec de l'envoi</p>}

      {/* Vidéo miroir */}
      <div style={{ position: "relative", display: "inline-block" }}>
        <video
          ref={videoRef} autoPlay muted width="640" height="480"
          style={{
            borderRadius: 10,
            border: `3px solid ${couleur}`,
            transform: "scaleX(-1)",
            display: "block",
          }}
        />
        <canvas
          ref={canvasRef} width="640" height="480"
          style={{ position: "absolute", top: 0, left: 0, transform: "scaleX(-1)" }}
        />
      </div>

      {/* Retry */}
      {phase === "echec" && (
        <div style={{ marginTop: 16 }}>
          <button
            onClick={() => {
              progressionRef.current = 0;
              setProgression(0);
              setEnvoi(null);
              setPhaseSync("instruction");
              prochaineInstruction();
            }}
            style={{
              padding: "10px 28px", fontSize: 16, cursor: "pointer",
              background: "#1a73e8", color: "white",
              border: "none", borderRadius: 6,
            }}
          >
            🔄 Réessayer
          </button>
        </div>
      )}
    </div>
  );
}