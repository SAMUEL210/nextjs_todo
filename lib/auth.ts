import {betterAuth, User} from 'better-auth';
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from './prisma';
import { mailer } from "./mailer";
import { VerificationMail } from "@/lib/emails/EmailVerificationMail";
import { ResetPasswordMail } from "@/lib/emails/resetPasswordMail";
import { render } from '@react-email/components';

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "mongodb",
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        resetPasswordTokenExpiresIn: 60 * 60,
        emailVerification: {
            tokenExpiresIn: 60 * 60 * 24,
            sendVerificationEmail: async ({ user, url }: {user: User, url: string}) => {
                await mailer.sendMail({
                    to: user.email,
                    subject: "Vérification de votre adresse email",
                    from: "contact.taaches@samuelmarone.fr",
                    html: await render(VerificationMail({userFirstname: user.name.split(' ')[0], url}))
                });
            },
        },
        sendResetPassword: async ({ user, url } : {user: User, url: string}) => {
            await mailer.sendMail({
                to: user.email,
                subject: "Réinitialisation de votre mot de passe",
                from: "contact.taaches@samuelmarone.fr",
                html: await render(ResetPasswordMail({userFirstname: user.name.split(' ')[0], url}))
            })
        },
    },
    trustedOrigins: ["http://localhost:3000", 'https://taches.samuelmarone.fr']
});