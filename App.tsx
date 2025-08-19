
import React, { useState, useEffect } from 'react';
import { galleryImages } from './gallery-images';
import { GoogleGenAI } from "@google/genai";

// --- TYPES ---
interface Artist {
  id: number;
  name: string;
  specialty: string;
  imageUrl: string;
  bio: string;
}

interface FAQItem {
    question: string;
    answer: string;
}

interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  imageUrl: string;
  summary: string;
  content: string;
}

// --- MOCK DATA ---
const artists: Artist[] = [
    { 
        id: 1, 
        name: 'Thomas Darrow', 
        specialty: 'Black & Grey, Cartoon, Color, Neo Trad, Scratch Style Blackwork', 
        imageUrl: 'https://i.imgur.com/LEfKmIk.jpeg', 
        bio: 'As the sole artist and founder of Corrupt Ink, Thomas Darrow is a versatile tattooist with a passion for a wide range of styles. From bold color and cartoon work to intricate black and grey realism and edgy scratch style blackwork, Thomas brings a unique vision and meticulous skill to every piece.' 
    },
];

const faqData: FAQItem[] = [
    {
        question: "How do I take care of my new tattoo?",
        answer: "Follow the aftercare instructions provided by your artist precisely. Generally, this involves gently washing the tattoo with mild, unscented soap and water, patting it dry with a clean paper towel, and applying a thin layer of recommended aftercare ointment. Keep it clean and avoid soaking it in water for the first few weeks."
    },
    {
        question: "What are the detailed steps for tattoo healing?",
        answer: "Healing a tattoo properly is a multi-step process. Day 1: Leave the initial bandage on for the time your artist recommended (usually a few hours). After removing it, gently wash the tattoo with lukewarm water and a fragrance-free, mild soap. Pat it dry with a clean paper towel and let it air dry for a few minutes before applying a very thin layer of aftercare ointment. Days 2-3: Continue washing the tattoo 2-3 times a day, patting it dry, and applying a thin layer of ointment. The area might be red and slightly swollen. Days 4-14: The tattoo will begin to peel and itch. This is normal. Do NOT scratch or pick at it. Switch from ointment to a fragrance-free lotion to keep it moisturized. Apply lotion whenever it feels dry. Weeks 3-4: The top layer of skin should be healed, and most flaking will be done. The tattoo may look slightly dull as the deeper layers continue to heal. Keep it moisturized and protected from the sun. Full healing can take up to 6 months."
    },
    {
        question: "What should I avoid after getting a tattoo?",
        answer: "Avoid direct sunlight and tanning beds, as UV rays can fade the ink. Steer clear of swimming pools, hot tubs, oceans, and baths to prevent infection. Don't scratch or pick at the scabs, as this can pull out the ink and lead to scarring. Wear loose-fitting clothing over the new tattoo."
    },
    {
        question: "How long does a tattoo take to heal?",
        answer: "On the surface, a tattoo will typically heal within 2-4 weeks. However, the deeper layers of skin can take up to 6 months to fully regenerate. Be patient with the healing process and continue to care for your skin."
    },
    {
        question: "Is it normal for my tattoo to peel?",
        answer: "Yes, it's completely normal for a new tattoo to peel and flake, similar to a sunburn. This is part of the natural healing process. Do not pick at it; let the skin shed on its own."
    },
    {
        question: "Does getting a tattoo hurt?",
        answer: "Yes, there is some level of pain involved. However, the amount of pain varies greatly depending on the tattoo's location, size, and your personal pain tolerance. Most people describe the sensation as a constant scratching or stinging."
    },
    {
        question: "How much does a tattoo cost?",
        answer: "The cost depends on the size, complexity, detail, and placement of the tattoo, as as the artist's hourly rate. We provide a quote during the consultation. Remember, a good tattoo isn't cheap, and a cheap tattoo isn't good."
    },
    {
        question: "How should I prepare for my tattoo appointment?",
        answer: "Get a good night's sleep, eat a solid meal beforehand, and stay hydrated. Avoid alcohol and blood-thinning medications for at least 24 hours prior to your session. Wear comfortable clothing that allows easy access to the area being tattooed."
    }
];

const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: 'The Timeless Appeal of Neo Traditional Tattoos',
        author: 'Thomas Darrow',
        date: 'October 26, 2023',
        imageUrl: 'https://picsum.photos/seed/blog1/1200/800',
        summary: 'Dive deep into the world of Neo Traditional tattoos. Discover its history, key characteristics, and why it remains one of the most beloved styles in modern tattooing.',
        content: `Neo Traditional tattooing is a beautiful evolution of the classic American Traditional style. While it holds onto the core principles of its predecessor—bold lines, a limited but vibrant color palette, and iconic imagery like skulls, roses, and daggers—it introduces a level of detail and dimensionality that sets it apart.\n\nKey characteristics include illustrative qualities, more depth through shading and color blending, and a broader range of subject matter, often drawing from Art Nouveau and Art Deco aesthetics. The result is a tattoo that feels both classic and contemporary, rich with history yet perfectly suited for the modern collector. At Corrupt Ink, we have a deep respect for this style, blending its timeless rules with our own artistic vision to create pieces that are truly unique.`
    },
    {
        id: 2,
        title: 'Aftercare 101: Protecting Your Investment',
        author: 'Thomas Darrow',
        date: 'October 15, 2023',
        imageUrl: 'https://picsum.photos/seed/blog2/1200/800',
        summary: 'A new tattoo is an open wound and a piece of art. Proper aftercare is crucial for it to heal beautifully and stand the test of time. Here are the essentials.',
        content: `Getting the tattoo is only half the battle; the other half is healing it correctly. Your aftercare routine is the single most important factor in how your tattoo will look for years to come.\n\nFirst, always listen to your artist's specific instructions. Generally, you'll want to keep the tattoo clean with a mild, fragrance-free soap and lukewarm water. Pat it dry gently with a paper towel—don't rub it. Apply a very thin layer of the recommended aftercare ointment. Too much ointment can suffocate the tattoo and clog pores.\n\nFor the first few weeks, avoid sun exposure, soaking in water (no pools, hot tubs, or baths), and picking at any scabs that form. Let the skin heal naturally. Your patience will be rewarded with a vibrant, sharp tattoo that you can be proud of for a lifetime.`
    },
    {
        id: 3,
        title: 'From Concept to Skin: The Tattoo Design Process',
        author: 'Thomas Darrow',
        date: 'October 1, 2023',
        imageUrl: 'https://picsum.photos/seed/blog3/1200/800',
        summary: 'Ever wonder how a vague idea becomes a permanent piece of art on your body? We pull back the curtain on the collaborative journey of tattoo design.',
        content: `The journey of a tattoo begins long before the needle touches the skin. It starts with an idea, a feeling, or a story you want to tell.\n\n1.  **Consultation:** This is the most critical step. We sit down together and discuss your ideas, placement, size, and style. Bringing reference photos is incredibly helpful, but the goal isn't to copy; it's to find a direction. We'll talk about what the piece means to you, which helps us infuse it with the right emotion.\n\n2.  **Drawing & Refinement:** Based on our consultation, I'll create a custom design. This is where the artistic magic happens, translating our conversation into a visual concept. We'll review the design together, and you'll have the opportunity to request changes. We'll refine it until it's perfect.\n\n3.  **The Appointment:** Once the design is finalized, we schedule the tattoo session. I prepare the stencil, and we confirm the placement on your body. Only when you are 100% happy do we begin the process of making it permanent. It's a collaboration from start to finish.`
    }
];


// --- SVG ICONS ---
const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ArrowUpIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
);

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);


// --- COMPONENTS ---

const Header: React.FC<{ setPage: (page: string) => void }> = ({ setPage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 200);
        return () => clearTimeout(timer);
    }, []);

    const handleNavClick = (page: string, href?: string) => {
        setPage(page);
        if (page === 'home' && href) {
            setTimeout(() => {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                } else if (href === '#home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 50);
        }
        setIsMenuOpen(false);
    };

    const navItems1 = [
        { name: 'Home', href: '#home' },
        { name: 'About Us', href: '#about' },
        { name: 'Artists', href: '#artists' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'Create', href: '#create' },
    ];
    
    const NavLink: React.FC<{ href: string, page: string, children: React.ReactNode, isPrimary?: boolean }> = ({ href, page, children, isPrimary = true }) => (
        <div className={`relative ${isPrimary ? 'bg-red-700' : 'bg-black'} transform -skew-x-12 hover:bg-red-600 transition-colors duration-300`}>
            <a href={href} onClick={(e) => { e.preventDefault(); handleNavClick(page, href); }} className="inline-block px-4 py-2 sm:px-6 sm:py-3 transform skew-x-12 text-white font-bold uppercase text-base tracking-wider">
                {children}
            </a>
        </div>
    );
    
    const MobileNavLink: React.FC<{href: string; page: string; children: React.ReactNode;}> = ({href, page, children}) => (
        <a href={href} onClick={(e) => { e.preventDefault(); handleNavClick(page, href); }} className="block py-3 px-4 text-center font-bold text-xl text-white hover:bg-red-700 transition-colors duration-300">
            {children}
        </a>
    );

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-80 backdrop-blur-sm shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">
                    <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home', '#home'); }} className={`flex-shrink-0 bg-black p-2 transition-opacity duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                       <h1 className="text-6xl md:text-7xl font-pirata tracking-widest cursor-pointer">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-orange-400">CORRUPT</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"> INK</span>
                        </h1>
                    </a>
                    <div className={`hidden lg:flex items-center space-x-1 transition-all duration-1000 ease-out delay-200 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}>
                        <div>
                            <div className="flex">
                                {navItems1.map(item => <NavLink key={item.name} href={item.href} page="home">{item.name}</NavLink>)}
                            </div>
                            <div className="flex justify-end mt-1">
                                <NavLink href="#" page="blog" isPrimary={false}>Blog</NavLink>
                                <NavLink href="#" page="faq" isPrimary={false}>FAQ</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="lg:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                            {isMenuOpen ? <CloseIcon className="h-8 w-8" /> : <MenuIcon className="h-8 w-8" />}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="lg:hidden bg-black bg-opacity-95 absolute top-24 left-0 right-0">
                    <nav className="flex flex-col">
                        {navItems1.map(item => (
                           <MobileNavLink key={item.name} href={item.href} page="home">
                                {item.name}
                            </MobileNavLink>
                        ))}
                         <MobileNavLink href="#" page="blog">Blog</MobileNavLink>
                        <MobileNavLink href="#" page="faq">FAQ</MobileNavLink>
                    </nav>
                </div>
            )}
        </header>
    );
};

const Hero: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="home" className="h-screen bg-cover bg-top flex items-center justify-center relative" style={{ backgroundImage: `url(https://i.imgur.com/mCs8pum.png)` }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="text-center z-10 p-4">
                <h2 className={`text-5xl md:text-7xl lg:text-8xl text-white font-pirata tracking-wider leading-tight transition-all duration-700 ease-out delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    Your Story in Ink
                </h2>
                <p className={`mt-4 text-2xl md:text-3xl text-gray-300 max-w-2xl mx-auto transition-all duration-700 ease-out delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    Where masterful artistry and personal expression converge. We don't just create tattoos, we craft legacies.
                </p>
                <a href="tel:5205548446" className={`mt-8 inline-block bg-red-700 text-white uppercase font-bold tracking-widest py-4 px-12 hover:bg-red-600 transition-colors duration-300 text-xl rounded-md shadow-lg transform hover:-translate-y-1 transition-all duration-700 ease-out delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    Book a Consultation
                </a>
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white animate-bounce">
                <a href="#about" aria-label="Scroll down">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </a>
            </div>
        </section>
    );
};

const Section: React.FC<{id: string, title: string, subtitle: string, children: React.ReactNode, bgClass?: string}> = ({id, title, subtitle, children, bgClass = 'bg-transparent'}) => (
    <section id={id} className={`py-20 md:py-28 ${bgClass}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
                 <h2 className="text-4xl md:text-5xl font-pirata text-white tracking-wider">{title}</h2>
                 <p className="mt-2 text-xl text-gray-400">{subtitle}</p>
                 <div className="mt-4 w-24 h-1 bg-red-700 mx-auto"></div>
            </div>
            {children}
        </div>
    </section>
);


const About: React.FC = () => (
    <Section id="about" title="The Studio" subtitle="Welcome to Corrupt Ink" bgClass="bg-black/20">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="lg:w-1/2">
                <img src="https://i.imgur.com/40NnMLj.png" alt="Inside Corrupt Ink studio" className="rounded-lg shadow-2xl" />
            </div>
            <div className="lg:w-1/2 text-xl text-gray-300 space-y-4 text-center lg:text-left">
                <p>
                    Established in 2013 in the heart of Tucson, AZ, Corrupt Ink was born from a passion for rebellion and fine art. We believe a tattoo is more than just ink on skin; it's a profound form of self-expression, a badge of honor, a memory immortalized. Our studio is a sanctuary for creativity, where your vision is our command.
                </p>
                <p>
                    We uphold the highest standards of safety and hygiene, using state-of-the-art equipment and single-use needles. Our artists are not just technicians; they are visionaries dedicated to their craft, continuously pushing the boundaries of what's possible in tattoo artistry. Come share your story with us.
                </p>
            </div>
        </div>
    </Section>
);

const Artists: React.FC = () => (
    <Section id="artists" title="The Artist" subtitle="Master of the Craft">
        <div className="flex justify-center">
            {artists.map(artist => (
                <div key={artist.id} className="bg-zinc-800/50 rounded-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 shadow-lg max-w-lg">
                    <img src={artist.imageUrl} alt={`Portrait of ${artist.name}`} className="w-full h-96 object-cover" />
                    <div className="p-8 text-center">
                        <h3 className="text-3xl font-pirata text-white tracking-wide">{artist.name}</h3>
                        <p className="text-red-500 font-bold mt-2 text-xl">{artist.specialty}</p>
                        <p className="text-gray-300 mt-4 text-lg">{artist.bio}</p>
                    </div>
                </div>
            ))}
        </div>
    </Section>
);

const Gallery: React.FC = () => (
    <Section id="gallery" title="Our Work" subtitle="A Glimpse into Our Portfolio" bgClass="bg-black/20">
        {galleryImages.length > 0 ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {galleryImages.map(image => (
                    <div key={image.id} className="overflow-hidden rounded-lg shadow-lg break-inside-avoid">
                        <img src={image.src} alt={image.alt} className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300" loading="lazy" />
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center text-gray-400 mt-8">
                <p className="text-xl">Our portfolio is currently being updated.</p>
                <p>Please check back soon to see our latest work!</p>
            </div>
        )}
    </Section>
);

const CreateTattoo: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    const [ideaPrompt, setIdeaPrompt] = useState('');
    const [generatedIdeas, setGeneratedIdeas] = useState<string | null>(null);
    const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);
    const [ideaError, setIdeaError] = useState<string | null>(null);
    
    const loadingMessages = [
        "Warming up the tattoo machine...",
        "Sketching your masterpiece...",
        "Mixing the perfect ink...",
        "Consulting the digital spirits...",
        "Bringing your vision to life..."
    ];

    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setCurrentMessageIndex(prevIndex => (prevIndex + 1) % loadingMessages.length);
            }, 2500);
            return () => clearInterval(interval);
        }
    }, [isLoading]);
    
    const handleGenerateIdeas = async () => {
        if (!ideaPrompt) {
            setIdeaError('Please enter a topic for ideas.');
            return;
        }
        setIsGeneratingIdeas(true);
        setIdeaError(null);
        setGeneratedIdeas(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Based on the concept "${ideaPrompt}", generate 3 distinct and creative tattoo ideas. For each idea, provide a short, evocative description. Format the response as a numbered list (e.g., "1. Idea description").`,
                config: {
                    systemInstruction: "You are an expert tattoo consultant specializing in symbolism and creative concepts. Provide thoughtful, inspiring, and concise ideas for tattoos. Your tone is knowledgeable, slightly edgy, and creative, matching the vibe of a high-end tattoo studio.",
                }
            });
            setGeneratedIdeas(response.text);
        } catch (err) {
            console.error(err);
            setIdeaError('The AI consultant is busy. Please try again in a moment.');
        } finally {
            setIsGeneratingIdeas(false);
        }
    };

    const parseAndRenderIdeas = (text: string) => {
        return text.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0 && /^\d+\./.test(line))
            .map((idea, index) => {
                const ideaText = idea.replace(/^\d+\.\s*/, '').trim();
                return (
                    <div key={index} className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-zinc-700/50 transition-colors">
                        <p className="text-gray-300 flex-grow text-lg">{idea}</p>
                        <button 
                            onClick={() => setPrompt(ideaText)}
                            className="bg-red-800 text-white text-sm font-bold py-1 px-2 rounded hover:bg-red-700 transition-colors flex-shrink-0"
                            title="Use this idea for the image generator"
                            aria-label={`Use idea: ${ideaText}`}
                        >
                            Use Idea
                        </button>
                    </div>
                );
            });
    };

    const handleGenerateClick = async () => {
        if (!prompt) {
            setError('Please describe the tattoo you want to create.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const fullPrompt = `A high-quality, detailed tattoo design of ${prompt}. The design must be centered on a clean, solid white background, suitable for a tattoo flash sheet.`;
            
            const response = await ai.models.generateImages({
                model: 'imagen-3.0-generate-002',
                prompt: fullPrompt,
                config: {
                  numberOfImages: 1,
                  outputMimeType: 'image/jpeg',
                  aspectRatio: '1:1',
                },
            });

            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
            setGeneratedImage(imageUrl);

        } catch (err) {
            console.error(err);
            setError('The AI is a bit busy. Please try again in a moment.');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePresetClick = (style: string) => {
        setPrompt(prev => prev ? `${prev}, in a ${style} style` : `A tattoo in a ${style} style`);
    };

    const presets = ["Neo Traditional", "Watercolor", "Realism", "Minimalist", "Black & Grey", "Japanese", "Cartoon", "Abstract"];

    return (
        <Section id="create" title="Create Your Tattoo" subtitle="Bring Your Vision to Life with AI">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="idea-prompt" className="block text-gray-300 mb-2 font-bold text-xl">1. Get Inspired</label>
                        <p className="text-gray-400 mb-3 text-base">Can't decide? Ask our AI consultant for ideas, concepts, or symbolism.</p>
                        <textarea
                            id="idea-prompt"
                            rows={3}
                            value={ideaPrompt}
                            onChange={(e) => setIdeaPrompt(e.target.value)}
                            placeholder="e.g., Tattoo ideas for a musician"
                            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                        />
                         <button 
                            onClick={handleGenerateIdeas} 
                            disabled={isGeneratingIdeas}
                            className="w-full mt-3 bg-zinc-700 text-white uppercase font-bold tracking-widest py-3 px-8 hover:bg-zinc-600 transition-colors duration-300 text-lg rounded-md disabled:bg-zinc-800 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                             {isGeneratingIdeas ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Consulting...
                                </>
                            ) : "Get Ideas"}
                        </button>
                        {ideaError && <p className="text-red-500 text-center font-semibold mt-2">{ideaError}</p>}
                    </div>
                    
                    {generatedIdeas && (
                        <div className="bg-zinc-800/50 p-4 rounded-lg space-y-2 animate-fade-in">
                            <h4 className="font-bold text-white mb-2 text-xl">AI Suggestions:</h4>
                            {parseAndRenderIdeas(generatedIdeas)}
                        </div>
                    )}

                    <div className="border-b border-zinc-700 my-4"></div>

                    <div>
                        <label htmlFor="prompt" className="block text-gray-300 mb-2 font-bold text-xl">2. Describe Your Design</label>
                        <textarea
                            id="prompt"
                            rows={5}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., A majestic lion wearing a crown of roses"
                            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-3 font-bold text-xl">3. Add a Style:</label>
                        <div className="flex flex-wrap gap-3">
                            {presets.map(preset => (
                                <button key={preset} onClick={() => handlePresetClick(preset.toLowerCase())} className="bg-zinc-700 text-white py-2 px-4 rounded-md hover:bg-zinc-600 transition-colors text-base">
                                    {preset}
                                </button>
                            ))}
                        </div>
                    </div>
                     <button 
                        onClick={handleGenerateClick} 
                        disabled={isLoading}
                        className="w-full bg-red-700 text-white uppercase font-bold tracking-widest py-4 px-12 hover:bg-red-600 transition-colors duration-300 text-xl rounded-md disabled:bg-red-900 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating...
                            </>
                        ) : "Generate Ink"}
                    </button>
                    {error && <p className="text-red-500 text-center font-semibold mt-4">{error}</p>}
                </div>

                <div className="aspect-square bg-zinc-800/50 rounded-lg flex items-center justify-center p-4 border-2 border-dashed border-zinc-700">
                    {isLoading && (
                        <div className="text-center">
                             <div className="w-16 h-16 border-4 border-red-500 border-dashed rounded-full animate-spin mx-auto"></div>
                             <p className="mt-4 text-white text-xl font-semibold">{loadingMessages[currentMessageIndex]}</p>
                        </div>
                    )}
                    {!isLoading && !generatedImage && (
                        <div className="text-center text-gray-400">
                           <p className="text-3xl font-pirata">Your AI Tattoo Awaits</p>
                           <p className="text-lg">Describe your design and click "Generate Ink" to see it here.</p>
                        </div>
                    )}
                    {generatedImage && (
                        <img src={generatedImage} alt="AI generated tattoo design" className="w-full h-full object-contain rounded-md" />
                    )}
                </div>
            </div>
        </Section>
    );
};

const FAQPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <main className="pt-24">
            <Section id="faq" title="Frequently Asked Questions" subtitle="Your Guide to Tattoos">
                <div className="max-w-4xl mx-auto space-y-4">
                    {faqData.map((item, index) => (
                        <div key={index} className="bg-zinc-800/50 rounded-lg overflow-hidden transition-all duration-300">
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex justify-between items-center p-5 md:p-6 text-left focus:outline-none"
                                aria-expanded={openIndex === index}
                            >
                                <h3 className="text-xl font-semibold text-white">{item.question}</h3>
                                <ChevronDownIcon className={`w-6 h-6 text-red-500 transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                               <div className="px-5 md:px-6 pb-5 text-gray-300 text-lg">
                                   <p>{item.answer}</p>
                               </div>
                            </div>
                        </div>
                    ))}
                </div>
                 <div className="text-center mt-12">
                    <button onClick={onBack} className="bg-red-700 text-white uppercase font-bold tracking-widest py-3 px-8 hover:bg-red-600 transition-colors duration-300 text-lg">
                        Back to Home
                    </button>
                </div>
            </Section>
        </main>
    );
};

const BlogPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [selectedPost]);

    // If a post is selected, show the article view
    if (selectedPost) {
        return (
            <main className="pt-24 animate-fade-in">
                <Section id="article" title={selectedPost.title} subtitle={`By ${selectedPost.author} on ${selectedPost.date}`}>
                    <div className="max-w-4xl mx-auto">
                        <img src={selectedPost.imageUrl} alt={selectedPost.title} className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-2xl mb-8" />
                        <div className="text-lg text-gray-300 space-y-6 whitespace-pre-line prose prose-invert prose-xl max-w-none">
                            <p>{selectedPost.content}</p>
                        </div>
                        <div className="flex justify-center items-center gap-4 mt-12">
                            <button onClick={() => setSelectedPost(null)} className="bg-zinc-700 text-white uppercase font-bold tracking-widest py-3 px-8 hover:bg-zinc-600 transition-colors duration-300 text-lg">
                                Back to Blog
                            </button>
                             <button onClick={onBack} className="bg-red-700 text-white uppercase font-bold tracking-widest py-3 px-8 hover:bg-red-600 transition-colors duration-300 text-lg">
                                Back to Home
                            </button>
                        </div>
                    </div>
                </Section>
            </main>
        );
    }

    // Otherwise, show the list of blog posts
    return (
        <main className="pt-24">
            <Section id="blog" title="Corrupt Ink Blog" subtitle="Stories, Insights, and Aftercare">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map(post => (
                        <div key={post.id} className="bg-zinc-800/50 rounded-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 shadow-lg flex flex-col">
                            <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover" />
                            <div className="p-6 flex flex-col flex-grow">
                                <p className="text-base text-gray-400">{post.date} &bull; {post.author}</p>
                                <h3 className="text-2xl font-pirata text-white tracking-wide mt-2">{post.title}</h3>
                                <p className="text-gray-300 mt-4 text-lg flex-grow">{post.summary}</p>
                                <button
                                    onClick={() => setSelectedPost(post)}
                                    className="mt-6 self-start bg-red-700 text-white uppercase font-bold tracking-widest py-2 px-6 hover:bg-red-600 transition-colors duration-300 text-base"
                                >
                                    Read More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                 <div className="text-center mt-12">
                    <button onClick={onBack} className="bg-red-700 text-white uppercase font-bold tracking-widest py-3 px-8 hover:bg-red-600 transition-colors duration-300 text-lg">
                        Back to Home
                    </button>
                </div>
            </Section>
        </main>
    );
};


const Footer: React.FC = () => (
    <footer className="bg-black py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
             <h3 className="text-2xl md:text-3xl font-pirata tracking-widest cursor-pointer text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-orange-400">CORRUPT</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"> INK</span>
            </h3>
            <p className="mt-4">Tucson, Arizona</p>
            <p>(520) 554-8446 | corruptink@gmail.com</p>
            <div className="flex justify-center space-x-6 mt-6">
                <a href="https://www.facebook.com/drake.hunter.3785/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg></a>
                <a href="https://www.instagram.com/mindofdarrow/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.793 2.013 10.147 2 12.315 2zm-1.161 1.043c-2.43.0-2.757.01-3.722.057-.965.045-1.604.207-2.182.418a3.902 3.902 0 00-1.427 1.427c-.21.578-.373 1.217-.418 2.182-.046.965-.057 1.292-.057 3.722s.01 2.757.057 3.722c.045.965.207 1.604.418 2.182a3.902 3.902 0 001.427 1.427c.578.21 1.217.373 2.182.418.965.046 1.292.057 3.722.057s2.757-.01 3.722-.057c.965-.045 1.604-.207 2.182-.418a3.902 3.902 0 001.427-1.427c.21-.578.373-1.217.418-2.182.046.965.057-1.292.057-3.722s-.01-2.757-.057-3.722c-.045-.965-.207-1.604-.418-2.182a3.902 3.902 0 00-1.427-1.427c-.578-.21-1.217-.373-2.182-.418-.965-.046-1.292-.057-3.722-.057z" clipRule="evenodd"></path><path d="M12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm-3.135 5.135a3.135 3.135 0 116.27 0 3.135 3.135 0 01-6.27 0z"></path></svg></a>
            </div>
            <p className="mt-8 text-base">&copy; {new Date().getFullYear()} Corrupt Ink Tattoo Studio. All Rights Reserved.</p>
        </div>
    </footer>
);

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <button
            type="button"
            onClick={scrollToTop}
            className={`fixed bottom-5 right-5 z-50 p-3 rounded-full bg-red-700 text-white shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-zinc-900 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
            <ArrowUpIcon className="h-6 w-6 transform -rotate-180" />
        </button>
    );
};


function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="bg-zinc-900 text-gray-200">
      <Header setPage={setCurrentPage} />
      {currentPage === 'home' && (
        <main>
            <Hero />
            <About />
            <Artists />
            <Gallery />
            <CreateTattoo />
        </main>
      )}
      {currentPage === 'faq' && <FAQPage onBack={() => setCurrentPage('home')} />}
      {currentPage === 'blog' && <BlogPage onBack={() => setCurrentPage('home')} />}
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App;
