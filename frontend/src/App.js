import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Moon, Sun, Menu, X, Copy, Link2, Search, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from './components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { useToast } from './hooks/use-toast';
import { Toaster } from './components/ui/toaster';
import './App.css';
import { NAV_GROUPS, getSectionData } from './content';
import { DEPRECATION_DATE, SUNSET_DATE, successorFor, sectionForPath } from './content/migration';
import epdfav from './assets/epdfav.png';

const MODES = { v1: 'v1', legacy: 'legacy' };
const ALL_SECTIONS = NAV_GROUPS.flatMap((g) => g.items);

const slugify = (s) => s.toLowerCase().replace(/\{|\}/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const endpointAnchor = (sectionId, endpoint) => `${sectionId}--${slugify(`${endpoint.method} ${endpoint.url}`)}`;

// #/v1/energy-futures or #/legacy/energy-futures--get-datasets-download-energy-futures
const parseHash = () => {
  const m = window.location.hash.match(/^#\/(v1|legacy)(?:\/([^?#]*))?/);
  if (!m) return { mode: MODES.v1, target: null };
  return { mode: m[1], target: m[2] || null };
};

const CodeEditor = ({ code, language = 'python' }) => {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast({
        title: "Copied!",
        description: "Code copied to clipboard",
        duration: 2000,
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="relative bg-gray-900 dark:bg-gray-950 rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 w-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Copy code"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4">
        <pre className="text-sm text-gray-100 dark:text-gray-200 font-mono whitespace-pre-wrap overflow-x-auto">
          <code>{(code ?? '').replace(/^\s*\n/, '').trimEnd()}</code>
        </pre>
      </div>
    </div>
  );
};

const NavigationItem = ({ section, isActive, onClick, isCollapsed }) => {
  const Icon = section.icon;

  return (
    <button
      onClick={() => onClick(section.id)}
      title={isCollapsed ? section.title : undefined}
      className={`w-full flex items-center space-x-3 px-4 py-2.5 text-left transition-all duration-200 rounded-lg mx-2 ${
        isActive
          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      {!isCollapsed && <span className="font-medium">{section.title}</span>}
    </button>
  );
};

const ParamTable = ({ heading, rows, columns }) => (
  <div className="mb-6">
    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{heading}</h4>
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg">
        <thead className="bg-gray-50 dark:bg-gray-900/50">
          <tr>
            {columns.map((c) => (
              <th key={c} className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((param, i) => (
            <tr key={i} className="border-t border-gray-200 dark:border-gray-700">
              <td className="px-4 py-3 font-mono text-sm text-blue-600 dark:text-blue-400">{param.name}</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{param.type}</td>
              {'required' in param && (
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    param.required
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                  }`}>
                    {param.required ? 'Required' : 'Optional'}
                  </span>
                </td>
              )}
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 prose-doc" dangerouslySetInnerHTML={{ __html: param.description }} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const MethodBadge = ({ method }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
    method === 'GET' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
    method === 'POST' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
    'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
  }`}>
    {method}
  </span>
);

const EndpointCard = ({ sectionId, endpoint, mode, selectedLanguage, onCopyLink, onGoTo }) => {
  const anchor = endpointAnchor(sectionId, endpoint);
  const successor = mode === MODES.legacy ? successorFor(endpoint.method, endpoint.url) : null;
  const successorSection = successor ? sectionForPath(successor) : null;

  return (
    <div id={anchor} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800/50 scroll-mt-6">
      <div className="mb-4">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <MethodBadge method={endpoint.method} />
          <code className={`text-sm bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded font-mono ${successor ? 'line-through decoration-amber-500' : ''}`}>
            {endpoint.url}
          </code>
          {successor && (
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
              Deprecated · 410 from {SUNSET_DATE}
            </span>
          )}
          <button
            type="button"
            onClick={() => onCopyLink(anchor)}
            className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-300"
            aria-label="Copy link to this endpoint"
            title="Copy link to this endpoint"
          >
            <Link2 className="h-4 w-4" />
          </button>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{endpoint.title}</h3>
        {successor && (
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2">
            <span className="font-semibold text-amber-900 dark:text-amber-100">Use instead:</span>
            <code className="font-mono text-amber-900 dark:text-amber-100 break-all">{endpoint.method} {successor}</code>
            {successorSection && (
              <button
                type="button"
                onClick={() => onGoTo(MODES.v1, successorSection)}
                className="inline-flex items-center gap-1 text-blue-700 dark:text-blue-300 hover:underline"
              >
                View new address <ArrowRight className="h-3 w-3" />
              </button>
            )}
          </div>
        )}
        <div className="text-gray-600 dark:text-gray-300 mt-2 prose-doc" dangerouslySetInnerHTML={{ __html: endpoint.description }} />
      </div>

      {endpoint.parameters && (
        <ParamTable heading="Parameters" rows={endpoint.parameters} columns={['Name', 'Type', 'Required', 'Description']} />
      )}

      {endpoint.examples && endpoint.examples[selectedLanguage] && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Example</h4>
          <CodeEditor code={endpoint.examples[selectedLanguage]} language={selectedLanguage} />
        </div>
      )}

      {endpoint.moreExamples && endpoint.moreExamples.map((more) => more.examples[selectedLanguage] && (
        <div key={more.title} className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{more.title}</h4>
          {more.description && (
            <div className="text-gray-600 dark:text-gray-300 mb-3 prose-doc" dangerouslySetInnerHTML={{ __html: more.description }} />
          )}
          <CodeEditor code={more.examples[selectedLanguage]} language={selectedLanguage} />
        </div>
      ))}

      {endpoint.response && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Response</h4>
          {endpoint.response.summary && (
            <div className="text-gray-600 dark:text-gray-300 mb-3 prose-doc" dangerouslySetInnerHTML={{ __html: endpoint.response.summary }} />
          )}
          {endpoint.response.body && <CodeEditor code={endpoint.response.body} language={endpoint.response.language || 'json'} />}
        </div>
      )}

      {endpoint.responseFields && (
        <ParamTable heading="Response fields" rows={endpoint.responseFields} columns={['Field', 'Type', 'Description']} />
      )}
    </div>
  );
};

const ContentSection = ({ sectionId, data, mode, selectedLanguage, onCopyLink, onGoTo }) => {
  if (!data) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{data.title}</h1>
        {data.description && (
          <div className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed prose-doc" dangerouslySetInnerHTML={{ __html: data.description }} />
        )}
      </div>

      {data.endpoints && data.endpoints.map((endpoint, index) => (
        <EndpointCard
          key={index}
          sectionId={sectionId}
          endpoint={endpoint}
          mode={mode}
          selectedLanguage={selectedLanguage}
          onCopyLink={onCopyLink}
          onGoTo={onGoTo}
        />
      ))}

      {data.content && (
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>
      )}
    </div>
  );
};

const AddressToggle = ({ mode, onChange }) => (
  <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden text-sm" role="group" aria-label="API address version">
    {[
      { id: MODES.v1, label: 'New addresses (v1)' },
      { id: MODES.legacy, label: 'Legacy addresses' },
    ].map((opt) => (
      <button
        key={opt.id}
        type="button"
        onClick={() => onChange(opt.id)}
        aria-pressed={mode === opt.id}
        className={`px-3 py-2 font-medium ${
          mode === opt.id
            ? (opt.id === MODES.legacy ? 'bg-amber-500 text-white' : 'bg-blue-600 text-white')
            : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

const SearchBox = ({ mode, onPick }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const hits = [];
    ALL_SECTIONS.forEach((s) => {
      const data = getSectionData(mode, s.id);
      if (!data) return;
      if (s.title.toLowerCase().includes(q)) hits.push({ sectionId: s.id, label: s.title, sub: 'Section' });
      (data.endpoints || []).forEach((ep) => {
        if (`${ep.title} ${ep.url}`.toLowerCase().includes(q)) {
          hits.push({ sectionId: s.id, anchor: endpointAnchor(s.id, ep), label: ep.title, sub: `${ep.method} ${ep.url}` });
        }
      });
    });
    return hits.slice(0, 12);
  }, [query, mode]);

  return (
    <div className="relative px-4 pt-4">
      <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-900">
        <Search className="h-4 w-4 text-gray-400" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search (Ctrl+K)"
          className="w-full bg-transparent text-sm outline-none text-gray-900 dark:text-gray-100"
          aria-label="Search the documentation"
        />
      </div>
      {results.length > 0 && (
        <div className="absolute left-4 right-4 mt-1 z-20 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {results.map((r, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { onPick(r.sectionId, r.anchor); setQuery(''); }}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{r.label}</div>
              <div className="text-xs font-mono text-gray-500 dark:text-gray-400 truncate">{r.sub}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const initial = parseHash();
  const [mode, setMode] = useState(initial.mode);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const contentRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const scrollToTarget = useCallback((target, behavior = 'smooth') => {
    const sectionId = (target || 'home').split('--')[0];
    const element = document.getElementById(target && target.includes('--') ? target : `section-${sectionId}`);
    setActiveSection(sectionId);
    if (element && contentRef.current) {
      const containerTop = contentRef.current.getBoundingClientRect().top;
      const offset = element.getBoundingClientRect().top - containerTop + contentRef.current.scrollTop - 20;
      contentRef.current.scrollTo({ top: offset, behavior });
    }
  }, []);

  // Follow the URL hash: switch address mode, then scroll once the new content has rendered.
  // A link opened from outside jumps straight to its target; clicks inside the page animate.
  useEffect(() => {
    const onHash = (event) => {
      const { mode: m, target } = parseHash();
      setMode(m);
      const behavior = event ? 'smooth' : 'auto';
      requestAnimationFrame(() => requestAnimationFrame(() => scrollToTarget(target, behavior)));
    };
    onHash();
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [scrollToTarget]);

  const goTo = useCallback((m, target) => {
    const next = `#/${m}/${target || 'home'}`;
    if (window.location.hash === next) {
      scrollToTarget(target);
    } else {
      window.location.hash = next;
    }
  }, [scrollToTarget]);

  // Highlight the section in view while scrolling.
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return undefined;
    const onScroll = () => {
      const containerTop = el.getBoundingClientRect().top;
      let current = ALL_SECTIONS[0].id;
      ALL_SECTIONS.forEach((s) => {
        const node = document.getElementById(`section-${s.id}`);
        if (node && node.getBoundingClientRect().top - containerTop <= 120) current = s.id;
      });
      setActiveSection(current);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [mode]);

  const copyLink = async (anchor) => {
    const url = `${window.location.origin}${window.location.pathname}#/${mode}/${anchor}`;
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: 'Link copied', description: url, duration: 2000 });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <BrowserRouter basename="/">
      <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
        <div className="flex h-screen bg-gray-50 dark:bg-black">
          {/* Left Navigation Pane */}
          <div className={`${isNavCollapsed ? 'w-20' : 'w-80'} transition-all duration-300 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col`}>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
              {!isNavCollapsed && (
                <button
                  type="button"
                  onClick={() => goTo(mode, 'home')}
                  className="flex items-center space-x-3 text-left rounded-lg hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Go to Home"
                >
                  <img
                    src={epdfav}
                    alt="EnerPrice Logo"
                    className="w-12 h-12 object-contain rounded-lg shrink-0"
                  />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">API Documentation</p>
                  </div>
                </button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsNavCollapsed(!isNavCollapsed)}
                className="h-9 w-9 p-0"
                aria-label={isNavCollapsed ? 'Expand navigation' : 'Collapse navigation'}
              >
                {isNavCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
              </Button>
            </div>

            {!isNavCollapsed && <SearchBox mode={mode} onPick={(sectionId, anchor) => goTo(mode, anchor || sectionId)} />}

            {/* Navigation */}
            <nav className="flex-1 py-4 overflow-y-auto scrollbar-hide">
              {NAV_GROUPS.map((group) => (
                <div key={group.title} className="mb-4">
                  {!isNavCollapsed && (
                    <p className="px-6 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">{group.title}</p>
                  )}
                  <div className="space-y-1">
                    {group.items.map((section) => (
                      <NavigationItem
                        key={section.id}
                        section={section}
                        isActive={activeSection === section.id}
                        onClick={(id) => goTo(mode, id)}
                        isCollapsed={isNavCollapsed}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </nav>

            {/* Theme Toggle */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
              <Button
                variant="ghost"
                onClick={() => setIsDark(!isDark)}
                className="w-full justify-start"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {!isNavCollapsed && <span className="ml-3">{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
              </Button>
            </div>
          </div>

          {/* Right Content Pane */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Top Bar */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">EnerPrice Data Center</h2>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <AddressToggle mode={mode} onChange={(m) => goTo(m, activeSection)} />
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="ruby">Ruby</SelectItem>
                      <SelectItem value="curl">cURL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Content */}
            <div ref={contentRef} className="flex-1 overflow-y-auto p-8 space-y-16">
              {mode === MODES.legacy && (
                <div className="flex gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-800 rounded-lg p-4">
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-300 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-900 dark:text-amber-100">
                    <p className="font-semibold">You are viewing the legacy addresses.</p>
                    <p className="mt-1">
                      These addresses are deprecated as of {DEPRECATION_DATE} and return <code>410 Gone</code> from {SUNSET_DATE}.
                      They keep working until then.{' '}
                      <button type="button" className="underline font-medium" onClick={() => goTo(MODES.v1, 'migration')}>
                        Read the migration guide
                      </button>.
                    </p>
                  </div>
                </div>
              )}
              {ALL_SECTIONS.map((section) => (
                <div key={section.id} id={`section-${section.id}`} className="scroll-mt-6">
                  <ContentSection
                    sectionId={section.id}
                    data={getSectionData(mode, section.id)}
                    mode={mode}
                    selectedLanguage={selectedLanguage}
                    onCopyLink={copyLink}
                    onGoTo={goTo}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
