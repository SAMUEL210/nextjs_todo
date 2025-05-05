import { createTransport } from "nodemailer";

export const mailer = createTransport({
    host: "smtp-marone.alwaysdata.net",
    port: 465,
    secure: true,
    auth: {
        user: "contact.taaches@samuelmarone.fr",
        pass: "jn7jnAPss4f63QBp6D",
    },
    dkim: {
        domainName: "samuelmarone.fr",
        keySelector: "2017",
        privateKey: process.env.PRIVATE_KEY || "",
    },
} as import("nodemailer").TransportOptions);