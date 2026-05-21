"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Bot, CheckSquare, ChevronRight, ClipboardCopy,
  Download, FileText, Lightbulb, Loader2, MessageSquare,
  Quote, RefreshCw, Search, Sparkles, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Tool definitions ─────────────────────────────────────────────────────────

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  inputs: { id: string; label: string; type: "text" | "textarea" | "select"; placeholder?: string; options?: string[] }[];
  promptHint: string;
}

const TOOLS: Tool[] = [
  {
    id: "outline",
    name: "Assignment Outline Generator",
    description: "Generate a structured outline from a topic, rubric, or brief.",
    icon: FileText,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10 border-blue-500/20",
    inputs: [
      { id: "topic", label: "Topic / assignment title", type: "text", placeholder: "e.g. Impact of social media on democracy" },
      { id: "level", label: "Academic level", type: "select", options: ["High School", "Undergraduate", "Masters", "PhD"] },
      { id: "wordcount", label: "Word count target", type: "text", placeholder: "e.g. 3000" },
      { id: "extra", label: "Additional requirements", type: "textarea", placeholder: "Rubric, style guide, specific sections…" },
    ],
    promptHint: "Generating structured outline with headings, subpoints, and suggested sources…",
  },
  {
    id: "topic",
    name: "Topic Generator",
    description: "Get 10 unique, researchable topic ideas for any subject area.",
    icon: Lightbulb,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10 border-amber-500/20",
    inputs: [
      { id: "subject", label: "Subject / discipline", type: "text", placeholder: "e.g. Environmental Economics" },
      { id: "level", label: "Academic level", type: "select", options: ["High School", "Undergraduate", "Masters", "PhD"] },
      { id: "focus", label: "Focus area (optional)", type: "text", placeholder: "e.g. policy, technology, history…" },
    ],
    promptHint: "Generating 10 unique and researchable topic ideas…",
  },
  {
    id: "summarizer",
    name: "Text Summarizer",
    description: "Condense any text into a clear, concise academic summary.",
    icon: BookOpen,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10 border-emerald-500/20",
    inputs: [
      { id: "text", label: "Paste your text", type: "textarea", placeholder: "Paste the text you want summarized here…" },
      { id: "length", label: "Summary length", type: "select", options: ["1 paragraph", "3 bullet points", "5 bullet points", "Half the original"] },
    ],
    promptHint: "Analyzing and condensing your text…",
  },
  {
    id: "citation",
    name: "Citation Generator",
    description: "Format references correctly in APA, MLA, Harvard, or Chicago.",
    icon: Quote,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10 border-purple-500/20",
    inputs: [
      { id: "type", label: "Source type", type: "select", options: ["Book", "Journal article", "Website", "News article", "Conference paper"] },
      { id: "details", label: "Source details", type: "textarea", placeholder: "Author, title, year, publisher, URL…" },
      { id: "style", label: "Citation style", type: "select", options: ["APA 7th", "MLA 9th", "Harvard", "Chicago", "IEEE", "Vancouver"] },
    ],
    promptHint: "Formatting your citation correctly…",
  },
  {
    id: "grammar",
    name: "Grammar Checker",
    description: "Improve clarity, grammar, and academic tone of your writing.",
    icon: CheckSquare,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10 border-cyan-500/20",
    inputs: [
      { id: "text", label: "Paste your text", type: "textarea", placeholder: "Paste your paragraph or section here…" },
      { id: "goal", label: "Improvement goal", type: "select", options: ["Fix grammar only", "Improve academic tone", "Improve clarity", "Full revision"] },
    ],
    promptHint: "Checking grammar, clarity, and academic tone…",
  },
  {
    id: "research",
    name: "Research Question Generator",
    description: "Turn a broad topic into focused, testable research questions.",
    icon: Search,
    color: "text-rose-400",
    bgColor: "bg-rose-500/10 border-rose-500/20",
    inputs: [
      { id: "topic", label: "Research topic", type: "text", placeholder: "e.g. Remote work and productivity" },
      { id: "field", label: "Academic field", type: "text", placeholder: "e.g. Organizational Psychology" },
      { id: "type", label: "Research type", type: "select", options: ["Qualitative", "Quantitative", "Mixed methods"] },
    ],
    promptHint: "Generating focused and testable research questions…",
  },
];

// ─── Mock AI responses ────────────────────────────────────────────────────────

const MOCK_RESPONSES: Record<string, string> = {
  outline: `# Assignment Outline: Impact of Social Media on Democracy

## I. Introduction (300 words)
- Background on social media proliferation
- Thesis statement: Social media fundamentally disrupts democratic processes
- Scope and limitations

## II. Literature Review (600 words)
### A. Democratic Theory Foundations
- Deliberative democracy (Habermas, 1984)
- Participatory democracy models

### B. Social Media's Role
- Political mobilization studies
- Echo chamber formation (Sunstein, 2017)

## III. Analysis: Positive Effects (500 words)
- Increased civic participation
- Real-time political discourse
- Marginalized voices amplification

## IV. Analysis: Negative Effects (600 words)
- Misinformation and deepfakes
- Filter bubbles and polarization
- Foreign interference patterns

## V. Case Studies (400 words)
- Arab Spring (2010-2012)
- Brexit referendum discourse
- US 2016/2020 election cycles

## VI. Conclusion (300 words)
- Synthesis of key arguments
- Policy recommendations
- Future research directions

## References (APA 7th)
*Minimum 12 peer-reviewed sources recommended*`,

  topic: `## 10 Researchable Topic Ideas — Environmental Economics

1. **Carbon pricing mechanisms**: A comparative study of cap-and-trade vs. carbon tax systems in EU and North America (2010–2023)

2. **Green bonds and market efficiency**: Do ESG-linked financial instruments actually reduce corporate emissions?

3. **The economics of biodiversity loss**: Quantifying ecosystem service collapse in Southeast Asian rainforests

4. **Circular economy transition costs**: Barriers to plastics reform in developing economies

5. **Just transition economics**: Labor market displacement in fossil fuel-dependent regions and policy responses

6. **Deforestation and sovereign debt**: How IMF/World Bank structural adjustment programs shaped tropical forest loss in Sub-Saharan Africa

7. **Behavioral economics of environmental compliance**: Nudge theory applications in household energy consumption reduction

8. **Blue economy valuation**: Pricing ocean ecosystem services — methodologies and policy implications

9. **Climate gentrification**: How rising seas are reshaping real estate markets in coastal cities

10. **Voluntary carbon markets**: Price volatility, additionality concerns, and the reliability of offset schemes`,

  summarizer: `## Summary

The text explores the multifaceted relationship between technological advancement and social inequality, arguing that digital transformation — while increasing economic productivity — disproportionately benefits high-skill workers and capital owners. The author draws on longitudinal labor market data from OECD nations to demonstrate that automation displaces routine cognitive and manual tasks, hollowing out middle-income employment.

**Key points:**
- Technological unemployment is not evenly distributed across skill and income brackets
- Policy interventions like Universal Basic Income (UBI) trials show mixed results in Scandinavia and Kenya
- Education systems lag 15–20 years behind labor market demand signals
- The "superstar economy" dynamic concentrates gains among top 1% of firms and workers`,

  citation: `## Generated Citations

**APA 7th Edition:**
> Smith, J. A., & Johnson, K. L. (2021). *The digital divide in democratic participation: Social media, polarization, and civic engagement*. Oxford University Press. https://doi.org/10.1093/example

**MLA 9th Edition:**
> Smith, James A., and Karen L. Johnson. *The Digital Divide in Democratic Participation: Social Media, Polarization, and Civic Engagement*. Oxford University Press, 2021.

**Harvard:**
> Smith, J.A. and Johnson, K.L. (2021) *The Digital Divide in Democratic Participation*. Oxford: Oxford University Press.

**Chicago (Author-Date):**
> Smith, James A., and Karen L. Johnson. 2021. *The Digital Divide in Democratic Participation*. Oxford: Oxford University Press.`,

  grammar: `## Revised Text

**Original issues identified:** 3 grammatical errors, unclear antecedents, passive voice overuse, weak academic register.

---

**Revised version:**

*"Contemporary research increasingly demonstrates that social media platforms fundamentally alter political discourse by creating self-reinforcing informational ecosystems. Users who engage primarily within algorithmically curated environments exhibit significantly reduced exposure to opposing viewpoints, thereby accelerating ideological polarization. This phenomenon, commonly referred to as the 'filter bubble effect' (Pariser, 2011), has profound implications for deliberative democracy."*

**Changes made:**
- ✓ Removed 3 comma splices
- ✓ Replaced 4 passive constructions with active voice
- ✓ Elevated academic register (replaced informal phrasing)
- ✓ Clarified subject-antecedent agreement
- ✓ Added hedging language appropriate for academic writing`,

  research: `## Research Questions — Remote Work and Productivity

### Primary Research Questions:
1. To what extent does remote work arrangement affect knowledge worker productivity, measured by output quality and task completion rates, in technology firms between 2020 and 2024?

2. How do individual personality traits (introversion/extraversion) moderate the relationship between remote work and self-reported job satisfaction?

### Secondary Questions:
3. What role does managerial surveillance technology play in remote worker autonomy and trust dynamics?

4. Does the presence of a dedicated home office space significantly predict remote work performance outcomes?

5. How do team cohesion and organizational commitment differ between hybrid, fully remote, and fully in-office workforces?

### Hypothesis (Quantitative):
> H₁: Remote workers with dedicated workspaces report significantly higher productivity scores than those without (p < 0.05)`,
};

// ─── Tool card ────────────────────────────────────────────────────────────────

function ToolCard({ tool, onClick }: { tool: Tool; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "flex flex-col items-start gap-3 rounded-xl border p-5 text-left transition-all duration-200 hover:shadow-lg",
        tool.bgColor
      )}
    >
      <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-black/20", tool.color)}>
        <tool.icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-semibold text-white">{tool.name}</p>
        <p className="mt-1 text-sm text-slate-400">{tool.description}</p>
      </div>
      <div className="flex items-center gap-1 text-xs font-medium text-slate-400">
        Open tool <ChevronRight className="h-3 w-3" />
      </div>
    </motion.button>
  );
}

// ─── Tool workspace ───────────────────────────────────────────────────────────

function ToolWorkspace({ tool, onClose }: { tool: Tool; onClose: () => void }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 1800));
    setResult(MOCK_RESPONSES[tool.id] ?? "Mock AI response generated successfully.");
    setLoading(false);
  }

  async function handleCopy() {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="flex h-full flex-col"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/[0.07] pb-4 mb-5">
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", tool.bgColor, tool.color)}>
          <tool.icon className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <h2 className="text-base font-semibold text-white">{tool.name}</h2>
          <p className="text-xs text-slate-400">{tool.description}</p>
        </div>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-white/[0.06] hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-5 overflow-y-auto lg:flex-row">
        {/* Inputs */}
        <div className="flex-1 space-y-4">
          {tool.inputs.map((input) => (
            <div key={input.id}>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">{input.label}</label>
              {input.type === "select" ? (
                <select
                  value={values[input.id] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [input.id]: e.target.value }))}
                  className="h-10 w-full rounded-xl border border-white/[0.09] bg-white/[0.04] px-3 text-sm text-white focus:border-blue-500/40 focus:outline-none focus:ring-1 focus:ring-blue-500/15"
                >
                  <option value="">Select…</option>
                  {input.options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              ) : input.type === "textarea" ? (
                <textarea
                  value={values[input.id] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [input.id]: e.target.value }))}
                  placeholder={input.placeholder}
                  rows={4}
                  className="w-full rounded-xl border border-white/[0.09] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/40 focus:outline-none focus:ring-1 focus:ring-blue-500/15"
                />
              ) : (
                <input
                  type="text"
                  value={values[input.id] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [input.id]: e.target.value }))}
                  placeholder={input.placeholder}
                  className="h-10 w-full rounded-xl border border-white/[0.09] bg-white/[0.04] px-4 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/40 focus:outline-none focus:ring-1 focus:ring-blue-500/15"
                />
              )}
            </div>
          ))}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 text-sm font-semibold text-white transition-all hover:from-blue-500 hover:to-purple-500 active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {tool.promptHint}
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate
              </>
            )}
          </button>
        </div>

        {/* Output */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-slate-300">Output</p>
            {result && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 text-xs text-slate-400 transition hover:text-white"
                >
                  <ClipboardCopy className="h-3 w-3" />
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 text-xs text-slate-400 transition hover:text-white">
                  <Download className="h-3 w-3" />
                  Export
                </button>
                <button onClick={handleGenerate} className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 text-xs text-slate-400 transition hover:text-white">
                  <RefreshCw className="h-3 w-3" />
                  Regenerate
                </button>
              </div>
            )}
          </div>
          <div className="min-h-[300px] rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
            {!result && !loading && (
              <div className="flex h-full min-h-[260px] flex-col items-center justify-center text-center">
                <Sparkles className="mb-3 h-8 w-8 text-slate-600" />
                <p className="text-sm text-slate-500">Fill in the fields and click Generate</p>
              </div>
            )}
            {loading && (
              <div className="flex h-full min-h-[260px] flex-col items-center justify-center gap-3">
                <div className="flex gap-1">
                  {[0,1,2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
                      className="h-2 w-2 rounded-full bg-blue-500"
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-400">{tool.promptHint}</p>
              </div>
            )}
            {result && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="prose prose-sm prose-invert max-w-none"
              >
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-200">
                  {result}
                </pre>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function AIToolsPage() {
  const searchParams = useSearchParams();
  const defaultTool = searchParams.get("tool");
  const [activeTool, setActiveTool] = useState<Tool | null>(
    () => TOOLS.find((t) => t.id === defaultTool) ?? null
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600">
          <Bot className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">AI Tools Workspace</h1>
          <p className="text-sm text-slate-400">6 tools to accelerate your academic work</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTool ? (
          <ToolWorkspace
            key={activeTool.id}
            tool={activeTool}
            onClose={() => setActiveTool(null)}
          />
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {TOOLS.map((tool) => (
                <ToolCard key={tool.id} tool={tool} onClick={() => setActiveTool(tool)} />
              ))}
            </div>

            {/* Quick start */}
            <div className="mt-5 rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="h-4 w-4 text-purple-400" />
                <h3 className="text-sm font-semibold text-white">Recent generations</h3>
              </div>
              <div className="space-y-2">
                {[
                  { tool: "Outline Generator", topic: "Business Ethics thesis outline", time: "2 hours ago" },
                  { tool: "Citation Generator", topic: "APA format — Journal article", time: "Yesterday" },
                  { tool: "Topic Generator", topic: "10 ideas — Environmental Economics", time: "2 days ago" },
                ].map((item) => (
                  <div key={item.topic} className="flex items-center justify-between rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2.5">
                    <div>
                      <p className="text-sm font-medium text-white">{item.topic}</p>
                      <p className="text-xs text-slate-500">{item.tool} · {item.time}</p>
                    </div>
                    <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Reopen</button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
