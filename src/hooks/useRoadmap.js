import { useState, useCallback, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { SEED_DATA } from "../lib/constants";

export function useRoadmap() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [sortBy, setSortBy] = useState("votes");

  const fetchFeatures = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('features')
        .select('*')
        .order('votes', { ascending: false });

      if (error) throw error;
      
      if (data && data.length > 0) {
        setFeatures(data);
      } else {
        setFeatures([]);
      }
    } catch (e) {
      console.error("Error fetching features:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeatures();
  }, [fetchFeatures]);

  const updateFeature = useCallback(async (updatedFeature) => {
    try {
      const { error } = await supabase
        .from('features')
        .update({
          title: updatedFeature.title,
          desc: updatedFeature.desc,
          status: updatedFeature.status,
          type: updatedFeature.type,
          priority: updatedFeature.priority,
          votes: updatedFeature.votes
        })
        .eq('id', updatedFeature.id);

      if (error) throw error;
      setFeatures(prev => prev.map(f => f.id === updatedFeature.id ? updatedFeature : f));
    } catch (e) {
      console.error("Error updating feature:", e);
    }
  }, []);

  const addFeature = useCallback(async (newFeature) => {
    try {
      const { data, error } = await supabase
        .from('features')
        .insert([{ ...newFeature }])
        .select();

      if (error) throw error;
      if (data) {
        setFeatures(prev => [...prev, data[0]]);
      }
    } catch (e) {
      console.error("Error adding feature:", e);
    }
  }, []);

  const deleteFeature = useCallback(async (id) => {
    try {
      const { error } = await supabase
        .from('features')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setFeatures(prev => prev.filter(f => f.id !== id));
    } catch (e) {
      console.error("Error deleting feature:", e);
    }
  }, []);

  const deleteAllFeatures = useCallback(async () => {
    if (window.confirm("Are you sure you want to delete all features from Supabase? This action cannot be undone.")) {
      try {
        const { error } = await supabase
          .from('features')
          .delete()
          .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

        if (error) throw error;
        setFeatures([]);
      } catch (e) {
        console.error("Error deleting all features:", e);
      }
    }
  }, []);

  const upvoteFeature = useCallback(async (id) => {
    try {
      const feature = features.find(f => f.id === id);
      if (!feature) return;

      const newVotes = (feature.votes || 0) + 1;
      const { error } = await supabase
        .from('features')
        .update({ votes: newVotes })
        .eq('id', id);

      if (error) throw error;
      setFeatures(prev => prev.map(f => f.id === id ? { ...f, votes: newVotes } : f));
    } catch (e) {
      console.error("Error upvoting feature:", e);
    }
  }, [features]);

  const setFeatureStatus = useCallback(async (id, status) => {
    try {
      const { error } = await supabase
        .from('features')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      setFeatures(prev => prev.map(f => f.id === id ? { ...f, status } : f));
    } catch (e) {
      console.error("Error setting feature status:", e);
    }
  }, []);

  const filteredFeatures = (features || [])
    .filter(f => {
      const matchSearch = (f.title || "").toLowerCase().includes(search.toLowerCase()) || 
                          (f.desc || "").toLowerCase().includes(search.toLowerCase());
      const matchType = filterType === "All" || f.type === filterType;
      const matchPriority = filterPriority === "All" || f.priority === filterPriority;
      return matchSearch && matchType && matchPriority;
    })
    .sort((a, b) => {
      if (sortBy === "votes") return (b.votes || 0) - (a.votes || 0);
      return (a.title || "").localeCompare(b.title || "");
    });

  return {
    features,
    loading,
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
  };
}
