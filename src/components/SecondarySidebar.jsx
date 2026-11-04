import React from 'react';
import { 
  Sliders, 
  Archive, 
  CheckCircle2, 
  CircleDot, 
  Folder, 
  Plus, 
  Clock, 
  Star, 
  FileText, 
  Sparkles, 
  MessageSquare, 
  User, 
  Shield, 
  Bell, 
  Building,
  Layers,
  FileCode,
  FileSpreadsheet,
  Bookmark,
  Pin
} from 'lucide-react';
import { folderCategories } from '../data/mockData';

export const SecondarySidebar = ({ 
  currentTab, 
  activeFilter, 
  setActiveFilter, 
  onNewConversation,
  onNewInquiry,
  onAddFolder
}) => {
  // Render sidebar contents based on active primary tab
  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return (
          <>
            <div className="px-5 pt-6 pb-4">
              <h2 className="text-xl font-manrope font-bold text-[#202124] tracking-tight">
                Knowledge Studio
              </h2>
            </div>

            <div className="px-3 space-y-4 overflow-y-auto flex-1">
              {/* Group 1: Workspace Overview */}
              <div className="space-y-1">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`sidebar-item ${activeFilter === 'all' ? 'active' : ''}`}
                >
                  <div className="flex items-center gap-2.5">
                    <Sliders size={16} className="text-[#85898D]" />
                    <span>Workspace Overview</span>
                  </div>
                  <span className="text-xs text-[#85898D] font-mono">116</span>
                </button>

                <button
                  onClick={() => setActiveFilter('recent')}
                  className={`sidebar-item ${activeFilter === 'recent' ? 'active' : ''}`}
                >
                  <div className="flex items-center gap-2.5">
                    <Clock size={16} className="text-[#85898D]" />
                    <span>Recently Accessed</span>
                  </div>
                  <span className="text-xs text-[#85898D] font-mono">6</span>
                </button>

                <button
                  onClick={() => setActiveFilter('starred')}
                  className={`sidebar-item ${activeFilter === 'starred' ? 'active' : ''}`}
                >
                  <div className="flex items-center gap-2.5">
                    <Star size={16} className="text-[#85898D]" />
                    <span>Pinned Resources</span>
                  </div>
                  <span className="text-xs text-[#85898D] font-mono">4</span>
                </button>
              </div>

              <div className="border-t border-[#E8E8E8] pt-3">
                <div className="px-3 pb-2 flex items-center justify-between">
                  <span className="sidebar-section-title">Browse Categories</span>
                  <span className="text-[11px] text-[#85898D]">5</span>
                </div>

                <div className="space-y-1">
                  {folderCategories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveFilter(`folder-${cat.id}`)}
                      className={`sidebar-item ${activeFilter === `folder-${cat.id}` ? 'active' : ''}`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Folder size={15} className="text-[#85898D] shrink-0" />
                        <span className="truncate">{cat.name}</span>
                      </div>
                      <span className="text-xs text-[#85898D] font-mono shrink-0 ml-1">{cat.documentCount}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={onAddFolder}
                  className="w-full mt-2 px-3 py-1.5 text-xs text-[#85898D] hover:text-[#202124] flex items-center gap-2 rounded-lg hover:bg-[#E7E8EA] transition-colors cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Request New Category</span>
                </button>
              </div>

              <div className="border-t border-[#E8E8E8] pt-3">
                <div className="px-3 pb-2 flex items-center justify-between">
                  <span className="sidebar-section-title">Recent Inquiries</span>
                  <span className="text-[11px] text-[#85898D]">3</span>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => setActiveFilter('conv-01')}
                    className={`sidebar-item ${activeFilter === 'conv-01' ? 'active' : ''}`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <CircleDot size={14} className="text-[#526D5C] shrink-0" />
                      <span className="truncate">Annual Leave Policy</span>
                    </div>
                    <span className="text-[11px] text-[#85898D]">Today</span>
                  </button>

                  <button
                    onClick={() => setActiveFilter('conv-02')}
                    className={`sidebar-item ${activeFilter === 'conv-02' ? 'active' : ''}`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <CircleDot size={14} className="text-[#85898D] shrink-0" />
                      <span className="truncate">Travel Reimbursement</span>
                    </div>
                    <span className="text-[11px] text-[#85898D]">Yday</span>
                  </button>

                  <button
                    onClick={() => setActiveFilter('conv-03')}
                    className={`sidebar-item ${activeFilter === 'conv-03' ? 'active' : ''}`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <CircleDot size={14} className="text-[#85898D] shrink-0" />
                      <span className="truncate">Hardware YubiKey</span>
                    </div>
                    <span className="text-[11px] text-[#85898D]">7d</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        );

      case 'explore':
        return (
          <>
            <div className="px-5 pt-6 pb-4">
              <h2 className="text-xl font-manrope font-bold text-[#202124] tracking-tight">
                Explore Documents
              </h2>
            </div>

            <div className="px-3 space-y-4 overflow-y-auto flex-1">
              {/* Group 1: Views */}
              <div className="space-y-1">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`sidebar-item ${activeFilter === 'all' ? 'active' : ''}`}
                >
                  <div className="flex items-center gap-2.5">
                    <Sliders size={16} className="text-[#85898D]" />
                    <span>All Documents</span>
                  </div>
                  <span className="text-xs text-[#85898D] font-mono">116</span>
                </button>

                <button
                  onClick={() => setActiveFilter('recently-updated')}
                  className={`sidebar-item ${activeFilter === 'recently-updated' ? 'active' : ''}`}
                >
                  <div className="flex items-center gap-2.5">
                    <Clock size={16} className="text-[#85898D]" />
                    <span>Recently Updated</span>
                  </div>
                  <span className="text-xs text-[#85898D] font-mono">14</span>
                </button>

                <button
                  onClick={() => setActiveFilter('starred')}
                  className={`sidebar-item ${activeFilter === 'starred' ? 'active' : ''}`}
                >
                  <div className="flex items-center gap-2.5">
                    <Star size={16} className="text-[#85898D]" />
                    <span>Starred Documents</span>
                  </div>
                  <span className="text-xs text-[#85898D] font-mono">8</span>
                </button>

                <button
                  onClick={() => setActiveFilter('archived')}
                  className={`sidebar-item ${activeFilter === 'archived' ? 'active' : ''}`}
                >
                  <div className="flex items-center gap-2.5">
                    <Archive size={16} className="text-[#85898D]" />
                    <span>Archived Copies</span>
                  </div>
                  <span className="text-xs text-[#85898D] font-mono">0</span>
                </button>
              </div>

              {/* Group 2: Folder Categories (Matching 'Group' in reference) */}
              <div className="border-t border-[#E8E8E8] pt-3">
                <div className="px-3 pb-2 flex items-center justify-between">
                  <span className="sidebar-section-title">Knowledge Folders</span>
                  <span className="text-[11px] text-[#85898D]">5</span>
                </div>

                <div className="space-y-1">
                  {folderCategories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveFilter(`folder-${cat.id}`)}
                      className={`sidebar-item ${activeFilter === `folder-${cat.id}` ? 'active' : ''}`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Folder size={15} className="text-[#85898D] shrink-0" />
                        <span className="truncate">{cat.name}</span>
                      </div>
                      <span className="text-xs text-[#85898D] font-mono shrink-0">{cat.documentCount}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={onAddFolder}
                  className="w-full mt-2 px-3 py-1.5 text-xs text-[#85898D] hover:text-[#202124] flex items-center gap-2 rounded-lg hover:bg-[#E7E8EA] transition-colors cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add Folder</span>
                </button>
              </div>

              {/* Group 3: File Formats */}
              <div className="border-t border-[#E8E8E8] pt-3">
                <div className="px-3 pb-2 flex items-center justify-between">
                  <span className="sidebar-section-title">Format</span>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => setActiveFilter('format-pdf')}
                    className={`sidebar-item ${activeFilter === 'format-pdf' ? 'active' : ''}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText size={15} className="text-[#85898D]" />
                      <span>PDF Manuals</span>
                    </div>
                    <span className="text-xs text-[#85898D] font-mono">84</span>
                  </button>

                  <button
                    onClick={() => setActiveFilter('format-docx')}
                    className={`sidebar-item ${activeFilter === 'format-docx' ? 'active' : ''}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FileCode size={15} className="text-[#85898D]" />
                      <span>Word Documents</span>
                    </div>
                    <span className="text-xs text-[#85898D] font-mono">22</span>
                  </button>

                  <button
                    onClick={() => setActiveFilter('format-txt')}
                    className={`sidebar-item ${activeFilter === 'format-txt' ? 'active' : ''}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FileSpreadsheet size={15} className="text-[#85898D]" />
                      <span>Plain Text & RFCs</span>
                    </div>
                    <span className="text-xs text-[#85898D] font-mono">10</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        );

      case 'assistant':
        return (
          <>
            <div className="px-5 pt-6 pb-4">
              <h2 className="text-xl font-manrope font-bold text-[#202124] tracking-tight">
                AI Assistant
              </h2>
            </div>

            <div className="px-3 space-y-4 overflow-y-auto flex-1">
              {/* New Conversation Button */}
              <button
                onClick={onNewConversation}
                className="w-full py-2 px-3 rounded-lg bg-white border border-[#D6D6D6] hover:border-[#171717] text-xs font-inter font-medium text-[#202124] flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer"
              >
                <Plus size={14} className="text-[#171717]" />
                <span>New Research Session</span>
              </button>

              {/* Group 1: Pinned Research */}
              <div className="space-y-1">
                <div className="px-3 pb-1 flex items-center justify-between">
                  <span className="sidebar-section-title">Pinned Chats</span>
                  <span className="text-[11px] text-[#85898D]">2</span>
                </div>

                <button
                  onClick={() => setActiveFilter('conv-01')}
                  className={`sidebar-item ${activeFilter === 'conv-01' ? 'active' : ''}`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Pin size={14} className="text-[#526D5C] shrink-0" />
                    <span className="truncate">Annual Leave & Accrual</span>
                  </div>
                  <span className="text-[11px] text-[#85898D]">p.12</span>
                </button>

                <button
                  onClick={() => setActiveFilter('conv-02')}
                  className={`sidebar-item ${activeFilter === 'conv-02' ? 'active' : ''}`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Pin size={14} className="text-[#85898D] shrink-0" />
                    <span className="truncate">Travel Expense Receipts</span>
                  </div>
                  <span className="text-[11px] text-[#85898D]">p.5</span>
                </button>
              </div>

              {/* Group 2: Recent Research */}
              <div className="border-t border-[#E8E8E8] pt-3">
                <div className="px-3 pb-2 flex items-center justify-between">
                  <span className="sidebar-section-title">Recent Chats</span>
                  <span className="text-[11px] text-[#85898D]">3</span>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => setActiveFilter('conv-03')}
                    className={`sidebar-item ${activeFilter === 'conv-03' ? 'active' : ''}`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <CircleDot size={14} className="text-[#85898D] shrink-0" />
                      <span className="truncate">Hardware YubiKey Setup</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveFilter('conv-04')}
                    className={`sidebar-item ${activeFilter === 'conv-04' ? 'active' : ''}`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <CircleDot size={14} className="text-[#85898D] shrink-0" />
                      <span className="truncate">Ergonomic WFH Grant</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveFilter('conv-05')}
                    className={`sidebar-item ${activeFilter === 'conv-05' ? 'active' : ''}`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <CircleDot size={14} className="text-[#85898D] shrink-0" />
                      <span className="truncate">Parental Caregiver Leave</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Group 3: Scope */}
              <div className="border-t border-[#E8E8E8] pt-3">
                <div className="px-3 pb-2 flex items-center justify-between">
                  <span className="sidebar-section-title">Grounded Corpus</span>
                </div>

                <div className="px-3 py-2 bg-white rounded-lg border border-[#E8E8E8] space-y-1 text-xs">
                  <div className="flex items-center justify-between text-[#202124] font-medium">
                    <span>Verified Knowledge</span>
                    <span className="text-[#526D5C] font-semibold">100%</span>
                  </div>
                  <p className="text-[11px] text-[#85898D]">
                    Zero hallucination guard active across 116 enterprise policies.
                  </p>
                </div>
              </div>
            </div>
          </>
        );

      case 'conversations':
        return (
          <>
            <div className="px-5 pt-6 pb-4">
              <h2 className="text-xl font-manrope font-bold text-[#202124] tracking-tight">
                My Conversations
              </h2>
            </div>

            <div className="px-3 space-y-4 overflow-y-auto flex-1">
              <button
                onClick={onNewConversation}
                className="w-full py-2 px-3 rounded-lg bg-white border border-[#D6D6D6] hover:border-[#171717] text-xs font-inter font-medium text-[#202124] flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer"
              >
                <Plus size={14} className="text-[#171717]" />
                <span>New Conversation</span>
              </button>

              <div className="space-y-1">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`sidebar-item ${activeFilter === 'all' ? 'active' : ''}`}
                >
                  <div className="flex items-center gap-2.5">
                    <Sliders size={16} className="text-[#85898D]" />
                    <span>All Conversations</span>
                  </div>
                  <span className="text-xs text-[#85898D] font-mono">18</span>
                </button>

                <button
                  onClick={() => setActiveFilter('group-today')}
                  className={`sidebar-item ${activeFilter === 'group-today' ? 'active' : ''}`}
                >
                  <div className="flex items-center gap-2.5">
                    <Clock size={16} className="text-[#85898D]" />
                    <span>Today</span>
                  </div>
                  <span className="text-xs text-[#85898D] font-mono">2</span>
                </button>

                <button
                  onClick={() => setActiveFilter('group-yesterday')}
                  className={`sidebar-item ${activeFilter === 'group-yesterday' ? 'active' : ''}`}
                >
                  <div className="flex items-center gap-2.5">
                    <Clock size={16} className="text-[#85898D]" />
                    <span>Yesterday</span>
                  </div>
                  <span className="text-xs text-[#85898D] font-mono">3</span>
                </button>

                <button
                  onClick={() => setActiveFilter('group-7days')}
                  className={`sidebar-item ${activeFilter === 'group-7days' ? 'active' : ''}`}
                >
                  <div className="flex items-center gap-2.5">
                    <Clock size={16} className="text-[#85898D]" />
                    <span>Previous 7 Days</span>
                  </div>
                  <span className="text-xs text-[#85898D] font-mono">7</span>
                </button>

                <button
                  onClick={() => setActiveFilter('group-older')}
                  className={`sidebar-item ${activeFilter === 'group-older' ? 'active' : ''}`}
                >
                  <div className="flex items-center gap-2.5">
                    <Archive size={16} className="text-[#85898D]" />
                    <span>Older Inquiries</span>
                  </div>
                  <span className="text-xs text-[#85898D] font-mono">6</span>
                </button>
              </div>

              <div className="border-t border-[#E8E8E8] pt-3">
                <div className="px-3 pb-2 flex items-center justify-between">
                  <span className="sidebar-section-title">Filter by Category</span>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => setActiveFilter('cat-hr')}
                    className={`sidebar-item ${activeFilter === 'cat-hr' ? 'active' : ''}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Folder size={15} className="text-[#85898D]" />
                      <span>Human Resources</span>
                    </div>
                    <span className="text-xs text-[#85898D] font-mono">8</span>
                  </button>

                  <button
                    onClick={() => setActiveFilter('cat-finance')}
                    className={`sidebar-item ${activeFilter === 'cat-finance' ? 'active' : ''}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Folder size={15} className="text-[#85898D]" />
                      <span>Finance & Travel</span>
                    </div>
                    <span className="text-xs text-[#85898D] font-mono">5</span>
                  </button>

                  <button
                    onClick={() => setActiveFilter('cat-tech')}
                    className={`sidebar-item ${activeFilter === 'cat-tech' ? 'active' : ''}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Folder size={15} className="text-[#85898D]" />
                      <span>IT & Systems</span>
                    </div>
                    <span className="text-xs text-[#85898D] font-mono">5</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        );

      case 'reader':
        return (
          <>
            <div className="px-5 pt-6 pb-4">
              <h2 className="text-xl font-manrope font-bold text-[#202124] tracking-tight">
                Document Reader
              </h2>
            </div>

            <div className="px-3 space-y-4 overflow-y-auto flex-1">
              <div className="p-3 bg-white rounded-lg border border-[#E8E8E8] space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-[#526D5C] bg-[#EAF0EB] px-1.5 py-0.5 rounded">
                  Active Document
                </span>
                <h4 className="text-xs font-manrope font-semibold text-[#202124] mt-1 line-clamp-2">
                  Annual-Leave-&-PTO-Reference.pdf
                </h4>
                <p className="text-[11px] text-[#85898D]">
                  Version 3.2 • 14 Pages Total
                </p>
              </div>

              {/* Document Outline / TOC */}
              <div>
                <div className="px-3 pb-2 flex items-center justify-between">
                  <span className="sidebar-section-title">Table of Contents</span>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => setActiveFilter('page-10')}
                    className={`sidebar-item ${activeFilter === 'page-10' ? 'active' : ''}`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-[10px] font-mono text-[#85898D]">p.10</span>
                      <span className="truncate">Public Holidays</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveFilter('page-11')}
                    className={`sidebar-item ${activeFilter === 'page-11' ? 'active' : ''}`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-[10px] font-mono text-[#85898D]">p.11</span>
                      <span className="truncate">Accrual Schedules</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveFilter('page-12')}
                    className={`sidebar-item ${activeFilter === 'page-12' || activeFilter === 'all' ? 'active' : ''}`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-[10px] font-mono font-bold text-[#526D5C]">p.12</span>
                      <span className="truncate font-semibold text-[#202124]">Annual Leave Rules</span>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#526D5C] shrink-0" />
                  </button>

                  <button
                    onClick={() => setActiveFilter('page-13')}
                    className={`sidebar-item ${activeFilter === 'page-13' ? 'active' : ''}`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-[10px] font-mono text-[#85898D]">p.13</span>
                      <span className="truncate">Parental Leave</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveFilter('page-14')}
                    className={`sidebar-item ${activeFilter === 'page-14' ? 'active' : ''}`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-[10px] font-mono text-[#85898D]">p.14</span>
                      <span className="truncate">Sign-Offs & Approvals</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Citations Detected on this Document */}
              <div className="border-t border-[#E8E8E8] pt-3">
                <div className="px-3 pb-2 flex items-center justify-between">
                  <span className="sidebar-section-title">Detected Citations</span>
                  <span className="text-[11px] text-[#526D5C] font-semibold">1 Match</span>
                </div>

                <div className="p-3 bg-[#EAF0EB] rounded-lg border border-[#D5E0D7] text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-[#526D5C] font-semibold">
                    <span>Section 4.2</span>
                    <span>98% Match</span>
                  </div>
                  <p className="text-[11px] text-[#202124] line-clamp-2">
                    "Employees are entitled to 24 paid leaves per calendar year..."
                  </p>
                </div>
              </div>
            </div>
          </>
        );

      case 'settings':
        return (
          <>
            <div className="px-5 pt-6 pb-4">
              <h2 className="text-xl font-manrope font-bold text-[#202124] tracking-tight">
                Settings
              </h2>
            </div>

            <div className="px-3 space-y-4 overflow-y-auto flex-1">
              <div className="space-y-1">
                <button
                  onClick={() => setActiveFilter('personal')}
                  className={`sidebar-item ${activeFilter === 'personal' || activeFilter === 'all' ? 'active' : ''}`}
                >
                  <div className="flex items-center gap-2.5">
                    <User size={16} className="text-[#85898D]" />
                    <span>Personal Information</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveFilter('security')}
                  className={`sidebar-item ${activeFilter === 'security' ? 'active' : ''}`}
                >
                  <div className="flex items-center gap-2.5">
                    <Shield size={16} className="text-[#85898D]" />
                    <span>Security & 2FA</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#526D5C]" />
                </button>

                <button
                  onClick={() => setActiveFilter('notifications')}
                  className={`sidebar-item ${activeFilter === 'notifications' ? 'active' : ''}`}
                >
                  <div className="flex items-center gap-2.5">
                    <Bell size={16} className="text-[#85898D]" />
                    <span>Notifications</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveFilter('workspace')}
                  className={`sidebar-item ${activeFilter === 'workspace' ? 'active' : ''}`}
                >
                  <div className="flex items-center gap-2.5">
                    <Building size={16} className="text-[#85898D]" />
                    <span>Workspace Access</span>
                  </div>
                  <span className="text-xs text-[#85898D] font-mono">116</span>
                </button>
              </div>

              <div className="border-t border-[#E8E8E8] pt-3">
                <div className="px-3 pb-2">
                  <span className="sidebar-section-title">Session Info</span>
                </div>
                <div className="px-3 text-xs text-[#85898D] space-y-1">
                  <p>Infera AI Member Studio v3.5</p>
                  <p>Enterprise Token: Active</p>
                </div>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <aside className="hidden md:flex flex-col w-[280px] bg-[#F0F1F2] border-r border-[#E8E8E8] h-screen fixed left-[92px] top-0 z-20">
      {renderContent()}
    </aside>
  );
};
