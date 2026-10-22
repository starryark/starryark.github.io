// Facts used by the homepage, Work, CV, llms.txt, and structured data.
// Each entry links to public evidence, or says plainly that none is public yet.
// Never add a phone number, student ID, or unpublished lab data.

export interface Evidence {
  label: string;
  href: string;
}

export type Tone = 'released' | 'interim' | 'presented' | 'archived';

export interface Figure {
  src: string;
  srcset: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  // A film plays in place of the still, which becomes its poster. Sources are tried in order.
  video?: {
    poster: string;
    sources: { src: string; type: string }[];
    description: string;
  };
}

export type Group = 'AmadeusBio.ai' | 'Independent projects' | 'Wet-lab research';

export interface Work {
  id: string;
  group: Group;
  title: string;
  context: string;
  // Short label for the date column; `dates` gives the precise dates.
  when: string;
  dates: string;
  status: { label: string; tone: Tone };
  summary: string;
  details: string[];
  role: string;
  limits?: string;
  evidence: Evidence[];
  figure?: Figure;
  featured: boolean;
}

export interface Experience {
  dates: string;
  title: string;
  org: string;
  href?: string;
  text: string;
  evidence?: Evidence;
}

export const profile = {
  name: 'Yangyi Liu',
  preferredName: 'Frank',
  handle: 'starryark',
  role: 'Bio & ML',
  location: 'San Diego, California',
  updated: '2026-10-22',
  company: {
    name: 'AmadeusBio.ai',
    legalName: 'AmadeusBio, PBC',
    url: 'https://www.amadeusbio.ai',
    description: 'building AI agents that accelerate scientific research',
  },
  education: {
    degree: 'B.S. Molecular and Cell Biology',
    school: 'University of California San Diego',
    college: 'Eleanor Roosevelt College',
    conferred: 'December 13, 2025',
    gpa: '3.927',
    // Named honors are shown in bold on the CV, in this order.
    honors: [
      { name: 'Vi and Quang Pham ’06 Alumni Scholarship' },
      {
        name: 'Eleanor Roosevelt College Honor',
      },
      { name: 'Cum laude' },
      { name: 'Provost Honors', detail: 'in six quarters' },
    ],
    diploma: {
      id: '26TK-4GJI-YCUT',
      verifyUrl: 'https://diploma.ucsd.edu/',
    },
  },
  // Shown on the homepage, above the contact line.
  openTo: 'opportunities in AI for biology, in research or engineering',
  // Dated news for the homepage. Empty until there is something new to report.
  now: [] as { text: string; href: string }[],
};

// Newest first. /work/ groups the entries; the homepage shows the featured ones.
export const work: Work[] = [
  {
    id: 'molecular-animation',
    group: 'AmadeusBio.ai',
    title: 'Molecular Animation',
    context: 'AmadeusBio.ai · open source, Apache-2.0',
    when: 'Oct 2026',
    dates: 'v0.1.0 Oct 7 · v0.2.0 Oct 18 · v0.3.0 Oct 21, 2026',
    status: { label: 'Released v0.3.0', tone: 'released' },
    summary:
      'An open framework that turns a scientific brief into a molecular film with Blender. Every film comes with a production record that states, beat by beat, what is experimental and what is illustrative. The first channelrhodopsin film took about two hours from idea to final render.',
    details: [
      'Scenes are built from PDB structures by a tested, pure-NumPy science layer: mmCIF assemblies, atom-matched states, constrained morphs that keep bond lengths and angles, pathway profiles, and procedural membranes.',
      'Since v0.2.0, molecules move by physics on one clock per film: Stokes–Einstein diffusion, elastic-network normal modes, side-chain turns, and worm-like-chain DNA.',
      'Since v0.3.0, molecules are drawn for what their parts are: protein cartoons from the deposited secondary structure, nucleic acids atom by atom, Coulombic potential on van der Waals envelopes, and π-electron lobes. A film’s captions, evidence tags, and pointer positions export as data, so a web page can draw them over the clean film.',
      'Builds are idempotent and report their numerical checks. Version 4 of the case study, rebuilt from its scene, renders a frame that matches the delivered poster within 1/255.',
      'Case study: channelrhodopsin, the light-gated channel behind the 2026 Nobel Prize in Physiology or Medicine, from PDB 9GO1 and 9GO2. In 21 seconds, a photon twists retinal from all-trans to 13-cis, Lys132 swings toward Glu129 (9.0 → 2.66 Å), and the cation pathway opens. Each beat is tagged experimental, illustrative, or symbolic. Version 4, in v0.3.0, keeps the science and motion of version 3 and redraws it as cartoons on white.',
      'The first version took about two hours from idea to final render. By hand, curating assets, animating, adjusting, and iterating on a film like it usually takes days.',
      'Second case study: the ART locus of Staphylococcus phage SA1, a recently reported system of array-associated reverse transcriptases, from GenBank MW218148.1 and AlphaFold 3 predictions. No complex of its RNA, reverse transcriptase, and partner protein was predicted with confidence, so the 31-second film keeps them apart and marks how they work together as unknown.',
    ],
    role: 'I lead the project at AmadeusBio.ai. It is built with AI agents and designed so that an agent (Claude Code through Blender MCP) can drive it, though it also works by hand.',
    limits:
      'No outside lab has used it yet. The two-hour figure is my own timing of one film. In the channelrhodopsin film, the retinal twist is a morph between two crystal states, and the open pathway is an illustrative model rather than a deposited structure.',
    evidence: [
      { label: 'Source on GitHub', href: 'https://github.com/AmadeusBio-ai/Molecular_Animation' },
      {
        label: 'v0.3.0 release notes',
        href: 'https://github.com/AmadeusBio-ai/Molecular_Animation/releases/tag/v0.3.0',
      },
      {
        label: 'Channelrhodopsin case study',
        href: 'https://github.com/AmadeusBio-ai/Molecular_Animation/tree/main/examples/channelrhodopsin',
      },
      {
        label: 'Both films, with evidence tables',
        href: 'https://www.amadeusbio.ai/molecular-animation',
      },
    ],
    figure: {
      src: '/figures/channelrhodopsin-v4-960.webp',
      srcset:
        '/figures/channelrhodopsin-v4-960.webp 960w, /figures/channelrhodopsin-v4-1920.webp 1920w',
      width: 960,
      height: 540,
      alt: 'A rendered frame of channelrhodopsin on a white background: the protein, drawn as a dark-blue ribbon cartoon, spans a pale-blue lipid membrane, with retinal in orange inside it and sodium ions as blue spheres above and below.',
      caption:
        'Channelrhodopsin, version 4: the light-gated channel behind the 2026 Nobel Prize in Physiology or Medicine, built from PDB 9GO1 and 9GO2 and drawn as cartoons for a white page. The first version was released two days after the prize was announced. This copy plays without captions; the company page draws them over the film, with each beat’s evidence tag. The membrane is procedural, not simulated.',
      // The company site's file names carry content hashes and its films are clean, with captions
      // drawn by the page; the GitHub release copy, with labels burned in, is the stable fallback.
      video: {
        poster: '/figures/channelrhodopsin-v4-1920.webp',
        sources: [
          {
            src: 'https://www.amadeusbio.ai/media/film-clean-720.b35c6dd4.webm',
            type: 'video/webm',
          },
          {
            src: 'https://www.amadeusbio.ai/media/film-clean-720.5b12e1b8.mp4',
            type: 'video/mp4',
          },
          {
            src: 'https://github.com/AmadeusBio-ai/Molecular_Animation/releases/download/v0.3.0/channelrhodopsin-v4.mp4',
            type: 'video/mp4',
          },
        ],
        description:
          'A 21-second silent film of channelrhodopsin C1C2, built from PDB structures 9GO1 and 9GO2 and drawn on white: the protein as ribbon cartoons, the acting residues in ball-and-stick, and retinal with its π-electron lobes. It opens on the protein dimer in a lipid membrane as photons arrive, dives into the retinal pocket, and shows retinal twisting from all-trans to 13-cis, an illustrative morph between the two crystal states, as the lobes separate across the twisting C13=C14 bond. Lys132 then swings toward Glu129 to form a salt bridge. A section through the cation pathway first shows it interrupted, as in the crystal, then open in an illustrative conducting-state model as sodium ions cross the membrane. Throughout, lipids, side chains, and the protein move with illustrative thermal motion.',
      },
    },
    featured: true,
  },
  {
    id: 'human-gated-music-agents',
    group: 'Independent projects',
    title: 'Human-gated music agents',
    context: 'Personal · open source',
    when: 'Jul–Sep 2026',
    dates: 'Jul–Sep 2026',
    status: { label: 'Open source', tone: 'released' },
    summary:
      'Claude Code skills that compose and arrange electric-guitar tablature. The model writes the tab, a validator parses and lints it, and I audition every chunk before it is accepted.',
    details: [
      'The arranger keeps the melody and root motion of the source piece, enforced by a fidelity check, and reports every other departure as information rather than as an error.',
      'A companion skill produces commit-pinned, evidence-linked implementation plans for public GitHub repositories, for handoff to a coding agent.',
    ],
    role: 'Built with Claude Code. No arrangement is final until I have listened to it.',
    evidence: [
      { label: 'Composer skill', href: 'https://github.com/starryark/Music-Skill' },
      { label: 'Piano-to-guitar arranger', href: 'https://github.com/starryark/piano-to-guitar' },
      { label: 'ABC-to-guitar', href: 'https://github.com/starryark/ABC-to-Guitar' },
      { label: 'Planning skill', href: 'https://github.com/starryark/UltraPlan-Skill' },
    ],
    featured: false,
  },
  {
    id: 'bioinformatics-agent-plugins',
    group: 'AmadeusBio.ai',
    title: 'Bioinformatics plugins for coding agents',
    context: 'AmadeusBio.ai · earlier tools',
    when: 'May 2026',
    dates: 'May 2026',
    status: { label: 'Superseded', tone: 'archived' },
    summary:
      'The first AmadeusBio.ai tools: a Claude Code plugin that operates PyMOL in natural language and retrieves sequences and structures from databases such as UniProt, and a plugin for Galaxy bioinformatics workflows.',
    details: [
      'These plugins came before the current research systems, which are not public. They remain available as historical work.',
    ],
    role: 'I built them with AI coding agents, building on skills from the open SciAgent-Skills collection.',
    evidence: [
      { label: 'Plugin source', href: 'https://github.com/AmadeusBio-ai/mvp' },
      { label: 'Galaxy plugin source', href: 'https://github.com/AmadeusBio-ai/galaxy-plugin' },
      { label: 'Demo video', href: 'https://www.youtube.com/watch?v=YzUysayUQHg' },
      { label: 'SciAgent-Skills', href: 'https://github.com/jaechang-hits/SciAgent-Skills' },
    ],
    featured: false,
  },
  {
    id: 'c-elegans-neuronal-morphology',
    group: 'Wet-lab research',
    title: 'Neuronal morphology genetics in C. elegans',
    context: 'Jin Lab, School of Biological Sciences, UC San Diego',
    when: '2025',
    dates: 'Jan–Dec 2025',
    status: { label: 'Poster · 2025', tone: 'presented' },
    summary:
      'Undergraduate research on genes that maintain the shape of touch-receptor neurons, using genetic crosses, PCR and Sanger genotyping, and fluorescence microscopy. First-author poster at the 2025 International Worm Meeting.',
    details: [
      'Poster: Yangyi Liu, Yixiao Xiao, Ting Zhao, Seungmee Park, Yishi Jin. “LNKN-1 as a Novel Regulator of Neuronal Morphologies in C. elegans.” International Worm Meeting, 2025.',
    ],
    role: 'Supervised by Yishi Jin, with mentors Seungmee Park, Ting Zhao, and Yixiao Xiao.',
    limits: 'The underlying data are unpublished, so there is no public link.',
    evidence: [],
    featured: true,
  },
  {
    id: 'bbx31-engineered-yeast',
    group: 'Wet-lab research',
    title: 'A plant transcription factor in engineered yeast',
    context: 'Li Lab, Chemical and Nano Engineering, UC San Diego',
    when: '2024',
    dates: 'Feb 2024–Jan 2025',
    status: { label: 'Poster · 2024', tone: 'presented' },
    summary:
      'Expressed the Arabidopsis transcription factor BBX31 in campesterol-producing Saccharomyces cerevisiae and measured its effects on growth, stress tolerance, and cell size. First-author poster at the 2024 ASCB Annual Meeting.',
    details: [
      'Poster: Yangyi Liu, Zixu Chen, Zechun Wang, Alan R. Zhang, Ethan E. Chin, Kaibiao Wang, Veronica Gomez-Godinez, Linda Shi, Yanran Li. “Investigating the Function of Arabidopsis thaliana Transcription Factor BBX31 in Saccharomyces cerevisiae.” ASCB Annual Meeting, 2024.',
      'Four of the coauthors were high-school interns in UC San Diego’s OPALS program, where I was a research mentor in the summer of 2024.',
      'The lab’s main project was strigolactone synthetic biology, and my Eleanor Roosevelt College Honors Project came from it: protein expression in E. coli and yeast consortia, ELISA with purified D14 strigolactone receptors, and LC-MS.',
    ],
    role: 'Supervised by Yanran Li.',
    limits: 'The ASCB poster is not online.',
    evidence: [],
    featured: false,
  },
];

export const experience: Experience[] = [
  {
    dates: '2026–present',
    title: 'Founder',
    org: 'AmadeusBio.ai',
    href: 'https://www.amadeusbio.ai',
    text: 'building LLM-powered tools for biological research: Model Context Protocol (MCP) servers for PyMOL and napari, Claude Code plugins, and Molecular Animation, an open-source framework with automated tests and CI.',
  },
  {
    dates: 'Jan–Dec 2025',
    title: 'Undergraduate researcher',
    org: 'Jin Lab, UC San Diego',
    text: 'Genes that maintain the shape of C. elegans touch-receptor neurons: genetic crosses, PCR and Sanger genotyping, fluorescence microscopy. First-author poster at the 2025 International Worm Meeting.',
  },
  {
    dates: 'Winter 2025',
    title: 'Instructional apprentice',
    org: 'Biological Sciences, UC San Diego',
    text: 'Undergraduate teaching assistant for BIBC 102, Metabolic Biochemistry, under Professor Feng.',
  },
  {
    dates: 'Jun–Aug 2024',
    title: 'Summer K–12 research mentor',
    org: 'OPALS, Institute of Engineering in Medicine, UC San Diego',
    text: 'Mentored high-school interns studying MSBP1 and calcium signaling in engineered yeast; they presented the work at the Biomedical Engineering Society poster expo.',
    evidence: {
      label: 'Poster: doi:10.6084/m9.figshare.30254713',
      href: 'https://doi.org/10.6084/m9.figshare.30254713',
    },
  },
  {
    dates: 'Feb 2024–Jan 2025',
    title: 'Undergraduate researcher',
    org: 'Li Lab, UC San Diego',
    text: 'Strigolactone synthetic biology in a yeast and E. coli consortium, and Arabidopsis BBX31 in campesterol-producing yeast. First-author poster at the 2024 ASCB Annual Meeting.',
  },
];

export const posters = [
  {
    year: '2025',
    authors: 'Yangyi Liu, Yixiao Xiao, Ting Zhao, Seungmee Park, Yishi Jin',
    title: 'LNKN-1 as a Novel Regulator of Neuronal Morphologies in C. elegans',
    venue: 'International Worm Meeting',
  },
  {
    year: '2024',
    authors:
      'Yangyi Liu, Zixu Chen, Zechun Wang, Alan R. Zhang, Ethan E. Chin, Kaibiao Wang, Veronica Gomez-Godinez, Linda Shi, Yanran Li',
    title:
      'Investigating the Function of Arabidopsis thaliana Transcription Factor BBX31 in Saccharomyces cerevisiae',
    venue: 'ASCB Annual Meeting',
  },
];

// Named in the terms current AI-for-biology postings use (survey of 51 postings, October 2026),
// most in-demand first. No bare generics such as Git, and no self-ratings.
export const skills = [
  {
    area: 'AI agents',
    items:
      'Agent architectures and tool use, Model Context Protocol (MCP) servers (PyMOL, napari), Claude Code skills and plugins, evals with graders, RAG, model fine-tuning',
  },
  {
    area: 'Software and ML',
    items:
      'Python (NumPy, pandas, pytest), PyTorch, Hugging Face, TypeScript, React, SQL, Docker, AWS, GCP, CI/CD',
  },
  {
    area: 'Computational biology',
    items:
      'AlphaFold 3, PDB/mmCIF structure analysis, PyMOL, ChimeraX, R (Seurat, Bioconductor), Scanpy, Fiji/ImageJ, statistics, Blender (Python API) for 3D visualization',
  },
  {
    area: 'Wet lab',
    items:
      'Cloning, PCR and qPCR, mammalian cell culture, yeast and E. coli strain engineering, flow cytometry, protein expression and purification, Western blot, ELISA, LC-MS, fluorescence microscopy',
  },
  { area: 'Languages', items: 'English, Mandarin, Japanese' },
];

export const coursework = [
  'Bioinformatics Laboratory',
  'Genome Diversity and Dynamics',
  'Physics of the Cell',
  'Biochemical Structure and Function',
  'Metabolic Biochemistry',
  'Recombinant DNA Techniques',
  'Cellular Neurobiology',
  'Genetics',
  'Molecular Biology',
  'Cell Biology',
  'Calculus-Based Probability and Statistics',
  'Phenomenology',
  'Political Thought: Kant to Nietzsche',
];
