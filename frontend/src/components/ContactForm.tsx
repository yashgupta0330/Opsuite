"use client";
import { ChangeEvent, FormEvent, useState } from "react";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  howDidYouHear: string;
  message: string;
}

export default function ContactForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    howDidYouHear: "",
    message: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Use Next.js API proxy route to avoid CORS issues
      const res = await fetch('/api/strapi/contact-forms', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: form }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error?.message || "Failed to submit");

      setSuccess(true);
      setForm({ firstName: "", lastName: "", email: "", phone: "", howDidYouHear: "", message: "" });
      setTimeout(() => onClose(), 2500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-300">
      {/* Background Glow Effect */}
      <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] -top-10 -left-10" />
      <div className="absolute w-72 h-72 bg-indigo-500/20 rounded-full blur-[100px] -bottom-10 -right-10" />

      <div className="bg-white border border-slate-100 shadow-2xl rounded-4xl w-full max-w-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all z-10"
        >
          <span className="text-xl">×</span>
        </button>

        <div className="p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Get in touch</h2>
            <p className="text-slate-500 mt-2">We usually respond within 24 hours.</p>
          </div>

          {success ? (
            <div className="py-12 text-center animate-in zoom-in-95">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
              <h3 className="text-xl font-bold text-slate-900">Message sent successfully!</h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">First Name *</label>
                  <input
                    required
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-transparent border-2 rounded-2xl px-4 py-3 text-black focus:bg-white focus:border-blue-500 focus:ring-0 outline-none transition-all placeholder:text-slate-300"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Last Name *</label>
                  <input
                    required
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-transparent border-2 rounded-2xl px-4 py-3 text-black focus:bg-white focus:border-blue-500 focus:ring-0 outline-none transition-all placeholder:text-slate-300"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Contact Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Email *</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-transparent border-2 rounded-2xl px-4 py-3 text-black focus:bg-white focus:border-blue-500 focus:ring-0 outline-none transition-all placeholder:text-slate-300"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-transparent border-2 rounded-2xl px-4 py-3 text-black focus:bg-white focus:border-blue-500 focus:ring-0 outline-none transition-all placeholder:text-slate-300"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              {/* Selection Field */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">How did you hear about us?</label>
                <div className="relative">
                  <select
                    name="howDidYouHear"
                    value={form.howDidYouHear}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-transparent border-2 rounded-2xl px-4 py-3 text-black focus:bg-white focus:border-blue-500 focus:ring-0 outline-none transition-all appearance-none"
                  >
                    <option value="">Select an option</option>
                    <option value="Search Engine">Search Engine</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Friend/Colleague">Friend/Colleague</option>
                    <option value="Advertisement">Advertisement</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Message</label>
                <textarea
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border-transparent border-2 rounded-2xl px-4 py-3 text-black focus:bg-white focus:border-blue-500 focus:ring-0 outline-none transition-all placeholder:text-slate-300 resize-none"
                  placeholder="Tell us what you're thinking..."
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-600 text-sm rounded-2xl border border-red-100">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary-blue w-full flex items-center justify-center gap-2"
              >
                {loading && (
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {loading ? "Sending Message..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}