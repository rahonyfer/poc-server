const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ==================================================================
// 🔐 LISTAS DE CLIENTES
// ==================================================================

const CHAVES_VIP = [
    "VIP-KEY-001",
    "VIP-KEY-002",
    "VIP-KEY-003",
    "VIP-KEY-004",
    "VIP-KEY-005"
];

const CHAVES_COMUM = [
    "STD-KEY-001",
    "STD-KEY-002",
    "STD-KEY-003",
    "STD-KEY-004",
    "STD-KEY-005"
];

// --- CATÁLOGO DE FUNIS (SEU OURO) ---
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
    // ... (Adicione os outros funis aqui) ...
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
];

// VARIÁVEL DE MEMÓRIA (GLOBAL) PARA SEGURAR O TIPO DE ACESSO
let ULTIMO_ACESSO_VALIDO = "STD"; // Padrão seguro

// ==================================================================
// 1. ROTA DE VERIFICAÇÃO (VALIDA CHAVE E DEFINE PERFIL)
// ==================================================================
app.get('/extension/verify/:id', (req, res) => {
    const chave = req.params.id.trim().toUpperCase();
    console.log(`[VERIFY] Processando chave: "${chave}"`);

    let perfil = "STD"; // Começa assumindo que é comum
    let emailPerfil = "user@comum.com";

    if (CHAVES_VIP.includes(chave)) {
        console.log("--> STATUS: VIP DETECTADO! 💎");
        perfil = "VIP";
        emailPerfil = "admin@vip.com";
    } else if (CHAVES_COMUM.includes(chave)) {
        console.log("--> STATUS: COMUM DETECTADO! 👤");
        perfil = "STD";
        emailPerfil = "user@comum.com";
    } else {
        console.log("--> STATUS: CHAVE DESCONHECIDA (Bloqueando) ⛔");
        return res.status(403).json({ error: "Chave nao autorizada." });
    }

    // SALVA NA MEMÓRIA GLOBAL (CRUCIAL PARA O LOGIN FUNCIONAR)
    ULTIMO_ACESSO_VALIDO = perfil;

    res.json({
        "id": "USER-" + chave,
        "email": emailPerfil,
        "name": (perfil === "VIP") ? "Membro VIP" : "Membro Standard",
        "subscription": {
            "id": "sub-" + chave,
            "status": "ACTIVE",
            "expiration_date": "2099-12-31T00:00:00.000Z",
            "start_date": "2024-01-01T00:00:00.000Z",
            "history": [{ 
                "status": "PAID", 
                "amount": "997", 
                "expiration_date": "2099-12-31T00:00:00.000Z" 
            }]
        }
    });
});

// ==================================================================
// 2. ROTA DE LOGIN (USA A MEMÓRIA PARA NÃO DAR UNDEFINED)
// ==================================================================
app.post('/sessions', (req, res) => {
    // Tenta pegar o email, mas se vier undefined, ignora e usa a memória
    console.log(`[LOGIN] Solicitado. Memória atual do servidor: ${ULTIMO_ACESSO_VALIDO}`);

    // Define se é VIP ou STD baseado na última verificação válida
    const tipoAcesso = ULTIMO_ACESSO_VALIDO; 
    const emailFinal = (tipoAcesso === "VIP") ? "admin@vip.com" : "user@comum.com";

    res.json({
        "access_token": `TOKEN_SECURE_${tipoAcesso}_ACCESS`,
        "refreshToken": "REFRESH_TOKEN_FAKE",
        "session": {
            "id": "sess-" + Date.now(),
            "startedOn": new Date().toISOString(),
            "expiresOn": "2099-12-31T23:59:59.000Z",
            "status": "ACTIVE",
            "user": {
                "id": "user-" + tipoAcesso,
                "name": (tipoAcesso === "VIP") ? "Membro VIP" : "Membro Standard",
                "email": emailFinal
            }
        }
    });
});

// ==================================================================
// 3. ROTA DE BACKUP (ENTREGA BASEADO NA MEMÓRIA)
// ==================================================================
app.get('/backup', (req, res) => {
    // Verifica a memória global
    console.log(`[BACKUP] Solicitado. Tipo de acesso atual: ${ULTIMO_ACESSO_VALIDO}`);
    
    if (ULTIMO_ACESSO_VALIDO === "VIP") {
        console.log("--> Entregando CATÁLOGO COMPLETO 💎");
        res.json(CATALOGO_FUNIS);
    } else {
        console.log("--> Entregando LISTA VAZIA (Standard) 👤");
        res.json([]);
    }
});

// 4. Rotas Auxiliares
app.get('/flags/tenant/*', (req, res) => {
    res.json([
        { "id": "uuid-1", "key": "SUPPORT_ACTION", "value": true, "projectId": "pid-1" },
        { "id": "uuid-2", "key": "BACKUP_LOADING_PAGE", "value": true, "projectId": "pid-1" },
        { "id": "uuid-3", "key": "LOGIN_V2", "value": true, "projectId": "pid-1" },
        { "id": "uuid-4", "key": "REMEMBER_SUBSCRIPTION", "value": true, "projectId": "pid-1" }
    ]);
});

app.get('/funnels', (req, res) => res.json([]));
app.get('/audios', (req, res) => res.json([]));
app.get('/messages', (req, res) => res.json([]));
app.get('/medias', (req, res) => res.json([]));

app.get('/', (req, res) => res.send('<h1>SERVIDOR ESTÁVEL ONLINE 🟢</h1>'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
