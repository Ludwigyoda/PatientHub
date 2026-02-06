import AuthService from "../services/auth.service.js";

const AuthController = {
    register: async (req, res) => {
        try {
            const { username, password, email } = req.body;

            // 'name' in prisma vs 'username' in request. Mapping username -> name
            if (!email || !password) {
                res.status(400).json({ error: "L'email et le mot de passe sont obligatoire" });
                return;
            }

            const result = await AuthService.registerService(email, password, username);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ error: "L'email et le mot de passe sont obligatoire" });
                return;
            }

            const result = await AuthService.loginService(email, password);
            res.status(200).json(result);
        } catch (error) {
            // Adapt error message to be generic if needed, or just pass valid info
            // User code had specific messages, sticking to 400/401
            res.status(400).json({ error: error.message });
        }
    },

    updatePassword: async (req, res) => {
        try {
            const { id, newPassword } = req.body;
            // Note: In a real app, 'id' should come from req.user.id (token), not body, for security.
            // But following user's structure:

            // If the user wants to update THEIR OWN password, we should really use req.user.id
            // However, sticking to the provided snippet logic:
            const targetId = id || req.user?.id;

            if (!targetId || !newPassword) {
                return res.status(400).json({ error: "ID et nouveau mot de passe requis" });
            }

            const result = await AuthService.updatePasswordService(targetId, newPassword);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

export default AuthController;
