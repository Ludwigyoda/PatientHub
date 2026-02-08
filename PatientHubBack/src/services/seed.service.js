import prisma from '../lib/prisma.js';

/**
 * Script de remplissage de la base de données (Seed)
 * Permet de créer les catégories et outils par défaut pour PatientHub.
 */
async function runSeed() {
    console.log('--- Initialisation des données ---');

    // 1. Catégorie Post-Op (Les outils indispensables après une chirurgie)
    const postOp = await prisma.category.upsert({
        where: { name: 'Post-Opératoire' },
        update: {},
        create: { name: 'Post-Opératoire' }
    });

    await prisma.tool.upsert({
        where: { name_categoryId: { name: 'Douleur', categoryId: postOp.id } },
        update: {},
        create: {
            name: 'Douleur',
            categoryId: postOp.id,
            type: 'NOTE_GENERAL',
            isFree: false,
            config: {
                info: "Notez votre niveau de douleur (0 à 10).",
                placeholder: "Où avez-vous mal précisément ?"
            }
        }
    });

    await prisma.tool.upsert({
        where: { name_categoryId: { name: 'Plaie', categoryId: postOp.id } },
        update: {},
        create: {
            name: 'Plaie',
            categoryId: postOp.id,
            type: 'PHOTO',
            isFree: false,
            config: {
                info: "Prenez une photo de votre pansement ou cicatrice.",
                overlay: true
            }
        }
    });

    await prisma.tool.upsert({
        where: { name_categoryId: { name: 'Analyse Toux', categoryId: postOp.id } },
        update: {},
        create: {
            name: 'Analyse Toux',
            categoryId: postOp.id,
            type: 'AUDIO',
            isFree: false,
            config: {
                maxSec: 30,
                info: "Enregistrez votre toux dans un endroit calme."
            }
        }
    });

    // 2. Mode Libre (Outils génériques pour tout le monde)
    const modeLibre = await prisma.category.upsert({
        where: { name: 'Libre' },
        update: {},
        create: { name: 'Libre' }
    });

    // On ajoute des outils simples au mode libre
    const freeTools = ['Poids', 'Fatigue', 'Humeur'];
    for (const tool of freeTools) {
        await prisma.tool.upsert({
            where: { name_categoryId: { name: tool, categoryId: modeLibre.id } },
            update: {},
            create: {
                name: tool,
                categoryId: modeLibre.id,
                type: 'NOTE_GENERAL',
                isFree: true,
                config: { info: `Suivi de : ${tool}` }
            }
        });
    }

    console.log('--- Seed terminé avec succès ! ---');
}

runSeed()
    .catch(e => {
        console.error('Erreur lors du seed :', e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
