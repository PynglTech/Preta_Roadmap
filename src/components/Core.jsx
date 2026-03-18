import React from "react";
import { Sparkles, Hexagon, ArrowBigUpDash, Target, Square } from "lucide-react";
import { PRIORITY_COLORS } from "../lib/constants";

const ICON_MAP = {
  "Feature Request": Sparkles,
  "Bug Fix": Hexagon,
  "Improvement": ArrowBigUpDash,
  "Research": Target,
  "Task": Square,
};

export function TypeBadge({ type, size = 12 }) {
  const Icon = ICON_MAP[type] || Square;
  return (
    <span className="badge-type">
      <Icon size={size} strokeWidth={2.5} />
      {type}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  const color = PRIORITY_COLORS[priority] || '#6b7280';
  return (
    <span className="badge-priority" style={{ color: color, background: `${color}14`, borderColor: `${color}25` }}>
      {priority}
    </span>
  );
}

export function Avatar({ name, size = 28 }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
    
  const hue = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360;
  
  return (
    <div className="avatar" style={{ 
      width: `${size}px`, 
      height: `${size}px`, 
      background: `hsl(${hue}, 50%, 45%)`,
      fontSize: `${size * 0.4}px`
    }}>
      {initials}
    </div>
  );
}
