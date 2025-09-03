import React, { useState, useEffect, useRef } from "react";
import bgImage from "../../assets/Images/petsync-logo.png";

type InputStep = "name" | "email" | "phone" | "message";
const steps: InputStep[] = ["name", "email", "phone", "message"];

const prompts: Record<InputStep, string> = {
  name: "Enter your Name:",
  email: "Enter your Email:",
  phone: "Enter your Phone Number:",
  message: "What can we help you with?",
};

interface LogoProps {
  top: number;
  left: number;
  size: number;
  opacity: number;
  delay: number;
  offsetX: number;
  offsetY: number;
}

const TerminalContactForm: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [inputs, setInputs] = useState<Record<InputStep, string>>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [currentInput, setCurrentInput] = useState<string>("");

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseRef = useRef({ x: 0, y: 0 });
  const [logos, setLogos] = useState<LogoProps[]>([]);

  const labels: Record<InputStep, string> = {
    name: "Your Name:",
    email: "Your Email:",
    phone: "Your Phone:",
    message: "Message:",
  };


  useEffect(() => {
    inputRef.current?.focus();
  }, [messages]);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // Generate logos
  useEffect(() => {
    const generated: LogoProps[] = [];
    const minGap = 15; // Minimum distance (%) between logos

    const isFarEnough = (top: number, left: number) => {
      return !generated.some(
        (logo) =>
          Math.abs(logo.top - top) < minGap &&
          Math.abs(logo.left - left) < minGap
      );
    };

    while (generated.length < 17) {
      const top = Math.random() * 100;
      const left = Math.random() * 90;

      if (isFarEnough(top, left)) {
        generated.push({
          top,
          left,
          size: 16 + Math.random() * 40,
          opacity: 0.1 + Math.random() * 0.3,
          delay: Math.random() * 3,
          offsetX: 0,
          offsetY: 0,
        });
      }
    }

    setLogos(generated);
  }, []);


  const handleMouseMove = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  useEffect(() => {
    const animate = () => {
      setLogos((prev) =>
        prev.map((logo) => {
          const container = containerRef.current;
          if (!container) return logo;

          const logoX = (logo.left / 100) * container.offsetWidth;
          const logoY = (logo.top / 100) * container.offsetHeight;

          const dx = logoX - mouseRef.current.x;
          const dy = logoY - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const maxDistance = 100;
          const maxOffset = 25;

          let targetX = 0;
          let targetY = 0;

          if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * maxOffset;
            targetX = (dx / distance) * force;
            targetY = (dy / distance) * force;
          }

          const lerp = (start: number, end: number, factor: number) =>
            start + (end - start) * factor;

          return {
            ...logo,
            offsetX: lerp(logo.offsetX, targetX, 0.08),
            offsetY: lerp(logo.offsetY, targetY, 0.08),
          };
        })
      );
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  const handleEnter = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep >= steps.length) return;

    const step = steps[currentStep];
    const value = currentInput.trim();
    if (!value) return;

    // Validation
    if (step === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        alert("Please enter a valid email address.");
        return;
      }
    }

    if (step === "phone") {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(value)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
      }
    }

    // Add message with label
    setMessages((prev) => [...prev, `${labels[step]} ${value}`]);
    setInputs((prev) => ({ ...prev, [step]: value }));
    setCurrentInput("");

    // Move to next step
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setMessages((prev) => [...prev, "✅ Ready to submit or reset."]);
      setCurrentStep(steps.length);
    }
  };

  return (
    <div
      className="w-full min-h-fit relative flex flex-col items-center justify-start p-6 font-mono text-black"
      onMouseMove={handleMouseMove}
    >
      {/* Title outside */}
      <h1 className="text-xl md:text-3xl font-bold mb-8 text-white drop-shadow-lg">
        Welcome to PetSync Contact Form
      </h1>


      {/* Floating logos */}
      {logos.map((logo, idx) => (
        <img
          key={idx}
          src={bgImage}
          alt="bg logo"
          className="absolute pointer-events-none animate-blink-logo transition-transform duration-300"
          style={{
            top: `${logo.top}%`,
            left: `${logo.left}%`,
            width: `${logo.size}px`,
            height: `${logo.size}px`,
            opacity: logo.opacity,
            filter: "blur(2px)",
            transform: `translate(${logo.offsetX}px, ${logo.offsetY}px)`,
            animationDelay: `${logo.delay}s`,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-black/20"></div>

      {/* Glassy terminal form */}
      <div className="relative w-full max-w-2xl min-h-[10vh] bg-white/30 backdrop-blur-lg border border-white/40 rounded-xl shadow-lg p-6 flex flex-col">
        <div ref={containerRef} className="flex-1 overflow-y-auto space-y-1 mb-2">
          {messages.map((msg, idx) => (
            <div key={idx} className="whitespace-pre-wrap text-white">
              {msg}
            </div>
          ))}

          {currentStep < steps.length && (
            <form onSubmit={handleEnter} className="flex items-center w-full mt-1">
              <span className="mr-2 text-green-400">{">"}</span>

              {steps[currentStep] === "message" ? (
                <textarea
                  ref={(el) => { inputRef.current = el; }}
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleEnter(e);
                    }
                  }}
                  className="flex-1 bg-white/50 text-black outline-none border border-white/30 p-2 rounded resize-none placeholder-gray-800"
                  placeholder={prompts[steps[currentStep]]}
                  rows={3}
                />
              ) : (
                <input
                  ref={(el) => { inputRef.current = el; }}
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  className="flex-1 bg-white/50 text-black outline-none border-b border-white/30 p-2 placeholder-gray-800"
                  placeholder={prompts[steps[currentStep]]}
                  autoFocus
                />
              )}

              <span className="ml-1 text-green-400 animate-blink">█</span>
              <button
                type="submit"
                className="ml-2 px-3 py-1 bg-white/40 text-black font-semibold rounded hover:bg-white/60 transition"
              >
                Enter
              </button>
            </form>
          )}
        </div>

        {currentStep >= steps.length && (
          <div className="flex gap-4 mt-2">
            <button
              onClick={() => alert("Form submitted successfully!")}
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-500 transition"
            >
              Send
            </button>
            <button
              onClick={() => {
                setMessages([]);
                setInputs({ name: "", email: "", phone: "", message: "" });
                setCurrentStep(0);
                setCurrentInput("");
              }}
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-500 transition"
            >
              Reset
            </button>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes blink {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0; }
          }
          .animate-blink { animation: blink 1s step-start infinite; }

          @keyframes blink-logo {
            0%, 50%, 100% { opacity: 0.1; }
            25%, 75% { opacity: 0.4; }
          }
          .animate-blink-logo { animation: blink-logo 2s infinite; }
        `}
      </style>
    </div>
  );
};

export default TerminalContactForm;
