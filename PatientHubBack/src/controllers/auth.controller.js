import AuthService from "../services/auth.service.js";

// gestion login / register / update mdp

const AuthController = {
    register: async (req, res) => {
        try {
            const { email, password, name } = req.body;

            // on check que les champs sont la
            if (!email || !password) {
                return res.status(400).json({ error: "Il manque l'email ou le mot de passe" });
            }

            const result = await AuthService.registerService(email, password, name);
            res.status(201).json(result);

        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: "Email et mot de passe requis" });
            }

            const result = await AuthService.loginService(email, password);
            res.json(result);

        } catch (err) {
            
            res.status(401).json({ error : "Email ou mot de passe incorrect" });
        }
    },

    updatePassword: async (req, res) => {
        try {
            const { newPassword } = req.body;

            if (!newPassword) {
                return res.status(400).json({ error: "Nouveau mot de passe requis" });
            }

            
            const result = await AuthService.updatePasswordService(req.user.id, newPassword);
            res.json(result);

        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};

export default AuthController;
