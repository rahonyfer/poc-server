const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 1. Dados Reais da Bruna (Extraídos do seu log)
const USER_ID = "39c9def5-e7c1-43f3-bca1-b4a4d01df25c";
const EMAIL = "eubruninharibeiro@gmail.com";
const NAME = "Bruna Silva Ribeiro";

// 2. Rota de Verificação (GET)
app.get('/extension/verify/:id', (req, res) => {
    console.log(`[VERIFICACAO] ID consultado: ${req.params.id}`);
    res.json({
        "id": USER_ID,
        "email": EMAIL,
        "name": NAME,
        "subscription": {
            "id": "865279c3-7385-4fdc-8abe-7f8f6f842e6e",
            "status": "ACTIVE",
            "expiration_date": "2099-12-31T00:00:00.000Z", // Extendida para vitalícia
            "start_date": "2024-11-07T00:00:00.000Z",
            "history": [
                {
                    "id": "690a2c1c-2179-4214-8600-0e01ba250f71",
                    "amount": "57",
                    "expiration_date": "2099-12-31T00:00:00.000Z",
                    "status": "PAID",
                    "payment_method": "CREDIT_CARD",
                    "payment_code": null
                }
            ]
        }
    });
});

// 3. Rota de Login (POST)
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
            "user": {
                "id": USER_ID,
                "name": NAME,
                "email": EMAIL
            }
        }
    });
});

// 4. Rota de Flags (Configurações)
app.get('/flags/tenant/*', (req, res) => {
    res.json([
        { "id": "441bd164-e282-4876-850b-3bd0ac88189c", "key": "SUPPORT_ACTION", "value": true, "projectId": "f9bb264b-8c15-448c-952f-517207a75fd3" },
        { "id": "7384a85d-699b-4ed5-8096-a09fbe3d38b7", "key": "BACKUP_LOADING_PAGE", "value": true, "projectId": "f9bb264b-8c15-448c-952f-517207a75fd3" },
        { "id": "bd0b4f62-c584-4c35-bd2a-1c29b96f0ff7", "key": "LOGIN_V2", "value": true, "projectId": "f9bb264b-8c15-448c-952f-517207a75fd3" },
        { "id": "d089da39-111d-4129-bc13-3a6dcdf31a26", "key": "REMEMBER_SUBSCRIPTION", "value": true, "projectId": "f9bb264b-8c15-448c-952f-517207a75fd3" }
    ]);
});

app.get('/', (req, res) => res.send('<h1>SERVIDOR ATUALIZADO (BRUNA) 🟢</h1>'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
