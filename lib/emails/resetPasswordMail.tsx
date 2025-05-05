import { Body, Button, Container, Head, Hr, Html, Img, Preview, Section, Text } from '@react-email/components';

interface KoalaWelcomeEmailProps {
    userFirstname: string;
    url: string;
}

export const ResetPasswordMail = ({
    userFirstname,
    url
}: KoalaWelcomeEmailProps) => (
    <Html>
        <Head />
        <Body style={main}>
            <Preview>
                Les taches de la maniere la plus simple!
            </Preview>
            <Container style={container}>
                <Img
                    src="https://react-email-demo-ev3nxxs6w-resend.vercel.app/static/koala-logo.png"
                    width="170"
                    height="50"
                    alt="Koala"
                    style={logo}
                />
                <Text style={paragraph}>Salut {userFirstname},</Text>
                <Text style={paragraph}>
                    Vous avez demander une réinitialisation de votre mot de passe, veuillez
                    cliquer sur le bouton ci-dessous pour procéder au changement de votre mot de passe.
                </Text>
                <Section style={btnContainer}>
                    <Button style={button} href={url}>
                        Réinitialiser mon mot de passe
                    </Button>
                </Section>
                <Text style={paragraph}>
                    Si vous n&apos;avez pas demandé cette action, vous pouvez ignorer ce message.
                </Text>
                <Text style={paragraph}>
                    Merci
                    <br />
                    L&apos;équipe de Tache
                </Text>
                <Hr style={hr} />
                <Text style={footer}>
                    © TACHES, Samuel MARONE, Lyon, France
                </Text>
            </Container>
        </Body>
    </Html>
);


export default ResetPasswordMail;

const main = {
    backgroundColor: '#ffffff',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
};

const logo = {
    margin: '0 auto',
};

const paragraph = {
    fontSize: '16px',
    lineHeight: '26px',
};

const btnContainer = {
    textAlign: 'center' as const,
};

const button = {
    backgroundColor: '#166534',
    borderRadius: '3px',
    color: '#fff',
    fontSize: '16px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '12px',
};

const hr = {
    borderColor: '#cccccc',
    margin: '20px 0',
};

const footer = {
    color: '#8898aa',
    fontSize: '12px',
};
