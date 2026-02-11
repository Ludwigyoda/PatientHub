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

    getOne: async (req, res) => {
        try {
            const entry = await EntryService.getOne(req.params.id);
            if (entry.patientId !== req.user.id && req.user.role !== 'ADMIN') {
                return res.status(403).json({ error: "Accès interdit" });
            }
            res.json(entry);
        } catch (error) {
            res.status(40).json({ error: error.message });
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

    update: async (req, res) => {
        try {
            const updatedEntry = await EntryService.update(req.params.id, req.body, req.user.id);
            res.json(updatedEntry);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    remove: async (req, res) => {
        try {
            await EntryService.remove(req.params.id, req.user.id);
            res.json({ message: "Entrée supprimée" });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
};

export default EntryController;
