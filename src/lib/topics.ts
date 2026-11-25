// The fixed topic list. Add a topic here and it becomes valid everywhere
// (schemas, filters, topic pages, graph colours).
export const TOPICS = {
  'systems-design': { label: 'Systems Design', hue: 210 },
  databases: { label: 'Databases', hue: 28 },
  networking: { label: 'Networking', hue: 175 },
  frontend: { label: 'Frontend', hue: 330 },
  backend: { label: 'Backend', hue: 255 },
  'devops-cloud': { label: 'DevOps & Cloud', hue: 195 },
  security: { label: 'Security', hue: 0 },
  'cs-fundamentals': { label: 'CS Fundamentals', hue: 140 },
  'ai-ml': { label: 'AI / ML', hue: 285 },
  other: { label: 'Other', hue: 45 },
} as const;

export type Topic = keyof typeof TOPICS;
export const TOPIC_IDS = Object.keys(TOPICS) as [Topic, ...Topic[]];

export const topicLabel = (t: Topic) => TOPICS[t].label;
