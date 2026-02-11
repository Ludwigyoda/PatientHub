import prisma from "../prisma/prisma.js";

const CategoryService = {
    getAll: async () => {
        return prisma.category.findMany({
            where: { deletedAt: null },
            orderBy: { order: "asc" },
            include: { tools: { where: { deletedAt: null }, orderBy: { order: "asc" } } }
        });
    },

    getOne: async (id) => {
        const category = await prisma.category.findFirst({
            where: { id, deletedAt: null },
            include: { tools: { where: { deletedAt: null }, orderBy: { order: "asc" } } }
        });
        if (!category) throw new Error("Catégorie introuvable");
        return category;
    },

    create: async (data) => {
        const { name, order } = data;
        if (!name?.trim()) throw new Error("Le nom est obligatoire");
        return prisma.category.create({
            data: {
                name: name.trim(),
                order: order != null ? Number(order) : 0
            }
        });
    },


};

export default CategoryService;
