import React, { useState, useEffect } from 'react';
import {
  User,
  Briefcase,
  GraduationCap,
  Code2,
  Mail,
  Phone,
  Linkedin,
  Download,
  LineChart,
  School,
  Building2,
  Database,
  FileCode2
} from 'lucide-react';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("");
  const [cursorTrail, setCursorTrail] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const sections = ["about", "experience", "education", "projects", "skills", "contact"];
      const scrollPosition = window.scrollY + 300;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white font-sans relative">
      <div className="fixed inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none"></div>
      
      {/* Navigation */}
      <nav className="fixed w-full bg-[#020817]/90 backdrop-blur-lg z-50 border-b border-indigo-500/20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-4xl font-bold flex items-center gap-2">
            <Code2 className="w-6 h-6 text-[#64ffda]" />
            Deepesh Dagar
          </div>
          <div className="text-3xl space-x-6 hidden md:block">
            {["about", "experience", "education", "projects", "skills", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="hover:text-[#64ffda] transition-colors capitalize"
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="container mx-auto px-6 z-10 text-center">
          <div className="space-y-6 animate-fade-in">
            <div className="w-32 h-32 mx-auto mb-8 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse"></div>
              <User className="w-16 h-16 absolute inset-0 m-auto text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
              Deepesh Dagar
            </h1>
            <p className="text-2xl md:text-4xl mb-4 text-gray-300">
  <span className="text-indigo-400">{"<"}</span> Aspiring Junior Developer | MCA Student{" "}
  <span className="text-indigo-400">{"/>"}</span>
</p>

<a href="https://drive.google.com/file/d/1v7Wz264iifCC2Lt1Hwvh9GAaZqClDLFw/view?usp=sharing" target="_blank">
  <button className="bg-gradient-to-r from-indigo-500 to-purple-500 px-8 py-4 rounded-full font-bold hover:opacity-90 transition-all duration-200 shadow-lg shadow-indigo-500/25 flex items-center gap-3 mx-auto mt-4">
    <Download className=" text-3xl w-5 h-5" />
    Download Resume
  </button>
</a>


          </div>
        </div>
      </header>

      {/* About Section */}
      <section
        id="about"
        className={`py-20 bg-[#0F0F3D]/50 transform transition-all duration-500 ${
          activeSection === "about" ? "scale-100 opacity-100" : "scale-95 opacity-75"
        }`}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
            About Me
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <p className="text-lg leading-relaxed">
                Motivated computer science student seeking a junior developer internship to apply and expand programming skills. 
                Proficient in Python, Django, PHP, MySQL. Strong adapting abilities and eager to learn in a professional environment.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-64 h-64 relative animate-float">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse"></div>
                <Code2 className="w-24 h-24 absolute inset-0 m-auto text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className={`py-20 relative transform transition-all duration-500 ${
          activeSection === "experience" ? "scale-100 opacity-100" : "scale-95 opacity-75"
        }`}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
            Experience
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#1B1B4B]/50 p-8 rounded-lg border border-[#64ffda]/20 hover:border-[#64ffda] transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-6 h-6 text-[#64ffda]" />
                <h3 className="text-2xl font-bold">Data Assistant</h3>
              </div>
              <p className="text-[#64ffda] mb-2">Tax Consultancy Firm (Private)</p>
              <p className="mb-4">May 2022 - July 2022</p>
              <ul className="list-disc pl-4 space-y-2">
                <li>Maintained customer records, created new records, debugged records</li>
                <li>Software used: Tally Prime</li>
              </ul>
            </div>
            <div className="bg-[#1B1B4B]/50 p-8 rounded-lg border border-[#64ffda]/20 hover:border-[#64ffda] transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-6 h-6 text-[#64ffda]" />
                <h3 className="text-2xl font-bold">Process Associate</h3>
              </div>
              <p className="text-[#64ffda] mb-2">OneWorld Logistics</p>
              <p className="mb-4">June 2020 - July 2022</p>
              <ul className="list-disc pl-4">
                <li>Maintained records of parcels using MS Excel</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        className={`py-20 bg-[#0F0F3D]/50 transform transition-all duration-500 ${
          activeSection === "education" ? "scale-100 opacity-100" : "scale-95 opacity-75"
        }`}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
            Education
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#1B1B4B]/50 p-8 rounded-lg border border-[#64ffda]/20 hover:border-[#64ffda] transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-6 h-6 text-[#64ffda]" />
                <h3 className="text-2xl font-bold">Master of Computer Applications</h3>
              </div>
              <p className="text-[#64ffda] mb-2">GLS University, Ahmedabad</p>
              <p>Expected Graduation: 2025</p>
            </div>
            <div className="bg-[#1B1B4B]/50 p-8 rounded-lg border border-[#64ffda]/20 hover:border-[#64ffda] transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <School className="w-6 h-6 text-[#64ffda]" />
                <h3 className="text-2xl font-bold">Bachelor of Computer Applications</h3>
              </div>
              <p className="text-[#64ffda] mb-2">Mohanlal Sukhadiya University</p>
              <p>Graduated: 2023</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className={`py-20 bg-[#0F0F3D]/50 transform transition-all duration-500 ${
          activeSection === "projects" ? "scale-100 opacity-100" : "scale-95 opacity-75"
        }`}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
            Projects
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1B1B4B]/50 p-8 rounded-lg border border-[#64ffda]/20 hover:border-[#64ffda] transition-all duration-300 transform hover:scale-105">
              <LineChart className="w-10 h-10 text-[#64ffda] mb-4" />
              <h3 className="text-2xl font-bold mb-4">Virtual Dashboard</h3>
              <p className="text-gray-300 mb-4">Data Science Project</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-indigo-500/20 rounded-full text-sm">Python</span>
                <span className="px-2 py-1 bg-indigo-500/20 rounded-full text-sm">Pandas</span>
                <span className="px-2 py-1 bg-indigo-500/20 rounded-full text-sm">Scikit-learn</span>
              </div>
            </div>
            <div className="bg-[#1B1B4B]/50 p-8 rounded-lg border border-[#64ffda]/20 hover:border-[#64ffda] transition-all duration-300 transform hover:scale-105">
              <GraduationCap className="w-10 h-10 text-[#64ffda] mb-4" />
              <h3 className="text-2xl font-bold mb-4">Student Management</h3>
              <p className="text-gray-300 mb-4">Web Development Project</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-indigo-500/20 rounded-full text-sm">Django</span>
                <span className="px-2 py-1 bg-indigo-500/20 rounded-full text-sm">Bootstrap</span>
                <span className="px-2 py-1 bg-indigo-500/20 rounded-full text-sm">PostgreSQL</span>
              </div>
            </div>
            <div className="bg-[#1B1B4B]/50 p-8 rounded-lg border border-[#64ffda]/20 hover:border-[#64ffda] transition-all duration-300 transform hover:scale-105">
              <Building2 className="w-10 h-10 text-[#64ffda] mb-4" />
              <h3 className="text-2xl font-bold mb-4">Hotel Management</h3>
              <p className="text-gray-300 mb-4">Web Development Project</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-indigo-500/20 rounded-full text-sm">PHP</span>
                <span className="px-2 py-1 bg-indigo-500/20 rounded-full text-sm">MySQL</span>
                <span className="px-2 py-1 bg-indigo-500/20 rounded-full text-sm">Bootstrap</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className={`py-20 relative transform transition-all duration-500 ${
          activeSection === "skills" ? "scale-100 opacity-100" : "scale-95 opacity-75"
        }`}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
            Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <FileCode2 className="w-8 h-8" />, name: "Python" },
              { icon: <FileCode2 className="w-8 h-8" />, name: "Django" },
              { icon: <FileCode2 className="w-8 h-8" />, name: "PHP" },
              { icon: <FileCode2 className="w-8 h-8" />, name: "JavaScript" },
              { icon: <Code2 className="w-8 h-8" />, name: "React" },
              { icon: <Code2 className="w-8 h-8" />, name: "Laravel" },
              { icon: <Database className="w-8 h-8" />, name: "MySQL" },
              { icon: <Database className="w-8 h-8" />, name: "PostgreSQL" }
            ].map((skill, index) => (
              <div key={index} className="bg-[#1B1B4B]/50 p-6 rounded-lg text-center group hover:bg-[#1B1B4B]/70 transition-all duration-300">
                <div className="text-[#64ffda] mb-4 group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </div>
                <h3 className="font-bold">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`py-20 bg-[#0F0F3D]/50 transform transition-all duration-500 ${
          activeSection === "contact" ? "scale-100 opacity-100" : "scale-95 opacity-75"
        }`}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
            Contact Me
          </h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <a
              href="mailto:dipeshdagar9@gmail.com"
              className="flex items-center space-x-3 text-lg hover:text-[#64ffda] transition-all duration-300 transform hover:scale-105"
            >
              <Mail className="w-6 h-6" />
              <span>dipeshdagar9@gmail.com</span>
            </a>
            <a
              href="tel:+916367867656"
              className="flex items-center space-x-3 text-lg hover:text-[#64ffda] transition-all duration-300 transform hover:scale-105"
            >
              <Phone className="w-6 h-6" />
              <span>+91 6367867656</span>
            </a>
            <a
              href="https://www.linkedin.com/in/deepesh-dagar-45a389186/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-lg hover:text-[#64ffda] transition-all duration-300 transform hover:scale-105"
            >
              <Linkedin className="w-6 h-6" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );

  }

export default App;
