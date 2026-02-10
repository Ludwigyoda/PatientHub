import prisma from "../prisma/prisma.js";
// code pas fonctionnelle
async function runSeed() {
    console.log('Seed lancé');


    let postOp = await prisma.category.findUnique({
        where: { name: 'Post-Opératoire' }
    }
    );


    if (!postOp) {
        postOp = await prisma.category.create({
            data: { name: 'Post-Opératoire' }
        });
        console.log('Categorie cree');
    }

    // Outils pour la categorie Post-Op
    // On check si Douleur existe
    const toolDouleur = await prisma.tool.findFirst({
        where: { name: 'Douleur', categoryId: postOp.id }
    });
    if (!toolDouleur) {
        await prisma.tool.create({
            data: {
                name: 'Douleur',
                categoryId: postOp.id,
                type: 'NOTE_GENERAL',
                isFree: false,
                config: {
                    info: "Notez votre niveau de douleur 0 à 10.",
                    placeholder: "Où avez-vous mal ?" //faire un choix direct ? ou choisir a la création du module
                }
            }
        });
    }

    //Tool plaie Test front hybrid data drive
    const toolPlaie = await prisma.tool.findFirst({
        where: { name: 'Plaie', categoryId: postOp.id }
    });
    if (!toolPlaie) {
        await prisma.tool.create({
            data: {
                name: 'Plaie',
                categoryId: postOp.id,
                type: 'PHOTO',
                isFree: false,
                config: {
                    info: "Prenez une photo de votre blessure ou cicatrice.",
                    overlay: true
                }
            }
        });
    }


    const toolToux = await prisma.tool.findFirst({
        where: { name: 'Analyse Toux', categoryId: postOp.id }
    });
    if (!toolToux) {
        await prisma.tool.create({
            data: {
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
    }


    let modeLibre = await prisma.category.findUnique({
        where: { name: 'Libre' }
    });
    if (!modeLibre) {
        modeLibre = await prisma.category.create({
            data: { name: 'Libre' }
        });

    }

    const freeTools = ['Poids', 'Fatigue', 'Humeur'];
    for (let i = 0; i < freeTools.length; i++) {
        const t = freeTools[i];
        const exists = await prisma.tool.findFirst({
            where: { name: t, categoryId: modeLibre.id }
        });
        if (!exists) {
            await prisma.tool.create({
                data: {
                    name: t,
                    categoryId: modeLibre.id,
                    type: 'NOTE_GENERAL',
                    isFree: true,
                    config: { info: `Suivi de : ${tool}` }
                }
            });
        }

        console.log('Seed finiee !');
    };
};
