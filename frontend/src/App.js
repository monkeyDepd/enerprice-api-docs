import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Moon, Sun, Menu, X, Copy, ChevronDown, Book, Key, Zap, Settings, Database, Leaf, AlertTriangle, FileText, HelpCircle } from 'lucide-react';
import { Button } from './components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { useToast } from './hooks/use-toast';
import { Toaster } from './components/ui/toaster';
import './App.css';
import { mockApiData } from './mockData';
import epdfav from './assets/epdfav.png';
import apiImage from './assets/api.png';


const API_SECTIONS = [
  { id: 'home', title: 'Home', icon: Book },
  { id: 'auth', title: 'Authentication', icon: Key },
  { id: 'energy-futures', title: 'Energy Futures', icon: Zap },
  { id: 'ancillary', title: 'Ancillary Uplift', icon: Settings },
  { id: 'rec-rps', title: 'REC/RPS', icon: Leaf },
  { id: 'utility-price', title: 'Utility Price', icon: Database },
  { id: 'natural-gas-utility-price', title: 'Natural Gas Utility Price', icon: Database },
  { id: 'errors', title: 'Errors', icon: AlertTriangle },
  { id: 'notebook', title: 'Notebook', icon: FileText },
  { id: 'support', title: 'Support', icon: HelpCircle }
];

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
      className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-200 rounded-lg mx-2 ${
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

const ContentSection = ({ sectionId, data, selectedLanguage }) => {
  if (!data) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{data.title}</h1>
        <div className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed prose-doc" dangerouslySetInnerHTML={{ __html: data.description }} />
      </div>

      {data.endpoints && data.endpoints.map((endpoint, index) => (
        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800/50">
          <div className="mb-4">
            <div className="flex items-center space-x-3 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                endpoint.method === 'GET' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
              }`}>
                {endpoint.method}
              </span>
              <code className="text-sm bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded font-mono">
                {endpoint.url}
              </code>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{endpoint.title}</h3>
            <div className="text-gray-600 dark:text-gray-300 mt-2 prose-doc" dangerouslySetInnerHTML={{ __html: endpoint.description }} />
          </div>

          {endpoint.parameters && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Parameters</h4>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Required</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {endpoint.parameters.map((param, i) => (
                      <tr key={i} className="border-t border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-3 font-mono text-sm text-blue-600 dark:text-blue-400">{param.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{param.type}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            param.required 
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                          }`}>
                            {param.required ? 'Required' : 'Optional'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{param.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {endpoint.examples && endpoint.examples[selectedLanguage] && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Example</h4>
              <CodeEditor 
                code={endpoint.examples[selectedLanguage]} 
                language={selectedLanguage}
              />
            </div>
          )}
        </div>
      ))}

      {data.content && (
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>
      )}
    </div>
  );
};

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const contentRef = useRef(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(`section-${sectionId}`);
    if (element && contentRef.current) {
      const headerOffset = 20;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
      
      contentRef.current.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
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
                  onClick={() => scrollToSection('home')}
                  className="flex items-center space-x-3 text-left rounded-lg hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Go to Home"
                >
                  <img
                    src={epdfav}
                    alt="EnerPrice Logo"
                    className="w-12 h-12 object-contain rounded-lg shrink-0"
                  />
                  <div>
                    {/* <h1 className="text-xl font-bold text-gray-900 dark:text-white">EnerPrice Data</h1> */}
                    {<p className="text-xs text-gray-500 dark:text-gray-400">API Documentation</p>}
                  </div>
                </button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsNavCollapsed(!isNavCollapsed)}
                className="h-9 w-9 p-0"
              >
                {isNavCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 overflow-y-auto scrollbar-hide">
              <div className="space-y-2">
                {API_SECTIONS.map((section) => (
                  <NavigationItem
                    key={section.id}
                    section={section}
                    isActive={activeSection === section.id}
                    onClick={scrollToSection}
                    isCollapsed={isNavCollapsed}
                  />
                ))}
              </div>
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
          <div className="flex-1 flex flex-col">
            {/* Top Bar */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">EnerPrice Data Center</h2>
                  {/* <p className="text-gray-600 dark:text-gray-300">Complete guide to EnerPrice API</p> */}
                </div>
                <div className="flex items-center space-x-4">
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
              {API_SECTIONS.map((section) => (
                <div key={section.id} id={`section-${section.id}`}>
                  <ContentSection 
                    sectionId={section.id}
                    data={mockApiData[section.id]}
                    selectedLanguage={selectedLanguage}
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
