import React from "react";
import { COLUMNS } from "../lib/constants";
import { TypeBadge, PriorityBadge, ClientBadge } from "./Core";
import { Trash2 } from "lucide-react";

export function ListView({ features, onSelect, onDelete }) {
  const statusMap = Object.fromEntries(COLUMNS.map(c => [c.key, c]));

  return (
    <div className="list-view-container">
      <table className="feature-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Type</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Client</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {features.map((f) => {
            const status = statusMap[f.status];
            return (
              <tr key={f.id} onClick={() => onSelect(f)}>
                <td>
                  <div className="title-cell">
                    <span className="title-text">{f.title}</span>
                    {f.tags?.length > 0 && (
                      <div className="tags-row">
                        {f.tags.slice(0, 2).map(t => <span key={t} className="mini-tag">{t}</span>)}
                        {f.tags.length > 2 && <span className="mini-tag">+{f.tags.length - 2}</span>}
                      </div>
                    )}
                  </div>
                </td>
                <td><TypeBadge type={f.type} /></td>
                <td>
                  <span className="status-pill" style={{ color: status?.color, background: `${status?.color}15` }}>
                    {status?.label}
                  </span>
                </td>
                <td><PriorityBadge priority={f.priority} /></td>
                <td><ClientBadge name={f.requestedBy} /></td>
                <td className="text-right">
                  <div className="actions">
                    <button className="action-btn delete" onClick={(e) => { e.stopPropagation(); onDelete(f.id); }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {features.length === 0 && (
        <div className="empty-state">
          No features found matching your criteria.
        </div>
      )}
    </div>
  );
}
