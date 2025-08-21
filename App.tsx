
import React, { useState, useEffect, useRef } from 'react';
import { galleryImages } from './gallery-images';

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
                                <NavLink href="#" page="consent" isPrimary={false}>Consent</NavLink>
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
                        <MobileNavLink href="#" page="consent">Consent Form</MobileNavLink>
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

const SignaturePad: React.FC<{ onEnd: (dataUrl: string) => void, onClear: () => void }> = ({ onEnd, onClear }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const isDrawingRef = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // For high-DPI displays
        const scale = window.devicePixelRatio;
        canvas.width = canvas.offsetWidth * scale;
        canvas.height = canvas.offsetHeight * scale;
        
        const context = canvas.getContext("2d");
        if (!context) return;
        
        context.scale(scale, scale);
        context.lineCap = "round";
        context.strokeStyle = "white";
        context.lineWidth = 2;
        contextRef.current = context;
    }, []);

    const getCoords = (event: React.MouseEvent | React.TouchEvent): {x: number, y: number} | undefined => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        if ('touches' in event.nativeEvent) {
             return {
                x: event.nativeEvent.touches[0].clientX - rect.left,
                y: event.nativeEvent.touches[0].clientY - rect.top
            };
        }
        return {
            x: event.nativeEvent.clientX - rect.left,
            y: event.nativeEvent.clientY - rect.top
        };
    };

    const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
        const context = contextRef.current;
        const coords = getCoords(event);
        if (!context || !coords) return;
        
        context.beginPath();
        context.moveTo(coords.x, coords.y);
        isDrawingRef.current = true;
    };

    const stopDrawing = () => {
        const context = contextRef.current;
        if (!context) return;

        context.closePath();
        isDrawingRef.current = false;
        
        const canvas = canvasRef.current;
        if (canvas) {
            onEnd(canvas.toDataURL('image/png'));
        }
    };

    const draw = (event: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawingRef.current) {
            return;
        }
        event.preventDefault();
        
        const context = contextRef.current;
        const coords = getCoords(event);
        if (!context || !coords) return;
        
        context.lineTo(coords.x, coords.y);
        context.stroke();
    };

    const handleClear = () => {
        const canvas = canvasRef.current;
        const context = contextRef.current;
        if (canvas && context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            onClear();
        }
    };

    return (
        <div className="w-full">
            <div className="relative w-full h-48 bg-zinc-800 border-2 border-dashed border-zinc-600 rounded-lg overflow-hidden touch-none">
                <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 w-full h-full"
                    onMouseDown={startDrawing}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onMouseMove={draw}
                    onTouchStart={startDrawing}
                    onTouchEnd={stopDrawing}
                    onTouchMove={draw}
                />
            </div>
            <button type="button" onClick={handleClear} className="w-full mt-2 bg-zinc-700 text-white uppercase font-bold tracking-widest py-2 px-6 hover:bg-zinc-600 transition-colors duration-300 text-sm rounded-md">
                Clear Signature
            </button>
        </div>
    );
};

const CameraModal: React.FC<{ onCapture: (dataUrl: string) => void; onClose: () => void; }> = ({ onCapture, onClose }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: 'environment' } 
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                streamRef.current = stream;
            } catch (err) {
                console.error("Error accessing camera:", err);
                setError("Could not access camera. Please check your browser/system permissions and try again.");
            }
        };

        startCamera();

        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const handleCaptureClick = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            if (context) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
                onCapture(dataUrl);
            }
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4" role="dialog" aria-modal="true">
            <div className="bg-zinc-900 rounded-lg p-4 max-w-2xl w-full relative border border-zinc-700 shadow-2xl">
                <h3 className="text-xl text-center text-white mb-4 font-semibold">Position your ID within the frame</h3>
                {error ? (
                    <div className="aspect-video bg-zinc-800 flex items-center justify-center rounded-md">
                        <p className="text-red-500 text-center max-w-sm">{error}</p>
                    </div>
                ) : (
                    <div className="relative aspect-video">
                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-contain rounded-md bg-black"></video>
                        <div className="absolute inset-0 border-4 border-dashed border-white/50 rounded-md pointer-events-none"></div>
                    </div>
                )}
                <canvas ref={canvasRef} className="hidden"></canvas>
                <div className="flex justify-center items-center gap-4 mt-4">
                    <button type="button" onClick={onClose} className="bg-zinc-700 text-white uppercase font-bold tracking-widest py-3 px-8 hover:bg-zinc-600 transition-colors duration-300 text-lg rounded-md">
                        Cancel
                    </button>
                    <button type="button" onClick={handleCaptureClick} disabled={!!error} className="bg-red-700 text-white uppercase font-bold tracking-widest py-3 px-8 hover:bg-red-600 transition-colors duration-300 text-lg rounded-md disabled:bg-red-900 disabled:cursor-not-allowed">
                        Take Picture
                    </button>
                </div>
            </div>
        </div>
    );
};

const ConsentFormPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        dob: '',
        phone: '',
        email: '',
        tattooDescription: '',
        tattooPlacement: '',
    });
    const [consents, setConsents] = useState({
        isOfAge: false,
        isSober: false,
        disclosedConditions: false,
        understandsVariations: false,
        understandsPermanence: false,
        receivedAftercare: false,
        releaseOfLiability: false,
    });
    const [signature, setSignature] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [idFront, setIdFront] = useState<string | null>(null);
    const [idBack, setIdBack] = useState<string | null>(null);
    const [showCamera, setShowCamera] = useState(false);
    const [cameraTarget, setCameraTarget] = useState<'front' | 'back' | null>(null);

    const allConsentsChecked = Object.values(consents).every(Boolean);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.fullName) newErrors.fullName = "Full name is required.";
        if (!formData.dob) {
            newErrors.dob = "Date of birth is required.";
        } else {
            const birthDate = new Date(formData.dob);
            const age = new Date().getFullYear() - birthDate.getFullYear();
            const m = new Date().getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && new Date().getDate() < birthDate.getDate())) {
                if(age -1 < 18) newErrors.dob = "You must be at least 18 years old.";
            } else {
                if (age < 18) newErrors.dob = "You must be at least 18 years old.";
            }
        }
        if (!formData.email) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid.";
        if (!formData.phone) newErrors.phone = "Phone number is required.";
        if (!idFront || !idBack) newErrors.id = "Photos of the front and back of your ID are required.";
        if (!formData.tattooDescription) newErrors.tattooDescription = "Tattoo description is required.";
        if (!formData.tattooPlacement) newErrors.tattooPlacement = "Tattoo placement is required.";
        if (!allConsentsChecked) newErrors.consents = "You must agree to all terms.";
        if (!signature) newErrors.signature = "Signature is required.";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form Submitted", { formData, consents, signature, idFront, idBack });
            setIsSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConsents({ ...consents, [e.target.name]: e.target.checked });
    };

    const handleTakePhoto = (target: 'front' | 'back') => {
        setCameraTarget(target);
        setShowCamera(true);
    };

    const handleCapture = (dataUrl: string) => {
        if (cameraTarget === 'front') {
            setIdFront(dataUrl);
        } else if (cameraTarget === 'back') {
            setIdBack(dataUrl);
        }
        setShowCamera(false);
        setCameraTarget(null);
    };

    if(isSubmitted) {
        return (
             <main className="pt-24">
                <Section id="consent-success" title="Submission Successful" subtitle="Thank you!">
                     <div className="max-w-4xl mx-auto bg-zinc-800/50 rounded-lg p-8 text-center animate-fade-in">
                        <h3 className="text-3xl font-pirata text-white tracking-wide">Your consent form has been received.</h3>
                        <p className="text-gray-300 mt-4 text-lg">We've received your information and look forward to seeing you for your appointment. If you have any questions, please don't hesitate to contact the studio.</p>
                        <button onClick={onBack} className="mt-8 bg-red-700 text-white uppercase font-bold tracking-widest py-3 px-8 hover:bg-red-600 transition-colors duration-300 text-lg rounded-md">
                            Back to Home
                        </button>
                    </div>
                </Section>
            </main>
        );
    }
    
    const consentItems = [
        { name: 'isOfAge', text: 'I confirm that I am over the age of 18.' },
        { name: 'isSober', text: 'I am not under the influence of alcohol or drugs.' },
        { name: 'disclosedConditions', text: 'I have informed my artist of any and all medical conditions that may affect the healing of my tattoo (e.g., allergies, skin conditions, pregnancy).' },
        { name: 'understandsVariations', text: 'I understand that variations in color and design may exist between the tattoo art I have selected and the final tattoo on my skin.' },
        { name: 'understandsPermanence', text: 'I acknowledge that a tattoo is a permanent change to my appearance and that there is no guarantee for its removal.' },
        { name: 'receivedAftercare', text: 'I acknowledge that I have been given the full opportunity to ask any and all questions about the procedure and have received detailed aftercare instructions.' },
        { name: 'releaseOfLiability', text: 'I release the artist and Corrupt Ink Tattoo Studio from any and all liabilities, claims, and demands of any kind, known or unknown, which may arise from the tattoo procedure.' },
    ];

    const formInputClasses = "block w-full bg-zinc-700 border border-zinc-600 rounded-lg py-3 px-4 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600";
    const formCheckboxClasses = "mt-1 h-5 w-5 flex-shrink-0 rounded border border-zinc-600 bg-zinc-700 accent-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 focus:ring-offset-zinc-800";

    return (
        <main className="pt-24">
            <Section id="consent" title="Tattoo Consent & Release Form" subtitle="Please read carefully and fill out completely">
                <form onSubmit={handleSubmit} noValidate className="max-w-4xl mx-auto bg-zinc-800/50 p-6 sm:p-8 rounded-lg space-y-8">
                    
                    {/* --- Client Information --- */}
                    <fieldset>
                        <legend className="text-xl font-bold text-white border-b border-zinc-700 pb-2 mb-6 w-full">Client Information</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="fullName" className="block text-gray-300 mb-2 font-bold">Full Name</label>
                                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required className={formInputClasses} />
                                {errors.fullName && <p className="mt-2 text-sm text-red-500">{errors.fullName}</p>}
                            </div>
                            <div>
                                <label htmlFor="dob" className="block text-gray-300 mb-2 font-bold">Date of Birth</label>
                                <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleInputChange} required className={formInputClasses} />
                                {errors.dob && <p className="mt-2 text-sm text-red-500">{errors.dob}</p>}
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-gray-300 mb-2 font-bold">Phone Number</label>
                                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required className={formInputClasses} />
                                {errors.phone && <p className="mt-2 text-sm text-red-500">{errors.phone}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-300 mb-2 font-bold">Email Address</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className={formInputClasses} />
                                {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
                            </div>
                        </div>
                    </fieldset>

                    {/* --- ID Verification --- */}
                    <fieldset>
                         <legend className="text-xl font-bold text-white border-b border-zinc-700 pb-2 mb-6 w-full">Identification Verification</legend>
                         <p className="text-gray-400 -mt-3 mb-6">Please provide a clear photo of the front and back of your government-issued ID.</p>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-300 mb-2 font-bold">Front of ID</label>
                                <div className="aspect-video bg-zinc-700 rounded-lg flex items-center justify-center p-1">
                                    {idFront ? (
                                        <img src={idFront} alt="Preview of front of ID" className="object-contain max-h-full max-w-full rounded-md" />
                                    ) : ( <p className="text-gray-400">Photo Required</p> )}
                                </div>
                                <button type="button" onClick={() => handleTakePhoto('front')} className="w-full mt-2 bg-zinc-700 text-white uppercase font-bold tracking-widest py-2 px-6 hover:bg-zinc-600 transition-colors duration-300 text-sm rounded-md">
                                    {idFront ? 'Retake Photo' : 'Take Photo'}
                                </button>
                            </div>
                             <div>
                                <label className="block text-gray-300 mb-2 font-bold">Back of ID</label>
                                <div className="aspect-video bg-zinc-700 rounded-lg flex items-center justify-center p-1">
                                     {idBack ? (
                                        <img src={idBack} alt="Preview of back of ID" className="object-contain max-h-full max-w-full rounded-md" />
                                    ) : ( <p className="text-gray-400">Photo Required</p> )}
                                </div>
                                <button type="button" onClick={() => handleTakePhoto('back')} className="w-full mt-2 bg-zinc-700 text-white uppercase font-bold tracking-widest py-2 px-6 hover:bg-zinc-600 transition-colors duration-300 text-sm rounded-md">
                                     {idBack ? 'Retake Photo' : 'Take Photo'}
                                </button>
                            </div>
                         </div>
                         {errors.id && <p className="mt-4 text-sm text-center text-red-500">{errors.id}</p>}
                    </fieldset>
                    
                    {/* --- Tattoo Information --- */}
                    <fieldset>
                        <legend className="text-xl font-bold text-white border-b border-zinc-700 pb-2 mb-6 w-full">Tattoo Information</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label htmlFor="tattooDescription" className="block text-gray-300 mb-2 font-bold">Brief Description of Tattoo</label>
                                <textarea id="tattooDescription" name="tattooDescription" value={formData.tattooDescription} onChange={handleInputChange} rows={4} required className={formInputClasses}></textarea>
                                {errors.tattooDescription && <p className="mt-2 text-sm text-red-500">{errors.tattooDescription}</p>}
                            </div>
                             <div>
                                <label htmlFor="tattooPlacement" className="block text-gray-300 mb-2 font-bold">Placement on Body</label>
                                <textarea id="tattooPlacement" name="tattooPlacement" value={formData.tattooPlacement} onChange={handleInputChange} rows={4} required className={formInputClasses}></textarea>
                                 {errors.tattooPlacement && <p className="mt-2 text-sm text-red-500">{errors.tattooPlacement}</p>}
                            </div>
                        </div>
                    </fieldset>

                    {/* --- Acknowledgements --- */}
                    <fieldset>
                        <legend className="text-xl font-bold text-white border-b border-zinc-700 pb-2 w-full">Acknowledgements & Consent</legend>
                        <div className="space-y-4 mt-6">
                            {consentItems.map(item => (
                                 <label key={item.name} className="flex items-start space-x-3 cursor-pointer">
                                    <input type="checkbox" name={item.name} checked={consents[item.name as keyof typeof consents]} onChange={handleConsentChange} required className={formCheckboxClasses} />
                                    <span className="text-gray-300">{item.text}</span>
                                </label>
                            ))}
                        </div>
                        {errors.consents && <p className="mt-4 text-sm text-center text-red-500">{errors.consents}</p>}
                    </fieldset>

                    {/* --- Signature --- */}
                     <fieldset>
                        <legend className="text-xl font-bold text-white mb-2">Digital Signature</legend>
                        <p className="text-gray-400 mb-3">By signing below, I agree that I have read and understood all parts of this consent and release form.</p>
                        <SignaturePad onEnd={setSignature} onClear={() => setSignature(null)} />
                        {errors.signature && <p className="mt-2 text-sm text-center text-red-500">{errors.signature}</p>}
                    </fieldset>

                    {/* --- Submission --- */}
                    <div className="flex flex-col items-center gap-6 pt-4">
                        <div className="w-full md:w-auto text-center">
                            <button 
                                type="submit" 
                                disabled={!idFront || !idBack}
                                className="w-full md:w-auto bg-red-700 text-white uppercase font-bold tracking-widest py-4 px-12 hover:bg-red-600 transition-colors duration-300 text-xl rounded-md disabled:bg-zinc-600 disabled:text-gray-400 disabled:cursor-not-allowed"
                            >
                                Submit Form
                            </button>
                            {(!idFront || !idBack) && (
                                <p className="text-yellow-500 text-sm mt-2">
                                    Please upload photos of your ID to submit.
                                </p>
                            )}
                        </div>
                         <button type="button" onClick={onBack} className="w-full md:w-auto bg-zinc-700 text-white uppercase font-bold tracking-widest py-3 px-8 hover:bg-zinc-600 transition-colors duration-300 text-lg rounded-md">
                            Back to Home
                        </button>
                    </div>

                </form>
            </Section>
            {showCamera && <CameraModal onCapture={handleCapture} onClose={() => setShowCamera(false)} />}
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
        </main>
      )}
      {currentPage === 'faq' && <FAQPage onBack={() => setCurrentPage('home')} />}
      {currentPage === 'blog' && <BlogPage onBack={() => setCurrentPage('home')} />}
      {currentPage === 'consent' && <ConsentFormPage onBack={() => setCurrentPage('home')} />}
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App;
