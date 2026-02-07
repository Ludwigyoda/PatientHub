import prisma from "../lib/prisma";

export async function getProfileService(patientId) {
    const patient = await prisma.patient.findUnique({
        where: { id: patientId },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            profile: true,
            settings: true,
            emailVerified: true,
            termsAccepted: true,
            createdAt: true,
            updatedAt: true,
        }
    });
    if (!patient) throw new Error("Patient non trouvé");
}
return patient
