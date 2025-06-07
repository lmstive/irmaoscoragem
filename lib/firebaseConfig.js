import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase, lendo as variáveis de ambiente
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Inicializa o Firebase (de uma forma segura que evita reinicialização)
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Exporta a instância do Firestore para usarmos no site
const db = getFirestore(app);

export { db, app };