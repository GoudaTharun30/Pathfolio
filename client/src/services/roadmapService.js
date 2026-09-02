/**
 * Career Roadmap Service for Pathfolio
 * Integrates backend API with client roadmap definitions
 */
import api from './api';
import { roadmapsData } from '../data/roadmapsData';

export const roadmapService = {
  async getRoadmaps(filters = {}) {
    try {
      const params = new URLSearchParams();
      if (filters.branch && filters.branch !== 'Any') params.append('branch', filters.branch);
      if (filters.category && filters.category !== 'All') params.append('category', filters.category);
      if (filters.knownSkills) params.append('knownSkills', filters.knownSkills);

      const query = params.toString() ? `?${params.toString()}` : '';
      const backendRoadmaps = await api.request(`/roadmaps${query}`);

      if (backendRoadmaps && backendRoadmaps.length > 0) {
        // Merge with client rich roadmaps to guarantee full stages and iconography
        return backendRoadmaps.map(br => {
          const matched = roadmapsData.find(r => r.slug === br.slug || r.id === br.slug);
          return {
            ...br,
            id: br.slug,
            icon: matched?.icon || 'fa-solid fa-compass',
            stages: (br.levels && br.levels.length > 0) ? br.levels : (matched?.stages || [])
          };
        });
      }
    } catch (err) {
      console.warn('Backend roadmaps API fallback to local structured data:', err.message);
    }

    // Fallback to client-side data with matching filters
    let list = [...roadmapsData];
    if (filters.branch && filters.branch !== 'Any') {
      list = list.filter(r => r.branches?.includes(filters.branch));
    }
    if (filters.category && filters.category !== 'All') {
      list = list.filter(r => r.category?.toLowerCase() === filters.category.toLowerCase());
    }
    if (filters.knownSkills) {
      const skillQuery = filters.knownSkills.toLowerCase();
      list = list.filter(r =>
        r.requiredSkills?.some(s => s.toLowerCase().includes(skillQuery)) ||
        r.title?.toLowerCase().includes(skillQuery)
      );
    }
    return list;
  },

  async getRoadmapBySlug(slug) {
    try {
      const backendRoadmap = await api.request(`/roadmaps/${slug}`);
      const matched = roadmapsData.find(r => r.slug === slug || r.id === slug);
      if (backendRoadmap) {
        return {
          ...backendRoadmap,
          id: backendRoadmap.slug,
          icon: matched?.icon || 'fa-solid fa-compass',
          stages: (backendRoadmap.levels && backendRoadmap.levels.length > 0)
            ? backendRoadmap.levels
            : (matched?.stages || []),
          projects: (backendRoadmap.projects && backendRoadmap.projects.length > 0)
            ? backendRoadmap.projects
            : (matched?.projects || []),
          interviewPreparation: (backendRoadmap.interviewPreparation && backendRoadmap.interviewPreparation.length > 0)
            ? backendRoadmap.interviewPreparation
            : (matched?.interviewPreparation || []),
          recommendedResources: (backendRoadmap.recommendedResources && backendRoadmap.recommendedResources.length > 0)
            ? backendRoadmap.recommendedResources
            : (matched?.recommendedResources || [])
        };
      }
    } catch (err) {
      console.warn(`Backend roadmap [${slug}] API fallback:`, err.message);
    }

    const fallback = roadmapsData.find(r => r.slug === slug || r.id === slug);
    if (!fallback) {
      throw new Error(`Roadmap "${slug}" not found.`);
    }
    return fallback;
  }
};

export default roadmapService;
