import prisma from "../lib/prisma";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key_BOB';

export async function registerService(email, password, name) {
    const existing = await prisma.patient.findUnique({ where: { email } });
    if (existing) throw new Error("votre Email est déja utilisé");

    const hashedPassword = await bcrypt.hash(password, 10);

    const patient = await prisma.patient.create({
        data: {
            email,
            password: hashedPassword,
            name,
            role: "USER",
            emailVerified: new Date(),
            termsAccepted: new Date(),
        }
    })

    const token = jwt.sign({ id: patient.id, role: patient.role }, JWT_SECRET);

    const { password: _, ...cleanPatient } = patient;

    return { patient: cleanPatient, token };
}

export async function loginService(email, password) {
    const patient = await prisma.patient.findUnique({ where: { email } });
    if (!patient) throw new Error("Email ou Mot de passe incorrect");


    const match = await bcrypt.compare(password, patient.password);
    if (!match) throw new Error("Email ou Mot de passe incorrect");

    const token = jwt.sign({ id: patient.id, role: patient.role }, JWT_SECRET);
    const { password: _, ...cleanPatient } = patient;
    return { patient: cleanPatient, token };
}
