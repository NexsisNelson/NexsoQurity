export default function FAQPage() {
  const faqs = [
    {
      question: "What is NexsoQurity?",
      answer:
        "NexsoQurity is an AI-powered wallet security platform that uses quantum-resistant encryption to protect digital assets from current and future threats. We leverage artificial intelligence to detect suspicious activities and prevent unauthorized access to your crypto wallet.",
    },
    {
      question: "How do $NEXQ tokens work?",
      answer:
        "$NEXQ tokens are test tokens used within our platform for testing features and functionality before our mainnet launch. They have no real monetary value but help users familiarize themselves with our ecosystem and earn rewards for participating in our testing program.",
    },
    {
      question: "How does the referral program work?",
      answer:
        "Our referral program allows you to earn $NEXQ tokens by inviting friends to join NexsoQurity. For each friend who signs up using your referral link and completes verification, you'll receive 200 $NEXQ tokens. Your friends will also get a bonus when they join.",
    },
    {
      question: "What is AI Protection?",
      answer:
        "AI Protection is our core security feature that uses machine learning algorithms to analyze transaction patterns, detect anomalies, and prevent unauthorized access. It continuously monitors your wallet activities and adapts to new threat vectors to keep your assets safe.",
    },
    {
      question: "When will NexsoQurity launch officially?",
      answer:
        "We're currently in a testing phase with our community of early adopters. The official mainnet launch is planned for Q4 2023, when all features will be available and $NEXQ tokens will be replaced with our official cryptocurrency.",
    },
    {
      question: "How do I transfer tokens to other users?",
      answer:
        "You can transfer tokens to other users by going to the Transactions page, entering the recipient's wallet address, specifying the amount, and confirming the transaction. All transfers are processed securely and nearly instantaneously.",
    },
    {
      question: "Is two-factor authentication (2FA) required?",
      answer:
        "While 2FA is not mandatory, we strongly recommend enabling it for enhanced security. It adds an extra layer of protection by requiring a second verification method in addition to your password when accessing your account.",
    },
    {
      question: "How does the quantum-resistant encryption work?",
      answer:
        "Our quantum-resistant encryption uses post-quantum cryptographic algorithms designed to withstand attacks from both classical and quantum computers. This forward-thinking approach ensures your assets remain secure even as quantum computing technology advances.",
    },
  ]

  return (
    <div className="relative z-20 min-h-[calc(100vh-4rem)] py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-fuchsia-500 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">Find answers to common questions about NexsoQurity</p>
        </header>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-black/40 backdrop-blur-md rounded-lg border border-gray-800 p-6">
              <h3 className="text-xl font-semibold text-white mb-3">{faq.question}</h3>
              <p className="text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Still have questions?</h2>
          <p className="text-gray-300 mb-6">
            Our support team is ready to help you with any questions or issues you might have.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="mailto:support@nexsoqurity.com"
              className="bg-black/40 backdrop-blur-md rounded-lg border border-gray-800 py-3 px-6 text-white hover:bg-gray-800/50 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="#"
              className="bg-gradient-to-r from-teal-500 to-fuchsia-600 hover:from-teal-600 hover:to-fuchsia-700 rounded-lg py-3 px-6 text-white transition-colors"
            >
              Join Discord Community
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
