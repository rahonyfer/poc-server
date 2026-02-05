const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ==================================================================
// 🔐 LISTAS DE CLIENTES (UUID)
// ==================================================================

const CHAVES_VIP = [
    "39c9def5-e7c1-43f3-bca1-b4a4d01df25c", // <--- SUA CHAVE ESTÁ AQUI
    "550e8400-e29b-41d4-a716-446655440000",
    "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "c91d4e02-1234-4567-8901-abcdef123456"
];

const CHAVES_COMUM = [
    "b491266b-4e67-4638-8924-111111111111",
    "c523456d-5f78-4749-9035-222222222222",
    "d634567e-6a89-4850-0146-333333333333",
    "e745678f-7b90-4961-1257-444444444444",
    "f856789a-8c01-5072-2368-555555555555"
];

// --- CATÁLOGO DE FUNIS ---
const CATALOGO_FUNIS = [
    {
       "id": "72424620-9792-4f8e-ac9a-85021b348a0e",
       "productTitle": "✅ (USAR ESSE) FÚNIL LIGAÇÃO ATUAL ☎️",
       "description": "Funil VIP incluso",
       "backupUri": "https://zap-funnel-backups.s3.us-east-1.amazonaws.com/f9bb264b-8c15-448c-952f-517207a75fd3/f9bb264b-8c15-448c-952f-517207a75fd3/72424620-9792-4f8e-ac9a-85021b348a0e.json?update=11:25:55",
       "productImage": "https://zap-funnel-backups.s3.us-east-1.amazonaws.com/f9bb264b-8c15-448c-952f-517207a75fd3/f9bb264b-8c15-448c-952f-517207a75fd3/72424620-9792-4f8e-ac9a-85021b348a0e.png",
       "messageAmount": 7,
       "audioAmount": 10,
       "mediaAmount": 31,
       "funnelAmount": 28,
       "status": true
    },
    {
       "id": "82c47b17-a4d2-4bc9-9bf8-7feec8bbb909",
       "productTitle": "FÚNIL 100DORES - ATUALIZADO 2025 ✅",
       "description": "Atualização feita em 2025!",
       "backupUri": "https://zap-funnel-backups.s3.us-east-1.amazonaws.com/f9bb264b-8c15-448c-952f-517207a75fd3/f9bb264b-8c15-448c-952f-517207a75fd3/82c47b17-a4d2-4bc9-9bf8-7feec8bbb909.json?update=21:16:40",
       "productImage": "https://zap-funnel-backups.s3.us-east-1.amazonaws.com/f9bb264b-8c15-448c-952f-517207a75fd3/f9bb264b-8c15-448c-952f-517207a75fd3/82c47b17-a4d2-4bc9-9bf8-7feec8bbb909.png",
       "messageAmount": 18,
       "audioAmount": 45,
       "mediaAmount": 23,
       "funnelAmount": 17,
       "status": true
    }
    // ... adicione os outros funis aqui ...
];

// VARIÁVEL DE MEMÓRIA GLOBAL (CRUCIAL)
let MEMORIA_ACESSO = "STD"; 

// ==================================================================
// 1. ROTA DE VERIFICAÇÃO
// ==================================================================
app.get('/extension/verify/:id', (req, res) => {
    // Removemos espaços e aspas extras que podem vir
    const chave = req.params.id.replace(/['"]+/g, '').trim();
    
    console.log(`[VERIFY] Recebido: "${chave}"`);

    // Resetamos a memória para evitar falsos positivos
    MEMORIA_ACESSO = "INVALIDO";

    let perfil = "INVALIDO";
    let emailResponse = "erro@erro.com";

    if (CHAVES_VIP.includes(chave)) {
        console.log("--> SUCESSO: É UMA CHAVE VIP! 💎");
        perfil = "VIP";
        emailResponse = "admin@vip.com";
        MEMORIA_ACESSO = "VIP"; // Salva na memória
    } else if (CHAVES_COMUM.includes(chave)) {
        console.log("--> SUCESSO: É UMA CHAVE COMUM! 👤");
        perfil = "STD";
        emailResponse = "user@comum.com";
        MEMORIA_ACESSO = "STD"; // Salva na memória
    } else {
        console.log("--> ERRO: CHAVE NÃO ENCONTRADA NA LISTA. ⛔");
        return res.status(404).json({ error: "Chave nao encontrada" });
    }

    res.json({
        "id": "USER-" + chave,
        "email": emailResponse,
        "name": (perfil === "VIP") ? "Membro VIP" : "Membro Standard",
        "subscription": {
            "id": "sub-" + chave,
            "status": "ACTIVE",
            "expiration_date": "2099-12-31T00:00:00.000Z",
            "start_date": "2024-01-01T00:00:00.000Z",
            "history": [{ "status": "PAID", "amount": "997" }]
        }
    });
});

// ==================================================================
// 2. ROTA DE LOGIN (USA A MEMÓRIA)
// ==================================================================
app.post('/sessions', (req, res) => {
    console.log(`[LOGIN] Solicitado. Memória do servidor diz: ${MEMORIA_ACESSO}`);

    // Se a memória estiver INVALIDA, significa que o usuário não passou pelo verify corretamente
    if (MEMORIA_ACESSO === "INVALIDO") {
        return res.status(401).json({ error: "Faça a verificação primeiro." });
    }

    const emailFinal = (MEMORIA_ACESSO === "VIP") ? "admin@vip.com" : "user@comum.com";

    res.json({
        "access_token": `TOKEN_SECURE_${MEMORIA_ACESSO}_ACCESS`,
        "refreshToken": "REFRESH_TOKEN_FAKE",
        "session": {
            "id": "sess-" + Date.now(),
            "startedOn": new Date().toISOString(),
            "expiresOn": "2099-12-31T23:59:59.000Z",
            "status": "ACTIVE",
            "user": {
                "id": "user-" + MEMORIA_ACESSO,
                "name": (MEMORIA_ACESSO === "VIP") ? "Membro VIP" : "Membro Standard",
                "email": emailFinal
            }
        }
    });
});

// ==================================================================
// 3. ROTA DE BACKUP
// ==================================================================
app.get('/backup', (req, res) => {
    console.log(`[BACKUP] Solicitado. Nível de acesso: ${MEMORIA_ACESSO}`);
    
    if (MEMORIA_ACESSO === "VIP") {
        console.log("--> Liberando Funis 💎");
        res.json(CATALOGO_FUNIS);
    } else {
        console.log("--> Bloqueando Funis (Standard) 👤");
        res.json([]);
    }
});

// Rotas Auxiliares
app.get('/flags/tenant/*', (req, res) => res.json([{ "name": "all_features", "enabled": true }]));
app.get('/funnels', (req, res) => res.json([]));
app.get('/audios', (req, res) => res.json([]));
app.get('/messages', (req, res) => res.json([]));
app.get('/medias', (req, res) => res.json([]));

app.get('/', (req, res) => res.send('<h1>SERVIDOR UUID PRONTO 🟢</h1>'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
