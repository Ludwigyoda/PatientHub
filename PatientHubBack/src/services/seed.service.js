import prisma from '../lib/prisma.js';

async function seed() {
    console.log('Démarrage seed database...');

    const modules = [
        {
            name: 'Post-Opératoire',
            tools: [
                {
                    name: 'Douleur',
                    type: 'NOTE_GENERAL',
                    config: {
                        description: "Suivez l'évolution de votre douleur post-opératoire",
                        patientInfo: "Notez votre douleur plusieurs fois par jour, surtout après les repas ou l'activité physique",
                        fields: [
                            { type: 'slider', label: 'Intensité', min: 0, max: 10 },
                            { type: 'text', label: 'Localisation', placeholder: 'Zone concernée' },
                            { type: 'text', label: 'Notes', placeholder: 'Contexte, déclencheurs...' }
                        ]
                    }
                },
                {
                    name: 'Plaie',
                    type: 'PHOTO',
                    config: {
                        description: 'Photographiez votre plaie pour suivre la cicatrisation',
                        patientInfo: "Prenez la photo au même angle et à la même distance. L'overlay vous aide à comparer avec la photo précédente",
                        overlayPrevious: true,
                        overlayOpacity: 0.5,
                        allowDrag: true,
                        showTimeline: true
                    }
                },
                {
                    name: 'Toux analyser',
                    type: 'AUDIO',
                    config: {
                        description: 'Enregistrez votre toux pour suivi respiratoire',
                        patientInfo: 'Enregistrez 2-3 quintes de toux. Essayez de rester dans un environnement calme',
                        maxDuration: 30,
                        showWaveform: true
                    }
                },
                {
                    name: 'Médicaments',
                    type: 'NOTE_GENERAL',
                    config: {
                        description: 'Suivez vos prises de médicaments',
                        patientInfo: 'Notez chaque prise pour éviter les oublis ou doubles doses',
                        fields: [
                            { type: 'text', label: 'Nom', placeholder: 'Médicament' },
                            { type: 'text', label: 'Dosage', placeholder: '500mg' },
                            { type: 'text', label: 'Heure', placeholder: '08:00' }
                        ]
                    }
                }
            ]
        },
        {
            name: 'Chirurgie',
            tools: [
                {
                    name: 'Cicatrice',
                    type: 'PHOTO',
                    config: {
                        description: "Suivez l'évolution de votre cicatrice",
                        patientInfo: "Photographiez votre cicatrice 1 fois par semaine, toujours dans les mêmes conditions d'éclairage",
                        overlayPrevious: true,
                        overlayOpacity: 0.5,
                        analyzeRedness: true
                    }
                },
                {
                    name: 'Drain',
                    type: 'NOTE_GENERAL',
                    config: {
                        description: "Notez le volume et l'aspect du drain",
                        patientInfo: "Mesurez le volume drainé à chaque vidange. Signalez tout changement d'aspect ou d'odeur",
                        fields: [
                            { type: 'text', label: 'Volume', placeholder: 'ml' },
                            { type: 'text', label: 'Aspect', placeholder: 'Couleur, texture' }
                        ]
                    }
                },
                {
                    name: 'Pansement',
                    type: 'NOTE_GENERAL',
                    config: {
                        description: "Notez l'état de votre pansement",
                        patientInfo: "Vérifiez le pansement 2 fois par jour. Changez-le si humide ou décollé",
                        fields: [
                            { type: 'text', label: 'Type', placeholder: 'Compresses, hydrogel...' },
                            { type: 'text', label: 'État', placeholder: 'Propre, suintant...' }
                        ]
                    }
                }
            ]
        }
    ];

    const allTools = [];

    for (const module of modules) {
        const category = await prisma.category.upsert({
            where: { name: module.name },
            update: {},
            create: { name: module.name }
        });

        for (const toolData of module.tools) {
            await prisma.tool.upsert({
                where: {
                    name_categoryId: {
                        name: toolData.name,
                        categoryId: category.id
                    }
                },
                update: {},
                create: {
                    ...toolData,
                    categoryId: category.id,
                    isFree: false
                }
            });

            allTools.push(toolData);
        }
    }

    const libreCategory = await prisma.category.upsert({
        where: { name: 'Libre' },
        update: {},
        create: { name: 'Libre' }
    });

    for (const toolData of allTools) {
        await prisma.tool.upsert({
            where: {
                name_categoryId: {
                    name: toolData.name,
                    categoryId: libreCategory.id
                }
            },
            update: {},
            create: {
                ...toolData,
                categoryId: libreCategory.id,
                isFree: true
            }
        });
    }

    console.log('Seed terminé.');
    console.log(`Modules créés: ${modules.length}`);
    console.log(`Outils totaux: ${allTools.length}`);
    console.log(`Libre: ${allTools.length} outils disponibles`);
}

seed()
    .catch((error) => {
        console.error('Erreur seed:', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
