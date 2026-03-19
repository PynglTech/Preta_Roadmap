import React, { useState, useEffect } from "react";
import { X, Trash2, Save, Tag as TagIcon, ChevronRight } from "lucide-react";
import { COLUMNS, TYPES, PRIORITIES } from "../lib/constants";
import { motion, AnimatePresence } from "framer-motion";

export function DetailPanel({ feature, onClose, onSave, onDelete }) {
  const [form, setForm] = useState({ ...feature });
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    setForm({ ...feature });
  }, [feature]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !form.tags.includes(tag)) {
      setForm(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
    setTagInput("");
  };

  const handleRemoveTag = (tag) => {
    setForm(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  return (
    <motion.aside
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="detail-panel"
    >
      <div className="panel-header">
        <div className="header-left">
          <ChevronRight size={18} className="text-muted" />
          <span className="panel-title">Feature Details</span>
        </div>
        <div className="header-actions">
          <button className="icon-btn delete" onClick={() => onDelete(feature.id)}>
            <Trash2 size={18} />
          </button>
          <button className="icon-btn close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="panel-body">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Feature name..."
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="desc"
            value={form.desc || ""}
            onChange={handleChange}
            placeholder="Add a detailed description..."
            rows={5}
          />
        </div>

        <div className="form-row">
          <div className="form-group half">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              {COLUMNS.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
            </select>
          </div>
          <div className="form-group half">
            <label>Priority</label>
            <select name="priority" value={form.priority} onChange={handleChange}>
              {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Type</label>
          <select name="type" value={form.type} onChange={handleChange}>
            {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Requested By</label>
          <input 
            type="text" 
            name="requestedBy" 
            value={form.requestedBy || ""} 
            onChange={handleChange} 
            placeholder="e.g. Google, Meta, etc."
          />
        </div>

        <div className="form-group">
          <label>Tags</label>
          <div className="tags-container">
            {form.tags?.map(tag => (
              <span key={tag} className="tag-pill">
                {tag}
                <X size={12} onClick={() => handleRemoveTag(tag)} />
              </span>
            ))}
          </div>
          <div className="tag-input-wrapper">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
              placeholder="Add tag..."
            />
            <button className="add-tag-btn" onClick={handleAddTag}>
              <TagIcon size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="panel-footer">
        <button className="secondary-btn" onClick={onClose}>Cancel</button>
        <button className="primary-btn" onClick={() => onSave(form)}>
          <Save size={16} />
          Save Changes
        </button>
      </div>
    </motion.aside>
  );
}
