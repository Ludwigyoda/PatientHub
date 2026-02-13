import CategoryService from "../services/category.service.js";

const CategoryController = {
    getAll: async (req, res) => {
        try {
            const categories = await CategoryService.getAll();
            res.json(categories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getOne: async (req, res) => {
        try {
            const category = await CategoryService.getOne(req.params.id);
            res.json(category);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    create: async (req, res) => {
    try {
        const newCategory = await CategoryService.create(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
},
};

export default CategoryController;
