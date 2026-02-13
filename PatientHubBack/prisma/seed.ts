import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  //Protocole Post-Op Externe
  const postOpGeneral = await prisma.category.upsert({
    where: { name: 'Post-Op Externe' },
    update: {},
    create: {
      name: 'Post-Op Externe',
    },
  })

  await prisma.tool.createMany({
    data: [
    
      {
        name: 'Note Externee',
        type: 'NOTE_GENERAL',
        config: {
          fields: [
            {
              key: 'painScore',
              type: 'slider',
              label: 'Douleur globale',
              min: 0,
              max: 10,
            },
            {
              key: 'comment',
              type: 'text',
              label: 'Commentaire Externe',
            },
          ],
        },
        categoryId: postOpGeneral.id,
        isFree: true,
      },
      // Respiration 
      {
        name: 'Respiration / Toux (audio)',
        type: 'AUDIO',
        config: {
          mode: 'breathing_and_cough',
          maxDurationSeconds: 30, // test a chang
        },
        categoryId: postOpGeneral.id,
        isFree: true,
      },
      // Plaie / cicatrice av P--
      {
        name: 'Plaie / Cicatrice (photo)',
        type: 'PHOTO',
        config: {
          overlayPrevious: true,
          analyzeRedness: true,
          allowNotes: true,
        },
        categoryId: postOpGeneral.id,
        isFree: true,
      },
      // Selles: photo uniquement 
      {
        name: 'Selles (photo)',
        type: 'PHOTO',
        config: {
          subject: 'stool',
          allowBristolTag: true,
        },
        categoryId: postOpGeneral.id,
        isFree: true,
      },
      // Sommeil / bruit nocturne 
      {
        name: 'Sommeil / Bruit nocturne',
        type: 'AUDIO',
        config: {
          mode: 'sleep_noise',
          maxDurationSeconds: 60, //aussi test a changer
        },
        categoryId: postOpGeneral.id,
        isFree: true,
      },
    ],
    skipDuplicates: true,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })