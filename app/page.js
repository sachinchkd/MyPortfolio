"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from 'react';
import useMeasure from "react-use-measure";
import Typewriter from 'typewriter-effect';

import { animate, AnimatePresence, motion, useMotionValue } from "framer-motion";

export default function Home() {
    const [isInView, setIsInView] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.5 }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Adding GitHub URLs for each image
    const imageProjects = [
      {
        image: "/a.png",
        githubUrl: "https://github.com/sachinchkd/ByeRoadKoBato.git",
        title: " AI Trip Planner "
      },
      {
        image: "/b.png",
        githubUrl: "https://lookerstudio.google.com/reporting/6f06b818-ea73-42d2-8554-cd1d1c460726",
        title: "UFO Sighting Visualization"
      },
      {
        image: "/c.png",
        githubUrl: "https://github.com/sachinchkd/ByeRoadKoBato.git",
        title: "Planner"
      },
      {
        image: "/d.png",
        githubUrl: "https://github.com/sachinchkd/Simple_CRUD_Blogpost.git",
        title: "BicharSangraha"
      },
      {
        image: "/e.png",
        githubUrl: "https://github.com/sachinchkd/Canonical-LR-1-Parser.git",
        title: "CLR1 Parser"
      },
      {
        image: "/f.png",
        githubUrl: "https://github.com/sachinchkd/v-e-sion.git",
        title: "vEsion"
      },
      {
        image: "/g.png",
        githubUrl: "https://github.com/sachinchkd/Fitness-App.git",
        title: "WellBeing App"
      },
    ];

    const [containerRef, containerMeasure] = useMeasure();
    const [scrollContentRef, scrollContentMeasure] = useMeasure();

    const xTranslation = useMotionValue(0);

    useEffect(() => {
      let controls;
      
      if (containerMeasure.width && scrollContentMeasure.width) {
        // Calculate the total width of a single set of images
        const totalWidth = scrollContentMeasure.width / 2;
        
        // Animation from 0 to negative width (left to right direction)
        controls = animate(xTranslation, [0, -totalWidth], {
          ease: "linear",
          duration: 25, // Keep original speed
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0,
        });
      }

      return () => controls?.stop();
    }, [xTranslation, containerMeasure.width, scrollContentMeasure.width]);

    const [isPrinting, setIsPrinting] = useState(false);
    const [isPrinted, setIsPrinted] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);

    const handlePrint = () => {
      setIsPrinting(true);
      setTimeout(() => {
        setIsPrinted(true);
      }, 3000); // Animation duration
    };

    const handleDownload = () => {
      // Create a link element
      const link = document.createElement('a');
      
      // Set the download attribute and filename
      link.download = 'resume.pdf';
      
      // Point to a sample PDF file in the public folder
      link.href = '/resume.pdf';
      
      // Append to the document
      document.body.appendChild(link);
      
      // Trigger the download
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      
      // Start paper removal animation
      setIsRemoving(true);
      
      // Reset states after animation completes
      setTimeout(() => {
        setIsPrinting(false);
        setIsPrinted(false);
        setIsRemoving(false);
      }, 1000); // Animation duration for removal
    };

  return (
   <div className="flex flex-col w-full overflow-x-hidden">
    {/* Hero section - full-width and full-height */}
    <div className="relative w-screen min-h-screen bg-[#0E0E0E] flex items-center justify-center">
      <div className="absolute md:w-[500px] w-full max-w-[90%] bottom-[40%] flex flex-col items-center justify-center gap-y-11">
        <div className="flex px-[10px] self-start text-[clamp(36px,8vw,56px)] font-space_grotesk font-700">
          <Typewriter
            options={{
              loop:true,
            }}
            onInit={(typewriter) => {
              typewriter.typeString('Hi,') // English
                .pauseFor(1000)
                .deleteAll()
                
                .typeString('नमस्ते,') // Hindi/Nepali
                .pauseFor(1000)
                .deleteAll()

                .typeString('ज्वोजलापा,') // Newar (Nepal Bhasa)
                .pauseFor(1000)
                .deleteAll()

                .typeString('Guten Tag,') // German
                .pauseFor(1000)
                .deleteAll()

                .typeString('Konnichiwa,') // Japanese
                .pauseFor(1000)
                .deleteAll()

                .typeString('Olá,') // Portuguese
                .pauseFor(1000)
                .deleteAll()

                .typeString('Salve,') // Latin
                .pauseFor(1000)
                .deleteAll()

                .typeString('Zdravstvuyte,') // Russian
                .pauseFor(1000)
                .deleteAll()

                .start();
            }}
          />
        </div>

        <div className="flex px-[10px] self-start text-left content-start justify-start font-courier_prime text-[#9E9E9E] text-[clamp(24px,5vw,36px)]">
          <p>i&apos;m</p>
        </div>
      </div>
        
      <div className="absolute bottom-0 w-full max-w-[960px] px-4">
        <div ref={videoRef} className="w-full min-h-[300px]"> {/* Wrapper with minimum height */}
          {isInView && (
            <video
              src="video.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto"
            />
          )}
        </div>
      </div>
    </div>

    {/* Projects section */}
    <div className='relative w-screen bg-[#252525]'>
      <div className="flex flex-row items-center justify-center gap-x-2 py-8">
        {[...Array(23)].map((_, index) => (
          <div key={index} className='w-2 h-10 bg-[#616161]'></div>
        ))}
      </div>
      
      {/* Fixed container with overflow hidden */}
      <div ref={containerRef} className="flex py-8 w-full overflow-hidden">
        {/* Duplicated images for seamless loop */}
        <motion.div 
          ref={scrollContentRef}
          style={{ x: xTranslation }} 
          className="flex gap-4"
        >
          {/* First set of images */}
          {imageProjects.map((project, idx) => (
            <Card 
              key={`first-${idx}`}
              image={project.image} 
              githubUrl={project.githubUrl}
              title={project.title}
            />
          ))}
          {/* Duplicate set for seamless loop */}
          {imageProjects.map((project, idx) => (
            <Card 
              key={`second-${idx}`} 
              image={project.image} 
              githubUrl={project.githubUrl}
              title={project.title}
            />
          ))}
        </motion.div>
      </div>
    </div>

    {/* Printer section */}
    <div className="relative flex flex-col w-screen bg-[#0E0E0E] py-28 min-h-screen items-center justify-center">
      <div className="flex z-10 max-w-full px-4">
        <Image src="Quotes.svg" alt="Quotes Icon" width={800} height={800} className="max-w-full h-auto"/>
      </div>

      <div className="absolute flex z-0 mt-64 py-8">
        <Image src="/printer.png" alt="Printer Icon" width={500} height={500} className="max-w-full h-auto"/>
      </div>
      
      {/* Printer */}
      <div className="relative w-64 h-80 z-10">
        {/* Printer Body */}
        <div className="w-64 h-40 rounded-t-lg flex flex-col items-center justify-center">
          <div className="text-blue-100 font-courier_prime mb-2">Resume</div>
          <button
            onClick={handlePrint}
            className="bg-white text-black px-4 py-1 rounded-full font-semibold"
            disabled={isPrinting}
          >
            Print
          </button>
        </div>
        
        {/* Printer Output Tray */}
        <div className="w-64 h-10 mt-20 relative overflow-visible">
          {/* Paper */}
          <div 
            className={`absolute left-0 w-full bg-[#C3C3C3] transition-all ease-linear overflow-hidden
              ${isPrinting && !isRemoving ? 'h-64' : 'h-0'}
              ${isRemoving ? 'opacity-0' : 'opacity-100'}`}
            style={{ 
              top: '0',
              transitionDuration: isRemoving ? '1s' : '3s',
              transitionProperty: 'height, opacity',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Content on the paper - blank except for PDF download */}
            <div className="p-4 text-black h-full flex flex-col justify-center items-center">
              {isPrinted && (
                <div 
                  className="flex items-center cursor-pointer hover:text-blue-600" 
                  onClick={handleDownload}
                >
                  {/* PDF Icon */}
                  <Image src="pdf.svg" alt="" width={40} height={40}/>
                  <span className="text-base font-medium">Download PDF</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Printer Base */}
        <div className="w-64 h-10 rounded-b-lg"></div>
      </div>
    </div>
    
    <div>

    </div>

    {/* Footer section */}
    <div className="relative flex flex-col w-screen bg-[#C3C3C3] items-center justify-center min-h-screen">
      <div className="absolute flex flex-col items-start justify-center gap-y-2 px-6 md:px-12 max-w-full">
        <h2 className="text-[#0E0E0E] font-arimo font-medium text-[clamp(28px,5vw,40px)]">
          I am a Computer <br/>Engineer Graduate from 
        </h2>
        <h1 className="text-[#1B1A55] font-arimo font-bold text-[clamp(36px,6vw,50px)]">
          Kathmandu University.
        </h1>
      </div>

      <div className="absolute self-start flex items-start bottom-0 left-0 w-[min(500px,50%)] h-auto">
        <Image src="/hand.png" alt="hand" width={500} height={500} className="w-full h-auto"/>
      </div>

      <div className="absolute bottom-0 right-0 flex flex-col py-9 px-6 md:px-32 font-courier_prime">
        <h2 className="text-blue-950 font-medium text-[clamp(16px,3vw,20px)]">Connect with me :</h2>
        <h3 className="text-gray-900 text-[clamp(14px,2.5vw,16px)]">+977 9864995725</h3>
        <h3 className="text-indigo-950 text-[clamp(14px,2.5vw,16px)]">
          <a href="mailto:sachinchakradhar8@gmail.com" className="hover:text-indigo-700">
            sachinchakradhar8@gmail.com
          </a>
        </h3>
      </div>
    </div>
   </div>
  );
}


const Card = ({ image, githubUrl, title }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  
  // Function to handle the click while preventing animation disruption
  const handleClick = (e) => {
    // Open GitHub link in a new tab
    window.open(githubUrl, '_blank', 'noopener,noreferrer');
    
    // Prevent event bubbling to avoid disrupting the animation
    e.stopPropagation();
  };

  return (
    <motion.div 
      className="relative overflow-hidden h-[300px] min-w-[300px] bg-[#252525] rounded-xl flex justify-center items-center cursor-pointer"
      onHoverStart={() => setShowOverlay(true)}
      onHoverEnd={() => setShowOverlay(false)}
      onClick={handleClick}
    >
      <AnimatePresence>
        {showOverlay && (
          <motion.div 
            className="absolute inset-0 z-10 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black pointer-events-none opacity-50 h-full w-full"/>
            <motion.div 
              className="flex flex-col items-center gap-2"
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              exit={{ y: 10 }}
            >
              <h3 className="text-white font-medium text-lg z-10">{title}</h3>
              <button 
                className="bg-white font-semibold text-sm z-10 px-3 py-2 text-black rounded-full flex items-center gap-[0.5ch] hover:opacity-75"
              >
                <span>See In Action</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Image
        src={image}
        alt={`${title} Project`}
        width={300}
        height={300}
        className="object-cover"
      />
    </motion.div>
  );
};