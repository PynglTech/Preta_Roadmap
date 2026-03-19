import React from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { TypeBadge, PriorityBadge, ClientBadge } from "./Core";

export function FeatureCard({ feature, onClick }) {
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
        <ClientBadge name={feature.requestedBy} />
      </div>
      {feature.tags?.length > 0 && (
        <div className="card-tags">
          {feature.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}

      <div className="card-footer">
          <div className="stat">
            <MessageSquare size={13} className="icon-comment" />
            <span className="count">{feature.comments}</span>
          </div>
        

      </div>
    </motion.div>
  );
}
