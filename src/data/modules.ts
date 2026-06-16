import { Module } from "../types/module";

export const modules: Module[] = [
  {
    id: "phishing",
    title: "Phishing & Fake Messages",
    color: "border-red-300 bg-white",

    estimatedTime: "6 min",
    difficulty: "Beginner",

    description:
      "Learn how attackers use fake emails, messages, and websites to steal sensitive information.",

    question: "What is phishing?",

    overview:
      "Phishing is a type of online attack where criminals pretend to be a trusted person, company, or service. Their goal is to trick users into clicking unsafe links, opening harmful attachments, or giving away sensitive information such as passwords, bank details, or login codes.",

    warningSigns: [
      "Urgent or threatening language",
      "Suspicious sender address",
      "Links that do not match the real website",
      "Unexpected attachments",
      "Requests for passwords or personal information",
      "Spelling or grammar mistakes",
      "Messages that create fear or pressure",
    ],

    example:
      'You receive an email claiming to be from your bank. It says: "Your account will be suspended within 24 hours unless you verify your information immediately." The email contains a link that leads to a fake login page.',

    preventionTips: [
      "Do not click suspicious links in emails or messages",
      "Check the sender address carefully",
      "Visit websites directly by typing the address into the browser",
      "Never share passwords or login codes through email or chat",
      "Use multi-factor authentication when possible",
      "Report suspicious messages when the option is available",
      "Take time to think before reacting to urgent messages",
    ],
  },

  {
    id: "passwords",
    title: "Passwords & Account Protection",
    color: "border-green-300 bg-white",

    estimatedTime: "5 min",
    difficulty: "Beginner",

    description:
      "Learn how to create strong passwords and protect your online accounts from unauthorized access.",

    question: "Why are strong passwords important?",

    overview:
      "Passwords protect access to personal accounts, emails, banking services, social media, and other private information. Weak or reused passwords make it easier for attackers to break into accounts, especially if one website is hacked and the same password is used elsewhere.",

    warningSigns: [
      "Using the same password on multiple websites",
      "Using short or easy-to-guess passwords",
      "Using personal information such as birthdays or names",
      "Sharing passwords with other people",
      "Saving passwords in notes or screenshots",
      "Ignoring multi-factor authentication",
      "Using passwords that appear in data leaks",
    ],

    example:
      'A user uses the password "adam123" for email, social media, and online banking. If one website leaks this password, attackers may try it on the user’s other accounts.',

    preventionTips: [
      "Use a different password for each important account",
      "Create long passwords or passphrases",
      "Avoid using names, birthdays, or simple patterns",
      "Use a password manager if possible",
      "Enable multi-factor authentication",
      "Change passwords after a known data breach",
      "Never share passwords through messages or email",
    ],
  },

  {
    id: "malware",
    title: "Malware & Ransomware",
    color: "border-amber-300 bg-white",

    estimatedTime: "6 min",
    difficulty: "Beginner",

    description:
      "Learn how harmful software can infect devices, steal data, or lock files for ransom.",

    question: "What is malware?",

    overview:
      "Malware is software designed to harm devices, steal information, spy on users, or take control of systems. Ransomware is a dangerous type of malware that locks files or devices and demands payment to restore access. Malware often spreads through unsafe downloads, infected attachments, fake software updates, and suspicious links.",

    warningSigns: [
      "Unexpected pop-ups or warnings",
      "Device suddenly becomes slow",
      "Unknown programs appear on the device",
      "Files become locked or inaccessible",
      "Browser homepage changes without permission",
      "Antivirus warnings appear",
      "Unexpected email attachments or downloads",
    ],

    example:
      "A user receives an email with an attachment called invoice.pdf.exe. After opening it, their files become locked and a message demands payment to unlock them.",

    preventionTips: [
      "Do not open unexpected attachments",
      "Download software only from trusted sources",
      "Keep the operating system and applications updated",
      "Use antivirus or built-in security protection",
      "Avoid pirated software and suspicious downloads",
      "Back up important files regularly",
      "Be careful with fake update pop-ups",
    ],
  },

  {
    id: "scams",
    title: "Online Scams & Fraud",
    color: "border-blue-300 bg-white",

    estimatedTime: "7 min",
    difficulty: "Beginner",

    description:
      "Recognize common online scams and learn how scammers manipulate people into sending money or sharing information.",

    question: "How do online scams work?",

    overview:
      "Online scams use deception, pressure, and emotional manipulation to trick people into doing something harmful. Scammers may offer fake prizes, pretend to be support workers, create fake shops, promise unrealistic investments, or impersonate people in need. The goal is usually to steal money, personal information, or account access.",

    warningSigns: [
      "Offers that seem too good to be true",
      "Pressure to act immediately",
      "Requests for payment by gift card, crypto, or bank transfer",
      "Fake prizes or giveaways",
      "Unknown people asking for money or help",
      "Poorly written websites or messages",
      "Requests for personal or payment information",
    ],

    example:
      'A message says: "Congratulations, you won a new phone! To claim your prize, pay a small delivery fee now." The goal is to collect payment details or steal money.',

    preventionTips: [
      "Be skeptical of unexpected offers",
      "Do not send money to unknown people",
      "Check official websites before trusting messages",
      "Avoid payments through unusual methods",
      "Do not share personal or payment information with strangers",
      "Search for reviews before buying from unknown shops",
      "Talk to someone you trust before acting under pressure",
    ],
  },
];