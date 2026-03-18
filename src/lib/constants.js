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

export const SEED_DATA = [
  { id:1,  title:"Angle/tilt effect for clips",           type:"Feature Request", status:"review",   votes:85,  comments:3,  priority:"High",     tags:["video","effects"],    desc:"Allow users to apply angle and tilt transformations to individual clips within a project." },
  { id:2,  title:"Watermark / Logo overlay on export",    type:"Feature Request", status:"review",   votes:73,  comments:2,  priority:"Medium",   tags:["export"],             desc:"Add support for watermarking exported videos with a custom PNG logo." },
  { id:3,  title:"Crop camera view",                      type:"Improvement",     status:"review",   votes:53,  comments:1,  priority:"Medium",   tags:["camera"],             desc:"Let users crop the camera feed independently from the screen recording." },
  { id:4,  title:"Freeze Frame",                          type:"Feature Request", status:"review",   votes:46,  comments:2,  priority:"Low",      tags:["editing"],            desc:"Pause video on a specific frame and extend its duration." },
  { id:5,  title:"Zoom for Camera Recording",             type:"Improvement",     status:"review",   votes:39,  comments:0,  priority:"Low",      tags:["camera"],             desc:"Match zoom behavior of screen recording for the camera view." },
  { id:6,  title:"Full text slides",                      type:"Feature Request", status:"planned",  votes:422, comments:13, priority:"Critical", tags:["slides","text"],      desc:"Create full-screen text slide templates that can be inserted into the timeline." },
  { id:7,  title:"Import / append external video clips",  type:"Feature Request", status:"planned",  votes:410, comments:10, priority:"Critical", tags:["import","clips"],     desc:"Allow importing external video files to be appended or merged into existing projects." },
  { id:8,  title:"Multi-clip recordings",                 type:"Feature Request", status:"planned",  votes:395, comments:19, priority:"High",     tags:["recording"],          desc:"Record multiple separate clips in a single session without stopping." },
  { id:9,  title:"Annotation Tools",                      type:"Feature Request", status:"planned",  votes:358, comments:22, priority:"High",     tags:["annotations"],        desc:"Add drawing, arrows, shapes, and text annotation overlays to recordings." },
  { id:10, title:"Enter / Exit animations",               type:"Improvement",     status:"planned",  votes:296, comments:7,  priority:"Medium",   tags:["animations"],         desc:"Support entrance and exit transition animations for overlays and camera views." },
  { id:11, title:"Import Audio",                          type:"Feature Request", status:"planned",  votes:237, comments:21, priority:"Medium",   tags:["audio"],              desc:"Import background music or voiceover audio tracks from local files." },
  { id:12, title:"Add voice over",                        type:"Feature Request", status:"progress", votes:254, comments:7,  priority:"High",     tags:["audio","voiceover"],  desc:"Record a separate voiceover track directly within the editor." },
  { id:13, title:"Teams subscriptions architecture",      type:"Task",            status:"progress", votes:22,  comments:1,  priority:"Critical", tags:["teams","backend"],    desc:"Design and implement the subscription model for team/org accounts." },
  { id:14, title:"Waiting for Windows version",           type:"Feature Request", status:"rejected", votes:289, comments:24, priority:"High",     tags:["platform"],           desc:"Native Windows desktop application." },
  { id:15, title:"Transparent Background",                type:"Feature Request", status:"rejected", votes:141, comments:12, priority:"Medium",   tags:["export","design"],    desc:"Export recordings with transparent background for use in presentations." },
  { id:16, title:"Green Screen Option",                   type:"Feature Request", status:"rejected", votes:31,  comments:5,  priority:"Low",      tags:["camera","effects"],   desc:"Virtual green screen / background removal for camera." },
];
