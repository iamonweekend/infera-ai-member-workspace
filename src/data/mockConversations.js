// Infera AI - Past Research Conversations Store

export const initialConversations = [
  {
    id: "conv-01",
    title: "Annual leave entitlement and carryover rules",
    group: "Today",
    lastUpdated: "Just now",
    timestamp: "10:45 AM",
    folder: "Human Resources",
    messageCount: 2,
    preview: "Employees are entitled to 24 paid leaves per calendar year, according to the organisation's HR policy...",
    messages: [
      {
        id: "msg-1",
        sender: "user",
        text: "How many paid leaves can employees take annually, and can I carry over unused days to next year?",
        timestamp: "10:44 AM"
      },
      {
        id: "msg-2",
        sender: "assistant",
        text: `Employees are entitled to **24 paid leaves per calendar year**, according to the organization's official HR policy.

Here are the specific accrual and rollover provisions:

- **Monthly Accrual Rate**: Paid time off accrues at **2.0 days per calendar month** of active service, credited on the final calendar day of each pay cycle.
- **Carryover Allowance**: A maximum of **up to 8 unused leave days** may be carried forward into the subsequent calendar year.
- **Carryover Expiration**: Any carried-over days must be utilized prior to **June 30th** of the following year, after which unused carryover days automatically expire.
- **Advance Booking Guidelines**: Planned absences exceeding 5 consecutive days require at least 4 weeks advance submission through the self-service HR portal.`,
        timestamp: "10:45 AM",
        sources: [
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
            section: "Section 3.1: Paid Time Off Entitlements",
            snippet: "Statutory leave balances are audited quarterly. Carried-over PTO is deducted first prior to drawing from the current calendar year's newly accrued balance.",
            relevanceScore: "92% Match"
          }
        ],
        feedback: "helpful",
        copied: false
      }
    ]
  },
  {
    id: "conv-02",
    title: "Travel expense reimbursement receipt requirements",
    group: "Yesterday",
    lastUpdated: "Yesterday at 4:15 PM",
    timestamp: "Yesterday",
    folder: "Finance & Accounting",
    messageCount: 4,
    preview: "All travel and out-of-pocket business expenses over $50 require itemized tax invoices submitted within 30 days...",
    messages: [
      {
        id: "msg-201",
        sender: "user",
        text: "What receipts do I need to keep for meals during client visits, and what is the per diem limit?",
        timestamp: "Yesterday, 4:12 PM"
      },
      {
        id: "msg-202",
        sender: "assistant",
        text: `According to the **Corporate Travel & Expense Reimbursement Policy v4**, business meals during approved client visits follow these requirements:

1. **Itemized Receipts Required**:
   - Any transaction exceeding **$50 USD** (or local equivalent) requires a detailed, itemized receipt showing individual menu items, tax, and tip.
   - Credit card summary slips with only the total amount are not acceptable under finance audit guidelines.

2. **Daily Meal Allowance Caps**:
   - **Tier 1 Cities** (e.g., New York, London, Tokyo, San Francisco): **$110 USD / day**
   - **Tier 2 Cities** & Regional hubs: **$85 USD / day**

3. **Filing Window**:
   - Expense reports must be submitted through the Infera Finance portal within **30 calendar days** of the expenditure.`,
        timestamp: "Yesterday, 4:15 PM",
        sources: [
          {
            docId: "doc-fin-01",
            title: "Expense & Travel Reimbursement Policy v4",
            filename: "Expense-Reimbursement-Policy-v4.pdf",
            fileType: "PDF",
            page: 5,
            section: "Section 2.1: Business Meal Documentation & Caps",
            snippet: "Itemized receipts are mandatory for any meal expense over $50. Daily per diem caps are enforced based on destination metropolitan tier index.",
            relevanceScore: "96% Match"
          }
        ],
        feedback: null,
        copied: false
      }
    ]
  },
  {
    id: "conv-03",
    title: "Hardware security key (YubiKey) setup & replacement",
    group: "Previous 7 Days",
    lastUpdated: "Oct 29, 2026",
    timestamp: "Oct 29",
    folder: "Technology & Systems",
    messageCount: 2,
    preview: "To replace a lost hardware security key, you must immediately contact the IT Service Desk to revoke credentials...",
    messages: [
      {
        id: "msg-301",
        sender: "user",
        text: "I misplaced my physical security key while traveling. How can I regain access to corporate Slack and GitHub?",
        timestamp: "Oct 29, 11:20 AM"
      },
      {
        id: "msg-302",
        sender: "assistant",
        text: `If you have misplaced your corporate hardware security key (FIDO2 / YubiKey):

1. **Immediate Revocation**:
   - Call the **IT Emergency Access Hotline at +1 (800) 555-0199** immediately or submit a high-priority ticket from your registered backup phone via the IT self-service web portal.
   - InfoSec will revoke the lost key's certificate within 15 minutes to prevent unauthorized perimeter access.

2. **Temporary Emergency Bypass**:
   - Your IT administrator will issue a **24-hour Temporary Access Pass (TAP)** after conducting video-identity verification with your direct manager.

3. **Replacement Hardware**:
   - A replacement pre-provisioned security key will be dispatched to your current location via express courier (next-business-day delivery).`,
        timestamp: "Oct 29, 11:22 AM",
        sources: [
          {
            docId: "doc-tech-01",
            title: "IT Security & Hardware Access Protocols",
            filename: "IT-Security-&-Access-Protocols.pdf",
            fileType: "PDF",
            page: 18,
            section: "Section 3.4: Lost or Compromised Security Tokens",
            snippet: "Lost hardware tokens require immediate certificate revocation. Emergency 24-hour bypass passes require secondary manager verification.",
            relevanceScore: "99% Match"
          }
        ],
        feedback: "helpful",
        copied: false
      }
    ]
  },
  {
    id: "conv-04",
    title: "Home office ergonomic stipend policy and allowances",
    group: "Previous 7 Days",
    lastUpdated: "Oct 26, 2026",
    timestamp: "Oct 26",
    folder: "Human Resources",
    messageCount: 2,
    preview: "Eligible hybrid and remote team members can claim up to $1,500 every two years for ergonomic desk equipment...",
    messages: [
      {
        id: "msg-401",
        sender: "user",
        text: "What items can be purchased using the remote work ergonomic setup stipend?",
        timestamp: "Oct 26, 3:40 PM"
      },
      {
        id: "msg-402",
        sender: "assistant",
        text: `Under the **Remote Work & Ergonomic Stipend Guidelines (2026)**, eligible remote and hybrid employees receive:

- **Allowance Amount**: **$1,500 USD** grant, renewed every **2 calendar years**.
- **Eligible Items**:
  - Ergonomic task chairs (e.g. Herman Miller, Steelcase)
  - Motorized sit-stand desks or desk converters
  - External monitors, monitor mounting arms, and docking stations
  - Ergonomic split keyboards, vertical mice, and wrist supports
  - Anti-fatigue floor mats and ambient desk illumination

*Note: General consumer electronics like tablets, smart speakers, or decorative furniture are not reimbursable under this grant.*`,
        timestamp: "Oct 26, 3:42 PM",
        sources: [
          {
            docId: "doc-hr-02",
            title: "Remote Work & Ergonomic Stipend Guidelines",
            filename: "Remote-Work-Guidelines-2026.docx",
            fileType: "DOCX",
            page: 7,
            section: "Section 2.3: Equipment Subsidy Eligibility Catalog",
            snippet: "Stipend of $1,500 every 24 months for authorized ergonomic office furniture and peripheral display systems.",
            relevanceScore: "95% Match"
          }
        ],
        feedback: null,
        copied: false
      }
    ]
  },
  {
    id: "conv-05",
    title: "Parental leave policy duration and benefits coverage",
    group: "Older",
    lastUpdated: "Oct 14, 2026",
    timestamp: "Oct 14",
    folder: "Human Resources",
    messageCount: 2,
    preview: "Primary caregivers are entitled to 18 weeks of fully paid leave, while secondary caregivers receive 6 weeks...",
    messages: [
      {
        id: "msg-501",
        sender: "user",
        text: "What is the duration of paid parental leave for new fathers and secondary caregivers?",
        timestamp: "Oct 14, 09:15 AM"
      },
      {
        id: "msg-502",
        sender: "assistant",
        text: `According to the **Annual Leave & PTO Reference Guide (Section 5.1)** and **Employee Handbook**:

- **Secondary Caregivers** (including fathers and non-gestational partners) are eligible for **6 weeks of fully paid parental leave**.
- This leave can be taken either consecutively or divided into up to two distinct blocks within the child's first 12 months.
- All corporate healthcare benefits, dental coverage, and equity vesting schedules continue without interruption during this period.`,
        timestamp: "Oct 14, 09:17 AM",
        sources: [
          {
            docId: "doc-hr-01",
            title: "Annual Leave & PTO Reference Guide 2026",
            filename: "Annual-Leave-&-PTO-Reference.pdf",
            fileType: "PDF",
            page: 13,
            section: "Section 5.1: Primary and Secondary Caregiver Leave",
            snippet: "Secondary caregivers receive up to 6 weeks of fully paid leave, which may be taken consecutively or split across the first year.",
            relevanceScore: "97% Match"
          }
        ],
        feedback: "helpful",
        copied: false
      }
    ]
  }
];
