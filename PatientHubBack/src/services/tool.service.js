import prisma from "../prisma/prisma.js";
import CategoryService from "./category.service.js";

const ToolService = {
    // 2 phase 1 tout le monde a les même outils puis on affine
    getAll: async () => {
        return prisma.tool.findMany({
            where: { deletedAt: null },
            orderBy: { order: "asc" },
            include: { category: true }
        });
    },

    getOne: async (id) => {
        const tool = await prisma.tool.findFirst({
            where: { id, deletedAt: null },
            include: { category: true }
        });
        if (!tool) throw new Error("Outil non trouvé");
        return tool;
    },

}

export default ToolService;
