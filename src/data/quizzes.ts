import { QuizQuestion } from "../types/quiz";

export const quizQuestions: QuizQuestion[] = [
  // PHISHING
  {
    id: "phishing-1",
    moduleId: "phishing",
    question:
      "You receive an email saying your bank account will be locked unless you click a link immediately. What should you do?",
    options: [
      "Click the link immediately",
      "Reply with your password",
      "Visit the bank website directly or contact the bank through official channels",
      "Forward the email to friends",
    ],
    correctAnswer:
      "Visit the bank website directly or contact the bank through official channels",
    explanation:
      "Phishing messages often use urgency to make users act quickly. The safest action is to avoid the link and verify the message through official channels.",
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
    question:
      "An email says it is from PayPal, but the sender address is security@paypaI-verification.com. What is suspicious?",
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
    question:
      "Why is it risky to click links in unexpected emails?",
    options: [
      "They always make the computer slower",
      "They may lead to fake websites that steal login details",
      "They always delete your files",
      "They are always safe if they look professional",
    ],
    correctAnswer:
      "They may lead to fake websites that steal login details",
    explanation:
      "Phishing links often lead to fake login pages designed to steal usernames, passwords, or payment information.",
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
    question:
      "Why is reusing the same password on multiple websites dangerous?",
    options: [
      "It makes passwords harder to remember",
      "If one website is hacked, attackers may try the same password elsewhere",
      "It makes websites load slower",
      "It prevents multi-factor authentication",
    ],
    correctAnswer:
      "If one website is hacked, attackers may try the same password elsewhere",
    explanation:
      "Attackers often test leaked passwords on other services. This is why every important account should have a unique password.",
  },
  {
    id: "passwords-3",
    moduleId: "passwords",
    question:
      "Which of these is the strongest password example?",
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
    question:
      "What does multi-factor authentication help protect against?",
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
    question:
      "What is a password manager useful for?",
    options: [
      "Creating and storing strong unique passwords",
      "Making all passwords public",
      "Removing the need for account security",
      "Sharing passwords with strangers",
    ],
    correctAnswer: "Creating and storing strong unique passwords",
    explanation:
      "A password manager can help users create and store strong unique passwords without needing to remember every password manually.",
  },

  // MALWARE
  {
    id: "malware-1",
    moduleId: "malware",
    question:
      "You receive an unexpected email attachment from an unknown sender. What is the safest action?",
    options: [
      "Open it to check what it is",
      "Download it and send it to friends",
      "Do not open it and delete or report the email",
      "Rename the file before opening it",
    ],
    correctAnswer: "Do not open it and delete or report the email",
    explanation:
      "Unexpected attachments can contain malware. Opening them may infect your device or steal information.",
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
    question:
      "Which behavior increases the risk of malware infection?",
    options: [
      "Updating your operating system",
      "Downloading software only from official websites",
      "Opening unknown attachments",
      "Using antivirus protection",
    ],
    correctAnswer: "Opening unknown attachments",
    explanation:
      "Unknown attachments are a common way malware spreads. Users should be careful with unexpected files, especially from unknown senders.",
  },
  {
    id: "malware-4",
    moduleId: "malware",
    question:
      "Why are regular backups important against ransomware?",
    options: [
      "They make passwords shorter",
      "They allow users to recover files without paying attackers",
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
    question:
      "A website shows a pop-up saying your device is infected and you must download a tool immediately. What should you do?",
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
    question:
      "A message says you won a free phone but must pay a small fee first. What should you think?",
    options: [
      "It is probably safe because the fee is small",
      "It may be a scam trying to steal payment information",
      "It is safe if the message has emojis",
      "You should pay quickly before the offer expires",
    ],
    correctAnswer:
      "It may be a scam trying to steal payment information",
    explanation:
      "Scammers often use fake prizes to make people pay fees or reveal payment details.",
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
    question:
      "A stranger online says they need money urgently and asks you not to tell anyone. What is the safest response?",
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
    question:
      "What does 'too good to be true' usually mean online?",
    options: [
      "The offer is always safe",
      "The offer may be fake or misleading",
      "The offer must be from the government",
      "The offer should be accepted quickly",
    ],
    correctAnswer: "The offer may be fake or misleading",
    explanation:
      "Scams often use unrealistic rewards, discounts, or investment promises to attract victims.",
  },
  {
    id: "scams-5",
    moduleId: "scams",
    question:
      "Before buying from an unknown online shop, what should you do?",
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