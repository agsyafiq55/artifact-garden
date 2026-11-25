export const TOPICS = {
  'systems-design': { label: 'Systems design', hue: 210 },
  databases: { label: 'Databases', hue: 28 },
  networking: { label: 'Networking', hue: 175 },
  frontend: { label: 'Frontend', hue: 350 },
  backend: { label: 'Backend', hue: 18 },
  'devops-cloud': { label: 'DevOps & cloud', hue: 195 },
  security: { label: 'Security', hue: 0 },
  'cs-fundamentals': { label: 'CS fundamentals', hue: 105 },
  'ai-ml': { label: 'AI / ML', hue: 48 },
  other: { label: 'Other', hue: 70 },
} as const;

export type Topic = keyof typeof TOPICS;
export const TOPIC_IDS = Object.keys(TOPICS) as [Topic, ...Topic[]];

export const topicLabel = (t: Topic) => TOPICS[t].label;
