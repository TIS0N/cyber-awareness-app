import { Module } from "../types/module";

export const modules: Module[] = [
   {
    id: "phishing",
    title: "Phishing",
    color: "bg-red-100",

    description:
      "Learn how attackers use fake emails, messages, and websites to steal sensitive information.",

    question: "What is phishing?",

    overview:
      "Phishing is a type of cyberattack where criminals pretend to be trustworthy organizations or individuals. Their goal is to trick users into revealing passwords, financial information, or other personal data.",

    warningSigns: [
      "Urgent or threatening language",
      "Suspicious links",
      "Unexpected attachments",
      "Requests for passwords or personal information",
      "Spelling and grammar mistakes",
    ],

    example:
      'You receive an email claiming to be from your bank saying: "Your account will be suspended within 24 hours unless you verify your information immediately."',

    preventionTips: [
      "Verify the sender before responding",
      "Do not click suspicious links",
      "Visit websites directly instead of using email links",
      "Enable multi-factor authentication",
      "Report phishing attempts when possible",
    ],
  },

  {
    id: "passwords",
    title: "Password Safety",
    description: "Learn how to create strong passwords.",
    color: "bg-green-100",
  },

  {
    id: "malware",
    title: "Malware & Ransomware",
    description: "Learn about malicious software.",
    color: "bg-yellow-100",
  },

  {
    id: "scams",
    title: "Online Scams",
    description: "Recognize common online scams.",
    color: "bg-blue-100",
  },
]