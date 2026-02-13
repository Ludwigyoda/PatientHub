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

    
};

export default ToolController;