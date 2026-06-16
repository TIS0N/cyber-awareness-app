import { QuizQuestion } from "../types/quiz";

export const quizQuestions: QuizQuestion[] = [
  // PHISHING
  {
    id: "phishing-1",
    moduleId: "phishing",
    scenario:
      "You receive an email that appears to be from your bank.\n\nSubject: Urgent account verification required\n\nThe email says your account will be locked within 24 hours unless you click a link and confirm your login details.",
    question: "What is the safest action?",
    options: [
      "Click the link and log in quickly",
      "Reply to the email with your password",
      "Visit the bank website directly or contact the bank through official channels",
      "Forward the email to friends",
    ],
    correctAnswer:
      "Visit the bank website directly or contact the bank through official channels",
    explanation:
      "The message uses urgency and asks the user to act through a link. The safest action is to avoid the link and verify the issue through official bank channels.",
  },
  {
    id: "phishing-2",
    moduleId: "phishing",
    question: "Which of these is a common warning sign of phishing?",
    options: [
      "A message from a known friend saying hello",
      "An urgent message asking for personal information",
      "A website you typed manually into the browser",
      "A normal software update from your device settings",
    ],
    correctAnswer: "An urgent message asking for personal information",
    explanation:
      "Phishing often uses urgent language and asks for sensitive information such as passwords, card numbers, or account details.",
  },
  {
    id: "phishing-3",
    moduleId: "phishing",
    scenario:
      "An email says it is from PayPal. The sender address is security@paypaI-verification.com.\n\nAt first glance it looks normal, but the word PayPal is not written correctly in the domain.",
    question: "What is suspicious?",
    options: [
      "The email has a sender address",
      "The sender address looks like PayPal but is not the official domain",
      "The email mentions security",
      "The email uses normal text",
    ],
    correctAnswer:
      "The sender address looks like PayPal but is not the official domain",
    explanation:
      "Attackers often create fake domains that look similar to real companies. Users should carefully check sender addresses and website links.",
  },
  {
    id: "phishing-4",
    moduleId: "phishing",
    scenario:
      "You receive a message from a delivery company saying your package is delayed. It includes a link where you must enter your address and card number to pay a small fee.",
    question: "Why is clicking the link risky?",
    options: [
      "It may lead to a fake website that steals personal or payment details",
      "It will always make the computer slower",
      "It automatically deletes your files",
      "It is always safe if the delivery company logo is shown",
    ],
    correctAnswer:
      "It may lead to a fake website that steals personal or payment details",
    explanation:
      "Phishing links often lead to fake websites designed to steal login details, payment information, or personal data.",
  },
  {
    id: "phishing-5",
    moduleId: "phishing",
    question:
      "What is the safest way to check if an account warning email is real?",
    options: [
      "Click the link in the email",
      "Reply and ask if it is real",
      "Open the official website manually or contact support through official channels",
      "Ignore all emails forever",
    ],
    correctAnswer:
      "Open the official website manually or contact support through official channels",
    explanation:
      "The safest approach is to avoid links in suspicious messages and verify the issue through official websites or trusted contact methods.",
  },

  // PASSWORDS
  {
    id: "passwords-1",
    moduleId: "passwords",
    question: "Which password habit is safest?",
    options: [
      "Using the same password everywhere",
      "Using your birthday as a password",
      "Using a long unique password for each account",
      "Sharing your password with a friend",
    ],
    correctAnswer: "Using a long unique password for each account",
    explanation:
      "Using unique passwords protects your other accounts if one service is hacked. Long passwords are also harder to guess.",
  },
  {
    id: "passwords-2",
    moduleId: "passwords",
    scenario:
      "You used the same password for an online shop, your email account, and social media. Later, the online shop announces that customer data was leaked.",
    question: "Why is this dangerous?",
    options: [
      "Attackers may try the leaked password on your other accounts",
      "The password becomes longer automatically",
      "Your internet connection becomes unsafe",
      "It only affects the online shop and nothing else",
    ],
    correctAnswer:
      "Attackers may try the leaked password on your other accounts",
    explanation:
      "When passwords are reused, one leaked password can put multiple accounts at risk. This is why important accounts should use unique passwords.",
  },
  {
    id: "passwords-3",
    moduleId: "passwords",
    question: "Which of these is the strongest password example?",
    options: [
      "adam123",
      "password2024",
      "Summer!",
      "River-Cloud-Train-92!",
    ],
    correctAnswer: "River-Cloud-Train-92!",
    explanation:
      "Longer passwords or passphrases are usually harder to guess. A strong password should not be based on obvious personal information.",
  },
  {
    id: "passwords-4",
    moduleId: "passwords",
    scenario:
      "You log in to your email account from a new device. After entering your password, the service asks you to confirm a code from your phone.",
    question: "What is this extra code helping protect against?",
    options: [
      "Only slow internet",
      "Someone logging in with only a stolen password",
      "Screen brightness problems",
      "Deleted browser history",
    ],
    correctAnswer: "Someone logging in with only a stolen password",
    explanation:
      "Multi-factor authentication adds another verification step, so a stolen password alone may not be enough to access an account.",
  },
  {
    id: "passwords-5",
    moduleId: "passwords",
    scenario:
      "You have many online accounts and struggle to remember different passwords. You consider saving all passwords in a text file on your desktop.",
    question: "What would be a safer option?",
    options: [
      "Use a password manager to create and store strong unique passwords",
      "Make all passwords public",
      "Use the same password everywhere",
      "Send the passwords to yourself by email",
    ],
    correctAnswer:
      "Use a password manager to create and store strong unique passwords",
    explanation:
      "A password manager can help users create and store strong unique passwords without needing to remember every password manually.",
  },

  // MALWARE
  {
    id: "malware-1",
    moduleId: "malware",
    scenario:
      "You receive an email from an unknown sender. It says you have an unpaid invoice and includes a file named invoice.pdf.exe.",
    question: "What is the safest action?",
    options: [
      "Open it to check what it is",
      "Download it and send it to friends",
      "Do not open it and delete or report the email",
      "Rename the file before opening it",
    ],
    correctAnswer: "Do not open it and delete or report the email",
    explanation:
      "The file name is suspicious because it ends in .exe, which means it is a program, not a normal PDF. Unexpected attachments can contain malware.",
  },
  {
    id: "malware-2",
    moduleId: "malware",
    question: "What is ransomware?",
    options: [
      "A tool that improves computer speed",
      "Malware that locks files or devices and demands payment",
      "A safe password manager",
      "A normal browser setting",
    ],
    correctAnswer:
      "Malware that locks files or devices and demands payment",
    explanation:
      "Ransomware is a type of malware that blocks access to files or systems and demands payment to restore access.",
  },
  {
    id: "malware-3",
    moduleId: "malware",
    scenario:
      "A website offers a free version of an expensive program. It asks you to disable antivirus protection before installing the file.",
    question: "What is the main risk?",
    options: [
      "The program may contain malware",
      "The website will make your screen brighter",
      "The program will always be faster",
      "Disabling antivirus makes the computer cleaner",
    ],
    correctAnswer: "The program may contain malware",
    explanation:
      "Pirated or suspicious software downloads are a common way malware spreads. Asking users to disable protection is a serious warning sign.",
  },
  {
    id: "malware-4",
    moduleId: "malware",
    scenario:
      "Your files suddenly become locked. A message appears saying you must pay money to recover them.",
    question: "Why are regular backups important in this situation?",
    options: [
      "They allow users to recover files without paying attackers",
      "They make passwords shorter",
      "They prevent all phishing messages",
      "They hide websites from attackers",
    ],
    correctAnswer:
      "They allow users to recover files without paying attackers",
    explanation:
      "Backups can reduce the damage caused by ransomware because users may be able to restore files without paying a ransom.",
  },
  {
    id: "malware-5",
    moduleId: "malware",
    scenario:
      "A website shows a pop-up saying your device is infected. It tells you to download a security tool immediately.",
    question: "What should you do?",
    options: [
      "Download the tool immediately",
      "Enter your bank details",
      "Close the page and use trusted security software if needed",
      "Share the pop-up on social media",
    ],
    correctAnswer:
      "Close the page and use trusted security software if needed",
    explanation:
      "Fake security warnings often try to scare users into downloading malware or paying for fake support. Use trusted security tools instead.",
  },

  // SCAMS
  {
    id: "scams-1",
    moduleId: "scams",
    scenario:
      "A website says you won a free smartphone. It asks you to enter your full name, address, phone number, and card details to pay a €2.99 delivery fee.",
    question: "What should you think?",
    options: [
      "It is probably safe because the fee is small",
      "It may be a scam trying to steal payment or personal information",
      "It is safe if the page has a product image",
      "You should pay quickly before the offer expires",
    ],
    correctAnswer:
      "It may be a scam trying to steal payment or personal information",
    explanation:
      "Fake prize scams often ask for small payments or personal details. The goal may be to steal money, payment information, or personal data.",
  },
  {
    id: "scams-2",
    moduleId: "scams",
    question:
      "Which payment request is especially suspicious in an online scam?",
    options: [
      "A normal card payment on a trusted website",
      "Payment by gift card, cryptocurrency, or urgent bank transfer",
      "A receipt from a known shop",
      "A monthly subscription you recognize",
    ],
    correctAnswer:
      "Payment by gift card, cryptocurrency, or urgent bank transfer",
    explanation:
      "Scammers often request payment methods that are hard to reverse or trace, such as gift cards, crypto, or urgent transfers.",
  },
  {
    id: "scams-3",
    moduleId: "scams",
    scenario:
      "A stranger contacts you on social media. They say they are in an emergency and need money urgently. They ask you not to tell anyone.",
    question: "What is the safest response?",
    options: [
      "Send money immediately",
      "Keep it secret because they asked",
      "Pause, verify the situation, and talk to someone you trust",
      "Give them your card number",
    ],
    correctAnswer:
      "Pause, verify the situation, and talk to someone you trust",
    explanation:
      "Scammers often use emotional pressure and secrecy. Slowing down and asking a trusted person can prevent mistakes.",
  },
  {
    id: "scams-4",
    moduleId: "scams",
    scenario:
      "You see an investment advertisement promising guaranteed high profit with no risk. It says only the first 100 people can join today.",
    question: "What does this suggest?",
    options: [
      "The offer may be fake or misleading",
      "The offer is always safe",
      "The offer must be from the government",
      "The offer should be accepted quickly",
    ],
    correctAnswer: "The offer may be fake or misleading",
    explanation:
      "Scams often use unrealistic rewards, guaranteed returns, and pressure to attract victims.",
  },
  {
    id: "scams-5",
    moduleId: "scams",
    scenario:
      "You find an online shop selling expensive electronics at extremely low prices. The website has no clear contact information and only accepts bank transfer.",
    question: "What should you do before buying?",
    options: [
      "Buy immediately if the price is low",
      "Check reviews, contact information, website quality, and payment safety",
      "Ignore all warning signs",
      "Send payment by gift card",
    ],
    correctAnswer:
      "Check reviews, contact information, website quality, and payment safety",
    explanation:
      "Fake shops may look professional at first. Checking reviews, contact details, and payment options can help identify suspicious websites.",
  },
];