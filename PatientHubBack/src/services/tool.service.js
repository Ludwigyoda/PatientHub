import prisma from "../../prisma/prisma.js";
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
    // ce serais bien mais pas possible 
    // create: async (data) => {
    //     const { name, categoryId, type, config } = data;

    //     if (!name || !categoryId || !type) {
    //         throw new Error("Champs obligatoires manquants");
    //     }

    //     return prisma.tool.create({
    //         data: {
    //             name: name.trim(),
    //             categoryId,
    //             type,
    //             config: config || {},
    //             isFree: data.isFree ?? true
    //         }
    //     });
    // },

    update: async (id, data) => {
        await ToolService.getOne(id);
        const { name, categoryId, type, config, isFree, order } = data;
        const updateData = {};

        if (name !== undefined) updateData.name = name.trim();
        if (categoryId !== undefined) {
            await CategoryService.getOne(categoryId);
            updateData.categoryId = categoryId;
        }
        if (type !== undefined) updateData.type = type;
        if (config !== undefined) updateData.config = config;
        if (isFree !== undefined) updateData.isFree = isFree;
        if (order !== undefined) updateData.order = Number(order);

        return prisma.tool.update({
            where: { id },
            data: updateData
        });
    },
    remove: async (id) => {
        await ToolService.getOne(id);
        return prisma.tool.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
    }
}

export default ToolService;