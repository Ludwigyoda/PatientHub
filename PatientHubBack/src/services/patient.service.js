import prisma from "../prisma/prisma.js";
import bcrypt from 'bcrypt';

const PatientService = {
    getAll: async () => {
        return prisma.patient.findMany({
            where: { deletedAt: null },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true
            }
        });
    },

    getOne: async (id) => {
        const patient = await prisma.patient.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                profile: true,
                settings: true,
                createdAt: true
            }
        });

        if (!patient || patient.deletedAt) {
            throw new Error("Patient introuvable");
        }

        return patient;
    },

    update: async (id, data) => {
        const { name, email, password, profile, settings } = data;
        const updateData = {};

        if (name !== undefined) updateData.name = name.trim();
        if (email !== undefined) updateData.email = email.trim();
        if (profile !== undefined) updateData.profile = profile;
        if (settings !== undefined) updateData.settings = settings;
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        return prisma.patient.update({
            where: { id },
            data: updateData,
            select: {
                id: true,
                email: true,
                name: true,
                updatedAt: true
            }
        });
    },

    remove: async (id) => {
        return prisma.patient.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
    }
};

export default PatientService;
