import {betterAuth, User} from 'better-auth';
import { magicLink } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from '@/lib/prisma';
import { mailer } from "@/lib/mailer";
import { VerificationMail } from "@/lib/emails/emailVerificationMail";
import { ResetPasswordMail } from "@/lib/emails/resetPasswordMail";
import { render } from '@react-email/components';
import MagicLinksMail from './emails/magiclinksMail';

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "mongodb",
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async ({ user, url } : {user: User, url: string}) => {
            await mailer.sendMail({
                to: user.email,
                subject: "Réinitialisation de votre mot de passe",
                from: "contact.taaches@samuelmarone.fr",
                html: await render(ResetPasswordMail({userFirstname: user.name.split(' ')[0], url}))
            })
        },
    },
    emailVerification: {
        sendOnSignUp: true,
        sendOnSignIn: false,
        sendVerificationEmail: async ({ user, url }: {user: User, url: string}) => {
            await mailer.sendMail({
                to: user.email,
                subject: "Vérification de votre adresse email",
                from: "contact.taaches@samuelmarone.fr",
                html: await render(VerificationMail({userFirstname: user.name.split(' ')[0], url}))
            });
        },
    },
    plugins: [
        magicLink({
            sendMagicLink: async ({ email, url }) => {
                await mailer.sendMail({
                    to: email,
                    subject: "Connexion à Taches SM",
                    from: "contact.taaches@samuelmarone.fr",
                    html: await render(MagicLinksMail(url)),
                });
            }
        })
    ],
    trustedOrigins: ["http://localhost:3000", 'https://taches.samuelmarone.fr']
});