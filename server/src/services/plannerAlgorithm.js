/**
 * Time-Based Personalized Learning Path Scheduler
 */

const IMPORTANCE_WEIGHTS = {
  essential: 4,
  important: 3,
  advanced: 2,
  optional: 1
};

/**
 * Generate a personalized learning schedule based on available weeks & study hours
 */
function generatePersonalizedSchedule(roadmap, durationWeeks, hoursPerWeek) {
  const totalCapacityHours = durationWeeks * hoursPerWeek;

  // 1. Flatten all topics from all levels
  let allTopics = [];
  roadmap.levels.forEach(lvl => {
    lvl.topics.forEach(t => {
      allTopics.push({
        topicId: t.id || t.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        title: t.title,
        importance: t.importance || 'essential',
        difficulty: t.difficulty || 'beginner',
        estimatedHours: t.estimatedHours || 4,
        prerequisites: t.prerequisites || [],
        levelNumber: lvl.level,
        levelTitle: lvl.title
      });
    });
  });

  // 2. Sort topics by topological prerequisite order + importance weight
  let scheduledTopics = [];
  let remainingTopics = [...allTopics];

  // Helper: check if all prerequisites of a topic are satisfied
  function arePrereqsSatisfied(topic, addedList) {
    if (!topic.prerequisites || !topic.prerequisites.length) return true;
    return topic.prerequisites.every(prereqId =>
      addedList.some(t => t.topicId === prereqId || t.title.toLowerCase().includes(prereqId.toLowerCase()))
    );
  }

  // Priority queue selection based on capacity
  let accumulatedHours = 0;

  while (remainingTopics.length > 0) {
    // Find candidates whose prereqs are satisfied
    let candidates = remainingTopics.filter(t => arePrereqsSatisfied(t, scheduledTopics));
    
    if (candidates.length === 0) {
      // Fallback if circular or unresolved prereqs exist
      candidates = remainingTopics;
    }

    // Sort candidates by importance (essential first), then level number
    candidates.sort((a, b) => {
      const weightDiff = (IMPORTANCE_WEIGHTS[b.importance] || 0) - (IMPORTANCE_WEIGHTS[a.importance] || 0);
      if (weightDiff !== 0) return weightDiff;
      return a.levelNumber - b.levelNumber;
    });

    const bestCandidate = candidates[0];
    
    // Check capacity constraint (for crash paths, cap at totalCapacityHours unless essential)
    if (accumulatedHours + bestCandidate.estimatedHours > totalCapacityHours && scheduledTopics.length >= 4 && durationWeeks <= 4) {
      // For short timelines (<= 4 weeks), stop once capacity is filled by high priority topics
      if (bestCandidate.importance === 'advanced' || bestCandidate.importance === 'optional') {
        break;
      }
    }

    scheduledTopics.push(bestCandidate);
    accumulatedHours += bestCandidate.estimatedHours;
    remainingTopics = remainingTopics.filter(t => t.topicId !== bestCandidate.topicId);
  }

  // If very few topics scheduled, ensure at least essential topics are present
  if (scheduledTopics.length === 0) {
    scheduledTopics = allTopics.slice(0, Math.min(allTopics.length, 6));
  }

  // 3. Distribute scheduled topics evenly across available weeks
  const weeksCount = Math.max(1, durationWeeks);
  const topicsPerWeek = Math.ceil(scheduledTopics.length / weeksCount);
  const weeksSchedule = [];

  let topicIndex = 0;
  for (let w = 1; w <= weeksCount; w++) {
    const monthNumber = Math.ceil(w / 4);
    const weekTopics = [];
    
    for (let i = 0; i < topicsPerWeek && topicIndex < scheduledTopics.length; i++) {
      const t = scheduledTopics[topicIndex++];
      weekTopics.push({
        topicId: t.topicId,
        title: t.title,
        importance: t.importance,
        estimatedHours: t.estimatedHours,
        completed: false
      });
    }

    if (weekTopics.length > 0) {
      // Determine week title focus
      const primaryLevel = weekTopics[0].importance === 'essential' ? 'Foundation' : 'Core & Practical';
      weeksSchedule.push({
        weekNumber: w,
        monthNumber: monthNumber,
        title: `Week ${w}: ${weekTopics[0].title}`,
        topics: weekTopics
      });
    }
  }

  return {
    totalCapacityHours,
    scheduledTopicsCount: scheduledTopics.length,
    weeks: weeksSchedule
  };
}

module.exports = {
  generatePersonalizedSchedule
};
