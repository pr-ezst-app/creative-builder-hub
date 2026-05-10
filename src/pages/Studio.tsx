import { useState } from "react";
import Icon from "@/components/ui/icon";

const TOOLS = [
  { id: "avatar", icon: "User", label: "Avatar Creator", desc: "Generate a custom gaming avatar with AI", tag: "AI" },
  { id: "map", icon: "Map", label: "Map Builder", desc: "Design your own arena layout", tag: "AI" },
  { id: "clip", icon: "Video", label: "Clip Editor", desc: "Auto-highlight and edit your best moments", tag: "AI" },
  { id: "loadout", icon: "Crosshair", label: "Loadout Optimizer", desc: "AI picks the best gear for your playstyle", tag: "AI" },
  { id: "strategy", icon: "Brain", label: "Strategy Coach", desc: "Get real-time tactical advice from AI", tag: "AI" },
  { id: "skin", icon: "Palette", label: "Skin Designer", desc: "Create unique weapon skins with generative AI", tag: "AI" },
];

const PROMPTS = [
  "Design a cyberpunk sniper loadout for long-range maps",
  "Create a neon skull avatar with diamond rank badge",
  "Build a close-quarters urban combat map",
  "Analyze my last 10 matches and suggest improvements",
];

interface StudioProps {
  onBack: () => void;
}

export default function Studio({ onBack }: StudioProps) {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setGenerated(false);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 2200);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)" }}>

      {/* Header */}
      <header className="border-b border-gray-800/80 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors font-mono-gaming text-xs uppercase tracking-wider"
          >
            <Icon name="ChevronLeft" size={14} />
            Back
          </button>
          <div className="w-px h-5 bg-gray-800" />
          <div className="flex items-center gap-2">
            <Icon name="Sparkles" size={14} className="text-fuchsia-400" />
            <span className="font-orbitron text-sm font-bold text-white tracking-widest">AI STUDIO</span>
          </div>
          <div className="ml-auto flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30">
            <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-blink" />
            <span className="font-mono-gaming text-[10px] text-fuchsia-400 uppercase tracking-widest">AI Powered</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 mb-4">
            <Icon name="Zap" size={10} className="text-fuchsia-400" />
            <span className="font-mono-gaming text-[10px] text-fuchsia-400 uppercase tracking-widest">Generative AI Engine v3</span>
          </div>
          <h1 className="font-orbitron text-3xl md:text-5xl font-black text-white mb-3 leading-none">
            CREATE WITH
            <span style={{ color: "var(--neon-magenta)", textShadow: "0 0 20px #ff00ff, 0 0 40px rgba(255,0,255,0.3)" }}> AI</span>
          </h1>
          <p className="font-mono-gaming text-sm text-gray-400 max-w-md mx-auto">
            Describe what you want. Let the AI build it for you.
          </p>
        </div>

        {/* Prompt box */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative card-glass rounded-xl border border-fuchsia-500/30 overflow-hidden" style={{ boxShadow: "0 0 30px rgba(255,0,255,0.08)" }}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent opacity-60" />
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Describe what you want to create..."
              rows={3}
              className="w-full bg-transparent px-5 pt-4 pb-2 font-mono-gaming text-sm text-white placeholder-gray-600 resize-none outline-none"
            />
            {/* Quick prompts */}
            <div className="px-5 pb-3 flex flex-wrap gap-1.5">
              {PROMPTS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setPrompt(p)}
                  className="font-mono-gaming text-[10px] text-gray-500 hover:text-fuchsia-300 border border-gray-800 hover:border-fuchsia-500/40 px-2 py-0.5 rounded transition-all"
                >
                  {p.length > 30 ? p.slice(0, 30) + "…" : p}
                </button>
              ))}
            </div>
            <div className="px-4 pb-4 flex justify-end">
              <button
                onClick={handleGenerate}
                disabled={generating || !prompt.trim()}
                className={`flex items-center gap-2 px-5 py-2 rounded font-orbitron text-xs font-bold uppercase tracking-widest transition-all ${
                  generating || !prompt.trim()
                    ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white hover:from-fuchsia-500 hover:to-cyan-500"
                }`}
                style={generating || !prompt.trim() ? {} : { boxShadow: "0 0 16px rgba(255,0,255,0.3)" }}
              >
                {generating ? (
                  <>
                    <div className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white" style={{ animation: "matchmaking-spin 0.8s linear infinite" }} />
                    Generating...
                  </>
                ) : (
                  <>
                    <Icon name="Sparkles" size={12} />
                    Generate
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated result */}
          {generated && (
            <div className="mt-4 card-glass rounded-xl border border-cyan-500/30 p-5 animate-fade-in-up">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="CheckCircle" size={14} className="text-green-400" />
                <span className="font-mono-gaming text-xs text-green-400 uppercase tracking-wider">Generated Successfully</span>
              </div>
              <div className="h-32 rounded-lg bg-gradient-to-br from-fuchsia-900/30 via-purple-900/20 to-cyan-900/30 border border-gray-700 flex items-center justify-center mb-3">
                <div className="text-center">
                  <div className="text-3xl mb-1">✨</div>
                  <div className="font-mono-gaming text-xs text-gray-400">Preview ready</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 font-mono-gaming text-xs rounded hover:bg-cyan-500/20 transition-all uppercase tracking-wider">
                  Apply to Profile
                </button>
                <button className="px-4 py-2 border border-gray-700 text-gray-500 font-mono-gaming text-xs rounded hover:border-gray-500 hover:text-gray-300 transition-all">
                  <Icon name="Download" size={12} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tools grid */}
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-800" />
          <span className="font-mono-gaming text-[10px] text-gray-600 uppercase tracking-widest">AI Tools</span>
          <div className="h-px flex-1 bg-gray-800" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TOOLS.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id)}
              className={`card-glass rounded-lg p-4 border text-left transition-all duration-200 group ${
                activeTool === tool.id
                  ? "border-fuchsia-500/60 bg-fuchsia-500/5"
                  : "border-gray-800 hover:border-fuchsia-500/30"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 rounded flex items-center justify-center ${
                  activeTool === tool.id ? "bg-fuchsia-500/20 border border-fuchsia-500/40" : "bg-gray-800 border border-gray-700 group-hover:border-fuchsia-500/30"
                } transition-all`}>
                  <Icon name={tool.icon} fallback="Sparkles" size={16} className={activeTool === tool.id ? "text-fuchsia-400" : "text-gray-500 group-hover:text-fuchsia-400"} />
                </div>
                <span className="font-mono-gaming text-[9px] px-1.5 py-0.5 rounded bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">{tool.tag}</span>
              </div>
              <div className="font-orbitron text-sm font-bold text-white mb-1">{tool.label}</div>
              <div className="font-mono-gaming text-[11px] text-gray-500 leading-relaxed">{tool.desc}</div>
              {activeTool === tool.id && (
                <div className="mt-3 pt-3 border-t border-fuchsia-500/20">
                  <div className="font-mono-gaming text-[10px] text-fuchsia-400 flex items-center gap-1">
                    <Icon name="ArrowRight" size={10} />
                    Type your prompt above to use this tool
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}