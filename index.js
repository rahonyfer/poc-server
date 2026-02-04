const express = require('express');
const cors = require('cors');
const app = express();

// 1. Configurações: Liberar acesso para todos (CORS)
app.use(cors());
app.use(express.json());

// 2. O Payload Mágico (A Licença Fabricada)
const PAYLOAD_VITALICIO = {
    // --- Para a versão Nova (V2) ---
    "user_token": "f2ba10de-e001-4b77-89fe-9e7575de20c8", // ID Real da Bruna (Para carregar os vídeos)
    "access_token": "TOKEN_AUDITORIA_FAKE_VITALICIO",     // Token Falso (Para provar a falha)
    "refresh_token": "REFRESH_TOKEN_FAKE",
    
    // --- Para a versão Antiga (WhatsApp/V1) ---
    "email": "auditoria@maximizemkt.com.br",
    "access": [{
        "key": "f2ba10de-e001-4b77-89fe-9e7575de20c8",
        "status": "ACTIVE", // <--- O Pulo do Gato: Status Ativo Forçado
        "expirationDate": "2099-12-31T23:59:59.000Z",
        "paidAt": "2024-01-01T00:00:00.000Z",
        "tenant": {
            "id": "fake-server-id",
            "name": "SERVIDOR PIRATA (POC)", // Isso vai aparecer na tela da extensão
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
    
    // --- Dados de Usuário ---
    "user_data": {
        "id": "auditoria-user",
        "name": "Hacker Easypanel",
        "email": "auditoria@maximizemkt.com.br",
        "plan": { "status": "active", "name": "lifetime" }
    }
};

// 3. Rota que a extensão chama
app.get('/extension/verify/:id', (req, res) => {
    console.log(`[ALERTA] Recebida verificação para o ID: ${req.params.id}`);
    res.json(PAYLOAD_VITALICIO);
});

// 4. Rota Raiz (Para você testar no navegador)
app.get('/', (req, res) => {
    res.send('<h1>SERVIDOR PIRATA ONLINE 🏴‍☠️</h1><p>Status: Rodando no Easypanel</p>');
});

// 5. Iniciar Servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
