import prisma from "../lib/prisma.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/jwt.utils.js";

const AuthService = {
    registerService: async (email, password, name) => {
        const existing = await prisma.patient.findUnique({ where: { email } });
        if (existing) {
            throw new Error("Un utilisateur existe déjà avec cet email");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newPatient = await prisma.patient.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: "USER", // Default role
                emailVerified: new Date(), // Auto-verify for now as per previous logic
                termsAccepted: new Date(),
            }
        });

        const token = await generateToken({
            id: newPatient.id,
            username: newPatient.name,
            role: newPatient.role
        });

        const { password: _, ...cleanPatient } = newPatient;
        return { patient: cleanPatient, token };
    },

    loginService: async (email, password) => {
        const patient = await prisma.patient.findUnique({ where: { email } });
        if (!patient) {
            throw new Error("Pas d'utilisateur trouvé avec cet email");
        }

        const match = await bcrypt.compare(password, patient.password);
        if (!match) {
            throw new Error("Le mot de passe est incorrect");
        }

        const token = await generateToken({
            id: patient.id,
            username: patient.name,
            role: patient.role
        });

        const { password: _, ...cleanPatient } = patient;
        return { patient: cleanPatient, token };
    },

    updatePasswordService: async (id, newPassword) => {
        const patient = await prisma.patient.findUnique({ where: { id } });
        if (!patient) {
            throw new Error("Utilisateur introuvable");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.patient.update({
            where: { id },
            data: { password: hashedPassword }
        });

        return { message: "Mot de passe mis à jour avec succès" };
    }
};

export default AuthService;
