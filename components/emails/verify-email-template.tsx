import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

export default function ForgotPasswordEmailTemplate({
  name,
  token,
}: {
  name: string;
  token: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>
      <Tailwind>
        <Body style={main}>
          <Container style={container}>
            <Img
              src="https://www.myfithub.link/logo-transparent.png"
              alt="MyFitHub Logo"
              width="60"
              height="34"
              style={logo}
            />
            <Text style={logoTitle}>
              My
              <span style={logoTitleSpan}>Fit</span>
              Hub
            </Text>
            <Text style={title}>Verify your email address</Text>
            <Section style={section}>
              <Text style={heading}>Welcome {name}!</Text>
              <Text style={subheading}>
                You may activate your MyFitHub account by following the link
                below. This link will not expire.
              </Text>
              <Button
                style={button}
                href={`${process.env.NEXTAUTH_URL}/api/activate/${token}`}
              >
                Verify my account
              </Button>
              <Text style={text}>
                or copy and paste this URL into your browser:{" "}
              </Text>
              <Link style={link} className="break-words">
                {`${process.env.NEXTAUTH_URL}/api/activate/${token}`}{" "}
              </Link>
            </Section>
            <Section style={logo}>
              <Text style={text}>
                If you did not request this, no further action is required.
                Contact us at{" "}
                <Link style={link} href="mailto:support@myfithub.link">
                  support@myfithub.link
                </Link>{" "}
                for help.
              </Text>
            </Section>
            <Section style={footerStyle}>
              <Text style={logo}>
                <Link
                  href={`${process.env.NEXTAUTH_URL}/terms`}
                  style={footerLinkStyle}
                >
                  Terms
                </Link>{" "}
                <Link
                  href={`${process.env.NEXTAUTH_URL}/privacy`}
                  style={footerLinkStyle}
                >
                  Privacy
                </Link>
              </Text>
              <Text style={footerTextStyle}>
                &copy; 2024 MyFitHub.link - All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

const main = {
  backgroundColor: "#000",
  color: "#fafafa",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  maxWidth: "480px",
  margin: "0 auto",
  padding: "36px 12px 12px",
};

const logo = {
  margin: "0 auto",
};

const logoTitle = {
  fontSize: "1rem",
  fontWeight: "600",
  lineHeight: "2rem",
  margin: "0 auto",
  textAlign: "center" as const,
  color: "#fafafa",
};

const logoTitleSpan = {
  paddingLeft: "1px",
  paddingRight: "1px",
  fontSize: "1.125rem",
  lineHeight: "1.75rem",
  fontWeight: "800",
  color: "#0ea5e9",
};

const title = {
  fontSize: "20px",
  lineHeight: 1.25,
  margin: "24px auto",
  textAlign: "center" as const,
  color: "#fafafa",
};

const section = {
  padding: "18px 24px 24px 24px",
  border: "solid 1px #27272a",
  borderRadius: "1rem",
  textAlign: "center" as const,
  backgroundColor: "#18181b",
};

const heading = {
  margin: "0 auto",
  textAlign: "center" as const,
  fontSize: "1.5rem",
  lineHeight: "2rem",
  fontWeight: "600",
  color: "#fafafa",
};

const subheading = {
  margin: "8px auto 20px",
  textAlign: "center" as const,
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  color: "#a1a1aa",
};

const text = {
  margin: "20px auto 0",
  textAlign: "center" as const,
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  color: "#a1a1aa",
};

const button = {
  width: "144px",
  fontSize: "14px",
  fontWeight: "600",
  backgroundColor: "#0284c7",
  color: "#fff",
  lineHeight: 1.5,
  borderRadius: "0.375rem",
  padding: "12px 24px",
};

const link = {
  margin: "20px auto 0",
  textAlign: "center" as const,
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  color: "#0284c7",
};

const footerStyle = {
  marginTop: "32px",
  padding: "16px 0",
  textAlign: "center" as const,
  borderTop: "1px solid #27272a",
  color: "#a1a1aa",
};

const footerTextStyle = {
  fontSize: "0.75rem",
  margin: "0px 8px",
};

const footerLinkStyle = {
  fontSize: "0.75rem",
  textDecoration: "none",
  color: "#a1a1aa",
  margin: "0px 8px 0px",
};
