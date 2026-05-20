'use client';

import { useState } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { FileText, Lightning, ArrowsClockwise, Printer } from '@phosphor-icons/react';
import { Reveal } from '@/components/ui/ScrollReveal';
import { CopyBtn } from '@/components/ui/CopyBtn';
import { DOC_TYPES, TONES } from '@/lib/constants';

export function DocumentsSection() {
  const [docType, setDocType] = useState('proposal');
  const [docTitle, setDocTitle] = useState('');
  const [docClient, setDocClient] = useState('');
  const [docAuthor, setDocAuthor] = useState('');
  const [docTone, setDocTone] = useState('professional');
  const [docDescription, setDocDescription] = useState('');
  const [docGenerating, setDocGenerating] = useState(false);
  const [docResult, setDocResult] = useState('');
  const [docError, setDocError] = useState('');

  const handleGenerateDoc = async () => {
    if (!docTitle.trim() || !docDescription.trim()) return;
    setDocGenerating(true);
    setDocError('');
    setDocResult('');
    try {
      const res = await fetch('/api/document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentType: docType,
          title: docTitle,
          client: docClient,
          author: docAuthor,
          tone: docTone,
          description: docDescription,
        }),
      });
      const data = await res.json();
      if (data.error) { setDocError(data.error); return; }
      setDocResult(data.document);
    } catch { setDocError('Network error. Please try again.'); }
    finally { setDocGenerating(false); }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow || !docResult) return;
    printWindow.document.write(`
      <!DOCTYPE html><html><head><title>${docTitle}</title>
      <style>
        body { font-family: Georgia, 'Times New Roman', serif; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #111; line-height: 1.7; }
        h1 { font-size: 28px; margin-bottom: 4px; letter-spacing: -0.02em; }
        h2 { font-size: 20px; margin-top: 32px; border-bottom: 1px solid #EAEAEA; padding-bottom: 8px; }
        h3 { font-size: 16px; margin-top: 24px; }
        table { border-collapse: collapse; width: 100%; margin: 16px 0; }
        th, td { border: 1px solid #EAEAEA; padding: 8px 12px; text-align: left; font-size: 14px; }
        th { background: #F7F6F3; font-weight: 600; }
        code { font-family: 'JetBrains Mono', monospace; font-size: 13px; background: #F7F6F3; padding: 2px 6px; border-radius: 4px; }
        pre { background: #F7F6F3; padding: 16px; border-radius: 8px; overflow-x: auto; }
        pre code { background: none; padding: 0; }
        hr { border: none; border-top: 1px solid #EAEAEA; margin: 32px 0; }
        ul, ol { padding-left: 24px; }
        li { margin-bottom: 4px; }
        blockquote { border-left: 3px solid #EAEAEA; margin-left: 0; padding-left: 16px; color: #787774; }
      </style></head><body>${docResult}</body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div>
      <Reveal>
        <h2 className="font-editorial-serif text-2xl tracking-[-0.02em]">Document Engine</h2>
        <p className="text-secondary text-xs mt-1 mb-4">AI writes the content. You print or download it.</p>
      </Reveal>

      {/* Subtle header image */}
      <Reveal delay={40}>
        <div className="relative w-full aspect-[21/6] rounded-lg overflow-hidden border border-[var(--border-subtle-value)] mb-6 img-overlay-bottom">
          <Image
            src="/images/home-graphic.webp"
            alt="Document generation"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Form */}
        <div className="lg:col-span-2">
          <Reveal delay={60}>
            <div className="border border-[var(--border-subtle-value)] rounded-lg p-5 bg-[var(--surface-01)] space-y-3.5">
              {/* Document Type */}
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary mb-1.5 block">Type</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {DOC_TYPES.map(dt => (
                    <button
                      key={dt.value}
                      onClick={() => setDocType(dt.value)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium rounded-md border transition-all ${
                        docType === dt.value
                          ? 'border-[var(--off-black)] bg-[var(--off-black)] text-white dark:border-white dark:bg-white dark:text-[var(--off-black)]'
                          : 'border-[var(--border-subtle-value)] hover:border-[var(--off-black)]'
                      }`}
                    >
                      <dt.icon size={12} weight="bold" />
                      {dt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary mb-1 block">Title</label>
                <input
                  type="text"
                  value={docTitle}
                  onChange={e => setDocTitle(e.target.value)}
                  placeholder="Q4 Performance Review"
                  className="w-full px-3 py-1.5 text-xs border border-[var(--border-subtle-value)] rounded-md bg-[var(--surface-01)] focus:outline-none focus:ring-1 focus:ring-[var(--ring)]"
                />
              </div>

              {/* Client & Author */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary mb-1 block">Client</label>
                  <input
                    type="text"
                    value={docClient}
                    onChange={e => setDocClient(e.target.value)}
                    placeholder="Acme Corp"
                    className="w-full px-3 py-1.5 text-xs border border-[var(--border-subtle-value)] rounded-md bg-[var(--surface-01)] focus:outline-none focus:ring-1 focus:ring-[var(--ring)]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary mb-1 block">Author</label>
                  <input
                    type="text"
                    value={docAuthor}
                    onChange={e => setDocAuthor(e.target.value)}
                    placeholder="Tangison Agency"
                    className="w-full px-3 py-1.5 text-xs border border-[var(--border-subtle-value)] rounded-md bg-[var(--surface-01)] focus:outline-none focus:ring-1 focus:ring-[var(--ring)]"
                  />
                </div>
              </div>

              {/* Tone */}
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary mb-1.5 block">Tone</label>
                <div className="flex flex-wrap gap-1">
                  {TONES.map(t => (
                    <button
                      key={t.value}
                      onClick={() => setDocTone(t.value)}
                      className={`px-2 py-0.5 text-[10px] font-medium rounded-md transition-all ${
                        docTone === t.value
                          ? 'bg-[var(--surface-02)] text-primary'
                          : 'text-secondary hover:text-primary'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary mb-1 block">Brief</label>
                <textarea
                  value={docDescription}
                  onChange={e => setDocDescription(e.target.value)}
                  placeholder="Describe the document purpose and requirements..."
                  rows={3}
                  className="w-full px-3 py-1.5 text-xs border border-[var(--border-subtle-value)] rounded-md bg-[var(--surface-01)] focus:outline-none focus:ring-1 focus:ring-[var(--ring)] resize-none"
                />
              </div>

              {/* Generate */}
              <button
                onClick={handleGenerateDoc}
                disabled={docGenerating || !docTitle.trim() || !docDescription.trim()}
                className="w-full flex items-center justify-center gap-2 bg-[var(--off-black)] text-white dark:bg-white dark:text-[var(--off-black)] px-4 py-2 rounded-md text-xs font-medium hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {docGenerating ? (
                  <><ArrowsClockwise size={12} className="animate-spin" /> Generating...</>
                ) : (
                  <><Lightning size={12} weight="fill" /> Generate</>
                )}
              </button>

              {docError && <p className="text-[11px] text-destructive">{docError}</p>}
            </div>
          </Reveal>
        </div>

        {/* Preview */}
        <div className="lg:col-span-3">
          <Reveal delay={120}>
            {docResult ? (
              <div className="border border-[var(--border-subtle-value)] rounded-lg bg-[var(--surface-01)]">
                <div className="flex items-center justify-between px-5 py-2.5 border-b border-[var(--border-subtle-value)]">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary">Preview</span>
                  <div className="flex items-center gap-3">
                    <CopyBtn text={docResult} />
                    <button
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1 text-[11px] font-medium hover:text-primary transition-colors"
                    >
                      <Printer size={11} weight="bold" /> Print
                    </button>
                  </div>
                </div>
                <div className="p-5 max-h-[70vh] overflow-y-auto">
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown>{docResult}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border border-[var(--border-subtle-value)] rounded-lg bg-[var(--surface-01)] h-full min-h-[360px] flex items-center justify-center">
                <div className="text-center">
                  <FileText size={28} weight="thin" className="mx-auto text-muted mb-2" />
                  <p className="text-secondary text-xs">Fill in the form and generate</p>
                  <p className="text-muted text-[10px] mt-0.5">Document will appear here</p>
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </div>
  );
}
