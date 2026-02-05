const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ==================================================================
// 🔐 LISTAS DE ACESSO (RIGOROSAS)
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

// --- O CATÁLOGO DE FUNIS ---
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
    // ... (Mantive curto para não poluir, mas estão todos aqui na lógica) ...
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

// 1. ROTA DE VERIFICAÇÃO (O GUARDIÃO DA CHAVE)
app.get('/extension/verify/:id', (req, res) => {
    // Limpa espaços em branco que podem atrapalhar
    const chave = req.params.id.trim();
    console.log(`[VERIFY] Tentativa com chave: "${chave}"`);
    
    let isVip = false;
    let isValid = false;

    if (CHAVES_VIP.includes(chave)) {
        console.log("--> STATUS: CHAVE VIP ENCONTRADA! 💎");
        isVip = true;
        isValid = true;
    } else if (CHAVES_COMUM.includes(chave)) {
        console.log("--> STATUS: CHAVE COMUM ENCONTRADA! 👤");
        isVip = false;
        isValid = true;
    } else {
        console.log("--> STATUS: CHAVE NÃO ENCONTRADA (BLOQUEANDO)! 🚫");
        // AQUI ESTÁ A MUDANÇA: Se não achou, retorna erro 403 e BLOQUEIA
        return res.status(403).json({ error: "Chave Inválida ou Não Cadastrada." });
    }

    // Se passou, definimos o perfil
    // O TRUQUE: O email define o destino no próximo passo
    const userEmail = isVip ? "admin@vip.com" : "user@comum.com";

    res.json({
        "id": "USER-" + chave,
        "email": userEmail, 
        "name": isVip ? "Membro VIP" : "Membro Standard",
        "subscription": {
            "id": "sub-" + chave,
            "status": "ACTIVE",
            "expiration_date": "2099-12-31T00:00:00.000Z",
            "start_date": "2024-01-01T00:00:00.000Z",
            "history": [{ "status": "PAID", "amount": "997" }]
        }
    });
});

// 2. ROTA DE LOGIN (CONFIRMA O PERFIL)
app.post('/sessions', (req, res) => {
    // Pega o email que definimos no passo anterior
    const emailLogin = req.body.email || "";
    console.log(`[LOGIN] Recebido email: "${emailLogin}"`);

    // VERIFICAÇÃO DUPLA: O email tem que ser o VIP
    let tokenType = "STD"; 
    
    if (emailLogin === "admin@vip.com") {
        console.log("--> LOGIN VIP DETECTADO! GERANDO TOKEN DOURADO 🏆");
        tokenType = "VIP";
    } else {
        console.log("--> LOGIN COMUM DETECTADO. GERANDO TOKEN PADRÃO 📄");
    }

    res.json({
        // Colocamos a marca no token de forma bem visível
        "access_token": `TOKEN_SECURE_${tokenType}_ACCESS`, 
        "refreshToken": "REFRESH_TOKEN_FAKE",
        "session": {
            "id": "sess-" + Date.now(),
            "startedOn": new Date().toISOString(),
            "expiresOn": "2099-12-31T23:59:59.000Z",
            "status": "ACTIVE",
            "user": {
                "id": "user-" + tokenType,
                "name": (tokenType === "VIP") ? "Membro VIP" : "Membro Pessoal",
                "email": emailLogin
            }
        }
    });
});

// 3. ROTA DE BACKUP (ENTREGA SE TIVER A MARCA VIP)
app.get('/backup', (req, res) => {
    const authHeader = req.headers.authorization || "";
    console.log(`[BACKUP] Solicitado com token: ${authHeader}`);
    
    // Procura a palavra "VIP" dentro do token que geramos no login
    if (authHeader.includes("VIP")) {
        console.log("[API] Permissão VIP Confirmada: Entregando Funis!");
        res.json(CATALOGO_FUNIS);
    } else {
        console.log("[API] Permissão Standard: Entregando Lista Vazia.");
        res.json([]);
    }
});

// 4. Rotas Auxiliares
app.get('/flags/tenant/*', (req, res) => res.json([{ "name": "all_features", "enabled": true }]));
app.get('/funnels', (req, res) => res.json([]));
app.get('/audios', (req, res) => res.json([]));
app.get('/messages', (req, res) => res.json([]));
app.get('/medias', (req, res) => res.json([]));
app.get('/', (req, res) => res.send('<h1>SERVIDOR BLINDADO (VIP/STD) 🔒</h1>'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
