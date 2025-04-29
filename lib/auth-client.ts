import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: "http://taches.samuelmarone.fr"
})

export const { signIn, signOut, signUp, useSession } = authClient;