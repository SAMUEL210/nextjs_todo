"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { authClient, signIn } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function Login() {

    const { data: session, isPending } = authClient.useSession()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    if (isPending == false && session != null) {
        redirect('/')
    } else if (isPending == false && session == null) {
        return (
            <Card className="max-w-md mx-auto mt-10">
                <CardHeader>
                    <CardTitle className="text-lg md:text-xl">Se connecter</CardTitle>
                    <CardDescription className="text-xs md:text-sm">
                        Entrer votre email pour vous connecter
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                value={email}
                            />
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Mot de passe</Label>

                            </div>

                            <Input
                                id="password"
                                type="password"
                                placeholder="password"
                                autoComplete="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                            onClick={async () => {
                                await signIn.email(
                                    {
                                        email,
                                        password,
                                        callbackURL: "/",
                                    },
                                    {
                                        onRequest: () => {
                                            setLoading(true);
                                        },
                                        onResponse: () => {
                                            setLoading(false);
                                        }
                                    },
                                );
                            }}
                        >
                            {loading ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                "Se connecter"
                            )}
                        </Button>




                    </div>
                </CardContent>

            </Card>
        );
    }

}