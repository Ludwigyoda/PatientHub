import PatientService from "../services/patient.service.js";

const PatientController = {
    getAll: async (req, res) => {
        try {
            const patients = await PatientService.getAll();
            res.json(patients);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getOne: async (req, res) => {
        try {
            if (req.user.role !== 'ADMIN' && req.user.id !== req.params.id) {
                return res.status(403).json({ error: "Accès interdit" });
            }

            const patient = await PatientService.getOne(req.params.id);
            res.json(patient);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    getMe: async (req, res) => {
        try {
            const patient = await PatientService.getOne(req.user.id);
            res.json(patient);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            if (req.user.role !== 'ADMIN' && req.user.id !== req.params.id) {
                return res.status(403).json({ error: "Accès interdit" });
            }

            const updatedPatient = await PatientService.update(req.params.id, req.body);
            res.json(updatedPatient);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    remove: async (req, res) => {
        try {
            if (req.user.role !== 'ADMIN' && req.user.id !== req.params.id) {
                return res.status(403).json({ error: "Accès interdit" });
            }

            await PatientService.remove(req.params.id);
            res.json({ message: "Compte supprimé" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

export default PatientController;
