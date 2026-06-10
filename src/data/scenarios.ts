import { Scenario } from "../types/scenario";

export const scenarios: Scenario[] = [
  {
    id: "phishing-email-1",
    moduleId: "phishing",
    title: "Suspicious Email Scenario",
    description:
      "Read the email below and click on parts that seem suspicious.",

    email: {
      from: {
        id: "sender",
        label: "security@paypaI-verification.com",
        explanation:
          "The sender address is suspicious. The domain tries to look like PayPal, but it uses a fake or misleading address.",
      },

      subject: {
        id: "subject",
        label: "URGENT: Your account will be suspended",
        explanation:
          "The subject uses urgency and fear. Phishing messages often pressure users to act quickly before they think carefully.",
      },

      greeting: "Dear customer,",

      body: {
        id: "body",
        label:
          "We detected unusual activity on your account. You must verify your information immediately to avoid account suspension.",
        explanation:
          "This message creates pressure and asks the user to act immediately. Real services usually provide safer ways to verify account issues.",
      },

      link: {
        id: "link",
        label: "http://paypal-security-check.example.com",
        explanation:
          "The link does not clearly point to the official PayPal website. Suspicious links are one of the most common phishing techniques.",
      },

      footer: "Thank you,\nPayPal Security Team",
    },
  },
];