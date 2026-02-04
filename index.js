const express = require('express');
const cors = require('cors');
const app = express();

// 1. Configurações Iniciais
app.use(cors()); // Permite conexões de qualquer lugar (Extensões, Sites, etc)
app.use(express.json());

// 2. O Payload Mágico (Chaves V1 + V2 para enganar tudo)
const PAYLOAD_VITALICIO = {
    // --- Autenticação V2 (Dashboard/JWT) ---
    "user_token": "f2ba10de-e001-4b77-89fe-9e7575de20c8",
    "access_token": "TOKEN_JWT_AUDITORIA_VITALICIA",
    "refresh_token": "REFRESH_TOKEN_AUDITORIA",
    
    // --- Autenticação V1 (WhatsApp/Legacy) ---
    "email": "auditoria@maximizemkt.com.br",
    "access": [{
        "key": "f2ba10de-e001-4b77-89fe-9e7575de20c8",
        "status": "ACTIVE", // <--- O Segredo do Sucesso
        "expirationDate": "2099-12-31T23:59:59.000Z",
        "paidAt": "2024-01-01T00:00:00.000Z",
        "tenant": {
            "id": "fake-server-id",
            "name": "SERVIDOR PIRATA (NODE.JS)", // Vai aparecer na tela da extensão
            "extensionId": "hgbfklcmhokdpgdfmlfimfnfabnomekg",
            "logo": "https://cdn-icons-png.flaticon.com/512/1000/1000997.png" // Ícone Hacker
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
        "name": "Hacker Node.js",
        "email": "auditoria@maximizemkt.com.br",
        "plan": { "status": "active", "name": "lifetime" }
    }
};

// 3. Rota de Verificação (Simula a API Oficial)
// A extensão chama /extension/verify/{ID}, o :id captura qualquer coisa
app.get('/extension/verify/:id', (req, res) => {
    console.log(`[ALERTA] Recebida verificação para o ID: ${req.params.id}`);
    console.log("[SUCESSO] Respondendo com Licença Vitalícia...");
    res.json(PAYLOAD_VITALICIO);
});

// 4. Rota Raiz (Para testar no navegador se o servidor subiu)
app.get('/', (req, res) => {
    res.send(`
        <div style="font-family: monospace; text-align: center; margin-top: 50px;">
            <h1>🏴‍☠️ SERVIDOR PIRATA (POC) ONLINE</h1>
            <p>Status: <strong>RODANDO</strong></p>
            <p>Rota de API: <code>/extension/verify/{id}</code></p>
            <p style="color: green;">Pronto para validar licenças.</p>
        </div>
    `);
});

// 5. Iniciar o Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
