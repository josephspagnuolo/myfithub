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
    <h1>Welcome, {name}!</h1>
    <h3>Please activate your MyFitHub account by clicking this link:{" "}
      <a href={`${process.env.NEXTAUTH_URL}/activate/${token}`}>Verify</a>
    </h3>
  </div>
);
