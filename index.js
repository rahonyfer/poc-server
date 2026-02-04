const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Dados da Licença Vitalícia (Reutilizáveis)
const ACCESS_DATA = [{
    "key": "f2ba10de-e001-4b77-89fe-9e7575de20c8",
    "status": "ACTIVE", // O segredo está aqui
    "expirationDate": "2099-12-31T23:59:59.000Z",
    "paidAt": "2024-01-01T00:00:00.000Z",
    "tenant": {
        "id": "fake-server-id",
        "name": "SERVIDOR PIRATA",
        "extensionId": "hgbfklcmhokdpgdfmlfimfnfabnomekg"
    },
    "subscription": [{
        "status": "ACTIVE",
        "expiration_date": "2099-12-31T23:59:59.000Z",
        "start_date": "2024-01-01T00:00:00.000Z",
        "history": []
    }]
}];

// Rota de Verificação (GET) - Mantém o cadeado verde
app.get('/extension/verify/:id', (req, res) => {
    console.log(`[VERIFICACAO] ID: ${req.params.id}`);
    res.json({
        "user_token": "f2ba10de-e001-4b77-89fe-9e7575de20c8",
        "access_token": "TOKEN_AUDITORIA_FAKE_VITALICIO",
        "refresh_token": "REFRESH_TOKEN_FAKE",
        "email": "auditoria@mps.com.br",
        "access": ACCESS_DATA,
        "user_data": {
            "id": "auditoria-user",
            "name": "Hacker Easypanel",
            "email": "auditoria@mps.com.br",
            "plan": { "status": "active", "name": "lifetime" }
        }
    });
});

// Rota de Login (POST) - A "Bomba Atômica" que corrige o Token Inválido
app.post('/sessions', (req, res) => {
    console.log("[LOGIN] Tentativa em /sessions");
    
    // Enviamos TUDO para garantir que a extensão aceite
    res.json({
        "token": "fake-jwt-token-bypass-123456",
        "access_token": "TOKEN_AUDITORIA_FAKE_VITALICIO", // A extensão procura isso!
        "user_token": "f2ba10de-e001-4b77-89fe-9e7575de20c8",
        "refresh_token": "REFRESH_TOKEN_FAKE",
        
        // Dados do Usuário
        "user": {
            "id": "f2ba10de-e001-4b77-89fe-9e7575de20c8",
            "name": "Usuario Liberado",
            "email": req.body.email || "bypass@email.com",
            "phoneNumber": "5511999999999",
            "status": "active"
        },
        
        // Dados de Assinatura
        "subscription": {
            "status": "ACTIVE",
            "plan": "unlimited",
            "expiration_date": "2099-12-31T23:59:59.000Z"
        },
        
        // Dados da Licença (Essencial)
        "access": ACCESS_DATA
    });
});

// Rota de Flags (O que estava dando erro 404)
app.get('/flags/tenant/:id', (req, res) => {
    console.log(`[FLAGS] Verificação de flags recebida para: ${req.params.id}`);
    
    // Responde com uma lista de funcionalidades ativas para enganar a extensão
    res.json([
        { "name": "all_features", "enabled": true },
        { "name": "beta_access", "enabled": true },
        { "name": "unlimited_messages", "enabled": true }
    ]);
});

app.get('/', (req, res) => res.send('<h1>SERVIDOR PIRATA ONLINE 🏴‍☠️</h1>'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
