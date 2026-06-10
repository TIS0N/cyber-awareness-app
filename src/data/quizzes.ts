import { QuizQuestion } from "../types/quiz";

export const quizQuestions: QuizQuestion[] = [
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
    correctAnswer: "It may be a scam trying to steal payment information",
    explanation:
      "Scammers often use fake prizes to make people pay fees or reveal payment details.",
  },
];