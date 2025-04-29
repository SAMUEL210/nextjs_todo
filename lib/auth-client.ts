import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: "https://taches.samuelmarone.fr"
})

export const { signIn, signOut, signUp, useSession } = authClient;