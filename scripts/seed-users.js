/**
 * seed-users.js
 *
 * Provisiona os usuários de teste necessários para a mentoria.
 * Garante que os perfis admin, manager e user existam com as credenciais
 * corretas, independentemente do estado atual do banco de dados.
 *
 * Uso:
 *   npm run seed:users           → cria/atualiza os usuários
 *   npm run seed:users:dry       → lista o que seria feito, sem alterar nada
 *
 * Executado automaticamente pelo setup.sh na configuração inicial do projeto.
 */

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/ecommerce-api';

// ─── Usuários de teste da mentoria ────────────────────────────────────────────

const SEED_USERS = [
    {
        name: 'Admin Mentoria',
        email: 'admin@mentoria.com',
        password: 'Admin@123',
        role: 'admin',
    },
    {
        name: 'Manager Mentoria',
        email: 'manager@mentoria.com',
        password: 'Manager@123',
        role: 'manager',
    },
    {
        name: 'User Mentoria',
        email: 'user@mentoria.com',
        password: 'User@123',
        role: 'user',
    },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const isDryRun = process.argv.includes('--dry');

async function upsertUser(collection, userData) {
    const { name, email, password, role } = userData;

    if (isDryRun) {
        console.log(`  [dry-run] Verificaria: ${email} (role: ${role})`);
        return;
    }

    const hash = await bcrypt.hash(password, 12);
    const existing = await collection.findOne({ email });

    if (existing) {
        await collection.updateOne(
            { email },
            { $set: { name, password: hash, role, active: true, updatedAt: new Date() } }
        );
        console.log(`  ✔ Atualizado: ${email} → role=${role}`);
    } else {
        await collection.insertOne({
            name,
            email,
            password: hash,
            role,
            active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        console.log(`  ✔ Criado:     ${email} → role=${role}`);
    }
}

// ─── Execução ─────────────────────────────────────────────────────────────────

async function run() {
    console.log('\n Seed de Usuários da Mentoria');
    console.log('─'.repeat(40));

    if (isDryRun) {
        console.log('Modo: dry-run (nenhuma alteração será feita)\n');
    }

    await mongoose.connect(DB_URI);
    console.log(`Conectado ao MongoDB: ${DB_URI}\n`);

    const collection = mongoose.connection.db.collection('users');

    for (const user of SEED_USERS) {
        await upsertUser(collection, user);
    }

    if (!isDryRun) {
        console.log('\n✅ Seed concluído com sucesso!');
        console.log('─'.repeat(40));
        console.log('Credenciais disponíveis:');
        SEED_USERS.forEach(({ email, password, role }) => {
            console.log(`  ${role.padEnd(8)} → ${email} / ${password}`);
        });
    }

    console.log('');
    await mongoose.disconnect();
    process.exit(0);
}

run().catch((err) => {
    console.error('\n❌ Erro ao executar seed:', err.message);
    process.exit(1);
});
