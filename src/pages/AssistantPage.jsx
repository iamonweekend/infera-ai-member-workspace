import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Send, 
  CornerDownLeft, 
  Copy, 
  ThumbsUp, 
  ThumbsDown, 
  FileText, 
  ExternalLink, 
  RefreshCw, 
  AlertCircle, 
  ShieldCheck, 
  BookOpen, 
  ChevronRight,
  Info
} from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { suggestedInquiries } from '../data/mockData';
import { initialConversations } from '../data/mockConversations';

export const AssistantPage = ({ 
  initialConversationId = 'conv-01',
  initialPrompt = '',
  onOpenSourceInspector,
  onOpenDocumentReader,
  onShowToast
}) => {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConvId, setActiveConvId] = useState(initialConversationId);
  const [inputText, setInputText] = useState(initialPrompt || '');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [demoStateMode, setDemoStateMode] = useState('normal'); // 'normal', 'loading', 'empty_info', 'error'
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Sync with initialConversationId if changed from parent
  useEffect(() => {
    if (initialConversationId) {
      setActiveConvId(initialConversationId);
    }
  }, [initialConversationId]);

  const activeConversation = conversations.find(c => c.id === activeConvId) || conversations[0];

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleAskQuestion(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages, isStreaming, streamingText]);

  const handleAskQuestion = (questionText) => {
    const query = questionText || inputText;
    if (!query.trim() || isStreaming) return;

    // Add user message
    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    const updatedMessages = [...(activeConversation?.messages || []), userMsg];
    
    // Update conversation title if first message
    const isFirstMsg = (!activeConversation?.messages || activeConversation.messages.length === 0);
    const newTitle = isFirstMsg ? (query.length > 40 ? query.substring(0, 40) + '...' : query) : activeConversation.title;

    setConversations(prev => prev.map(c => {
      if (c.id === activeConvId) {
        return {
          ...c,
          title: newTitle,
          lastUpdated: 'Just now',
          preview: query,
          messages: updatedMessages
        };
      }
      return c;
    }));

    setInputText('');

    // Handle mock state modes
    if (demoStateMode === 'empty_info' || query.toLowerCase().includes('stock market') || query.toLowerCase().includes('weather')) {
      simulateEmptyInfoResponse(updatedMessages);
      return;
    }

    if (demoStateMode === 'error') {
      simulateErrorResponse(updatedMessages);
      return;
    }

    simulateStreamingAnswer(query, updatedMessages);
  };

  const simulateStreamingAnswer = (query, currentMessages) => {
    setIsStreaming(true);
    setStreamingText('');

    let targetAnswer = "";
    let targetSources = [];

    const lower = query.toLowerCase();
    if (lower.includes('leave') || lower.includes('pto') || lower.includes('vacation')) {
      targetAnswer = `Employees are entitled to **24 paid leaves per calendar year**, according to the organization's official HR policy.

Specific provisions from the verified guide:
- **Monthly Accrual Rate**: Paid time off accrues at **2.0 days per calendar month** of active service, credited on the final calendar day of each pay cycle.
- **Carryover Allowance**: A maximum of **up to 8 unused leave days** may be carried forward into the subsequent calendar year.
- **Carryover Expiration**: Any carried-over days must be utilized prior to **June 30th** of the following year, after which unused carryover days automatically expire.
- **Advance Booking Guidelines**: Planned absences exceeding 5 consecutive days require at least 4 weeks advance submission through the self-service HR portal.`;

      targetSources = [
        {
          docId: "doc-hr-01",
          title: "Annual Leave & PTO Reference Guide 2026",
          filename: "Annual-Leave-&-PTO-Reference.pdf",
          fileType: "PDF",
          page: 12,
          section: "Section 4.2: Annual Leave Policy & Accrual Rules",
          snippet: "Full-time permanent employees are entitled to 24 paid leaves per calendar year, accruing at the rate of 2.0 days per calendar month of active service. Maximum Carryover: Up to 8 unused paid leave days may be carried forward into the subsequent calendar year.",
          relevanceScore: "98% Match"
        },
        {
          docId: "doc-hr-03",
          title: "Comprehensive Employee Handbook 2026",
          filename: "HR-2026-Employee-Handbook.pdf",
          fileType: "PDF",
          page: 28,
          section: "Section 3.1: Leave Entitlements",
          snippet: "Statutory leave balances are audited quarterly. Carried-over PTO is deducted first prior to drawing from current calendar year balance.",
          relevanceScore: "92% Match"
        }
      ];
    } else if (lower.includes('reimburse') || lower.includes('expense') || lower.includes('travel') || lower.includes('meal')) {
      targetAnswer = `Under the **Corporate Travel & Expense Reimbursement Policy v4**, business expenditures follow strict compliance guidelines:

1. **Receipt Mandate**:
   - Itemized receipts are mandatory for any business or meal transaction exceeding **$50 USD** (summary card charge slips are not accepted).

2. **Per Diem Daily Caps**:
   - **$110 USD / day** for Tier 1 metropolitan areas (San Francisco, New York, London, Tokyo).
   - **$85 USD / day** for regional hubs.

3. **Submission Window**:
   - Expense claims must be filed via the Infera Finance portal within **30 calendar days** of the transaction date.`;

      targetSources = [
        {
          docId: "doc-fin-01",
          title: "Expense & Travel Reimbursement Policy v4",
          filename: "Expense-Reimbursement-Policy-v4.pdf",
          fileType: "PDF",
          page: 5,
          section: "Section 2.1: Meal Documentation & Caps",
          snippet: "Itemized receipts are mandatory for any meal expense over $50. Daily per diem caps are strictly enforced based on destination metropolitan tier index.",
          relevanceScore: "96% Match"
        }
      ];
    } else {
      targetAnswer = `Based on your organisation's indexed documentation:

- The requested policy is governed under corporate operational guidelines.
- Workday and BambooHR reflect live balances and direct workflow approvals.
- All requests must be routed through your direct department supervisor prior to formal commitment.

You can inspect the exact source passages referenced below to review specific operational constraints.`;

      targetSources = [
        {
          docId: "doc-hr-01",
          title: "Annual Leave & PTO Reference Guide 2026",
          filename: "Annual-Leave-&-PTO-Reference.pdf",
          fileType: "PDF",
          page: 12,
          section: "Section 4.2: Corporate Guidelines",
          snippet: "Employees should review departmental operational requirements prior to submitting formal requests.",
          relevanceScore: "89% Match"
        }
      ];
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex += 7;
      if (currentIndex >= targetAnswer.length) {
        clearInterval(interval);
        setIsStreaming(false);
        setStreamingText('');

        const assistantMsg = {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          text: targetAnswer,
          timestamp: 'Just now',
          sources: targetSources,
          feedback: null
        };

        setConversations(prev => prev.map(c => {
          if (c.id === activeConvId) {
            return {
              ...c,
              messages: [...currentMessages, assistantMsg]
            };
          }
          return c;
        }));
      } else {
        setStreamingText(targetAnswer.substring(0, currentIndex));
      }
    }, 22);
  };

  const simulateEmptyInfoResponse = (currentMessages) => {
    setIsStreaming(true);
    setTimeout(() => {
      setIsStreaming(false);
      const emptyMsg = {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        isInsufficientInfo: true,
        text: `**No relevant information found in workspace documents.**\n\nInfera AI searched across all 116 verified documents and 5 accessible folders, but could not find verified citations to answer your inquiry with high confidence.\n\n**Suggestions:**\n- Rephrase your query with alternative keywords.\n- Check if the relevant document is stored in a folder you do not have permission to view.\n- Contact your workspace administrator to request document upload.`,
        timestamp: 'Just now',
        sources: []
      };

      setConversations(prev => prev.map(c => {
        if (c.id === activeConvId) {
          return {
            ...c,
            messages: [...currentMessages, emptyMsg]
          };
        }
        return c;
      }));
    }, 1000);
  };

  const simulateErrorResponse = (currentMessages) => {
    setIsStreaming(true);
    setTimeout(() => {
      setIsStreaming(false);
      const errorMsg = {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        isError: true,
        text: `**Connection timeout while querying neural vector index.**\n\nAn unexpected network interruption occurred while retrieving semantic vectors from your knowledge cluster. Please try resending your inquiry.`,
        timestamp: 'Just now',
        sources: []
      };

      setConversations(prev => prev.map(c => {
        if (c.id === activeConvId) {
          return {
            ...c,
            messages: [...currentMessages, errorMsg]
          };
        }
        return c;
      }));
    }, 800);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    if (onShowToast) onShowToast("Response copied to clipboard");
  };

  const handleFeedback = (msgId, type) => {
    setConversations(prev => prev.map(c => {
      if (c.id === activeConvId) {
        return {
          ...c,
          messages: c.messages.map(m => {
            if (m.id === msgId) {
              return { ...m, feedback: m.feedback === type ? null : type };
            }
            return m;
          })
        };
      }
      return c;
    }));
    if (onShowToast) {
      onShowToast(type === 'helpful' ? "Marked as helpful" : "Feedback noted for model tuning");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7.5rem)]">
      {/* 1. Header */}
      <div className="pb-4 border-b border-[#E8E8E8] flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-manrope font-bold text-[#202124] tracking-tight">
            Your Knowledge Assistant
          </h1>
          <p className="text-xs font-inter text-[#85898D] mt-0.5">
            Find answers across your organisation's knowledge with exact citations.
          </p>
        </div>

        {/* State Simulator Controls (for testing states) */}
        <div className="hidden sm:flex items-center gap-1.5 bg-[#F0F1F2] p-1 rounded-lg border border-[#E8E8E8] text-[11px] font-inter">
          <span className="text-[#85898D] px-1.5 font-medium">Test State:</span>
          <button
            onClick={() => setDemoStateMode('normal')}
            className={`px-2 py-0.5 rounded cursor-pointer ${demoStateMode === 'normal' ? 'bg-white text-[#202124] font-semibold shadow-2xs' : 'text-[#85898D]'}`}
          >
            Verified
          </button>
          <button
            onClick={() => setDemoStateMode('empty_info')}
            className={`px-2 py-0.5 rounded cursor-pointer ${demoStateMode === 'empty_info' ? 'bg-white text-[#202124] font-semibold shadow-2xs' : 'text-[#85898D]'}`}
          >
            No Info
          </button>
          <button
            onClick={() => setDemoStateMode('error')}
            className={`px-2 py-0.5 rounded cursor-pointer ${demoStateMode === 'error' ? 'bg-white text-red-700 font-semibold shadow-2xs' : 'text-[#85898D]'}`}
          >
            Error
          </button>
        </div>
      </div>

      {/* 2. Messages Flow Area */}
      <div className="flex-1 overflow-y-auto py-6 space-y-6 pr-2">
        {(!activeConversation?.messages || activeConversation.messages.length === 0) ? (
          /* Empty State */
          <div className="max-w-xl mx-auto py-12 text-center space-y-6">
            <div className="w-12 h-12 rounded-xl bg-[#F0F1F2] border border-[#E8E8E8] flex items-center justify-center mx-auto text-[#171717]">
              <Sparkles size={22} />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-manrope font-bold text-[#202124] tracking-tight">
                What would you like to understand today?
              </h2>
              <p className="text-xs sm:text-sm text-[#85898D] font-inter max-w-md mx-auto">
                Ask questions about your organisation's documents and get answers grounded in verified sources.
              </p>
            </div>

            {/* Suggested Question Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left pt-2">
              {suggestedInquiries.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleAskQuestion(item.query)}
                  className="p-3.5 rounded-lg border border-[#E8E8E8] hover:border-[#171717] bg-white transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <span className="text-[10px] font-mono uppercase text-[#85898D]">
                    {item.category}
                  </span>
                  <p className="text-xs font-inter font-medium text-[#202124] mt-1 group-hover:text-[#171717]">
                    "{item.query}"
                  </p>
                  <span className="text-[11px] text-[#526D5C] font-medium pt-2 mt-2 border-t border-[#F0F1F2] flex items-center gap-1">
                    <span>Ask this question</span>
                    <ChevronRight size={12} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Active Chat Stream */
          <div className="space-y-6 max-w-3xl mx-auto">
            {activeConversation.messages.map((message) => {
              const isUser = message.sender === 'user';
              return (
                <div key={message.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  {isUser ? (
                    /* User message */
                    <div className="max-w-xl bg-[#171717] text-white px-4 py-2.5 rounded-xl rounded-tr-xs text-xs sm:text-sm font-inter">
                      <p>{message.text}</p>
                      <span className="text-[10px] text-[#888888] block text-right mt-1">
                        {message.timestamp}
                      </span>
                    </div>
                  ) : (
                    /* AI Assistant Response Card */
                    <div className="w-full bg-white border border-[#E8E8E8] rounded-xl p-5 space-y-4">
                      {/* Top status */}
                      <div className="flex items-center justify-between border-b border-[#F0F1F2] pb-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded bg-[#171717] text-white flex items-center justify-center">
                            <Sparkles size={11} />
                          </div>
                          <span className="text-xs font-inter font-semibold text-[#202124]">
                            Infera AI
                          </span>
                          <span className="text-[10px] font-medium bg-[#EAF0EB] text-[#526D5C] px-1.5 py-0.2 rounded">
                            Verified Citation
                          </span>
                        </div>
                        <span className="text-[11px] text-[#85898D]">
                          {message.timestamp}
                        </span>
                      </div>

                      {/* Content */}
                      {message.isInsufficientInfo ? (
                        <div className="p-3.5 rounded-lg bg-[#F7F7F7] border border-[#E8E8E8] space-y-2">
                          <div className="flex items-center gap-2 text-[#202124] font-semibold text-xs">
                            <AlertCircle size={15} className="text-[#85898D]" />
                            <span>No Sufficient Evidence Found</span>
                          </div>
                          <div className="text-xs text-[#85898D] whitespace-pre-line leading-relaxed">
                            {message.text}
                          </div>
                        </div>
                      ) : message.isError ? (
                        <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 space-y-2">
                          <div className="flex items-center gap-2 text-red-800 font-semibold text-xs">
                            <AlertCircle size={15} />
                            <span>Query Error</span>
                          </div>
                          <div className="text-xs text-red-700 whitespace-pre-line leading-relaxed">
                            {message.text}
                          </div>
                          <button 
                            onClick={() => simulateStreamingAnswer("Retry last query", activeConversation.messages)}
                            className="btn-outline-neutral text-xs mt-1"
                          >
                            <RefreshCw size={12} />
                            <span>Retry</span>
                          </button>
                        </div>
                      ) : (
                        <div className="text-xs sm:text-sm font-inter text-[#202124] leading-relaxed whitespace-pre-line space-y-2">
                          {message.text}
                        </div>
                      )}

                      {/* Source Citation Cards */}
                      {message.sources && message.sources.length > 0 && (
                        <div className="pt-3 border-t border-[#F0F1F2] space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-inter font-semibold uppercase tracking-wider text-[#85898D]">
                              Source References ({message.sources.length})
                            </span>
                            <span className="text-[11px] text-[#85898D]">
                              Grounded in indexed manuals
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {message.sources.map((src, idx) => (
                              <div
                                key={idx}
                                className="p-3 rounded-lg bg-[#F0F1F2] border border-[#E8E8E8] hover:border-[#171717] transition-all flex flex-col justify-between"
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-mono font-bold bg-white text-[#202124] px-1.5 py-0.2 rounded border border-[#E8E8E8]">
                                      {src.fileType} • Page {src.page}
                                    </span>
                                    <span className="text-[10px] text-[#526D5C] font-semibold">
                                      {src.relevanceScore}
                                    </span>
                                  </div>
                                  <h4 className="text-xs font-inter font-semibold text-[#202124] truncate">
                                    {src.filename}
                                  </h4>
                                  <p className="text-[11px] text-[#85898D] line-clamp-1">
                                    {src.section}
                                  </p>
                                </div>

                                <div className="pt-2 mt-2 border-t border-[#E2E4E6] flex items-center justify-between">
                                  <button
                                    onClick={() => onOpenSourceInspector(src)}
                                    className="text-[11px] font-inter font-semibold text-[#171717] hover:underline flex items-center gap-1 cursor-pointer"
                                  >
                                    <span>View Source</span>
                                    <ExternalLink size={10} />
                                  </button>
                                  <button
                                    onClick={() => onOpenDocumentReader(src.docId, src.page)}
                                    className="text-[11px] font-inter text-[#85898D] hover:text-[#202124] flex items-center gap-1 cursor-pointer"
                                  >
                                    <BookOpen size={10} />
                                    <span>Open Page {src.page}</span>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* AI Response Actions: Copy, Helpful, Not Helpful */}
                      <div className="pt-2.5 border-t border-[#F0F1F2] flex items-center justify-between text-xs text-[#85898D]">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleFeedback(message.id, 'helpful')}
                            className={`p-1.5 rounded hover:bg-[#F0F1F2] transition-colors cursor-pointer ${message.feedback === 'helpful' ? 'text-[#526D5C] font-semibold' : ''}`}
                            title="Helpful"
                          >
                            <ThumbsUp size={13} />
                          </button>
                          <button
                            onClick={() => handleFeedback(message.id, 'unhelpful')}
                            className={`p-1.5 rounded hover:bg-[#F0F1F2] transition-colors cursor-pointer ${message.feedback === 'unhelpful' ? 'text-red-600 font-semibold' : ''}`}
                            title="Not Helpful"
                          >
                            <ThumbsDown size={13} />
                          </button>
                        </div>

                        <button
                          onClick={() => handleCopy(message.text)}
                          className="flex items-center gap-1 hover:text-[#202124] transition-colors cursor-pointer"
                        >
                          <Copy size={12} />
                          <span>Copy</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Streaming Typing Indicator */}
            {isStreaming && (
              <div className="w-full bg-white border border-[#D6D6D6] rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#526D5C] animate-pulse" />
                  <span className="text-xs font-inter font-semibold text-[#202124]">
                    Infera AI synthesizing answer...
                  </span>
                </div>

                {streamingText ? (
                  <div className="text-xs sm:text-sm font-inter text-[#202124] leading-relaxed whitespace-pre-line">
                    {streamingText}
                    <span className="inline-block w-1.5 h-3 bg-[#171717] ml-0.5 animate-pulse" />
                  </div>
                ) : (
                  <div className="space-y-2 py-1">
                    <div className="h-3.5 w-3/4 rounded skeleton-shimmer" />
                    <div className="h-3.5 w-5/6 rounded skeleton-shimmer" />
                    <div className="h-3.5 w-1/2 rounded skeleton-shimmer" />
                  </div>
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* 3. Bottom Clean Chat Composer */}
      <div className="pt-3 border-t border-[#E8E8E8]">
        <div className="max-w-3xl mx-auto space-y-2">
          <div className="relative bg-white rounded-xl border border-[#D6D6D6] focus-within:border-[#171717] focus-within:ring-1 focus-within:ring-[#171717] transition-all p-2.5">
            <textarea
              ref={inputRef}
              rows={2}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAskQuestion();
                }
              }}
              placeholder="Ask anything about your organisation's documents..."
              className="w-full resize-none bg-transparent p-1.5 text-xs sm:text-sm font-inter text-[#202124] placeholder-[#85898D] focus:outline-hidden"
            />

            <div className="flex items-center justify-between pt-1 border-t border-[#F0F1F2] px-1 text-xs">
              <span className="text-[11px] text-[#85898D]">
                Press <kbd className="px-1 py-0.2 bg-[#F0F1F2] border border-[#D6D6D6] rounded text-[10px]">↵ Enter</kbd> to submit
              </span>

              <button
                onClick={() => handleAskQuestion()}
                disabled={!inputText.trim() || isStreaming}
                className={`
                  px-3.5 py-1.5 rounded-md text-xs font-inter font-medium transition-all flex items-center gap-1.5 cursor-pointer
                  ${inputText.trim() && !isStreaming
                    ? 'bg-[#171717] text-white hover:bg-[#262626]'
                    : 'bg-[#F0F1F2] text-[#85898D] cursor-not-allowed'
                  }
                `}
              >
                <span>Send</span>
                <Send size={12} />
              </button>
            </div>
          </div>

          <p className="text-[11px] text-center text-[#85898D]">
            Answers are grounded in authenticated corporate documents. Verify citations before acting.
          </p>
        </div>
      </div>
    </div>
  );
};
