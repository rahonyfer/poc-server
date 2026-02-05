const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ==================================================================
// 🔑 SUAS DUAS CHAVES OFICIAIS
// ==================================================================
const CHAVE_VIP = "39c9def5-e7c1-43f3-bca1-b4a4d01df25c";
const CHAVE_STD = "39m9dax5-b7o1-43t3-aut1-o4m4a01ca25o";

// ==================================================================
// 📦 CATÁLOGO DE FUNIS (OS DADOS DO PRODUTOR)
// ==================================================================
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
    },
    {
       "id": "cc518eac-b94a-4533-92f8-d6d64e03b088",
       "productTitle": "FUNIL - 100DORES - ANTIGO ✅✅",
       "description": null,
       "backupUri": "https://zap-funnel-backups.s3.us-east-1.amazonaws.com/f9bb264b-8c15-448c-952f-517207a75fd3/f9bb264b-8c15-448c-952f-517207a75fd3/cc518eac-b94a-4533-92f8-d6d64e03b088.json?update=22:45:17",
       "productImage": "https://zap-funnel-backups.s3.us-east-1.amazonaws.com/f9bb264b-8c15-448c-952f-517207a75fd3/f9bb264b-8c15-448c-952f-517207a75fd3/cc518eac-b94a-4533-92f8-d6d64e03b088.png",
       "messageAmount": 16,
       "audioAmount": 28,
       "mediaAmount": 21,
       "funnelAmount": 15,
       "status": true
    },
    {
       "id": "cbeb9d22-95ca-4ab4-a061-a952659233a0",
       "productTitle": "FÚNIL LIGAÇÃO FEMININO ATUALIZADO ✅",
       "description": "Fúnil gravado na voz feminina",
       "backupUri": "https://zap-funnel-backups.s3.us-east-1.amazonaws.com/f9bb264b-8c15-448c-952f-517207a75fd3/f9bb264b-8c15-448c-952f-517207a75fd3/cbeb9d22-95ca-4ab4-a061-a952659233a0.json?update=19:34:15",
       "productImage": "https://zap-funnel-backups.s3.us-east-1.amazonaws.com/f9bb264b-8c15-448c-952f-517207a75fd3/f9bb264b-8c15-448c-952f-517207a75fd3/cbeb9d22-95ca-4ab4-a061-a952659233a0.png",
       "messageAmount": 7,
       "audioAmount": 22,
       "mediaAmount": 14,
       "funnelAmount": 10,
       "status": true
    },
    {
       "id": "6f06cab9-ef37-46b8-9fcd-e53185aedd2d",
       "productTitle": "FÚNIL TADALA PREMIUM - VOZ FEMININA ATUALIZADO 👩🏻‍💻",
       "description": "Funil gravado na voz feminina.",
       "backupUri": "https://zap-funnel-backups.s3.us-east-1.amazonaws.com/f9bb264b-8c15-448c-952f-517207a75fd3/f9bb264b-8c15-448c-952f-517207a75fd3/6f06cab9-ef37-46b8-9fcd-e53185aedd2d.json?update=22:15:45",
       "productImage": "https://zap-funnel-backups.s3.us-east-1.amazonaws.com/f9bb264b-8c15-448c-952f-517207a75fd3/f9bb264b-8c15-448c-952f-517207a75fd3/6f06cab9-ef37-46b8-9fcd-e53185aedd2d.png",
       "messageAmount": 6,
       "audioAmount": 13,
       "mediaAmount": 3,
       "funnelAmount": 8,
       "status": true
    },
    {
       "id": "be4af0ac-600d-4dbd-8ca1-947586df4e21",
       "productTitle": "✅ FÚNIL ATUALIZADO - TADALA",
       "description": "Fúnil gravado na voz masculina.",
       "backupUri": "https://zap-funnel-backups.s3.us-east-1.amazonaws.com/f9bb264b-8c15-448c-952f-517207a75fd3/f9bb264b-8c15-448c-952f-517207a75fd3/be4af0ac-600d-4dbd-8ca1-947586df4e21.json?update=18:20:55",
       "productImage": "https://zap-funnel-backups.s3.us-east-1.amazonaws.com/f9bb264b-8c15-448c-952f-517207a75fd3/f9bb264b-8c15-448c-952f-517207a75fd3/be4af0ac-600d-4dbd-8ca1-947586df4e21.png",
       "messageAmount": 11,
       "audioAmount": 24,
       "mediaAmount": 10,
       "funnelAmount": 18,
       "status": true
    },
    {
       "id": "42843f9c-a282-4cfd-99ff-b7be3706a082",
       "productTitle": "FUNIL ATUALIZADO BOMBA + GEL ✅",
       "description": null,
       "backupUri": "https://zap-funnel-backups.s3.us-east-1.amazonaws.com/f9bb264b-8c15-448c-952f-517207a75fd3/f9bb264b-8c15-448c-952f-517207a75fd3/42843f9c-a282-4cfd-99ff-b7be3706a082.json?update=18:19:16",
       "productImage": "https://zap-funnel-backups.s3.us-east-1.amazonaws.com/f9bb264b-8c15-448c-952f-517207a75fd3/f9bb264b-8c15-448c-952f-517207a75fd3/42843f9c-a282-4cfd-99ff-b7be3706a082.png",
       "messageAmount": 5,
       "audioAmount": 7,
       "mediaAmount": 8,
       "funnelAmount": 7,
       "status": true
    }
];

// VARIÁVEL GLOBAL PARA GUARDAR QUEM ESTÁ LOGANDO
// (Resolve o bug do email undefined)
let ACESSO_ATUAL = "STD"; 

// ==================================================================
// 1. ROTA DE VERIFICAÇÃO (CHECA A CHAVE)
// ==================================================================
app.get('/extension/verify/:id', (req, res) => {
    // Limpa a chave que chegou (tira aspas e espaços)
    const chaveRecebida = req.params.id.replace(/['"]+/g, '').trim();
    console.log(`[VERIFICACAO] Chave digitada: ${chaveRecebida}`);

    // RESET DE SEGURANÇA
    ACESSO_ATUAL = "BLOQUEADO";

    // 1. É A CHAVE VIP?
    if (chaveRecebida === CHAVE_VIP) {
        console.log("--> ACESSO VIP LIBERADO! 💎");
        ACESSO_ATUAL = "VIP";
        return res.json({
            "id": CHAVE_VIP,
            "email": "admin@vip.com",
            "name": "Usuario VIP",
            "subscription": { "status": "ACTIVE", "expiration_date": "2099-12-31T00:00:00.000Z" }
        });
    }

    // 2. É A CHAVE STANDARD?
    if (chaveRecebida === CHAVE_STD) {
        console.log("--> ACESSO COMUM LIBERADO! 👤");
        ACESSO_ATUAL = "STD";
        return res.json({
            "id": CHAVE_STD,
            "email": "user@std.com",
            "name": "Usuario Comum",
            "subscription": { "status": "ACTIVE", "expiration_date": "2099-12-31T00:00:00.000Z" }
        });
    }

    // 3. É LIXO DE CACHE? (Se for, a gente força limpar)
    // Se a chave não for nenhuma das duas acima, bloqueia.
    console.log("--> CHAVE INVÁLIDA OU CACHE SUJO. BLOQUEANDO.");
    return res.status(403).json({ error: "Chave Invalida. Limpe o Cache." });
});

// ==================================================================
// 2. ROTA DE LOGIN (LOGA BASEADO NO QUE ACONTECEU NO VERIFY)
// ==================================================================
app.post('/sessions', (req, res) => {
    // Ignora o email que vem da extensão (porque as vezes vem undefined)
    // Usa a variável ACESSO_ATUAL que definimos no passo anterior
    console.log(`[LOGIN] Processando login para nível: ${ACESSO_ATUAL}`);

    if (ACESSO_ATUAL === "BLOQUEADO") {
        return res.status(401).json({ error: "Chave Invalida" });
    }

    // Gera o token
    const emailLogin = (ACESSO_ATUAL === "VIP") ? "admin@vip.com" : "user@std.com";
    
    res.json({
        "access_token": "TOKEN_VITALICIO_" + ACESSO_ATUAL,
        "refreshToken": "REFRESH_TOKEN_FAKE",
        "session": {
            "id": "sess-123",
            "startedOn": new Date().toISOString(),
            "expiresOn": "2099-12-31T23:59:59.000Z",
            "status": "ACTIVE",
            "user": {
                "id": (ACESSO_ATUAL === "VIP") ? CHAVE_VIP : CHAVE_STD,
                "name": (ACESSO_ATUAL === "VIP") ? "Membro VIP" : "Membro Standard",
                "email": emailLogin
            }
        }
    });
});

// ==================================================================
// 3. ROTA DE BACKUP (DECIDE SE MOSTRA OS FUNIS)
// ==================================================================
app.get('/backup', (req, res) => {
    // Simples e direto: Se a variável global diz que é VIP, entrega.
    if (ACESSO_ATUAL === "VIP") {
        console.log("[BACKUP] Entregando Funis (VIP)");
        res.json(CATALOGO_FUNIS);
    } else {
        console.log("[BACKUP] Entregando Vazio (Standard)");
        res.json([]);
    }
});

// Rotas Extras para não dar erro 404
app.get('/flags/tenant/*', (req, res) => res.json([{ "name": "all_features", "enabled": true }]));
app.get('/funnels', (req, res) => res.json([]));
app.get('/audios', (req, res) => res.json([]));
app.get('/messages', (req, res) => res.json([]));
app.get('/medias', (req, res) => res.json([]));
app.get('/', (req, res) => res.send('<h1>SERVIDOR ATIVO (2 CHAVES)</h1>'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
