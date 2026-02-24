'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';

interface SkillsData {
    technologies: { name: string; level: string; fromColor: string; toColor: string; size: string }[];
    additionalSkills: string[];
}

export default function SkillsAdmin() {
    const [data, setData] = useState<SkillsData>({ technologies: [], additionalSkills: [] });
    const [newSkill, setNewSkill] = useState('');
    const [newTech, setNewTech] = useState({ name: '', level: '', fromColor: '#60a5fa', toColor: '#22d3ee', size: 'text-2xl' });
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => { fetch('/api/admin/data/skills').then(r => r.json()).then(setData); }, []);

    const save = async (updated: SkillsData) => {
        setSaving(true);
        await fetch('/api/admin/data/skills', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated) });
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const addAdditionalSkill = () => {
        if (!newSkill.trim()) return;
        const updated = { ...data, additionalSkills: [...data.additionalSkills, newSkill.trim()] };
        setData(updated);
        setNewSkill('');
    };

    const removeAdditionalSkill = (idx: number) => {
        const updated = { ...data, additionalSkills: data.additionalSkills.filter((_, i) => i !== idx) };
        setData(updated);
    };

    const addTech = () => {
        if (!newTech.name.trim() || !newTech.level.trim()) return;
        const updated = { ...data, technologies: [...data.technologies, newTech] };
        setData(updated);
        setNewTech({ name: '', level: '', fromColor: '#60a5fa', toColor: '#22d3ee', size: 'text-2xl' });
    };

    const removeTech = (idx: number) => {
        const updated = { ...data, technologies: data.technologies.filter((_, i) => i !== idx) };
        setData(updated);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">SKILLS <span className="text-purple-400">EDITOR</span>.</h1>
                <button onClick={() => save(data)} disabled={saving} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold uppercase text-xs tracking-widest px-5 py-3 rounded-2xl transition-all">
                    <Save size={16} /> {saving ? 'Saving...' : saved ? 'Saved ✓' : 'Save All'}
                </button>
            </div>

            {/* Main Technologies */}
            <div className="mb-10">
                <h2 className="text-xs font-mono text-slate-500 uppercase tracking-[0.3em] mb-4">Featured Technologies</h2>
                <div className="space-y-3">
                    {data.technologies.map((tech, i) => (
                        <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl px-5 py-3 flex items-center gap-4">
                            <div
                                className="font-black text-sm"
                                style={{
                                    backgroundImage: `linear-gradient(to right, ${tech.fromColor}, ${tech.toColor})`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >{tech.name}</div>
                            <div className="text-slate-600 text-xs uppercase tracking-widest">— {tech.level}</div>
                            <div className="ml-auto">
                                <button onClick={() => removeTech(i)} className="w-8 h-8 bg-white/5 hover:bg-red-500/20 rounded-xl flex items-center justify-center text-slate-500 hover:text-red-400 transition-all">
                                    <Trash2 size={13} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Add Tech Form */}
                <div className="bg-white/[0.02] border border-white/5 border-dashed rounded-2xl p-4 mt-4 grid grid-cols-2 gap-3">
                    <input value={newTech.name} onChange={e => setNewTech({ ...newTech, name: e.target.value })} placeholder="Tech name (e.g. React.js)" className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none" />
                    <input value={newTech.level} onChange={e => setNewTech({ ...newTech, level: e.target.value })} placeholder="Level (e.g. Expert)" className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none" />
                    <div className="flex items-center gap-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase">From</label>
                        <input type="color" value={newTech.fromColor} onChange={e => setNewTech({ ...newTech, fromColor: e.target.value })} className="w-8 h-8 rounded-lg cursor-pointer border border-white/10 bg-transparent" />
                        <label className="text-[10px] font-mono text-slate-500 uppercase ml-2">To</label>
                        <input type="color" value={newTech.toColor} onChange={e => setNewTech({ ...newTech, toColor: e.target.value })} className="w-8 h-8 rounded-lg cursor-pointer border border-white/10 bg-transparent" />
                        <div className="flex-1 h-6 rounded-lg ml-2" style={{ backgroundImage: `linear-gradient(to right, ${newTech.fromColor}, ${newTech.toColor})` }} />
                    </div>
                    <select value={newTech.size} onChange={e => setNewTech({ ...newTech, size: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none">
                        {['text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl'].map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
                    </select>
                    <button onClick={addTech} className="col-span-2 flex items-center justify-center gap-2 bg-purple-600/20 border border-purple-500/20 text-purple-400 font-bold uppercase text-xs tracking-widest py-2 rounded-xl hover:bg-purple-600/30 transition-all">
                        <Plus size={14} /> Add Technology
                    </button>
                </div>
            </div>

            {/* Additional Skills Cloud */}
            <div>
                <h2 className="text-xs font-mono text-slate-500 uppercase tracking-[0.3em] mb-4">Skills Toolkit ({data.additionalSkills.length} skills)</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                    {data.additionalSkills.map((skill, i) => (
                        <div key={i} className="flex items-center gap-1.5 bg-white/5 border border-white/5 rounded-full pl-3 pr-1.5 py-1.5">
                            <span className="text-xs font-bold text-slate-400">{skill}</span>
                            <button onClick={() => removeAdditionalSkill(i)} className="w-5 h-5 rounded-full bg-white/10 hover:bg-red-500/30 flex items-center justify-center text-slate-500 hover:text-red-400 transition-all">
                                <Trash2 size={10} />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex gap-3">
                    <input value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={e => e.key === 'Enter' && addAdditionalSkill()} placeholder="Add skill (press Enter)" className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50" />
                    <button onClick={addAdditionalSkill} className="px-5 bg-purple-600/20 border border-purple-500/20 text-purple-400 rounded-2xl hover:bg-purple-600/30 transition-all">
                        <Plus size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
