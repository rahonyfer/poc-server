const express = require('express');
const cors = require('cors');
const app = express();

// 1. Configurações: Liberar acesso para todos (CORS)
app.use(cors());
app.use(express.json());

// 2. O Payload Mágico (A Licença Fabricada para a verificação)
const PAYLOAD_VITALICIO = {
    "user_token": "f2ba10de-e001-4b77-89fe-9e7575de20c8", 
    "access_token": "TOKEN_AUDITORIA_FAKE_VITALICIO",      
    "refresh_token": "REFRESH_TOKEN_FAKE",
    
    "email": "auditoria@mps.com.br",
    "access": [{
        "key": "f2ba10de-e001-4b77-89fe-9e7575de20c8",
        "status": "ACTIVE",
        "expirationDate": "2099-12-31T23:59:59.000Z",
        "paidAt": "2024-01-01T00:00:00.000Z",
        "tenant": {
            "id": "fake-server-id",
            "name": "SERVIDOR PIRATA (POC)",
            "extensionId": "hgbfklcmhokdpgdfmlfimfnfabnomekg",
            "logo": "https://cdn-icons-png.flaticon.com/512/1000/1000997.png"
        },
        "subscription": [{
            "status": "ACTIVE",
            "expiration_date": "2099-12-31T23:59:59.000Z",
            "start_date": "2024-01-01T00:00:00.000Z",
            "history": []
        }]
    }],
    
    "user_data": {
        "id": "auditoria-user",
        "name": "Hacker Easypanel",
        "email": "auditoria@mps.com.br",
        "plan": { "status": "active", "name": "lifetime" }
    }
};

// 3. Rota de Verificação (Já existia)
app.get('/extension/verify/:id', (req, res) => {
    console.log(`[VERIFICACAO] ID consultado: ${req.params.id}`);
    res.json(PAYLOAD_VITALICIO);
});

// 4. NOVA ROTA: LOGIN (/sessions) - O que faltava!
app.post('/sessions', (req, res) => {
    console.log("[LOGIN] Tentativa de login recebida em /sessions");
    console.log("Dados recebidos:", req.body);

    // Resposta padrão de sucesso para qualquer login
    res.json({
        token: "fake-jwt-token-bypass-123456",
        user: {
            id: "f2ba10de-e001-4b77-89fe-9e7575de20c8", // Mesmo ID do payload
            name: "Usuario Liberado",
            email: req.body.email || "bypass@email.com",
            phoneNumber: "5511999999999",
            status: "active"
        },
        subscription: {
            status: "ACTIVE",
            plan: "unlimited",
            expiration_date: "2099-12-31T23:59:59.000Z"
        }
    });
});

// 5. Rota Raiz
app.get('/', (req, res) => {
    res.send('<h1>SERVIDOR PIRATA ONLINE 🏴‍☠️</h1><p>Rotas ativas: /extension/verify e /sessions</p>');
});

// 6. Iniciar Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
