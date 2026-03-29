function FAQ() {
  const faqs = [
    {
      question: "How do I report a lost item?",
      answer:
        "Go to the homepage and click on 'Report an Item', then select Type lost, and fill in the details.",
    },
    {
      question: "How do I report a found item?",
      answer:
        "Go to the homepage and click on 'Report an Item', then select Type found, and fill in the details.",
    },
    {
      question: "Do I need an account?",
      answer:
        "Yes, creating an account helps you manage your reports and contact others.",
    },
    {
      question: "Is this service free?",
      answer: "Yes, the platform is completely free for all users.",
    },
  ];

  return (
    <div className="min-h-screen px-6 py-20 flex justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold my-10 text-center text-[#fe9a14]">
          Frequently Asked Questions
        </h1>

        <div className="flex flex-col gap-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[#e9e9e9] p-5 rounded-xl shadow">
              <h2 className="font-semibold text-lg mb-2 text-[#024943]">
                {faq.question}
              </h2>
              <p className="text-gray-400 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default FAQ;
