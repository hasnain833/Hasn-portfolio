export type Project = {
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  githubLink: string | null;
  liveLink: string | null;
  year: string;
  highlights: string[];
};

export type Job = {
  id?: string;
  title: string;
  company: string;
  location?: string;
  period: string;
  year: string;
  description: string[];
  technologies?: string[];
  current?: boolean;
};

export type Service = {
  id?: string;
  title: string;
  description: string;
  details?: string[];
};

export type SiteData = {
  projects: Project[];
  experience: Job[];
  services: Service[];
  tools: string[];
};
