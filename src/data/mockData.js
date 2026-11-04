// Infera AI - Comprehensive Mock Data Store

export const currentUser = {
  name: "Rohit Sharma",
  email: "rohit.sharma@acme.corp",
  role: "Senior Product Strategist",
  department: "Product & Strategy",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256",
  initials: "RS",
  workspace: {
    id: "ws-acme-corp",
    name: "Acme Corporation",
    plan: "Enterprise Knowledge Base",
    totalDocuments: 116,
    accessibleFolders: 5,
    lastSync: "Today at 09:30 AM",
    aiModel: "Infera Neural 3.5 (Verified Citations)"
  },
  preferences: {
    emailDigest: true,
    citationsDrawerOpen: true,
    fontSize: "medium",
    autoScrollReader: true
  }
};

export const folderCategories = [
  {
    id: "hr",
    name: "Human Resources",
    description: "Employee handbooks, benefits, PTO, leave policies and compensation guides.",
    documentCount: 42,
    icon: "Users",
    color: "#294B3B",
    subcategories: ["Benefits & Health", "Leave & Attendance", "Onboarding", "Performance Rubrics"]
  },
  {
    id: "tech",
    name: "Technology & Systems",
    description: "IT support runbooks, architecture RFCs, SSO access & security protocols.",
    documentCount: 28,
    icon: "Cpu",
    color: "#202C26",
    subcategories: ["IT Support", "Hardware Security", "Infrastructure Specs", "API Guidelines"]
  },
  {
    id: "finance",
    name: "Finance & Accounting",
    description: "Expense reimbursement policies, travel budgets, procurement rules and invoicing.",
    documentCount: 19,
    icon: "Receipt",
    color: "#C98769",
    subcategories: ["Expense Reports", "Travel Per Diem", "Vendor Approvals", "Corporate Card"]
  },
  {
    id: "operations",
    name: "Operations & Facilities",
    description: "Office access protocols, ergonomic setups, workplace safety & logistics.",
    documentCount: 15,
    icon: "Building2",
    color: "#4A6B5D",
    subcategories: ["Building Badges", "Desk Reservations", "Safety & Emergency", "Shipping"]
  },
  {
    id: "governance",
    name: "General Policies & Ethics",
    description: "Corporate code of conduct, whistleblower guidelines, intellectual property & NDAs.",
    documentCount: 12,
    icon: "ShieldCheck",
    color: "#607267",
    subcategories: ["Code of Conduct", "Whistleblower", "Data Privacy", "IP Rights"]
  }
];

export const documentsList = [
  {
    id: "doc-hr-01",
    title: "Annual Leave & PTO Reference Guide 2026",
    filename: "Annual-Leave-&-PTO-Reference.pdf",
    folderId: "hr",
    folderName: "Human Resources",
    fileType: "PDF",
    fileSize: "920 KB",
    pagesCount: 14,
    lastUpdated: "Nov 3, 2026",
    lastAccessed: "2 hours ago",
    featuredExcerpt: "Full-time employees are entitled to 24 paid leaves per calendar year, accruing at 2.0 days per calendar month of active service.",
    hasHighlights: true,
    citedInThreads: ["conv-01"],
    author: "Global People Operations",
    version: "v3.2"
  },
  {
    id: "doc-fin-01",
    title: "Expense & Travel Reimbursement Policy v4",
    filename: "Expense-Reimbursement-Policy-v4.pdf",
    folderId: "finance",
    folderName: "Finance & Accounting",
    fileType: "PDF",
    fileSize: "1.8 MB",
    pagesCount: 18,
    lastUpdated: "Oct 28, 2026",
    lastAccessed: "Yesterday",
    featuredExcerpt: "All travel and out-of-pocket business expenses over $50 require itemized tax invoices submitted via the Infera Finance portal within 30 days.",
    hasHighlights: true,
    citedInThreads: ["conv-02"],
    author: "Finance & Treasury Council",
    version: "v4.0"
  },
  {
    id: "doc-hr-02",
    title: "Remote Work & Ergonomic Stipend Guidelines",
    filename: "Remote-Work-Guidelines-2026.docx",
    folderId: "hr",
    folderName: "Human Resources",
    fileType: "DOCX",
    fileSize: "850 KB",
    pagesCount: 12,
    lastUpdated: "Nov 1, 2026",
    lastAccessed: "3 days ago",
    featuredExcerpt: "Core collaboration hours are 10:00 AM to 4:00 PM local time. One-time home office setup grant of $1,500 renewed every 2 years.",
    hasHighlights: false,
    citedInThreads: ["conv-04"],
    author: "Workplace Experience Team",
    version: "v2.1"
  },
  {
    id: "doc-tech-01",
    title: "IT Security & Hardware Access Protocols",
    filename: "IT-Security-&-Access-Protocols.pdf",
    folderId: "tech",
    folderName: "Technology & Systems",
    fileType: "PDF",
    fileSize: "3.1 MB",
    pagesCount: 42,
    lastUpdated: "Sep 14, 2026",
    lastAccessed: "Oct 30, 2026",
    featuredExcerpt: "Mandatory hardware security key enforcement for internal SSO. Contact it-helpdesk@infera.internal for emergency biometric bypass.",
    hasHighlights: true,
    citedInThreads: ["conv-03"],
    author: "InfoSec & Compliance",
    version: "v5.0"
  },
  {
    id: "doc-ops-01",
    title: "Corporate Travel & Hotel Booking Standard",
    filename: "Travel-&-Lodging-Rules.pdf",
    folderId: "operations",
    folderName: "Operations & Facilities",
    fileType: "PDF",
    fileSize: "1.2 MB",
    pagesCount: 24,
    lastUpdated: "Aug 19, 2026",
    lastAccessed: "Oct 15, 2026",
    featuredExcerpt: "Flights over 6 continuous hours qualify for premium economy. Hotel nightly rates are capped per metropolitan tier schedule.",
    hasHighlights: false,
    citedInThreads: [],
    author: "Corporate Facilities",
    version: "v1.8"
  },
  {
    id: "doc-hr-03",
    title: "Comprehensive Employee Handbook 2026",
    filename: "HR-2026-Employee-Handbook.pdf",
    folderId: "hr",
    folderName: "Human Resources",
    fileType: "PDF",
    fileSize: "4.2 MB",
    pagesCount: 64,
    lastUpdated: "Oct 02, 2026",
    lastAccessed: "Oct 22, 2026",
    featuredExcerpt: "The complete guide to organizational values, performance evaluation cycles, parental leave, career development paths and benefits.",
    hasHighlights: true,
    citedInThreads: ["conv-01"],
    author: "People & Culture Council",
    version: "v6.0"
  },
  {
    id: "doc-tech-02",
    title: "Microservices Architecture RFC & Standards",
    filename: "Engineering-Architecture-RFC.pdf",
    folderId: "tech",
    folderName: "Technology & Systems",
    fileType: "PDF",
    fileSize: "5.6 MB",
    pagesCount: 52,
    lastUpdated: "Oct 12, 2026",
    lastAccessed: "Oct 18, 2026",
    featuredExcerpt: "Zero-trust service mesh networking specs, Kafka event schema evolution, and deployment canary threshold criteria.",
    hasHighlights: false,
    citedInThreads: [],
    author: "Staff Architecture Board",
    version: "v2.0"
  },
  {
    id: "doc-gov-01",
    title: "Global Code of Business Conduct & Ethics",
    filename: "Code-of-Conduct-&-Ethics.txt",
    folderId: "governance",
    folderName: "General Policies & Ethics",
    fileType: "TXT",
    fileSize: "240 KB",
    pagesCount: 8,
    lastUpdated: "Jun 15, 2026",
    lastAccessed: "Sep 05, 2026",
    featuredExcerpt: "Standards for ethical conduct, anti-bribery measures, conflicts of interest disclosure, and whistleblower protections.",
    hasHighlights: false,
    citedInThreads: [],
    author: "Legal & Governance",
    version: "v1.4"
  }
];

export const suggestedInquiries = [
  {
    category: "Leave & Benefits",
    query: "How many paid leaves can employees take annually?",
    icon: "Calendar"
  },
  {
    category: "Finance & Travel",
    query: "What is the policy and limit for meal reimbursement during business trips?",
    icon: "Receipt"
  },
  {
    category: "Remote Work",
    query: "What are the work-from-home guidelines and ergonomic allowance?",
    icon: "Home"
  },
  {
    category: "IT & Access",
    query: "How do I request a replacement hardware security key or VPN token?",
    icon: "Key"
  }
];

// Realistic Sample Multi-Page Reader Content for Annual-Leave-&-PTO-Reference.pdf
export const readerSampleDocument = {
  id: "doc-hr-01",
  title: "Annual Leave & PTO Reference Guide 2026",
  filename: "Annual-Leave-&-PTO-Reference.pdf",
  totalPages: 14,
  defaultPage: 12, // The cited page from the AI Assistant
  pages: {
    10: {
      pageNumber: 10,
      chapter: "Section 3: Public Holidays and Regional Observances",
      content: `
# Section 3.2: Mandatory and Floating Holidays

In addition to earned annual leave, Acme Corporation observes 11 statutory public holidays tailored to each regional entity's operational calendar.

### Floating Cultural Days
Employees are granted two (2) additional Floating Cultural Days per calendar year. These days may be utilized for cultural, religious, or personal observances not recognized on the general regional calendar. Floating days must be scheduled at least two weeks in advance through the People Operations self-service portal.

### Weekend Observance Rule
Whenever a recognized statutory holiday falls on a Saturday or Sunday, the preceding Friday or following Monday shall be deemed the designated corporate holiday, as published annually in the Corporate Almanac.
      `
    },
    11: {
      pageNumber: 11,
      chapter: "Section 4: Paid Time Off (PTO) Mechanics",
      content: `
# Section 4.1: Accrual Schedules and Eligibility

All regular full-time team members begin accruing annual leave from their official first date of employment. Leave accrual runs continuously through approved periods of standard work and paid medical leave.

### Probationary Periods
While leave begins accruing on Day 1, employees in their initial 90-day onboarding period are encouraged to discuss anticipated time off with their team lead prior to formal booking.

### Part-Time and Contractor Pro-Rata Calculations
Employees working fewer than 40 standard hours per week receive leave allotments pro-rated to their agreed weekly contractual commitment, calculated against the standard 24-day baseline.
      `
    },
    12: {
      pageNumber: 12,
      chapter: "Section 4: Paid Time Off (PTO) Mechanics",
      highlightId: "highlight-annual-leave",
      highlightTitle: "Cited by Infera AI: Section 4.2 Annual Leave Policy",
      highlightSnippet: "Employees are entitled to 24 paid leaves per calendar year, accruing at 2.0 days per calendar month of active service. Unused leaves up to 8 days can be carried forward into the next calendar year.",
      content: `
# Section 4.2: Annual Leave Policy & Accrual Rules

### Baseline Entitlement
Full-time permanent employees are entitled to **24 paid leaves per calendar year**, accruing at the rate of **2.0 days per calendar month** of active service. Accruals post automatically on the last calendar day of each pay period.

### Rollover and Carry-Forward Provisions
Employees are actively encouraged to rest and recharge throughout the year. However, in situations where operational priorities restrict planned vacations:
- **Maximum Carryover**: Up to **8 unused paid leave days** may be carried forward into the subsequent calendar year.
- **Expiration Threshold**: Any carried-forward days must be utilized before June 30th of the following year, after which unused surplus days forfeit automatically.
- **Exceptions**: Exceptions require written authorization from the Department Head and Chief People Officer prior to December 15th.

### Notice Periods for Planned Absences
To ensure balanced coverage across customer-facing and product delivery operations:
- Absences of 1–2 consecutive days: Minimum 48 hours notice.
- Absences of 3–5 consecutive days: Minimum 10 business days notice.
- Extended leaves exceeding 5 days: Minimum 4 weeks advance notice via BambooHR/Workday.
      `
    },
    13: {
      pageNumber: 13,
      chapter: "Section 5: Parental & Compassionate Leave",
      content: `
# Section 5.1: Primary and Secondary Caregiver Leave

Acme Corporation believes in supporting expanding families with compassionate, gender-neutral parental leave benefits.

### Parental Leave Allotment
- **Primary Caregivers**: Eligible for up to 18 weeks of fully paid parental leave following the birth, adoption, or foster placement of a child.
- **Secondary Caregivers**: Eligible for up to 6 weeks of fully paid leave, which may be taken consecutively or split across the child's first calendar year.

### Health and Medical Coverage
All corporate health, dental, and life insurance benefits remain active and fully paid by the organization throughout approved caregiver leaves.
      `
    },
    14: {
      pageNumber: 14,
      chapter: "Section 6: Document Revision Log & Sign-Offs",
      content: `
# Document Sign-Off & Approvals

| Version | Effective Date | Prepared By | Approved By | Notes |
|---|---|---|---|---|
| v3.0 | Jan 1, 2025 | People Ops | Legal Council | Annual baseline review |
| v3.1 | Jun 10, 2025 | Benefits Lead | CPO | Added floating cultural days |
| v3.2 | Nov 3, 2026 | Global HR Team | Executive Committee | Updated carryover rules to 8 days |

For questions regarding this document or to request special accommodations, please contact **people-support@acme.corp** or start an inquiry in Infera AI.
      `
    }
  }
};
