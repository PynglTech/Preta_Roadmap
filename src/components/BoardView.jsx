import React, { useState } from "react";
import { COLUMNS } from "../lib/constants";
import { FeatureCard } from "./FeatureCard";
import { Plus } from "lucide-react";

export function BoardView({ features, onCardClick, onUpvote, onStatusChange, onAddClick }) {
  const [draggedId, setDraggedId] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (id) {
      onStatusChange(id, status);
    }
  };

  return (
    <div className="board-container">
      {COLUMNS.map((col) => {
        const columnFeatures = features.filter((f) => f.status === col.key);
        
        return (
          <div 
            key={col.key} 
            className="column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, col.key)}
          >
            <div className="column-header">
              <div className="column-title" style={{ color: col.color }}>
                <div className="col-dot" style={{ background: col.color }} />
                {col.label}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="column-count">{columnFeatures.length}</span>
                <button 
                  className="add-inline-btn"
                  onClick={() => onAddClick(col.key)}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="card-list">
              {columnFeatures.map((f) => (
                <div
                  key={f.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("text/plain", f.id);
                    setDraggedId(f.id);
                  }}
                  onDragEnd={() => setDraggedId(null)}
                  style={{ opacity: draggedId === f.id ? 0.5 : 1 }}
                >
                  <FeatureCard 
                    feature={f} 
                    onClick={() => onCardClick(f)} 
                    onUpvote={onUpvote} 
                  />
                </div>
              ))}
              {columnFeatures.length === 0 && (
                <div className="empty-drop-zone">
                  No features here
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
