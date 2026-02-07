import AuthService from "../services/auth.service.js";

const AuthController = {
    register: async (req, res) => {
        try {
            const { email, password, name } = req.body;

            if (!email || !password) {
                res.status(400).json({ error: "L'email et le mot de passe sont obligatoires" });
                return;
            }

            const result = await AuthService.registerService(email, password, name);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ error: "L'email et le mot de passe sont obligatoires" });
                return;
            }

            const result = await AuthService.loginService(email, password);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    updatePassword: async (req, res) => {
        try {
            const { newPassword } = req.body;
            const userId = req.user.id;

            if (!newPassword) {
                return res.status(400).json({ error: "Nouveau mot de passe requis" });
            }

            const result = await AuthService.updatePasswordService(userId, newPassword);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

export default AuthController;
