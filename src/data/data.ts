export const portfolioData = {
  personal: {
    name: "Gurnoor Singh",
    tagline: "AI/ML Engineer & Generative AI Developer",
    about: "B.Tech AI & ML student with a strong foundation in Python, C++, Data Structures & Algorithms, Machine Learning, Deep Learning, Computer Vision, and Generative AI. Experienced in building AI applications using PyTorch, scikit-learn, OpenCV, and LangChain. Strong problem-solving skills with an interest in AI/ML, Generative AI, and Software Engineering roles.",
    links: {
      github: "https://github.com/Gurnoor0001",
      linkedin: "https://linkedin.com/in/gurnoor-singh-749735349",
      email: "gur.farwaha2005@gmail.com",
      phone: "+91-7009911457",
      resume: "/resume.pdf", // Assuming a resume is placed here
    },
  },
  education: [
    {
      institution: "Chandigarh Group of Colleges",
      location: "Landran, Mohali",
      degree: "Bachelor of Technology in Artificial Intelligence and Machine Learning",
      metrics: "CGPA: 7.1",
      year: "2023 - 2027",
    },
    {
      institution: "S.N.A.S Model. Sen. Sec. School",
      location: "Mandi Gobindgarh, Punjab",
      degree: "Intermediate (PSEB)",
      metrics: "Percentage: 70%",
      year: "2022 - 2023",
    }
  ],
  skills: {
    languages: ["Python", "C++", "C", "SQL", "OOP"],
    ai_ml: ["Machine Learning", "Deep Learning", "Data Science", "NLP", "Computer Vision", "Generative AI", "Agentic AI"],
    frameworks: ["NumPy", "Pandas", "Matplotlib", "scikit-learn", "PyTorch", "OpenCV", "LangChain", "Agno", "Flask"],
    databases: ["MySQL", "Pinecone", "ChromaDB", "Supabase", "PostgreSQL"],
    tools: ["Git", "GitHub", "GitHub Actions", "CI/CD", "VS Code", "Antigravity"],
    os: ["Windows", "macOS"],
  },
  interpersonal: [
    "Team Collaboration",
    "Analytical Thinking",
    "Problem Solving",
    "Adaptability",
    "Mentoring",
    "Conflict Resolution",
    "Active Listening"
  ],
  projects: [
    {
      title: "PrismaForge",
      subtitle: "Neural Style Transfer Engine",
      url: "http://13.60.212.185/",
      tech: ["Python", "PyTorch", "VGG19", "AdaIN", "Computer Vision"],
      description: "Built a deep learning neural style-transfer engine using VGG19 and AdaIN, enabling arbitrary style synthesis from content and reference images.",
      features: [
        "Engineered an end-to-end computer vision inference pipeline supporting 512px/1024px resolution and 0-100% style-intensity control for customizable image generation.",
        "Developed an interactive web interface with optimized inference, responsive controls, and a modern glassmorphic UI for real-time AI-powered image stylization."
      ],
      purpose: "To allow real-time, customizable AI image stylization accessible via a web interface.",
      learnings: "Mastered PyTorch for model inference, understood the intricacies of AdaIN layers, and learned how to optimize deep learning models for web deployment."
    },
    {
      title: "LookHere",
      subtitle: "AI-Powered Smart Attendance System",
      url: "https://lookhere.streamlit.app",
      tech: ["Python", "PyTorch", "dlib", "scikit-learn", "Resemblyzer", "Streamlit", "Supabase"],
      description: "Built and deployed a multimodal AI attendance system using face recognition and voice identification for automated classroom attendance.",
      features: [
        "Implemented 128D facial embeddings + SVM with 0.6 verification threshold and Resemblyzer d-vector embeddings with 0.7 cosine similarity for identity verification.",
        "Integrated QR enrollment, authentication, real-time dashboards, and PostgreSQL-backed attendance tracking."
      ],
      purpose: "To eliminate manual attendance tracking fraud using secure multimodal biometrics.",
      learnings: "Gained practical experience integrating multiple biometric pipelines (face & voice), managing thresholds for false positives/negatives, and building real-time dashboards."
    }
  ],
  certifications: [
    {
      title: "PYTHON",
      issuer: "CodeWithHarry",
      date: "03/2025",
      url: "/cert-python.pdf"
    },
    {
      title: "MACHINE LEARNING",
      issuer: "TCIL-IT, Chandigarh",
      date: "06/2025",
      url: "/cert-ml.pdf"
    },
    {
      title: "DATA SCIENCE",
      issuer: "CodeWithHarry",
      date: "07/2025",
      url: "/cert-datascience.pdf"
    },
    {
      title: "DATA ANALYTICS",
      issuer: "Deloitte",
      date: "",
      url: "/cert-dataanalytics.pdf"
    }
  ],
  achievements: [
    {
      title: "CODING COMPETITION, SECOND POSITION",
      description: "Achieved second position out of 3 participants in a competitive coding contest during the annual (Chandigarh group of colleges/science day event).",
      highlight: false
    },
    {
      title: "GOOGLE DEVELOPER GROUP ON CAMPUS CORE TEAM MEMBER",
      description: "Selected as a Core Team member for GDG, organizing technical events and workshops, fostering a community of developers.",
      highlight: true
    }
  ]
};
