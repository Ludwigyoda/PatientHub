import ToolService from "../services/tool.service.js";

const ToolController = {
    getAll: async (req, res) => {
        try {
            const malisteValue = await ToolService.getAll();
            res.json(malisteValue);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getOne: async (req, res) => {
        try {
            const tool = await ToolService.getOne(req.params.id);
            res.json(tool);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const newTool = await ToolService.create(req.body);
            res.status(200).json(newTool);
        } catch (error) {
            res.status(400).json({ error: "Probleme creation outil" });
        }
    },

    update: async (req, res) => {
        try {
            const updatedTool = await ToolService.update(req.params.id, req.body);
            res.json(updatedTool);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    remove: async (req, res) => {
        try {
            await ToolService.remove(req.params.id);
            res.json({ message: "Outil supprimé" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

export default ToolController;