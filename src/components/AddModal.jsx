import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { COLUMNS, TYPES, PRIORITIES } from "../lib/constants";
import { motion } from "framer-motion";

export function AddModal({ isOpen, onClose, onAdd, defaultStatus = "review" }) {
  const [form, setForm] = useState({
    title: "",
    desc: "",
    type: "Feature Request",
    status: defaultStatus,
    priority: "Medium",
    tags: [],
    requestedBy: ""
  });
  
  const [tagInput, setTagInput] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onAdd(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="modal-content glass"
      >
        <div className="modal-header">
          <h2>Create New Feature</h2>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Title <span className="required">*</span></label>
              <input 
                autoFocus
                type="text" 
                name="title" 
                value={form.title} 
                onChange={handleChange} 
                placeholder="What's the feature called?"
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea 
                name="desc" 
                value={form.desc} 
                onChange={handleChange} 
                placeholder="Describe the value of this feature..."
                rows={3}
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
              <label>Client</label>
              <input 
                type="text" 
                name="requestedBy" 
                value={form.requestedBy} 
                onChange={handleChange} 
                placeholder="e.g. Google, Meta, etc."
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="secondary-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary-btn">
              <Plus size={16} />
              Add Feature
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
