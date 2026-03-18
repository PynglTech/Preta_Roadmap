import React, { useState } from "react";
import { useRoadmap } from "./hooks/useRoadmap";
import { BoardView } from "./components/BoardView";
import { ListView } from "./components/ListView";
import { DetailPanel } from "./components/DetailPanel";
import { AddModal } from "./components/AddModal";
import { 
  LayoutGrid, 
  List, 
  Search, 
  Plus, 
  Filter, 
  TrendingUp, 
  BarChart3,
  Github,
  Trash2
} from "lucide-react";
import { COLUMNS, TYPES, PRIORITIES } from "./lib/constants";
import { AnimatePresence } from "framer-motion";

import "./index.css";
import "./styles/components.css";

export default function App() {
  const {
    features,
    filteredFeatures,
    search,
    setSearch,
    filterType,
    setFilterType,
    filterPriority,
    setFilterPriority,
    sortBy,
    setSortBy,
    updateFeature,
    addFeature,
    deleteFeature,
    deleteAllFeatures,
    upvoteFeature,
    setFeatureStatus,
    loading,
  } = useRoadmap();

  const [activeView, setActiveView] = useState("board");
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [defaultStatus, setDefaultStatus] = useState("review");

  const totalVotes = features.reduce((acc, f) => acc + f.votes, 0);

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon image">
              <img src="/preta-logo.png" alt="Preta" />
            </div>
            <span>Preta Roadmap</span>
          </div>
          <button className="new-feature-btn" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={18} />
            New Feature
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">Views</div>
          <button 
            className={`nav-item ${activeView === "board" ? "active" : ""}`}
            onClick={() => setActiveView("board")}
          >
            <LayoutGrid size={18} />
            Board
          </button>
          <button 
            className={`nav-item ${activeView === "list" ? "active" : ""}`}
            onClick={() => setActiveView("list")}
          >
            <List size={18} />
            List View
          </button>

          <div className="nav-section">Status</div>
          {COLUMNS.map(col => (
            <div key={col.key} className="nav-item status">
              <div className="col-dot" style={{ background: col.color }} />
              <span className="label">{col.label}</span>
              <span className="count">{features.filter(f => f.status === col.key).length}</span>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="stats-card">
            <div className="stat-item">
              <span className="label">Total Votes</span>
              <span className="value">{totalVotes}</span>
            </div>
            <div className="progress-bar">
               <div className="progress-fill" style={{ width: "70%" }} />
            </div>
          </div>
          <div className="github-link">
            <Github size={14} />
            <span>Open Source</span>
          </div>
          <button className="delete-all-btn" onClick={deleteAllFeatures}>
            <Trash2 size={14} />
            <span>Delete All</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-bar">
          <div className="search-container">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search features..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filters">
            <div className="filter-group">
              <Filter size={16} />
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="All">All Types</option>
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <TrendingUp size={16} />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="votes">Popularity</option>
                <option value="title">Alphabetical</option>
              </select>
            </div>
          </div>
        </header>

        <div className="content-area">
          {loading ? (
            <div className="loading-state">
              <div className="spinner" />
              <p>Syncing with Supabase...</p>
            </div>
          ) : activeView === "board" ? (
            <BoardView 
              features={filteredFeatures}
              onCardClick={setSelectedFeature}
              onUpvote={upvoteFeature}
              onStatusChange={setFeatureStatus}
              onAddClick={(status) => {
                setDefaultStatus(status);
                setIsAddModalOpen(true);
              }}
            />
          ) : (
            <ListView 
              features={filteredFeatures}
              onSelect={setSelectedFeature}
              onUpvote={upvoteFeature}
              onDelete={deleteFeature}
            />
          )}
        </div>
      </main>

      {/* Overlays */}
      <AnimatePresence>
        {selectedFeature && (
          <DetailPanel 
            feature={selectedFeature}
            onClose={() => setSelectedFeature(null)}
            onSave={updateFeature}
            onDelete={(id) => {
               deleteFeature(id);
               setSelectedFeature(null);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAddModalOpen && (
          <AddModal 
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onAdd={addFeature}
            defaultStatus={defaultStatus}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
