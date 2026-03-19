export const COLUMNS = [
  { key: "review",   label: "In Review",   color: "#3b82f6", bg: "rgba(59,130,246,0.1)"  },
  { key: "planned",  label: "Planned",     color: "#a855f7", bg: "rgba(168,85,247,0.1)"  },
  { key: "progress", label: "In Progress", color: "#10b981", bg: "rgba(16,185,129,0.1)"  },
  { key: "done",     label: "Done",        color: "#f59e0b", bg: "rgba(245,158,11,0.1)"  },
  { key: "rejected", label: "Rejected",    color: "#ef4444", bg: "rgba(239,68,68,0.1)"   },
];

export const TYPES = ["Feature Request", "Bug Fix", "Improvement", "Research", "Task"];
export const PRIORITIES = ["Critical", "High", "Medium", "Low"];

export const PRIORITY_COLORS = {
  Critical: "#ef4444",
  High:     "#f97316",
  Medium:   "#f59e0b",
  Low:      "#6b7280",
};

export const CLIENTS = [];

export const SEED_DATA = [
  { id:8,  title:"Multi-clip recordings",                 type:"Feature Request", status:"planned",  comments:19, priority:"High",     tags:["recording"],          desc:"Record multiple separate clips in a single session without stopping." },
  { id:9,  title:"Annotation Tools",                      type:"Feature Request", status:"planned",  comments:22, priority:"High",     tags:["annotations"],        desc:"Add drawing, arrows, shapes, and text annotation overlays to recordings." },
  { id:10, title:"Enter / Exit animations",               type:"Improvement",     status:"planned",  comments:7,  priority:"Medium",   tags:["animations"],         desc:"Support entrance and exit transition animations for overlays and camera views." },
  { id:11, title:"Import Audio",                          type:"Feature Request", status:"planned",  comments:21, priority:"Medium",   tags:["audio"],              desc:"Import background music or voiceover audio tracks from local files." },
  { id:12, title:"Add voice over",                        type:"Feature Request", status:"progress", comments:7,  priority:"High",     tags:["audio","voiceover"],  desc:"Record a separate voiceover track directly within the editor." },
  { id:13, title:"Teams subscriptions architecture",      type:"Task",            status:"progress", comments:1,  priority:"Critical", tags:["teams","backend"],    desc:"Design and implement the subscription model for team/org accounts." },
  { id:14, title:"Waiting for Windows version",           type:"Feature Request", status:"rejected", comments:24, priority:"High",     tags:["platform"],           desc:"Native Windows desktop application." },
  { id:15, title:"Transparent Background",                type:"Feature Request", status:"rejected", comments:12, priority:"Medium",   tags:["export","design"],    desc:"Export recordings with transparent background for use in presentations." },
  { id:16, title:"Green Screen Option",                   type:"Feature Request", status:"rejected", comments:5,  priority:"Low",      tags:["camera","effects"],   desc:"Virtual green screen / background removal for camera." },
];
