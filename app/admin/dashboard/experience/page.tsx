'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Edit2, X } from 'lucide-react';

interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    period: string;
    year: string;
    description: string[];
    technologies: string[];
    current: boolean;
}

const defaultExp: Experience = {
    id: '', title: '', company: '', location: '', period: '', year: '',
    description: [], technologies: [], current: false
};

export default function ExperienceAdmin() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [editing, setEditing] = useState<Experience | null>(null);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [saving, setSaving] = useState(false);
    const [bulletInput, setBulletInput] = useState('');

    useEffect(() => { fetch('/api/admin/data/experience').then(r => r.json()).then(setExperiences); }, []);

    const save = async (updated: Experience[]) => {
        setSaving(true);
        await fetch('/api/admin/data/experience', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated) });
        setSaving(false);
    };

    const handleSave = async () => {
        if (!editing) return;
        const updated = editIndex === null
            ? [...experiences, { ...editing, id: editing.company.toLowerCase().replace(/\s+/g, '-') }]
            : experiences.map((e, i) => i === editIndex ? editing : e);
        setExperiences(updated);
        await save(updated);
        setEditing(null);
        setEditIndex(null);
    };

    const handleDelete = async (index: number) => {
        const updated = experiences.filter((_, i) => i !== index);
        setExperiences(updated);
        await save(updated);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">EXPERIENCE <span className="text-orange-400">EDITOR</span>.</h1>
                <button onClick={() => { setEditing({ ...defaultExp }); setEditIndex(null); setBulletInput(''); }} className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold uppercase text-xs tracking-widest px-5 py-3 rounded-2xl transition-all">
                    <Plus size={16} /> Add Role
                </button>
            </div>

            <div className="space-y-4">
                {experiences.map((exp, i) => (
                    <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex items-center gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3">
                                <p className="text-white font-black uppercase tracking-tight">{exp.title}</p>
                                {exp.current && <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">CURRENT</span>}
                            </div>
                            <p className="text-orange-400 text-xs mt-1 font-bold uppercase tracking-widest">{exp.company}</p>
                            <p className="text-slate-500 text-xs mt-1">{exp.period} — {exp.location}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => { setEditing({ ...exp }); setEditIndex(i); setBulletInput(exp.description.join('\n')); }} className="w-9 h-9 bg-white/5 hover:bg-orange-500/20 rounded-xl flex items-center justify-center text-slate-400 hover:text-orange-400 transition-all">
                                <Edit2 size={15} />
                            </button>
                            <button onClick={() => handleDelete(i)} className="w-9 h-9 bg-white/5 hover:bg-red-500/20 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-400 transition-all">
                                <Trash2 size={15} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {editing && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4 overflow-y-auto py-8">
                    <div className="bg-[#050b1d] border border-white/10 rounded-[2rem] p-8 w-full max-w-xl shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-black text-white uppercase italic">{editIndex === null ? 'New Role' : 'Edit Role'}</h2>
                            <button onClick={() => setEditing(null)} className="text-slate-500 hover:text-white"><X size={20} /></button>
                        </div>
                        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { key: 'title', label: 'Job Title', placeholder: 'Software Developer' },
                                    { key: 'company', label: 'Company', placeholder: 'BitzSol' },
                                    { key: 'location', label: 'Location', placeholder: 'Islamabad, PK' },
                                    { key: 'period', label: 'Period', placeholder: 'Jan 2025 – Present' },
                                    { key: 'year', label: 'Year (display)', placeholder: '2025' },
                                ].map(({ key, label, placeholder }) => (
                                    <div key={key} className="col-span-2 md:col-span-1">
                                        <label className="text-[10px] font-mono text-slate-500 uppercase mb-1 block">{label}</label>
                                        <input
                                            value={(editing as any)[key]}
                                            onChange={e => setEditing({ ...editing, [key]: e.target.value })}
                                            placeholder={placeholder}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500/50"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-slate-500 uppercase mb-1 block">Bullet Points (one per line)</label>
                                <textarea
                                    value={bulletInput}
                                    onChange={e => {
                                        setBulletInput(e.target.value);
                                        setEditing({ ...editing, description: e.target.value.split('\n').filter(Boolean) });
                                    }}
                                    rows={5}
                                    placeholder={"Architected high-performance systems...\nLed a team of 5 engineers..."}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500/50 resize-none"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-slate-500 uppercase mb-1 block">Technologies (comma-separated)</label>
                                <input value={editing.technologies.join(', ')} onChange={e => setEditing({ ...editing, technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500/50" />
                            </div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <div className={`w-12 h-6 rounded-full transition-all ${editing.current ? 'bg-emerald-500' : 'bg-white/10'} relative`} onClick={() => setEditing({ ...editing, current: !editing.current })}>
                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${editing.current ? 'left-7' : 'left-1'}`} />
                                </div>
                                <span className="text-sm text-slate-400">Current Position</span>
                            </label>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setEditing(null)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-all text-sm font-bold uppercase tracking-widest">Cancel</button>
                            <button onClick={handleSave} disabled={saving} className="flex-1 py-3 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white rounded-2xl transition-all flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest">
                                <Save size={16} /> {saving ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
