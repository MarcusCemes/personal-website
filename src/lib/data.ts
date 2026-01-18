import cortinaImage from "$lib/assets/films/cortina.avif";
import endWorldImage from "$lib/assets/films/end-world.avif";
import florenceImage from "$lib/assets/films/florence.avif";
import kuhtaiImage from "$lib/assets/films/kuhtai.avif";
import romeImage from "$lib/assets/films/rome.avif";
import sailboatImage from "$lib/assets/films/sailboat-galaxy.avif";
import stAntonImage from "$lib/assets/films/st-anton.avif";
import zermattImage from "$lib/assets/films/zermatt.avif";
import caracImage from "$lib/assets/projects/carac.avif";
import cmiPlatformImage from "$lib/assets/projects/cmi-platform.avif";
import magneticCoils1Image from "$lib/assets/projects/magnetic-coils.1.avif";
import magneticCoilsImage from "$lib/assets/projects/magnetic-coils.avif";
import racardImage from "$lib/assets/projects/racard.avif";

export const PASSWORD_HASH =
    "$argon2id$v=19$m=16,t=16,p=1$RTJPMWd6MzZlR2xRNXl6eg$mvcf7nrNuVHgoLcHqFON/A";

export interface Project {
    id: string;
    title: string;
    titleAlt?: string;
    shortDescription: string;
    fullDescription: string;
    role: string;
    date: string;
    tags: string[];
    imageUrl: string;
    links: ProjectLink[];
    gallery?: string[];
}

export interface ProjectLink {
    label: string;
    url: string;
    type: "github" | "website" | "pdf" | "publication" | "other";
}

export interface Film {
    id: string;
    category: string;
    description: string;
    duration: string;
    highRes?: boolean;
    image: string;
    imageAttribution?: string;
    location?: string;
    src?: string;
    title: string;
    year: number;
}

export const PROJECTS: Project[] = [
    {
        id: "carac",
        title: "Project CARAC",
        titleAlt: "Stick on a robot",
        shortDescription:
            "Aerodynamic characterisation platform featuring a custom Rust orchestrator for controlling a Stäubli Robotics System.",
        fullDescription: `
Project CARAC represents a significant leap forward in aerodynamic testing capabilities for the Laboratory of Intelligent Systems (LIS) at EPFL. The goal was to create a highly automated, precise, and flexible platform for characterising the aerodynamic properties of drones and other flying vehicles.

**The Challenge.** Existing solutions lacked the ability to perform complex, dynamic manoeuvres in the wind tunnel while simultaneously capturing high-frequency data. We needed a system that could synchronize the motion of a 6-axis industrial robot with a suite of sensors.

**The Solution.** I architected and built a distributed control system. The core is a custom Rust orchestrator that interfaces directly with the Stäubli robotics controller via a Ethernet UDP link.

On the experiment side, a Python-based ecosystem allows researchers to define flight paths and data acquisition parameters easily. The system automatically triggers measurements, handling synchronization between the robot's position and the aerodynamic forces being measured.

**Key Outcomes**
  - Enabled dynamic characterisation (non-steady state aerodynamics)
  - Successfully used for multiple master theses and doctoral research projects
`,
        role: "Master's Project",
        date: "Spring 2025",
        tags: ["Rust", "MLP/LSTM", "UDP Networking", "Data Acquisition", "Stäubli Robotics"],
        imageUrl: caracImage,
        links: [
            { label: "Laboratory (EPFL)", url: "https://lis.epfl.ch", type: "website" },
            {
                label: "Master Thesis",
                url: "/files/Automation Platform for Aerodynamic Drone Characterization.pdf",
                type: "pdf",
            },
        ],
    },
    {
        id: "magnetic-coils",
        title: "High-Frequency Magnetic Coils",
        titleAlt: "Shiny discs",
        shortDescription:
            "Micro-fabricated high-frequency magnetic coils for extreme environments in tokamak reactors.",
        fullDescription: `
At the Swiss Plasma Center, the measurement of magnetic fields within a tokamak reactor is critical for plasma stability. These sensors must withstand extreme heat, radiation, and vacuum conditions while maintaining high precision.

**Methodology.** Inspired by previous work on Low Temperature Co-fired Ceramic¹ (LTCC), we utilized photolithography techniques typically reserved for semiconductor manufacturing to create large magnetic field sensing coils². This required working in the CMi cleanroom facilities.

**Contribution.** Designing these complex coil geometries manually was prone to error. I developed a parametric generation tool using Rust and C++ (leveraging the gdstk library). This tool allows researches to quickly and accurately design coil geometries with specific properties, generating GDSii modules to be integrated with the main wafer mask required for the lithography process. I also contributed to the prototyping and testing of these designs, including spin coating, mask aligners, dry/wet etching, PVD, lift-off processes and electrical characterisation.

¹ Testa, D., et al. (2011). Prototyping a High-Frequency Inductive magnetic sensor using the nonconventional, Low-Temperature Co-Fired ceramic technology for use in ITER. Fusion Science & Technology, 59(2), 376–396. https://doi.org/10.13182/fst11-a11653

² Testa, D., Cemes, M., Decaux, E., Lavilla, C., Tanguy, F., & Amor, M. (2025). Conceptual design of inductive magnetic sensors using photolithography processes. Fusion Engineering and Design, 214, 114907. https://doi.org/10.1016/j.fusengdes.2025.114907`,
        role: "Student Researcher",
        date: "2022 - 2024",
        tags: ["Rust", "C++", "Microfabrication", "Cleanroom"],
        imageUrl: magneticCoilsImage,
        gallery: [magneticCoils1Image],
        links: [
            { label: "Laboratory (EPFL)", url: "https://spc.epfl.ch", type: "website" },
            {
                label: "Research Paper",
                url: "https://doi.org/10.1016/j.fusengdes.2025.114907",
                type: "publication",
            },
        ],
    },
    {
        id: "cmi-platform",
        title: "CMi Event Platform",
        shortDescription:
            "Full-stack event management ecosystem with an interactive poster designer for the Center of MicroNanoTechnology.",
        fullDescription: `
The Center of MicroNanoTechnology (CMi) hosts a large annual review meeting. Managing submissions, registrations, and poster generation was previously a fragmented manual process.

I developed a unified web platform to handle the entire event lifecycle, publicising the work and the event of the CMi, automating attenddee and company registration and providing interactive editors to dynamically modify the event schedule and exhibitor logo board. I later contributed an interactive poster designer application to streamline the creation of large project booklets for the event.
`,
        role: "Full-stack Developer",
        date: "2021 - 2024",
        tags: ["Svelte", "Node.js", "TypeScript", "PostgreSQL", "Docker", "Typst"],
        imageUrl: cmiPlatformImage,
        links: [{ label: "Event Website", url: "https://cmi-events.epfl.ch", type: "website" }],
    },
    {
        id: "racard-optimiser",
        title: "Work Schedule Optimiser",
        shortDescription:
            "Resource allocation and schedule optimization application built in Rust for complex logistics.",
        fullDescription: `
Developed for Racard, a Geneva-based company, this application addresses complex scheduling constraints for their workforce and logistics.

**The Engine.** The core optimization engine was written in Rust to handle the heavy computational load of the scheduling algorithm. It utilizes constraint satisfaction techniques to generate valid schedules that maximize resource utilization while respecting labor laws and employee preferences.
`,
        role: "Backend Developer",
        date: "2025",
        tags: ["Rust", "Optimization", "Constraint Solving", "Simulated Annealing"],
        imageUrl: racardImage,
        links: [{ label: "Association Website", url: "https://racard.ch", type: "website" }],
    },
];

export interface FeaturedFilm extends Film {
    type: string;
}

export const FEATURED_FILMS: FeaturedFilm[] = [
    {
        category: "featured",
        description:
            "An interactive story revolving around the environmental impact of human actions. Completed as a project for the Myths of the ancient Mediterranean Sea (Matteo Capponi, Matthieu Pellet) course at EPFL.",
        id: "end-of-the-world",
        title: "End of the World",
        image: endWorldImage,
        duration: "04:12",
        year: 2023,
        src: "https://end-of-the-world.vercel.app/",
        type: "Interactive Story",
    },
    {
        category: "featured",
        description:
            "A researched documentary on the future of the universe, featuring interviews with physicists from CERN and EPFL (Jean-Pierre Luminet, Ruth Durrer, Georges Meylan). This was completed as a maturity project (*travail de maturité*) to obtain the Swiss Matura at the *Gymnase de Nyon*.",
        id: "lavenir-de-lunivers",
        title: "L'Avenir de l'Univers",
        image: sailboatImage,
        duration: "03:45",
        year: 2017,
        type: "Maturity Project",
        imageAttribution: "Photo by Johannes Plenio on Unsplash",
    },
];

export const CROATIA_FILMS: Film[] = [
    {
        category: "croatia",
        description: "",
        id: "croatia-2017",
        title: "2017",
        image: "https://picsum.photos/720/1280?random=203",
        duration: "02:30",
        year: 2017,
    },
    {
        category: "croatia",
        description: "",
        id: "croatia-2016",
        title: "2016",
        image: "https://picsum.photos/720/1280?random=204",
        duration: "05:15",
        year: 2016,
    },
    {
        category: "croatia",
        description: "",
        id: "croatia-2015",
        title: "2015",
        image: "https://picsum.photos/720/1280?random=205",
        duration: "03:10",
        year: 2015,
    },
    {
        category: "croatia",
        description: "",
        id: "croatia-2013",
        title: "2013",
        image: "https://picsum.photos/720/1280?random=206",
        duration: "02:45",
        year: 2013,
    },
];

export const ARCHIVE_FILMS: Film[] = [
    {
        category: "archive",
        id: "st-anton-am-arlberg",
        description: "A short action film at the ski resort of St. Anton am Arlberg in Austria.",
        title: "St. Anton am Arlberg",
        highRes: true,
        image: stAntonImage,
        duration: "03:24",
        location: "St. Anton am Arlberg, Austria",
        year: 2017,
    },
    {
        category: "archive",
        id: "skiing-in-kuhtai",
        description: "My first film shot in 4K resolution, featuring skiing in Kühtai, Austria.",
        title: "Skiing in Kühtai",
        highRes: true,
        image: kuhtaiImage,
        duration: "02:38",
        location: "Kühtai, Austria",
        year: 2017,
    },
    {
        category: "archive",
        id: "october-in-italy",
        description:
            "A collection of sequences shot during a trip to the Rome and Naples area in Italy.",
        title: "October in Italy",
        image: romeImage,
        duration: "03:28",
        location: "Rome/Naples, Italy",
        year: 2016,
    },
    {
        category: "archive",
        id: "cortina-dampezzo",
        description:
            "One of my first films, a skiing trip with family and friends in Cortina d'Ampezzo.",
        title: "Cortina d'Ampezzo",
        image: cortinaImage,
        duration: "05:07",
        location: "Cortina d'Ampezzo, Italy",
        year: 2015,
    },
    {
        category: "archive",
        id: "zermatt",
        description:
            "A trip to Zermatt and a remote station high in the Swiss Alps, featuring a view of the Matterhorn.",
        title: "Zermatt",
        image: zermattImage,
        duration: "05:34",
        location: "Zermatt, Switzerland",
        year: 2015,
    },
    {
        category: "archive",
        id: "italy",
        description:
            "One of my first films, shot through the eyes of a child discovering the fantastic sights of Italy.",
        title: "Italy",
        image: florenceImage,
        duration: "07:24",
        location: "Tuscany, Italy",
        year: 2012,
    },
];

export const ALL_FILMS = [...FEATURED_FILMS, ...CROATIA_FILMS, ...ARCHIVE_FILMS];
