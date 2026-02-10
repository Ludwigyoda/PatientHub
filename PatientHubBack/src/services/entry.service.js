import prisma from "../prisma/prisma.js";
import ToolService from "./tool.service.js";

const EntryService = {
    getAllByPatient: async (patientId) => {
        return prisma.entry.findMany({
            where: { patientId, deletedAt: null },
            orderBy: { measuredAt: "desc" },
            include: { tool: true }
        });
    },

    getOne: async (id) => {
        const entry = await prisma.entry.findFirst({
            where: { id, deletedAt: null },
            include: { tool: true }
        });
        if (!entry) throw new Error("Entrée introuvable");
        return entry;
    },

    create: async (data, patientId) => {
        const { toolId, data: entryData, measuredAt } = data;

        if (!toolId) throw new Error("L'outil est obligatoire");
        if (!entryData) throw new Error("Les données sont obligatoires");

        await ToolService.getOne(toolId);

        return prisma.entry.create({
            data: {
                patientId,
                toolId,
                data: entryData,
                measuredAt: measuredAt ? new Date(measuredAt) : new Date()
            }
        });
    },

    update: async (id, data, patientId) => {
        const entry = await EntryService.getOne(id);

        if (entry.patientId !== patientId) {
            throw new Error("Accès interdit à cette entrée");
        }

        const { data: entryData, measuredAt } = data;
        const updateData = {};

        if (entryData !== undefined) updateData.data = entryData;
        if (measuredAt !== undefined) updateData.measuredAt = new Date(measuredAt);

        return prisma.entry.update({
            where: { id },
            data: updateData
        });
    },

    remove: async (id, patientId) => {
        const entry = await EntryService.getOne(id);

        if (entry.patientId !== patientId) {
            throw new Error("Accès interdit à cette entrée");
        }

        return prisma.entry.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
    }
};

export default EntryService;
