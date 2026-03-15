import { ContentGrid } from '@/components/content-grid';
import { PageHero } from '@/components/page-hero';

const items = [
  {
    title: 'Why most AI products break after the demo',
    description: 'Technical essays on reliability, retries, orchestration, observability, and trust in LLM systems.',
    meta: 'Essay',
  },
  {
    title: 'Agents in production',
    description: 'Architecture notes on state, permissions, memory, tool use, and the ugly realities of execution.',
    meta: 'Series',
  },
  {
    title: 'Workflow design around LLMs',
    description: 'The system layer around prompts: contracts, queues, verifiers, retries, and human override.',
    meta: 'Operator note',
  },
];

export default function EssaysPage() {
  return (
    <div className="pb-16">
      <PageHero
        eyebrow="ESSAYS"
        title="Technical essays on AI systems that work outside demos."
        description="Long-form writing on agents in production, workflow design, model/tool tradeoffs, and the engineering behind trustworthy AI products."
      />
      <div className="container-shell">
        <ContentGrid items={items} />
      </div>
    </div>
  );
}
