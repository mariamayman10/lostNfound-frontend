export default function Footer() {
  return (
    <footer className="bg-[#e9e9e9] text-[#024943] py-8 px-6 mt-auto">
      <div className="max-w-6xl mx-auto flex justify-between items-center gap-6">
        <div className="text-xl font-semibold">LostNFound</div>
        <div className="flex gap-6 text-sm">
          <a href="/faq" className="hover:text-gray-400 transition">
            FAQ
          </a>
          <a href="/contact-us" className="hover:text-gray-400 transition">
            Contact Us
          </a>
        </div>
      </div>
      <div className="border-t border-[#024943]-700 my-6"></div>
      <p className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} LostNFound. All rights reserved.
      </p>
    </footer>
  );
}
