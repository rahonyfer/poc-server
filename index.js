const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// VARIAVEL DE MEMÓRIA (Para conectar a Verificação ao Login)
let ULTIMO_TIPO_ACESSO = "STD"; 
let ULTIMO_EMAIL_GERADO = "user@comum.com";

// ==================================================================
// 🔐 SUAS LISTAS DE CHAVES
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

// --- CATÁLOGO DE FUNIS (SÓ VIP VÊ) ---
const CATALOGO_FUNIS = [
    {
        "id": "72424620-9792-4f8e-ac9a-85021b348a0e",
        "productTitle": "✅ (USAR ESSE) FÚNIL LIGAÇÃO ATUAL ☎️",
        "description": "Funil VIP",
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
];

// ==================================================================
// 1. ROTA DE VERIFICAÇÃO (VALIDA A CHAVE E PREPARA O LOGIN)
// ==================================================================
app.get('/extension/verify/:id', (req, res) => {
    // Normaliza a chave (remove espaços e poe tudo maiúsculo)
    const chave = req.params.id.trim().toUpperCase();
    console.log(`[VERIFY] Checando chave: "${chave}"`);
    
    // Reseta para padrão antes de checar
    ULTIMO_TIPO_ACESSO = "INVALIDO"; 

    if (CHAVES_VIP.includes(chave)) {
        console.log("--> SUCESSO: CHAVE VIP IDENTIFICADA! 💎");
        ULTIMO_TIPO_ACESSO = "VIP";
        ULTIMO_EMAIL_GERADO = "admin@vip.com";
    } else if (CHAVES_COMUM.includes(chave)) {
        console.log("--> SUCESSO: CHAVE COMUM IDENTIFICADA! 👤");
        ULTIMO_TIPO_ACESSO = "STD";
        ULTIMO_EMAIL_GERADO = "user@comum.com";
    } else {
        console.log("--> FALHA: CHAVE NÃO CADASTRADA ⛔");
        return res.status(404).json({ error: "Chave não encontrada no sistema." });
    }

    // Retorna os dados para a extensão (ela vai usar isso para tentar logar depois)
    res.json({
        "id": "USER-" + chave,
        "email": ULTIMO_EMAIL_GERADO,
        "name": (ULTIMO_TIPO_ACESSO === "VIP") ? "Membro VIP" : "Membro Standard",
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
// 2. ROTA DE LOGIN (USA A MEMÓRIA DO SERVIDOR)
// ==================================================================
app.post('/sessions', (req, res) => {
    // Mesmo que o email venha "undefined", nós usamos o que guardamos no passo anterior
    console.log(`[LOGIN] Tentativa recebida. Usando memória: ${ULTIMO_TIPO_ACESSO}`);

    // Se a pessoa tentou logar sem ter passado pelo /verify corretamente antes
    if (ULTIMO_TIPO_ACESSO === "INVALIDO") {
        return res.status(401).json({ error: "Acesso não autorizado. Verifique sua chave." });
    }

    res.json({
        // O Token carrega a marca que definimos no /verify
        "access_token": `TOKEN_SECURE_${ULTIMO_TIPO_ACESSO}_ACCESS`,
        "refreshToken": "REFRESH_TOKEN_FAKE",
        "session": {
            "id": "sess-" + Date.now(),
            "startedOn": new Date().toISOString(),
            "expiresOn": "2099-12-31T23:59:59.000Z",
            "status": "ACTIVE",
            "user": {
                "id": "user-" + ULTIMO_TIPO_ACESSO,
                "name": (ULTIMO_TIPO_ACESSO === "VIP") ? "Membro VIP" : "Membro Standard",
                "email": ULTIMO_EMAIL_GERADO
            }
        }
    });
});

// ==================================================================
// 3. ROTA DE BACKUP (OLHA O TOKEN OU A MEMÓRIA)
// ==================================================================
app.get('/backup', (req, res) => {
    const authHeader = req.headers.authorization || "";
    console.log(`[BACKUP] Solicitado. Token: ${authHeader}`);
    
    // Verifica se o token tem a marca VIP OU se a memória atual é VIP
    if (authHeader.includes("VIP") || ULTIMO_TIPO_ACESSO === "VIP") {
        console.log("--> Entrega: CATÁLOGO COMPLETO 💎");
        res.json(CATALOGO_FUNIS);
    } else {
        console.log("--> Entrega: LISTA VAZIA (Standard) 👤");
        res.json([]);
    }
});

// 4. Rotas Auxiliares
app.get('/flags/tenant/*', (req, res) => res.json([{ "name": "all_features", "enabled": true }]));
app.get('/funnels', (req, res) => res.json([]));
app.get('/audios', (req, res) => res.json([]));
app.get('/messages', (req, res) => res.json([]));
app.get('/medias', (req, res) => res.json([]));
app.get('/', (req, res) => res.send('<h1>SERVIDOR MEMORY-FIX ONLINE 🧠</h1>'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
