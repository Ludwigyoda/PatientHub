import prisma from "../lib/prisma.js";
import CategoryService from "./category.service.js";

const ToolService = {
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
        if (!tool) throw new Error("Outil introuvable");
        return tool;
    },

    create: async (data) => {
        const { name, categoryId, type, config, isFree, order } = data;

        if (!name?.trim()) throw new Error("Le nom est obligatoire");
        if (!categoryId) throw new Error("La catégorie est obligatoire");
        if (!type) throw new Error("Le type est obligatoire");

        await CategoryService.getOne(categoryId);

        return prisma.tool.create({
            data: {
                name: name.trim(),
                categoryId,
                type,
                config: config ?? {},
                isFree: isFree ?? true,
                order: order != null ? Number(order) : 0
            }
        });
    },

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
};

export default ToolService;