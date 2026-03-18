import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, ArrowUp } from "lucide-react";
import { TypeBadge, PriorityBadge } from "./Core";

export function FeatureCard({ feature, onClick, onUpvote }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="feature-card"
      onClick={onClick}
    >
      <h3 className="card-title">{feature.title}</h3>
      
      <div className="card-meta">
        <TypeBadge type={feature.type} />
        <PriorityBadge priority={feature.priority} />
      </div>

      {feature.tags?.length > 0 && (
        <div className="card-tags">
          {feature.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}

      <div className="card-footer">
        <div className="stats">
          <div className="stat">
            <ArrowUp size={14} className="icon-up" />
            <span className="count">{feature.votes}</span>
          </div>
          <div className="stat">
            <MessageSquare size={13} className="icon-comment" />
            <span className="count">{feature.comments}</span>
          </div>
        </div>
        
        <button 
          className="vote-btn"
          onClick={(e) => {
            e.stopPropagation();
            onUpvote(feature.id);
          }}
        >
          Vote
        </button>
      </div>
    </motion.div>
  );
}
