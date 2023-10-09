import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  token: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  token,
}) => (
  <div>
    <h1>MyFitHub</h1>
    <h2>Verify your email address</h2>
    <h4>Welcome, {name}!</h4>
    <h4>Please activate your MyFitHub account by clicking the following link:</h4>
    <a href={`${process.env.NEXTAUTH_URL}/activate/${token}`}>Verify my account</a>
    <h4>If this was not you, you can safely delete this email.</h4>
  </div>
);
