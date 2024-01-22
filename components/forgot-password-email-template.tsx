import * as React from 'react';

interface ForgotPasswordEmailTemplateProps {
  name: string;
  token: string;
}

export const ForgotPasswordEmailTemplate: React.FC<Readonly<ForgotPasswordEmailTemplateProps>> = ({
  name,
  token,
}) => (
  <div>
    <h1>MyFitHub</h1>
    <h2>Reset your password</h2>
    <h4>Hello, {name}!</h4>
    <h4>Please reset your password for your MyFitHub account by clicking the following link:</h4>
    <a href={`${process.env.NEXTAUTH_URL}/password-reset/${token}`}>Reset my password</a>
    <h4>This link will expire in 1 hour. If this was not you, you can safely delete this email.</h4>
  </div>
);
