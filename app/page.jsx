"use client";

import HeroSection from "@/components/hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { faqs } from "@/data/faqs";
import { features } from "@/data/features";
import { howItWorks } from "@/data/howItWorks";
import { testimonial } from "@/data/testimonial";
import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById("hero")?.offsetHeight || 600;
      setShowVideo(window.scrollY > heroHeight - 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      
      <div id="hero">
        <HeroSection />
      </div>

      
      {showVideo && (
        <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-80 pointer-events-none transition-opacity duration-1000">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover blur-md brightness-[.4]"
          >
            <source src="/black.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      
      <section className="w-full py-16 md:py-24 lg:py-32 bg-black/60 backdrop-blur-md text-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            Powerful Features for Your Career Growth
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="bg-black/40 border border-yellow-500 transition">
                <CardContent className="pt-6 text-center">
                  <div className="flex flex-col items-center justify-center">
                    {feature.icon}
                    <h3 className="text-xl font-semibold mt-4 mb-2 text-yellow-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm max-w-xs">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 lg:py-32 bg-black/60 backdrop-blur-md text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-6">
              How It Works
            </h2>
            <p className="text-lg">
              Four Simple Steps to Accelerate Your Career Growth
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-5 p-6 bg-yellow-800/30 rounded-lg hover:scale-95 transition-transform"
              >
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-2xl">{item.title}</h3>
                <p className="font-bold text-lg">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="w-full py-16 md:py-24 lg:py-32 bg-black/60 backdrop-blur-md text-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            What Our Users Say — Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonial.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-black/50 border border-emerald-400 hover:border-emerald-300 transition"
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative h-12 w-12 flex-shrink-0">
                        <Image
                          width={40}
                          height={40}
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="rounded-full object-cover border-2 border-emerald-500/50"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-lg text-emerald-400">
                          {testimonial.author}
                        </p>
                        <p className="text-sm">{testimonial.role}</p>
                        <p className="text-sm text-emerald-200">{testimonial.company}</p>
                      </div>
                    </div>
                    <blockquote>
                      <p className="italic text-orange-200 relative text-lg mt-4">
                        <span className="text-3xl absolute -top-6 -left-2">“</span>
                        {testimonial.quote}
                        <span className="text-3xl absolute -bottom-6 -right-2">”</span>
                      </p>
                    </blockquote>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      
      <section className="w-full py-16 md:py-24 lg:py-32 bg-black/60 backdrop-blur-md text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-lg mt-4">
              Find Answers to Common Questions About Our Platform
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      
      <section className="w-full relative bg-black/80 text-white py-28 px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-white to-yellow-500">
          Ready to Enter the Horizon of Career Growth?
        </h2>
        <p className="text-lg max-w-xl mx-auto mb-10 text-gray-300">
          Step beyond the limits of ordinary. Dive into a journey where opportunity bends space and time—your future awaits.
        </p>
        <Link href="/dashboard" passHref>
          <Button
            size="lg"
            variant="secondary"
            className="relative px-8 py-4 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-200 to-white text-black font-bold text-lg shadow-[0_0_20px_#fff4] hover:scale-105 transition-all duration-700"
          >
            <span className="relative z-10 flex items-center">
              Start Your Journey Today
              <ArrowRightCircle className="ml-3 h-5 w-5" />
            </span>
          </Button>
        </Link>
      </section>
    </div>
  );
}
