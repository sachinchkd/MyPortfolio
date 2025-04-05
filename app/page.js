"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from 'react';
import useMeasure from "react-use-measure";
import Typewriter from 'typewriter-effect';


import { animate, motion, useAnimationControls, useMotionValue } from "framer-motion";

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
        image: "css.svg",
        githubUrl: "https://github.com/sachinchkd/ByeRoadKoBato.git",
        title: " AI Trip Planner "
      },
      {
        image: "figma.svg",
        githubUrl: "https://lookerstudio.google.com/reporting/6f06b818-ea73-42d2-8554-cd1d1c460726",
        title: "UFO Sighting Visualization"
      },
      {
        image: "flask.svg",
        githubUrl: "https://github.com/sachinchkd/ByeRoadKoBato.git",
        title: "Planner"
      },
      {
        image: "next.svg",
        githubUrl: "https://github.com/sachinchkd/Simple_CRUD_Blogpost.git",
        title: "BicharSangraha"
      },
      {
        image: "python.svg",
        githubUrl: "https://github.com/sachinchkd/Canonical-LR-1-Parser.git",
        title: "CLR1 Parser"
      },
      {
        image: "react.svg",
        githubUrl: "https://github.com/sachinchkd/v-e-sion.git",
        title: "vEsion"
      },
      {
        image: "postman.svg",
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
        const totalWidth = scrollContentMeasure.width/4;
        
        // Animation from 0 to negative width (left to right direction)
        controls = animate(xTranslation, [0, -totalWidth], {
          ease: "linear",
          duration: 8, // Keep original speed
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

    // Duplicate declarations removed
    const [contentWidth, setContentWidth] = useState(0);
    const controls = useAnimationControls();

    const projectsRef = useRef(null)
    const craftRef = useRef(null)
    const travelRef = useRef(null)

    const [active, setActive] = useState('projects')

    useEffect(() => {
      // Only set the active state to 'projects', but don't scroll
      setActive('projects')
      // No scrollIntoView call here
    }, [])

  const handleScrollTo = (section, ref) => {
    setActive(section)
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

    

  return (
   <div className="flex flex-col w-full overflow-x-hidden scroll-smooth">
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
    <div className='relative w-screen min-h-screen bg-[#252525] flex flex-col gap-4'>
      <div className="flex flex-row items-center justify-center gap-x-1 py-8">
        {[...Array(50)].map((_, index) => (
          <div key={index} className='w-2 h-6 bg-[#616161]'></div>
        ))}
      </div>

      {/* Fixed container with overflow hidden */}
      <div ref={containerRef} className="flex bg-[#616161] my-8 py-1 w-full overflow-hidden">
        {/* Duplicated images for seamless loop */}
        <motion.div 
          ref={scrollContentRef}
          style={{ x: xTranslation }} 
          className="flex gap-4 "
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
          {/* Duplicate set for seamless loop */}
          {imageProjects.map((project, idx) => (
            <Card 
              key={`second-${idx}`} 
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

      <div className="flex items-center justify-center gap-x-2 mt-4 py-10">
        <Image src="/learning.png" alt="" width={800} height={800}/>
      </div>
      
      
    </div>


    <div className="relative flex min-h-screen bg-[#252525]  gap-x-4 py-10">
      <nav className="absolute flex items-center top-10 right-80  min-w-[400px] gap-4 justify-center">
        <button className="text-[#ffff] px-4 text-[15px] font-karla font-[300] hover:bg-[#3C3C3C] py-1 rounded-2xl "
        active={active === 'projects'}
        onClick={()=>handleScrollTo('projects',projectsRef)} >Project</button>
        <button className="text-[#ffff] px-4 text-[15px] font-karla font-[300] hover:bg-[#3C3C3C] py-1 rounded-2xl "
        active={active === 'crafts'}
        onClick={()=>handleScrollTo('crafts',craftRef)}>Crafts</button>
        <button className="text-[#ffff] px-4 text-[15px] font-karla font-[300] hover:bg-[#3C3C3C] py-1 rounded-2xl "
        active={active === 'travel'}
        onClick={()=>handleScrollTo('travel',travelRef)}>Travel</button>
        
        
      </nav>

      {/* Sections with refs instead of ids */}
      <div className="min-w-screen">
      <div ref={projectsRef} className={sectionStyle(active === 'projects')}>
          <Projects />
        </div>
        <div ref={craftRef} className={sectionStyle(active === 'crafts')}>
          <Work />
        </div>
        
        <div ref={travelRef} className={sectionStyle(active === 'travel')}>
          <Travel />
        </div>
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
                  <span className="text-base font-karla text-[#0E0E0E] font-medium">  Download PDF</span>
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

    <div className="relative flex flex-col w-screen bg-[#C3C3C3] items-center justify-center min-h-screen">
      <div className="absolute flex flex-col items-start justify-center gap-y-2 px-6 md:px-12 min-w-[500px] overflow-hidden">
        <ContinuousScroller />
      </div>
      
      <div className="absolute self-start flex items-start bottom-0 left-0 w-[min(500px,50%)] h-auto">
        <Image src="/hand.png" alt="hand" width={500} height={500} className="w-full h-auto"/>
      </div>

      <div className="absolute  bottom-0 items-center justify-center flex gap-8  py-9 px-6 md:px-32 font-karla">
        <h2 className="text-blue-950 font-arimo font-[700]  text-[clamp(16px,3vw,20px)]">Let&apos;s Talk :</h2>
        <h3 className="text-gray-900 font-arimo text-[clamp(14px,2.5vw,16px)]">+977 9864995725</h3>
        <h3 className="text-indigo-950 font-arimo text-[clamp(14px,2.5vw,16px)]">
          <a href="mailto:sachinchakradhar8@gmail.com" className="hover:text-indigo-700">
            sachinchakradhar8@gmail.com
          </a>
        </h3>
      </div>
    </div>
   </div>
  );
}

const ContinuousScroller = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Array of content items to display
  const contentItems = [
    {
      type: "text",
      content: (
        <div className="mb-20">
          <h2 className="text-[#0E0E0E] font-karla font-[200] text-[clamp(10px,2vw,36px)]">
          I&apos;m a Computer <br/>Engineer Graduate from 
          </h2>
          <h1 className="text-[#1B1A55] font-karla font-[400] text-[clamp(16px,3vw,40px)]">
            Kathmandu University.
          </h1>
        </div>
      )
    },
    {
      type: "image",
      content: (
        <div className="mb-20">
          <Image src="/interest.svg" alt="Interests" width={500} height={500} className="max-w-full h-auto"/>
        </div>
      )
    },
    {
      type: "text",
      content: (
        <div className="mb-20">
          <h2 className="text-[#0E0E0E] font-karla font-[200] text-[clamp(10px,2vw,36px)]">
            I enjoy creating solutions <br/>that make life easier
          </h2>
          <h1 className="text-[#1B1A55] font-karla font-[400] text-[clamp(16px,3vw,40px)]">
            through technology.
          </h1>
        </div>
      )
    },
    {
      type: "image",
      content: (
        <div className="mb-20">
          <Image src="/ai.png" alt="ai" width={500} height={700} className="max-w-full h-auto"/>
          <h1 className="text-[#1B1A55] font-karla font-[400] text-[clamp(16px,3vw,40px)]">
            
          </h1>
        </div>
      )
    },
    {
      type: "text",
      content: (
        <div className="mb-20">
          <h2 className="text-[#0E0E0E] font-karla font-[200] text-[clamp(10px,2vw,36px)]">
            You know the Business.<br/>I know the Code.
          </h2>
          <h1 className="text-[#1B1A55] font-karla font-[400] text-[clamp(16px,3vw,40px)]">
            May be we could partner up.
          </h1>
        </div>
      )
    },
    // Add more items as needed
  ];
  
  // Automatically cycle through items
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % contentItems.length);
    }, 3000); // 4 seconds per item (3s display + 1s transition)
    
    return () => clearInterval(interval);
  }, [contentItems.length]);
  
  return (
    <div className="relative h-[300px] min-w-[500px] overflow-hidden">
      {contentItems.map((item, index) => (
        <motion.div
          key={index}
          className="absolute w-full"
          initial={{ opacity: 0, x: '100%' }}
          animate={{ 
            opacity: index === currentIndex ? 1 : 0,
            x: index === currentIndex ? 0 : index < currentIndex ? '-100%' : '100%'
          }}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 }
          }}
        >
          {item.content}
        </motion.div>
      ))}
    </div>
  );
};



const sectionStyle = (isActive) =>
  `min-h-screen flex items-center justify-center transition-opacity duration-500 px-6 ${
    isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none absolute inset-0'
  }`


  const Projects = () => {
    // Array of video sources with their playback speeds and GitHub links
    const videoData = useMemo(() => [
      { src: '/video1.mp4', speed: 2.0, githubUrl: 'https://github.com/sachinchkd/IMG-to-IMG-with-GAN.git', title: 'Image-to-Image-Translation' },
      { src: '/video2.mp4', speed: 3.0, githubUrl: 'https://github.com/sachinchkd/v-e-sion.git', title: 'vEsion' },
      { src: '/video3.mp4', speed: 1.5, githubUrl: 'https://www.youtube.com/watch?v=84suBNUHnXI&t=26s', title: 'Networking Project' },
      { src: '/video4.mp4', speed: 2.0, githubUrl: 'https://lookerstudio.google.com/reporting/6f06b818-ea73-42d2-8554-cd1d1c460726', title: 'UFO Sighting EDA' },
      { src: '/video5.mp4', speed: 3.0, githubUrl: 'https://github.com/sachinchkd/WebHub-Websiter-Builder.git', title: 'Website Builder' },
      { src: '/video6.mp4', speed: 1.5, githubUrl: 'https://www.canva.com/design/DAGYPTlgAOs/JUYT-J7kECaYL-lPl5Lxsw/edit', title: 'AI Kyaan' },
      { src: '/video7.mp4', speed: 1.5, githubUrl: 'https://github.com/sachinchkd/Data-Chautari.git', title: 'Data Chautari' },
      { src: '/video8.mp4', speed: 1.5, githubUrl: 'https://youtu.be/gdSgP5xONPI?si=ABZwXVHHLKFhBxgn', title: 'AI Tourism Ad' },
    ], []);
    
    // Create refs for all videos
    const videoRefs = useRef([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    
    // Initialize the refs array and set playback speeds
    useEffect(() => {
      videoRefs.current = videoRefs.current.slice(0, videoData.length);
      
      // Set playback rate for each video
      videoRefs.current.forEach((videoEl, index) => {
        if (videoEl) {
          videoEl.playbackRate = videoData[index].speed;
        }
      });
    }, [videoData]);
    
    return (
      <div className="w-min-[800px] py-10 h-screen">
        {/* Grid container with 2 columns and 3 rows */}
        <div className="grid grid-cols-2 grid-rows-4 w-full h-full">
          {videoData.map((video, index) => (
            <div 
              key={index} 
              className="relative w-full h-full overflow-hidden"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <video
                ref={el => videoRefs.current[index] = el}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                onLoadedMetadata={(e) => {
                  // Set playback rate when video metadata is loaded
                  e.target.playbackRate = video.speed;
                }}
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Hover overlay */}
              {hoveredIndex === index && (
                <div className="absolute inset-0 bg-[#252525] bg-opacity-80 flex flex-col items-center justify-center transition-opacity duration-300">
                  <h3 className="text-[#DADADA] text-[12px] font-arimo  mb-4">{video.title}</h3>
                  <a 
                    href={video.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#C3C3C3] hover:bg-[#9E9E9E] text-[10px] font-arimo text-[#252525] px-4 py-2 rounded-md transition-colors duration-300"
                  >
                    See In Action
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };


const Work = () => {
  // Array of craft images with links
  const imageData = [
    { src:'/craft1.png', link: 'https://craftportfolio.com/project1', title: 'Survey Paper' },
    { src: '/craft2.png', link: 'https://craftportfolio.com/project2', title: 'EDA' },
    { src: '/craft3.png', link: 'https://craftportfolio.com/project2', title: 'PPT' },
    { src: '/craft4.png', link: 'https://craftportfolio.com/project2', title: 'Ethics' },
    
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  return (
    <div className="w-min-[300px] py-10 h-screen">
      {/* Grid container with 2 columns and 3 rows */}
      <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
        {imageData.map((image, index) => (
          <div 
            key={index} 
            className="relative w-full h-full overflow-hidden gap-4"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Image
              src={image.src}
              alt={image.title}
              width={300}
              height={800}
              className="w-full h-full object-cover"
            />
            
            {/* Hover overlay */}
            {hoveredIndex === index && (
              <div className="absolute inset-0 bg-[#3E3E3E] bg-opacity-70 flex flex-col items-center justify-center transition-opacity duration-300">
                <h3 className="text-white font-arimo  text-[12px] font-bold mb-4">{image.title}</h3>
                <a 
                  href={image.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#0E0E0E] hover:bg-[#C3C3C3] font-arimo  text-[10px] text-[3E3E3E] px-4 py-2 rounded-md transition-colors duration-300"
                >
                  View 
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Updated Travel component with hover overlay and zoom functionality

function Travel() {
  // Array of travel images with varied heights to create masonry effect
  const travelImages = [
    { 
      src: '/travel1.png', 
      location: 'Langtang', 
      description: 'On the way to kyangin gumba, 3400 m Altitude.',
      height: 'h-full' // Full height
    },
    { 
      src: '/travel2.png', 
      location: 'Tsho Rolpa Lake', 
      description: '3750 m Altitude Lake in Dolakha, Nepal',
      height: 'h-3/4' // 3/4 height
    },
    { 
      src: '/travel3.DNG', 
      location: 'Back from Bamboo ', 
      description: 'Sunset Scenary on the way back',
      height: 'h-2/3' // 2/3 height
    },
    { 
      src: '/travel4.png', 
      location: 'Gosaikunda', 
      description: 'Snow Fall at Gosaikunda 2023',
      height: 'h-full' // Full height
    },
    { 
      src: '/travel5.png', 
      location: 'Yak', 
      description: 'First time yak encounter',
      height: 'h-4/5' // 4/5 height
    },
    { 
      src: '/travel6.JPG', 
      location: 'Tsho Rolpa Waterfall', 
      description: 'Gaurishankar Conservation Area',
      height: 'h-5/6' // 5/6 height
    },
    { 
      src: '/travel7.png', 
      location: 'Tindhara', 
      description: '2 Days Hike to Tindhara',
      height: 'h-5/6' // 5/6 height
    },
    { 
      src: '/travel8.JPG', 
      location: 'Mustang', 
      description: 'Dry Mustang',
      height: 'h-5/6' // 5/6 height
    },
    { 
      src: '/travel9.JPG', 
      location: 'On the way @ Panchpokhari', 
      description: 'Khumai Danda',
      height: 'h-5/6' // 5/6 height
    }
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [columns, setColumns] = useState(3);
  const containerRef = useRef(null);

  // Function to handle responsive column adjustments
  useEffect(() => {
    const handleResize = () => {
      const width = containerRef.current?.clientWidth || 0;
      if (width < 640) {
        setColumns(1);
      } else if (width < 1024) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Distribute images into columns
  const getColumnImages = () => {
    const imagesByColumn = Array(columns).fill().map(() => []);
    
    travelImages.forEach((image, index) => {
      const columnIndex = index % columns;
      imagesByColumn[columnIndex].push(image);
    });
    
    return imagesByColumn;
  };

  const handleZoom = (image) => {
    setZoomedImage(image);
  };

  const closeZoom = () => {
    setZoomedImage(null);
  };

  const columnImages = getColumnImages();

  return (
    <div ref={containerRef} className="w-full h-screen py-10 px-4 overflow-y-auto">
      <div className="flex gap-4 h-full">
        {columnImages.map((column, colIndex) => (
          <div key={colIndex} className="flex-1 flex flex-col gap-4">
            {column.map((image, imgIndex) => {
              const imageIndex = colIndex + imgIndex * columns;
              return (
                <div 
                  key={imageIndex}
                  className={`relative ${image.height} min-h-[200px] w-full overflow-hidden rounded-lg`}
                  onMouseEnter={() => setHoveredIndex(imageIndex)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Image
                    src={image.src}
                    alt={image.location}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  
                  {/* Hover overlay with animation */}
                  {hoveredIndex === imageIndex && (
                    <div className="absolute inset-0 bg-[#0E0E0E] bg-opacity-20 font-arimo text-[18px] flex flex-col items-center justify-center transition-opacity duration-300 animate-fadeIn">
                      <h3 className="text-white text-[18px] font-bold mb-2">{image.location}</h3>
                      <p className="text-[#3C3C3c] text-[10px] mb-4 px-4 text-center">{image.description}</p>
                      <button 
                        onClick={() => handleZoom(image)}
                        className="bg-[#3C3C3C] hover:bg-green-600 font-arimo text-[10px] text-white px-4 py-2 rounded-md transition-colors duration-300"
                      >
                        Zoom
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Zoom modal */}
      {zoomedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90" onClick={closeZoom}>
          <div className="relative max-w-4xl max-h-full p-4" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-300"
              onClick={closeZoom}
            >
              ✕
            </button>
            <div className="flex flex-col items-center">
              <Image
                src={zoomedImage.src}
                alt={zoomedImage.location}
                width={1000}
                height={1000}
                className="max-w-full max-h-[80vh] object-contain"
              />
              <div className="text-center mt-4">
                <h2 className="text-white text-2xl font-bold">{zoomedImage.location}</h2>
                <p className="text-gray-300 mt-2">{zoomedImage.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
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
      className="relative overflow-hidden h-[80px] min-w-[80px] rounded-xl flex justify-center items-center cursor-pointer"
      
    >
      
      <Image
        src={image}
        alt={`${title} Project`}
        width={80}
        height={80}
        className="object-cover"
      />
    </motion.div>
  );
};