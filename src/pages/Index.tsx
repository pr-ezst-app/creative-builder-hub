import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import Studio from "@/pages/Studio";

const PLAYERS_ONLINE = [
  { id: 1, name: "ShadowKill3r", rank: "Diamond", kd: 3.2, status: "in-game", avatar: "S", wins: 847 },
  { id: 2, name: "NeonPhantom", rank: "Diamond", kd: 2.8, status: "online", avatar: "N", wins: 612 },
  { id: 3, name: "VortexX99", rank: "Gold", kd: 1.9, status: "queuing", avatar: "V", wins: 421 },
  { id: 4, name: "CyberWolf", rank: "Gold", kd: 1.7, status: "online", avatar: "C", wins: 389 },
  { id: 5, name: "GlitchStrike", rank: "Silver", kd: 1.4, status: "in-game", avatar: "G", wins: 203 },
  { id: 6, name: "QuantumAce", rank: "Bronze", kd: 0.9, status: "online", avatar: "Q", wins: 89 },
];

const RECENT_MATCHES = [
  { map: "NEON DISTRICT", mode: "Team Deathmatch", result: "WIN", kd: "18/4", time: "2m ago", duration: "22:14" },
  { map: "CYBER RUINS", mode: "Capture the Flag", result: "WIN", kd: "12/7", time: "45m ago", duration: "18:55" },
  { map: "VOID STATION", mode: "Battle Royale", result: "LOSS", kd: "9/11", time: "1h ago", duration: "31:02" },
  { map: "MATRIX HUB", mode: "Team Deathmatch", result: "WIN", kd: "21/3", time: "3h ago", duration: "19:40" },
];

const RANK_COLORS: Record<string, string> = {
  Diamond: "text-cyan-300",
  Gold: "text-yellow-400",
  Silver: "text-gray-300",
  Bronze: "text-orange-400",
};

const STATUS_CONFIG: Record<string, { color: string; label: string }> = {
  "in-game": { color: "bg-green-500", label: "In Game" },
  online: { color: "bg-cyan-400", label: "Online" },
  queuing: { color: "bg-yellow-400", label: "Queuing" },
};

function LiveTicker() {
  const [time, setTime] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTime(p => p + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const h = Math.floor(time / 3600).toString().padStart(2, "0");
  const m = Math.floor((time % 3600) / 60).toString().padStart(2, "0");
  const s = (time % 60).toString().padStart(2, "0");
  return <span className="font-mono-gaming text-xs text-cyan-500">{h}:{m}:{s}</span>;
}

function MatchmakingWidget() {
  const [searching, setSearching] = useState(false);
  const [queueTime, setQueueTime] = useState(0);

  useEffect(() => {
    if (!searching) { setQueueTime(0); return; }
    const t = setInterval(() => setQueueTime(p => p + 1), 1000);
    return () => clearInterval(t);
  }, [searching]);

  const m = Math.floor(queueTime / 60).toString().padStart(2, "0");
  const s = (queueTime % 60).toString().padStart(2, "0");

  return (
    <div className="card-glass rounded-lg p-5 border neon-border-cyan relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-orbitron text-sm font-bold text-white uppercase tracking-widest">Matchmaking</h3>
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${searching ? "bg-green-400 animate-blink" : "bg-gray-600"}`} />
          <span className="font-mono-gaming text-xs text-gray-400">{searching ? "SEARCHING" : "IDLE"}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {["Team Deathmatch", "Battle Royale", "Capture Flag"].map((mode, i) => (
          <button key={i} className="group relative border border-gray-700 hover:border-cyan-500 rounded p-2.5 text-center transition-all duration-200 hover:bg-cyan-500/5">
            <div className="text-lg mb-1">{["⚔️","🎯","🏴"][i]}</div>
            <div className="font-mono-gaming text-[10px] text-gray-400 group-hover:text-cyan-300 leading-tight">{mode}</div>
          </button>
        ))}
      </div>

      {searching && (
        <div className="mb-4 flex items-center gap-3">
          <div className="relative w-8 h-8 flex-shrink-0">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20" />
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400 border-t-transparent" style={{ animation: "matchmaking-spin 1s linear infinite" }} />
          </div>
          <div>
            <div className="font-mono-gaming text-xs text-gray-400">Queue Time</div>
            <div className="font-orbitron text-sm text-cyan-400">{m}:{s}</div>
          </div>
          <div className="ml-auto font-mono-gaming text-xs text-gray-500">
            Est. <span className="text-yellow-400">~2:30</span>
          </div>
        </div>
      )}

      <button
        onClick={() => setSearching(s => !s)}
        className={`w-full py-3 rounded font-orbitron text-sm font-bold uppercase tracking-widest transition-all duration-200 ${
          searching
            ? "bg-red-900/40 border border-red-500/60 text-red-400 hover:bg-red-900/60"
            : "bg-cyan-500/10 border border-cyan-500 text-cyan-300 hover:bg-cyan-500/20 animate-glow-pulse"
        }`}
      >
        {searching ? "Cancel Search" : "Find Match"}
      </button>
    </div>
  );
}

function StatCard({ label, value, sub, color = "cyan" }: { label: string; value: string; sub?: string; color?: string }) {
  const colorMap: Record<string, string> = {
    cyan: "text-cyan-400",
    magenta: "text-fuchsia-400",
    yellow: "text-yellow-400",
    green: "text-green-400",
  };
  return (
    <div className="card-glass rounded-lg p-4 border border-gray-800 animate-fade-in-up">
      <div className="font-mono-gaming text-[10px] text-gray-500 uppercase tracking-widest mb-1">{label}</div>
      <div className={`font-orbitron text-2xl font-black ${colorMap[color]}`}>{value}</div>
      {sub && <div className="font-mono-gaming text-[10px] text-gray-600 mt-0.5">{sub}</div>}
    </div>
  );
}

export default function Index() {
  const [activeTab, setActiveTab] = useState<"overview" | "players" | "matches">("overview");
  const [playersOnline] = useState(1847 + Math.floor(Math.random() * 100));
  const [showStudio, setShowStudio] = useState(false);

  if (showStudio) return <Studio onBack={() => setShowStudio(false)} />;

  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)" }}>

      {/* Top nav */}
      <header className="border-b border-gray-800/80 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/50 flex items-center justify-center">
              <span className="text-cyan-400 text-xs font-orbitron font-black">NX</span>
            </div>
            <span className="font-orbitron text-white font-bold text-sm tracking-widest">NEXUS</span>
            <div className="hidden md:flex items-center gap-1 ml-6">
              {["Overview", "Players", "Matches"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase() as "overview" | "players" | "matches")}
                  className={`px-3 py-1 rounded font-mono-gaming text-xs uppercase tracking-wider transition-all ${
                    activeTab === tab.toLowerCase()
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-blink" />
              <span className="font-mono-gaming text-xs text-green-400">{playersOnline.toLocaleString()} ONLINE</span>
            </div>
            <button
              onClick={() => setShowStudio(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-gradient-to-r from-fuchsia-600/20 to-cyan-600/20 border border-fuchsia-500/50 hover:border-fuchsia-400 hover:from-fuchsia-600/30 hover:to-cyan-600/30 transition-all group"
            >
              <Icon name="Sparkles" size={12} className="text-fuchsia-400 group-hover:text-fuchsia-300" />
              <span className="font-orbitron text-xs font-bold text-fuchsia-300 group-hover:text-white uppercase tracking-widest">Studio</span>
            </button>
            <LiveTicker />
            <div className="flex items-center gap-2 pl-4 border-l border-gray-800">
              <div className="w-7 h-7 rounded bg-fuchsia-500/20 border border-fuchsia-500/40 flex items-center justify-center">
                <span className="font-orbitron text-xs text-fuchsia-400 font-bold">P</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-mono-gaming text-xs text-white leading-none">Player_One</div>
                <div className="font-mono-gaming text-[10px] text-yellow-400 leading-none mt-0.5">◆ Diamond</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">

        {/* Hero banner */}
        <div className="relative rounded-xl overflow-hidden mb-6 border border-gray-800 scanlines">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <div
            className="h-40 md:h-52"
            style={{
              background: "linear-gradient(135deg, #070b10 0%, #0d1a2a 40%, #0a1520 60%, #07080f 100%)",
            }}
          >
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }} />
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: (i % 2 === 0 ? 2 : 3) + "px",
                  height: (i % 2 === 0 ? 2 : 3) + "px",
                  background: i % 2 === 0 ? "var(--neon-cyan)" : "var(--neon-magenta)",
                  left: (i * 17 + 5) + "%",
                  top: (i * 13 + 10) + "%",
                  boxShadow: i % 2 === 0 ? "0 0 6px #00ffff" : "0 0 6px #ff00ff",
                  animation: `neon-pulse ${2 + i * 0.3}s ease-in-out infinite`,
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 z-20 flex items-center px-8">
            <div>
              <div className="font-mono-gaming text-xs text-cyan-500 uppercase tracking-widest mb-1">Season 7 · Neon Warfare</div>
              <h1 className="font-orbitron text-2xl md:text-4xl font-black text-white leading-none mb-2">
                ENTER THE
                <span className="neon-cyan"> GRID</span>
              </h1>
              <p className="font-mono-gaming text-sm text-gray-400 max-w-sm">Real-time competitive multiplayer. Find your match. Dominate the leaderboard.</p>
              <div className="flex gap-3 mt-4">
                <button className="px-5 py-2 bg-cyan-500/10 border border-cyan-500 text-cyan-300 font-orbitron text-xs font-bold uppercase tracking-widest rounded hover:bg-cyan-500/20 transition-all animate-glow-pulse">
                  Play Now
                </button>
                <button className="px-5 py-2 bg-white/5 border border-gray-700 text-gray-400 font-orbitron text-xs uppercase tracking-widest rounded hover:border-gray-500 hover:text-gray-200 transition-all">
                  Leaderboard
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatCard label="Total Wins" value="847" sub="Top 3% globally" color="cyan" />
          <StatCard label="K/D Ratio" value="3.2" sub="+0.4 this season" color="green" />
          <StatCard label="Win Rate" value="68%" sub="Last 100 games" color="yellow" />
          <StatCard label="Rank Points" value="4,820" sub="Diamond II" color="magenta" />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Left: Matchmaking */}
          <div className="lg:col-span-1 space-y-4">
            <MatchmakingWidget />

            {/* Rank Progress */}
            <div className="card-glass rounded-lg p-5 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-orbitron text-sm font-bold text-white uppercase tracking-widest">Rank Progress</h3>
                <span className="font-mono-gaming text-xs text-yellow-400">◆ Diamond II</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Diamond II → Diamond I", current: 4820, max: 5000, color: "cyan" },
                  { label: "Season XP", current: 12400, max: 15000, color: "magenta" },
                  { label: "Battle Pass", current: 67, max: 100, color: "yellow" },
                ].map((bar, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="font-mono-gaming text-[10px] text-gray-500">{bar.label}</span>
                      <span className="font-mono-gaming text-[10px] text-gray-400">{bar.current.toLocaleString()} / {bar.max.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${bar.color === "cyan" ? "progress-neon" : bar.color === "magenta" ? "bg-gradient-to-r from-fuchsia-500 to-purple-500" : "bg-gradient-to-r from-yellow-400 to-orange-500"}`}
                        style={{ width: `${(bar.current / bar.max) * 100}%`, boxShadow: bar.color === "cyan" ? "0 0 6px rgba(0,255,255,0.5)" : bar.color === "magenta" ? "0 0 6px rgba(255,0,255,0.5)" : "0 0 6px rgba(255,200,0,0.5)" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center + Right: Players & Matches */}
          <div className="lg:col-span-2 space-y-4">

            {/* Players Online */}
            <div className="card-glass rounded-lg border border-gray-800 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800">
                <h3 className="font-orbitron text-sm font-bold text-white uppercase tracking-widest">Players Online</h3>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-blink" />
                  <span className="font-mono-gaming text-xs text-green-400">{playersOnline.toLocaleString()} live</span>
                </div>
              </div>
              <div className="divide-y divide-gray-800/50">
                {PLAYERS_ONLINE.map((player, i) => (
                  <div key={player.id} className="flex items-center gap-3 px-5 py-3 hover:bg-white/2 transition-colors group">
                    <div className="relative flex-shrink-0">
                      <div className={`w-8 h-8 rounded font-orbitron text-sm font-bold flex items-center justify-center ${
                        player.rank === "Diamond" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" :
                        player.rank === "Gold" ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40" :
                        player.rank === "Silver" ? "bg-gray-400/20 text-gray-300 border border-gray-400/40" :
                        "bg-orange-700/20 text-orange-400 border border-orange-700/40"
                      }`}>
                        {player.avatar}
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-gray-900 ${STATUS_CONFIG[player.status].color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-mono-gaming text-sm text-white truncate">{player.name}</div>
                      <div className={`font-mono-gaming text-[10px] ${RANK_COLORS[player.rank]}`}>{player.rank} · {player.wins} wins</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-mono-gaming text-xs text-gray-300">{player.kd} K/D</div>
                      <div className="font-mono-gaming text-[10px] text-gray-600">{STATUS_CONFIG[player.status].label}</div>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 ml-1 px-2 py-1 border border-gray-700 hover:border-cyan-500 text-gray-500 hover:text-cyan-400 font-mono-gaming text-[10px] rounded transition-all">
                      Invite
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Matches */}
            <div className="card-glass rounded-lg border border-gray-800 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800">
                <h3 className="font-orbitron text-sm font-bold text-white uppercase tracking-widest">Recent Matches</h3>
                <button className="font-mono-gaming text-[10px] text-gray-500 hover:text-cyan-400 transition-colors uppercase tracking-wider">View All</button>
              </div>
              <div className="divide-y divide-gray-800/50">
                {RECENT_MATCHES.map((match, i) => (
                  <div key={i} className="flex items-center gap-4 px-5 py-3 hover:bg-white/2 transition-colors">
                    <div className={`w-10 h-10 rounded flex-shrink-0 flex items-center justify-center font-orbitron text-xs font-black ${
                      match.result === "WIN"
                        ? "bg-green-500/10 text-green-400 border border-green-500/30"
                        : "bg-red-500/10 text-red-400 border border-red-500/30"
                    }`}>
                      {match.result === "WIN" ? "W" : "L"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-mono-gaming text-sm text-white">{match.map}</div>
                      <div className="font-mono-gaming text-[10px] text-gray-500">{match.mode} · {match.duration}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-mono-gaming text-xs text-gray-300">{match.kd}</div>
                      <div className="font-mono-gaming text-[10px] text-gray-600">K/D · {match.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Active Lobbies */}
        <div className="mt-4 card-glass rounded-lg border border-gray-800 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800">
            <h3 className="font-orbitron text-sm font-bold text-white uppercase tracking-widest">Active Lobbies</h3>
            <span className="font-mono-gaming text-xs text-fuchsia-400">12 open</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-800/50">
            {[
              { name: "CYBER WOLVES", mode: "Team Deathmatch", players: "4/6", ping: 22, region: "EU-West", owner: "ShadowKill3r", rankReq: "Gold+" },
              { name: "NIGHT RAIDERS", mode: "Capture the Flag", players: "3/8", ping: 18, region: "EU-East", owner: "NeonPhantom", rankReq: "Any" },
              { name: "VOID SQUAD", mode: "Battle Royale", players: "7/8", ping: 31, region: "US-East", owner: "VortexX99", rankReq: "Silver+" },
            ].map((lobby, i) => (
              <div key={i} className="p-4 hover:bg-white/2 transition-colors group cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-orbitron text-sm text-white font-bold">{lobby.name}</span>
                  <span className="font-mono-gaming text-[10px] text-gray-500">{lobby.region}</span>
                </div>
                <div className="font-mono-gaming text-[10px] text-gray-500 mb-3">{lobby.mode} · {lobby.rankReq}</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono-gaming text-xs text-cyan-400">{lobby.players} players</span>
                    <span className="font-mono-gaming text-[10px] text-green-400">{lobby.ping}ms</span>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 px-3 py-1 bg-fuchsia-500/10 border border-fuchsia-500/40 text-fuchsia-400 font-mono-gaming text-[10px] rounded transition-all hover:bg-fuchsia-500/20">
                    Join
                  </button>
                </div>
                <div className="mt-2 h-0.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-fuchsia-500 to-cyan-500"
                    style={{ width: `${(parseInt(lobby.players.split("/")[0]) / parseInt(lobby.players.split("/")[1])) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}