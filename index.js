const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

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

// 2. DADOS DA CONTA (Vamos manter a da Bruna para liberar o login no painel)
const USER_ID = "39c9def5-e7c1-43f3-bca1-b4a4d01df25c";
const EMAIL = "eubruninharibeiro@gmail.com";
const NAME = "Bruna Silva Ribeiro";

// 3. Rota de Verificação (GET)
app.get('/extension/verify/:id', (req, res) => {
    console.log(`[VERIFICACAO] ID consultado: ${req.params.id}`);
    res.json({
        "id": USER_ID,
        "email": EMAIL,
        "name": NAME,
        "subscription": {
            "id": "865279c3-7385-4fdc-8abe-7f8f6f842e6e",
            "status": "ACTIVE",
            "expiration_date": "2099-12-31T00:00:00.000Z",
            "start_date": "2024-11-07T00:00:00.000Z",
            "history": [{
                "id": "690a2c1c-2179-4214-8600-0e01ba250f71",
                "amount": "57",
                "expiration_date": "2099-12-31T00:00:00.000Z",
                "status": "PAID",
                "payment_method": "CREDIT_CARD",
                "payment_code": null
            }]
        }
    });
});

// 4. Rota de Login (POST)
app.post('/sessions', (req, res) => {
    console.log("[LOGIN] Tentativa recebida");
    res.json({
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzOWM5ZGVmNS1lN2MxLTQzZjMtYmNhMS1iNGE0ZDAxZGYyNWMiLCJzaWQiOiJkNDY5MzNkMy1jZTIyLTQ4ODQtYjZmYy0yMjM0YTFmZWQ1NWIiLCJzZXNzaW9uIjp7ImlkIjoiZDQ2OTMzZDMtY2UyMi00ODg0LWI2ZmMtMjIzNGExZmVkNTViIiwic3RhcnRlZE9uIjoiMjAyNi0wMi0wNFQyMzoxNTozNy41MTlaIiwiZXhwaXJlc09uIjoiMjA5OS0xMi0zMVQyMzoxNTozNy41MTlaIiwic3RhdHVzIjoiQUNUSVZFIiwidXNlciI6eyJpZCI6IjM5YzlkZWY1LWU3YzEtNDNmMy1iY2ExLWI0YTRkMDFkZjI1YyIsIm5hbWUiOiJCcnVuYSBTaWx2YSBSaWJlaXJvIiwiZW1haWwiOiJldWJydW5pbmhhcmliZWlyb0BnbWFpbC5jb20ifX0sImdyYW50VHlwZSI6InJlZnJlc2gtdG9rZW4iLCJpYXQiOjE3NzAyNDY5MzcsImV4cCI6MTc3MDI5MDEzN30.zokcA0YfquMOaAP0vAXrgkazVl5SixlB8QThyI73JsM",
        "refreshToken": "c1c2b2b040f79cceb06157b86d97e0208ec7200487322d4359eca32ae6b9f305",
        "session": {
            "id": "d46933d3-ce22-4884-b6fc-2234a1fed55b",
            "startedOn": "2026-02-04T23:15:37.519Z",
            "expiresOn": "2099-12-31T23:15:37.519Z",
            "status": "ACTIVE",
            "user": { "id": USER_ID, "name": NAME, "email": EMAIL }
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

// --- 6. ROTA DE BACKUP (AQUI ESTÁ O SEGREDO) ---
// Quando a extensão pedir '/backup', seu servidor entrega a lista que você pegou.
app.get('/backup', (req, res) => {
    console.log("[API] Entregando Catálogo de Funis (Hospedado Localmente)");
    res.json(CATALOGO_FUNIS);
});

// 7. Rotas "Placeholder" para evitar erros no Console (lista vazia para o que não temos)
app.get('/funnels', (req, res) => res.json([]));
app.get('/audios', (req, res) => res.json([]));
app.get('/messages', (req, res) => res.json([]));
app.get('/medias', (req, res) => res.json([]));

app.get('/', (req, res) => res.send('<h1>SERVIDOR ATIVO E CARREGADO COM FUNIS 🏴‍☠️</h1>'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
