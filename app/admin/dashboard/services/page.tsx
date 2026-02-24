'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Edit2, X, ChevronDown } from 'lucide-react';

interface Service {
    id: string;
    icon: string;
    title: string;
    description: string;
    color: string;
    details: string[];
}

const ICON_OPTIONS = ['Globe', 'Smartphone', 'Layout', 'Database', 'Cpu', 'Code2', 'Server', 'Shield'];
const COLOR_OPTIONS = ['blue', 'emerald', 'purple', 'orange', 'red', 'pink', 'cyan', 'yellow'];

const defaultService: Service = { id: '', icon: 'Globe', title: '', description: '', color: 'blue', details: [] };

export default function ServicesAdmin() {
    const [services, setServices] = useState<Service[]>([]);
    const [editing, setEditing] = useState<Service | null>(null);
    const [saving, setSaving] = useState(false);
    const [isNew, setIsNew] = useState(false);

    useEffect(() => {
        fetch('/api/admin/data/services').then(r => r.json()).then(setServices);
    }, []);

    const save = async (updated: Service[]) => {
        setSaving(true);
        await fetch('/api/admin/data/services', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated) });
        setSaving(false);
    };

    const handleSave = async () => {
        if (!editing) return;
        const updated = isNew
            ? [...services, { ...editing, id: editing.title.toLowerCase().replace(/\s+/g, '-') }]
            : services.map(s => s.id === editing.id ? editing : s);
        setServices(updated);
        await save(updated);
        setEditing(null);
        setIsNew(false);
    };

    const handleDelete = async (id: string) => {
        const updated = services.filter(s => s.id !== id);
        setServices(updated);
        await save(updated);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">SERVICES <span className="text-blue-400">EDITOR</span>.</h1>
                <button onClick={() => { setEditing({ ...defaultService }); setIsNew(true); }} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase text-xs tracking-widest px-5 py-3 rounded-2xl transition-all">
                    <Plus size={16} /> Add Service
                </button>
            </div>

            {/* Service Cards Table */}
            <div className="space-y-4">
                {services.map((svc) => (
                    <div key={svc.id} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex items-center gap-6">
                        <div className={`w-10 h-10 rounded-xl bg-${svc.color}-500/10 border border-${svc.color}-500/20 flex items-center justify-center text-${svc.color}-400 text-xs font-mono font-bold`}>
                            {svc.icon[0]}
                        </div>
                        <div className="flex-1">
                            <p className="text-white font-black uppercase tracking-tight">{svc.title}</p>
                            <p className="text-slate-500 text-xs mt-1 line-clamp-1">{svc.description}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => { setEditing({ ...svc }); setIsNew(false); }} className="w-9 h-9 bg-white/5 hover:bg-blue-500/20 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-400 transition-all">
                                <Edit2 size={15} />
                            </button>
                            <button onClick={() => handleDelete(svc.id)} className="w-9 h-9 bg-white/5 hover:bg-red-500/20 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-400 transition-all">
                                <Trash2 size={15} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            {editing && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                    <div className="bg-[#050b1d] border border-white/10 rounded-[2rem] p-8 w-full max-w-lg shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-black text-white uppercase italic">{isNew ? 'New Service' : 'Edit Service'}</h2>
                            <button onClick={() => setEditing(null)} className="text-slate-500 hover:text-white"><X size={20} /></button>
                        </div>
                        <div className="space-y-4">
                            <input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} placeholder="Service Title" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50" />
                            <textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} placeholder="Description" rows={3} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50 resize-none" />
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-mono text-slate-500 uppercase mb-2 block">Icon</label>
                                    <select value={editing.icon} onChange={e => setEditing({ ...editing, icon: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none">
                                        {ICON_OPTIONS.map(ic => <option key={ic} value={ic} className="bg-slate-900">{ic}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-mono text-slate-500 uppercase mb-2 block">Color</label>
                                    <select value={editing.color} onChange={e => setEditing({ ...editing, color: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none">
                                        {COLOR_OPTIONS.map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-slate-500 uppercase mb-2 block">Tags (comma-separated)</label>
                                <input value={editing.details.join(', ')} onChange={e => setEditing({ ...editing, details: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} placeholder="Next.js, TypeScript, Performance" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50" />
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setEditing(null)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-all text-sm font-bold uppercase tracking-widest">Cancel</button>
                            <button onClick={handleSave} disabled={saving} className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-2xl transition-all flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest">
                                <Save size={16} /> {saving ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
