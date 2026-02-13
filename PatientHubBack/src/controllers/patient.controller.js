import PatientService from "../services/patient.service.js";

const PatientController = {
  

    getMe: async (req, res) => {
        try {
            const patient = await PatientService.getOne(req.user.id);
            res.json(patient);
        } catch (error) {
            res.status(40).json({ error: error.message });
        }
    },

}
export default PatientController;
