'use client';

import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Save, Edit2, X, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';

interface Project {
    title: string;
    description: string;
    longDescription: string;
    image: string;
    technologies: string[];
    githubLink: string | null;
    liveLink: string | null;
    year: string;
    highlights: string[];
}

const defaultProject: Project = {
    title: '', description: '', longDescription: '', image: '',
    technologies: [], githubLink: null, liveLink: null,
    year: new Date().getFullYear().toString(), highlights: []
};

function ImageUploader({ value, onChange }: { value: string; onChange: (url: string) => void }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [preview, setPreview] = useState(value);

    // Keep preview in sync when value changes from outside
    useEffect(() => { setPreview(value); }, [value]);

    const handleFile = async (file: File) => {
        if (!file) return;
        setError('');
        setUploading(true);

        // Local preview
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        const form = new FormData();
        form.append('file', file);

        try {
            const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Upload failed.');
                setPreview(value); // revert preview
            } else {
                onChange(data.url);
                setPreview(data.url);
            }
        } catch {
            setError('Network error during upload.');
            setPreview(value);
        } finally {
            setUploading(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    return (
        <div className="space-y-3">
            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] block">Project Image</label>

            {/* Drop Zone */}
            <div
                className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 cursor-pointer group overflow-hidden
                    ${uploading ? 'border-blue-500/50 bg-blue-500/5' : 'border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/5'}`}
                onClick={() => !uploading && inputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                {/* Preview */}
                {preview ? (
                    <div className="relative">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-40 object-cover"
                            onError={() => setPreview('')}
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-sm">
                            <Upload size={16} /> Click to replace
                        </div>
                    </div>
                ) : (
                    <div className="h-32 flex flex-col items-center justify-center gap-2 text-slate-600 group-hover:text-emerald-400 transition-colors">
                        {uploading ? (
                            <Loader2 size={24} className="animate-spin text-blue-400" />
                        ) : (
                            <>
                                <ImageIcon size={24} />
                                <span className="text-xs font-mono">Drop image or click to upload</span>
                                <span className="text-[10px] text-slate-700">JPG, PNG, WebP, GIF</span>
                            </>
                        )}
                    </div>
                )}

                {/* Uploading Overlay */}
                {uploading && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center gap-2 text-blue-400 text-sm font-bold">
                        <Loader2 size={18} className="animate-spin" /> Uploading...
                    </div>
                )}
            </div>

            {/* Or enter URL manually */}
            <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-white/5" />
                <span className="text-[10px] font-mono text-slate-600 uppercase">or enter path manually</span>
                <div className="h-px flex-1 bg-white/5" />
            </div>
            <input
                value={value}
                onChange={e => { onChange(e.target.value); setPreview(e.target.value); }}
                placeholder="/img/your-project.png"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/50 font-mono"
            />

            {error && (
                <p className="text-red-400 text-xs font-mono flex items-center gap-1">⚠ {error}</p>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }}
            />
        </div>
    );
}

export default function ProjectsAdmin() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [editing, setEditing] = useState<Project | null>(null);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch('/api/admin/data/projects').then(r => r.json()).then(setProjects);
    }, []);

    const save = async (updated: Project[]) => {
        setSaving(true);
        await fetch('/api/admin/data/projects', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated)
        });
        setSaving(false);
    };

    const handleSave = async () => {
        if (!editing) return;
        const updated = editIndex === null
            ? [...projects, editing]
            : projects.map((p, i) => i === editIndex ? editing : p);
        setProjects(updated);
        await save(updated);
        setEditing(null);
        setEditIndex(null);
    };

    const handleDelete = async (index: number) => {
        const updated = projects.filter((_, i) => i !== index);
        setProjects(updated);
        await save(updated);
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">
                    PROJECTS <span className="text-emerald-400">EDITOR</span>.
                </h1>
                <button
                    onClick={() => { setEditing({ ...defaultProject }); setEditIndex(null); }}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase text-xs tracking-widest px-5 py-3 rounded-2xl transition-all"
                >
                    <Plus size={16} /> Add Project
                </button>
            </div>

            <div className="space-y-4">
                {projects.map((proj, i) => (
                    <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex items-center gap-5">
                        {/* Thumbnail */}
                        <div className="w-16 h-12 rounded-xl overflow-hidden bg-white/5 border border-white/5 flex-shrink-0">
                            {proj.image ? (
                                <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center"><ImageIcon size={16} className="text-slate-700" /></div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3">
                                <p className="text-white font-black uppercase tracking-tight truncate">{proj.title}</p>
                                <span className="text-[9px] font-mono text-slate-600 border border-white/5 px-2 py-0.5 rounded-full flex-shrink-0">{proj.year}</span>
                            </div>
                            <p className="text-slate-500 text-xs mt-1 truncate">{proj.description}</p>
                            <div className="flex gap-2 mt-2">
                                {proj.technologies.slice(0, 3).map(t => (
                                    <span key={t} className="text-[9px] font-mono text-emerald-500/60 bg-emerald-500/5 px-2 py-0.5 rounded-full border border-emerald-500/10">{t}</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                            <button
                                onClick={() => { setEditing({ ...proj }); setEditIndex(i); }}
                                className="w-9 h-9 bg-white/5 hover:bg-emerald-500/20 rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-all"
                            >
                                <Edit2 size={15} />
                            </button>
                            <button
                                onClick={() => handleDelete(i)}
                                className="w-9 h-9 bg-white/5 hover:bg-red-500/20 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-400 transition-all"
                            >
                                <Trash2 size={15} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit / Add Modal */}
            {editing && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4 overflow-y-auto py-8">
                    <div className="bg-[#050b1d] border border-white/10 rounded-[2rem] p-8 w-full max-w-xl shadow-2xl my-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-black text-white uppercase italic">
                                {editIndex === null ? '+ New Project' : 'Edit Project'}
                            </h2>
                            <button onClick={() => setEditing(null)} className="text-slate-500 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4 max-h-[72vh] overflow-y-auto pr-1 scrollbar-thin">
                            {/* Image Uploader */}
                            <ImageUploader
                                value={editing.image}
                                onChange={(url) => setEditing({ ...editing, image: url })}
                            />

                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { key: 'title', label: 'Title', placeholder: 'Project Title', span: 2 },
                                    { key: 'description', label: 'Short Description', placeholder: 'Brief summary...', span: 2 },
                                    { key: 'year', label: 'Year', placeholder: '2025', span: 1 },
                                    { key: 'githubLink', label: 'GitHub URL', placeholder: 'https://github.com/...', span: 1 },
                                    { key: 'liveLink', label: 'Live URL', placeholder: 'https://...', span: 2 },
                                ].map(({ key, label, placeholder, span }) => (
                                    <div key={key} className={span === 2 ? 'col-span-2' : ''}>
                                        <label className="text-[10px] font-mono text-slate-500 uppercase mb-1 block">{label}</label>
                                        <input
                                            value={(editing as any)[key] ?? ''}
                                            onChange={e => setEditing({ ...editing, [key]: e.target.value || null })}
                                            placeholder={placeholder}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/50"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div>
                                <label className="text-[10px] font-mono text-slate-500 uppercase mb-1 block">Long Description</label>
                                <textarea
                                    value={editing.longDescription}
                                    onChange={e => setEditing({ ...editing, longDescription: e.target.value })}
                                    rows={3}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/50 resize-none"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-mono text-slate-500 uppercase mb-1 block">Technologies (comma-separated)</label>
                                <input
                                    value={editing.technologies.join(', ')}
                                    onChange={e => setEditing({ ...editing, technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                                    placeholder="Next.js, TypeScript, ..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/50"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-mono text-slate-500 uppercase mb-1 block">Highlights (comma-separated)</label>
                                <input
                                    value={editing.highlights.join(', ')}
                                    onChange={e => setEditing({ ...editing, highlights: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                                    placeholder="Feature 1, Feature 2, ..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/50"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setEditing(null)}
                                className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-all text-sm font-bold uppercase tracking-widest"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-2xl transition-all flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest"
                            >
                                <Save size={16} /> {saving ? 'Saving...' : 'Save Project'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
