import { Scenario } from "../types/scenario";

export const scenarios: Scenario[] = [
  {
    id: "phishing-email-1",
    moduleId: "phishing",
    type: "email",
    title: "Phishing Email Scenario",
    description:
      "You received the email below. Click the parts that seem suspicious or unsafe.",
    instruction:
      "Some parts are dangerous, while others are normal. Click carefully and read the feedback.",
    elements: [
      {
        id: "phishing-from",
        label: "From",
        content: "security@paypaI-verification.com",
        isSuspicious: true,
        explanation:
          "Correct. The sender address is suspicious. It tries to imitate PayPal, but the domain is not the official PayPal domain.",
      },
      {
        id: "phishing-subject",
        label: "Subject",
        content: "URGENT: Your account will be suspended",
        isSuspicious: true,
        explanation:
          "Correct. Urgent and threatening language is a common phishing technique. It pressures users to act without thinking.",
      },
      {
        id: "phishing-greeting",
        label: "Greeting",
        content: "Dear customer,",
        isSuspicious: false,
        explanation:
          "This is not strong evidence by itself. Generic greetings can appear in phishing, but they can also appear in legitimate messages.",
      },
      {
        id: "phishing-body",
        label: "Message",
        content:
          "We detected unusual activity. You must verify your account immediately to avoid suspension.",
        isSuspicious: true,
        explanation:
          "Correct. The message creates pressure and asks for immediate action. This is a common manipulation technique.",
      },
      {
        id: "phishing-link",
        label: "Link",
        content: "http://paypal-security-check.example.com",
        isSuspicious: true,
        explanation:
          "Correct. The link does not clearly point to the official PayPal website. Suspicious links are one of the strongest phishing indicators.",
      },
      {
        id: "phishing-footer",
        label: "Footer",
        content: "Thank you, PayPal Security Team",
        isSuspicious: false,
        explanation:
          "This footer alone does not prove the email is dangerous. Attackers can easily copy professional-looking signatures.",
      },
    ],
  },

  {
    id: "password-reset-1",
    moduleId: "passwords",
    type: "website",
    title: "Fake Password Reset Page",
    description:
      "You opened a password reset page after clicking a link in an email. Click the parts that seem suspicious.",
    instruction:
      "Not every part of the page is dangerous. Look for signs that the page may not be legitimate.",
    elements: [
      {
        id: "password-url",
        label: "Website address",
        content: "https://secure-account-login-help.com/reset",
        isSuspicious: true,
        explanation:
          "Correct. The address is vague and does not clearly belong to the official website of a known service.",
      },
      {
        id: "password-title",
        label: "Page title",
        content: "Reset your account password",
        isSuspicious: false,
        explanation:
          "This title alone is normal. Real services also have password reset pages, so this is not enough evidence by itself.",
      },
      {
        id: "password-current",
        label: "Form field",
        content: "Enter your current password",
        isSuspicious: true,
        explanation:
          "Correct. A password reset page should not usually ask for your current password after you clicked an email link. This may be an attempt to steal it.",
      },
      {
        id: "password-new",
        label: "Form field",
        content: "Enter your new password",
        isSuspicious: false,
        explanation:
          "This field can be normal on a real password reset page. The problem is the suspicious website address and request for the current password.",
      },
      {
        id: "password-warning",
        label: "Warning message",
        content: "Your account will be disabled in 30 minutes if you do not continue.",
        isSuspicious: true,
        explanation:
          "Correct. The warning creates unnecessary urgency. Scammers often use time pressure to make users act quickly.",
      },
      {
        id: "password-button",
        label: "Button",
        content: "Continue",
        isSuspicious: false,
        explanation:
          "A continue button is normal by itself. The surrounding context determines whether clicking it is safe.",
      },
    ],
  },

  {
    id: "malware-download-1",
    moduleId: "malware",
    type: "download",
    title: "Suspicious Download Scenario",
    description:
      "A website says you need to download a file to view an invoice. Click the parts that seem risky.",
    instruction:
      "Look carefully at the file name, message, and source before deciding what is dangerous.",
    elements: [
      {
        id: "malware-source",
        label: "Website/source",
        content: "unknown-invoices.net",
        isSuspicious: true,
        explanation:
          "Correct. The source is unknown and does not clearly belong to a trusted company.",
      },
      {
        id: "malware-message",
        label: "Message",
        content: "Download the invoice immediately to avoid additional charges.",
        isSuspicious: true,
        explanation:
          "Correct. The message creates pressure and tries to make the user download a file without thinking.",
      },
      {
        id: "malware-file",
        label: "File name",
        content: "invoice.pdf.exe",
        isSuspicious: true,
        explanation:
          "Correct. This is very suspicious. A file ending in .exe is a program, not a normal PDF document.",
      },
      {
        id: "malware-size",
        label: "File size",
        content: "2.4 MB",
        isSuspicious: false,
        explanation:
          "The file size alone does not prove anything. Malware can be small or large, so this is not a reliable warning sign by itself.",
      },
      {
        id: "malware-button",
        label: "Button",
        content: "Download now",
        isSuspicious: false,
        explanation:
          "A download button is not always dangerous. The risk comes from the suspicious source, pressure, and file name.",
      },
      {
        id: "malware-note",
        label: "Page note",
        content: "No company name or contact information is shown.",
        isSuspicious: true,
        explanation:
          "Correct. A page asking you to download important documents without clear company information is suspicious.",
      },
    ],
  },

  {
    id: "scam-giveaway-1",
    moduleId: "scams",
    type: "shop",
    title: "Fake Giveaway Scenario",
    description:
      "You see a page claiming that you won a free smartphone. Click the parts that suggest it may be a scam.",
    instruction:
      "Some parts may look normal, but the full context matters. Identify the real warning signs.",
    elements: [
      {
        id: "scam-title",
        label: "Page headline",
        content: "Congratulations! You won a brand new smartphone!",
        isSuspicious: true,
        explanation:
          "Correct. Unexpected prize messages are a common scam tactic, especially if you never entered a competition.",
      },
      {
        id: "scam-image",
        label: "Product image",
        content: "Image of a smartphone",
        isSuspicious: false,
        explanation:
          "A product image alone is not suspicious. Scammers often use normal-looking images to make fake offers seem real.",
      },
      {
        id: "scam-fee",
        label: "Payment request",
        content: "Pay only €2.99 delivery fee to claim your prize.",
        isSuspicious: true,
        explanation:
          "Correct. Fake prizes often ask for small payments to steal payment details or money.",
      },
      {
        id: "scam-timer",
        label: "Countdown timer",
        content: "Offer expires in 09:58 minutes.",
        isSuspicious: true,
        explanation:
          "Correct. A countdown timer creates pressure and tries to stop users from thinking carefully.",
      },
      {
        id: "scam-button",
        label: "Button",
        content: "Claim prize",
        isSuspicious: false,
        explanation:
          "The button alone is not the main issue. The suspicious parts are the unexpected prize, payment request, and pressure.",
      },
      {
        id: "scam-personal-data",
        label: "Form request",
        content: "Enter full name, address, phone number, and card details.",
        isSuspicious: true,
        explanation:
          "Correct. The page asks for too much sensitive information for a supposedly free prize.",
      },
    ],
  },
];