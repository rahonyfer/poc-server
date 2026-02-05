const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ==================================================================
// 🔐 CONFIGURAÇÃO DE CLIENTES (LISTAS DE CHAVES)
// ==================================================================

// LISTA 1: VIP (Recebem os Funis do Produtor)
const CHAVES_VIP = [
    "VIP-KEY-001",
    "VIP-KEY-002",
    "VIP-KEY-003",
    "VIP-KEY-004",
    "VIP-KEY-005"
];

// LISTA 2: COMUM (Painel Vazio / Pessoal)
const CHAVES_COMUM = [
    "STD-KEY-001",
    "STD-KEY-002",
    "STD-KEY-003",
    "STD-KEY-004",
    "STD-KEY-005"
];

// --- 1. O CATÁLOGO DE FUNIS (EXTRAÍDO COM A CHAVE VÁLIDA) ---
const CATALOGO_FUNIS = [
    {
        "id": "72424620-9792-4f8e-ac9a-85021b348a0e",
        "productTitle": "✅ (USAR ESSE) FÚNIL LIGAÇÃO ATUAL ☎️",
        "description": "Funil com objetivo de fechamento em ligação",
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

// 3. Rota de Verificação (GET) - AGORA COM LÓGICA VIP/COMUM
app.get('/extension/verify/:id', (req, res) => {
    const chave = req.params.id;
    console.log(`[VERIFICACAO] Chave consultada: ${chave}`);
    
    // Configuração Padrão (COMUM)
    let userData = {
        id: "USER-STD-" + chave,
        email: "user@comum.com",
        name: "Usuario Comum",
        tokenTag: "STD"
    };

    // Se for Chave VIP, mudamos o perfil
    if (CHAVES_VIP.includes(chave)) {
        userData = {
            id: "USER-VIP-" + chave,
            email: "admin@vip.com", // Email que libera funis
            name: "Usuario VIP",
            tokenTag: "VIP"
        };
    }

    res.json({
        "id": userData.id,
        "email": userData.email,
        "name": userData.name,
        "subscription": {
            "id": "sub-vitalicia-" + chave,
            "status": "ACTIVE",
            "expiration_date": "2099-12-31T00:00:00.000Z",
            "start_date": "2024-11-07T00:00:00.000Z",
            "history": [{
                "id": "hist-01",
                "amount": "997",
                "expiration_date": "2099-12-31T00:00:00.000Z",
                "status": "PAID",
                "payment_method": "CREDIT_CARD",
                "payment_code": null
            }]
        }
    });
});

// 4. Rota de Login (POST) - GERA TOKEN VIP OU COMUM
app.post('/sessions', (req, res) => {
    const emailLogin = req.body.email || "";
    console.log(`[LOGIN] Tentativa: ${emailLogin}`);

    // Verifica se é VIP baseado no email retornado no passo anterior
    let isVip = (emailLogin === "admin@vip.com");
    let tokenType = isVip ? "VIP" : "STD";

    res.json({
        "access_token": `TOKEN_${tokenType}_VITALICIO_SECURE`, // O Token carrega a marca
        "refreshToken": "REFRESH_TOKEN_FAKE",
        "session": {
            "id": "sess-" + Date.now(),
            "startedOn": new Date().toISOString(),
            "expiresOn": "2099-12-31T23:59:59.000Z",
            "status": "ACTIVE",
            "user": {
                "id": "user-" + tokenType,
                "name": isVip ? "Membro VIP" : "Membro Pessoal",
                "email": emailLogin
            }
        }
    });
});

// 5. Rota de Flags (Configurações)
app.get('/flags/tenant/*', (req, res) => {
    res.json([
        { "id": "uuid-1", "key": "SUPPORT_ACTION", "value": true, "projectId": "pid-1" },
        { "id": "uuid-2", "key": "BACKUP_LOADING_PAGE", "value": true, "projectId": "pid-1" },
        { "id": "uuid-3", "key": "LOGIN_V2", "value": true, "projectId": "pid-1" },
        { "id": "uuid-4", "key": "REMEMBER_SUBSCRIPTION", "value": true, "projectId": "pid-1" }
    ]);
});

// --- 6. ROTA DE BACKUP (ENTREGA CONDICIONAL) ---
app.get('/backup', (req, res) => {
    // Pega o token enviado pela extensão
    const authHeader = req.headers.authorization || "";
    
    // Se o token tiver a marca "VIP", entrega o ouro
    if (authHeader.includes("VIP")) {
        console.log("[API] Cliente VIP: Entregando Funis do Produtor");
        res.json(CATALOGO_FUNIS);
    } else {
        // Se não, entrega lista vazia
        console.log("[API] Cliente Comum: Entregando Painel Vazio");
        res.json([]);
    }
});

// 7. Rotas "Placeholder"
app.get('/funnels', (req, res) => res.json([]));
app.get('/audios', (req, res) => res.json([]));
app.get('/messages', (req, res) => res.json([]));
app.get('/medias', (req, res) => res.json([]));

app.get('/', (req, res) => res.send('<h1>SERVIDOR OTIMIZADO (VIP/STD) 🟢</h1>'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
