import React, { useState, useEffect } from 'react';
import { NavigationRail } from './components/NavigationRail';
import { SecondarySidebar } from './components/SecondarySidebar';
import { MainWorkspace } from './components/MainWorkspace';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { HelpModal } from './components/HelpModal';
import { SourceInspector } from './components/SourceInspector';
import { Toast } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { AssistantPage } from './pages/AssistantPage';
import { ConversationsPage } from './pages/ConversationsPage';
import { ReaderPage } from './pages/ReaderPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  const [currentTab, setCurrentTab] = useState('home'); // home, explore, assistant, conversations, reader, settings
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeReaderDocId, setActiveReaderDocId] = useState('doc-hr-01');
  const [activeReaderPage, setActiveReaderPage] = useState(12);
  const [selectedSource, setSelectedSource] = useState(null);
  const [assistantPrompt, setAssistantPrompt] = useState('');
  const [activeConversationId, setActiveConversationId] = useState('conv-01');

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Reset active filter when changing main tabs
  useEffect(() => {
    setActiveFilter('all');
  }, [currentTab]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        if (selectedSource) setSelectedSource(null);
        if (isSearchOpen) setIsSearchOpen(false);
        if (isHelpOpen) setIsHelpOpen(false);
        if (isLogoutOpen) setIsLogoutOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedSource, isSearchOpen, isHelpOpen, isLogoutOpen]);

  // Routing Handlers
  const handleAskAI = (query) => {
    setAssistantPrompt(query);
    setCurrentTab('assistant');
  };

  const handleOpenDocument = (doc, page = 1) => {
    setActiveReaderDocId(doc.id);
    setActiveReaderPage(page || (doc.id === 'doc-hr-01' ? 12 : 1));
    setCurrentTab('reader');
  };

  const handleSelectFolder = (folderId) => {
    setActiveFilter(`folder-${folderId}`);
    setCurrentTab('explore');
  };

  const handleOpenDocumentAtPage = (docId, pageNumber) => {
    setActiveReaderDocId(docId);
    setActiveReaderPage(pageNumber || 12);
    setSelectedSource(null);
    setCurrentTab('reader');
    showToast(`Jumped to Page ${pageNumber} in Document Reader`);
  };

  const handleContinueConversation = (convId) => {
    setActiveConversationId(convId);
    setCurrentTab('assistant');
  };

  const handleNewConversation = () => {
    const newId = `conv-${Date.now()}`;
    setActiveConversationId(newId);
    setAssistantPrompt('');
    setCurrentTab('assistant');
    showToast("Started new research session");
  };

  const showToast = (message) => {
    setToastMessage(message);
  };

  const handleConfirmLogout = () => {
    setIsLogoutOpen(false);
    showToast("Signed out. Returning to home...");
    setTimeout(() => {
      setCurrentTab('home');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#171717] flex font-inter antialiased">
      {/* =========================================================================
          ZONE 1: DARK LEFT NAVIGATION RAIL (#171717, 92px fixed)
          ========================================================================= */}
      <NavigationRail
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isMobileOpen={isMobileNavOpen}
        setIsMobileOpen={setIsMobileNavOpen}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenLogout={() => setIsLogoutOpen(true)}
      />

      {/* =========================================================================
          ZONE 2: LIGHT GREY SECONDARY SIDEBAR (#F0F1F2, 280px fixed beside rail)
          ========================================================================= */}
      <SecondarySidebar
        currentTab={currentTab}
        activeFilter={activeFilter}
        setActiveFilter={(filter) => {
          setActiveFilter(filter);
          // If sidebar item is a conversation id, switch to that conversation
          if (filter.startsWith('conv-')) {
            setActiveConversationId(filter);
            setCurrentTab('assistant');
          }
          // If sidebar item is a reader page, jump to that page
          if (filter.startsWith('page-')) {
            const pageNum = parseInt(filter.replace('page-', ''), 10);
            setActiveReaderPage(pageNum);
            setCurrentTab('reader');
          }
        }}
        onNewConversation={handleNewConversation}
        onAddFolder={() => showToast("Folder addition request submitted to admin")}
      />

      {/* =========================================================================
          ZONE 3: LARGE WHITE MAIN WORKSPACE (#FFFFFF, fills remaining width)
          ========================================================================= */}
      <MainWorkspace
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        setIsMobileNavOpen={setIsMobileNavOpen}
      >
        {currentTab === 'home' && (
          <HomePage
            onNavigate={(tab, params) => {
              if (params?.conversationId) {
                setActiveConversationId(params.conversationId);
              }
              setCurrentTab(tab);
            }}
            onAskAI={handleAskAI}
            onOpenDocument={handleOpenDocument}
            onSelectFolder={handleSelectFolder}
          />
        )}

        {currentTab === 'explore' && (
          <ExplorePage
            activeFilter={activeFilter}
            onSelectDocument={handleOpenDocument}
            onAskAIAboutDoc={(doc) => handleAskAI(`Tell me about key provisions in ${doc.title}`)}
          />
        )}

        {currentTab === 'assistant' && (
          <AssistantPage
            initialConversationId={activeConversationId}
            initialPrompt={assistantPrompt}
            onOpenSourceInspector={(src) => setSelectedSource(src)}
            onOpenDocumentReader={(docId, page) => handleOpenDocumentAtPage(docId, page)}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'conversations' && (
          <ConversationsPage
            activeFilter={activeFilter}
            onContinueConversation={handleContinueConversation}
            onNewConversation={handleNewConversation}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'reader' && (
          <ReaderPage
            documentId={activeReaderDocId}
            initialPage={activeReaderPage}
          />
        )}

        {currentTab === 'settings' && (
          <SettingsPage
            activeFilter={activeFilter}
            onOpenLogout={() => setIsLogoutOpen(true)}
            onShowToast={showToast}
          />
        )}
      </MainWorkspace>

      {/* Global Modals & Overlays */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectDocument={handleOpenDocument}
        onSelectConversation={handleContinueConversation}
        onAskAI={handleAskAI}
      />

      {selectedSource && (
        <SourceInspector
          source={selectedSource}
          onClose={() => setSelectedSource(null)}
          onOpenInReader={handleOpenDocumentAtPage}
          onAskFollowUp={(query) => {
            setSelectedSource(null);
            handleAskAI(query);
          }}
        />
      )}

      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* Sign Out Confirmation Modal */}
      {isLogoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs">
          <div className="w-full max-w-sm bg-white border border-[#E8E8E8] rounded-xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-manrope font-bold text-[#202124]">
              Sign out of Infera AI?
            </h3>
            <p className="text-xs text-[#85898D] font-inter">
              Your research state and verified document cache will remain preserved for your next login.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsLogoutOpen(false)}
                className="btn-outline-neutral text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="btn-primary-dark text-xs bg-red-700 hover:bg-red-800 border-red-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}

export default App;
