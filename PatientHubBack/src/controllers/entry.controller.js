import EntryService from "../services/entry.service.js";

const EntryController = {
    getAll: async (req, res) => {
        try {
            const entries = await EntryService.getAllByPatient(req.user.id);
            res.json(entries);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

 

    create: async (req, res) => {
        try {
            const newEntry = await EntryService.create(req.body, req.user.id);
            res.status(201).json(newEntry);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

}

export default EntryController;
