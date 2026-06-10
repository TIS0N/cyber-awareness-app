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
    color: "bg-green-100",

    description:
      "Learn how to create strong passwords and protect your online accounts.",

    question: "Why are strong passwords important?",

    overview:
      "Passwords protect access to personal accounts, emails, banking services, and other sensitive information. Weak or reused passwords make it easier for attackers to break into accounts.",

    warningSigns: [
      "Using the same password on multiple websites",
      "Using personal information such as your name or birthday",
      "Using short passwords",
      "Sharing passwords with other people",
      "Saving passwords in unsafe places",
    ],

    example:
      'A user uses the password "adam123" for email, social media, and online banking. If one website is hacked, attackers may try the same password on other accounts.',

    preventionTips: [
      "Use long and unique passwords",
      "Avoid using personal information in passwords",
      "Use a password manager when possible",
      "Enable multi-factor authentication",
      "Do not reuse the same password across accounts",
    ],
  },

  {
    id: "malware",
    title: "Malware & Ransomware",
    color: "bg-yellow-100",

    description:
      "Learn how malicious software infects devices and how ransomware can lock your files.",

    question: "What is malware?",

    overview:
      "Malware is harmful software created to damage devices, steal information, spy on users, or take control of systems. Ransomware is a type of malware that locks files and demands payment to restore access.",

    warningSigns: [
      "Unexpected pop-ups",
      "Slow device performance",
      "Unknown programs installed on the device",
      "Files suddenly becoming inaccessible",
      "Suspicious email attachments",
    ],

    example:
      "A user downloads a fake invoice attachment from an unknown email. After opening it, their files become locked and a message demands payment to unlock them.",

    preventionTips: [
      "Do not open unexpected attachments",
      "Download software only from trusted sources",
      "Keep your operating system and apps updated",
      "Use antivirus protection",
      "Back up important files regularly",
    ],
  },

  {
    id: "scams",
    title: "Online Scams",
    color: "bg-blue-100",

    description:
      "Recognize common online scams and learn how scammers manipulate users.",

    question: "How do online scams work?",

    overview:
      "Online scams use deception, pressure, and emotional manipulation to trick people into sending money, sharing personal information, or clicking unsafe links.",

    warningSigns: [
      "Offers that seem too good to be true",
      "Requests for urgent payment",
      "Messages from unknown people asking for help",
      "Fake prizes or giveaways",
      "Pressure to act immediately",
    ],

    example:
      'A message says: "Congratulations, you won a new phone! Pay a small delivery fee to claim your prize." The goal is to steal payment details.',

    preventionTips: [
      "Be skeptical of unexpected offers",
      "Never send money to unknown people",
      "Check official websites before trusting messages",
      "Do not share personal or payment information",
      "Talk to someone you trust before acting under pressure",
    ],
  },
];