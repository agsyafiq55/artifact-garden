export const TOPICS = {
  'systems-design': { label: 'Systems design' },
  databases: { label: 'Databases' },
  networking: { label: 'Networking' },
  frontend: { label: 'Frontend' },
  backend: { label: 'Backend' },
  'devops-cloud': { label: 'DevOps & cloud' },
  security: { label: 'Security' },
  'cs-fundamentals': { label: 'CS fundamentals' },
  'ai-ml': { label: 'AI / ML' },
  other: { label: 'Other' },
} as const;

export type Topic = keyof typeof TOPICS;
export const TOPIC_IDS = Object.keys(TOPICS) as [Topic, ...Topic[]];

