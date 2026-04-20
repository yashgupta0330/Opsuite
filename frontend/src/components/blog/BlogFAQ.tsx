'use client';
import { useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';


interface FAQItem {
    question: string;
    answer: string | string[];
}

export const BlogFAQ = ({ faqs }: { faqs: FAQItem[] }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-12 lg:py-20 bg-theme-fade-white">
            <div className="container-fluid-blog">
                <div className="flex flex-col lg:flex-row items-start gap-12">
                    {/* Left: Image & Title */}
                    <div className="w-full lg:w-5/12 sticky top-24">
                        <span className="text-[#1C6DBE] font-semibold text-[1rem] mb-2 block">Have Queries?</span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-system-black mb-8">Frequently Asked Questions</h2>
                        <div className="relative w-full max-w-[320px] hidden lg:block">
                            {/* Use a placeholder since the requested image might not exist yet */}
                            <div className="w-full h-[320px] bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                                <span className="text-center">FAQ Image<br />/assets/img/main/blog_faq.png</span>
                            </div>
                        </div>
                    </div>
                    {/* Right: Accordion */}
                    <div className="w-full lg:w-7/12">
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-white rounded-[12px] overflow-hidden border border-[#ebebeb]">
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="w-full px-6 py-4 text-left flex justify-between items-center bg-white transition-colors hover:bg-gray-50"
                                    >
                                        <span className="text-[16px] lg:text-[18px] font-semibold text-system-black pr-4">
                                            {faq.question}
                                        </span>
                                        <span className={`transform transition-transform duration-300 text-2xl ${activeIndex === index ? 'rotate-180' : ''}`}>
                                            ↓
                                        </span>
                                    </button>

                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${activeIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        <div className="px-6 pb-6 pt-0 text-[#666] leading-[1.6]">
                                            {Array.isArray(faq.answer) ? (
                                                <ul className="list-disc pl-5 space-y-2">
                                                    {faq.answer.map((ans, i) => <li key={i}>{ans}</li>)}
                                                </ul>
                                            ) : (
                                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(faq.answer as string) }} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
