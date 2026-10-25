export const navigation = [
  { id: "overview", label: "Overview", icon: "LayoutDashboard", group: "Workspace" },
  { id: "people", label: "People", icon: "UsersRound", group: "Workspace" },
  { id: "attendance", label: "Attendance", icon: "Clock3", group: "Workspace" },
  { id: "timeoff", label: "Request leave", icon: "CalendarDays", group: "Workspace" },
  { id: "pay", label: "Pay", icon: "WalletCards", group: "Company" },
  { id: "documents", label: "Documents", icon: "Files", group: "Company" },
  { id: "learning", label: "Learning", icon: "School", group: "Company" },
  { id: "support", label: "HR support", icon: "LifeBuoy", group: "Company" },
  { id: "organization", label: "Organization chart", icon: "AccountTree", group: "Company" },
];

export const employees = [
  // Engineering
  { id: "EMP001", name: "Akhil Reddy", role: "Associate Software Engineer", department: "Engineering", email: "akhil@example.com", status: "Active", joined: "Jun 12, 2025" },
  { id: "EMP004", name: "Kartik", role: "Software Engineer", department: "Engineering", email: "kartik@example.com", status: "On leave", joined: "Mar 21, 2025" },
  { id: "EMP007", name: "Bindu", role: "Engineering Manager", department: "Engineering", email: "suresh@example.com", status: "Active", joined: "Jan 15, 2022" },
  
  // People
  { id: "EMP002", name: "Swetha Reddy", role: "People Operations Lead", department: "People", email: "swetha@example.com", status: "Active", joined: "Jan 03, 2024" },
  
  // Finance
  { id: "EMP003", name: "Ashok Kumar", role: "Senior Accountant", department: "Finance", email: "ashok@example.com", status: "Active", joined: "Sep 17, 2023" },
  
  // Operations
  { id: "EMP005", name: "Praveen", role: "Operations Head", department: "Operations", email: "praveen@example.com", status: "Active", joined: "Feb 14, 2024" },
  
  // Design
  { id: "EMP006", name: "Vikram", role: "Product Designer", department: "Design", email: "vikram@example.com", status: "Active", joined: "Nov 06, 2024" },
];

export const leaveRequests = [
  { id: "LV-204", type: "Casual leave", start: "Oct 23, 2026", end: "Oct 23, 2026", days: 1, note: "Family appointment outside the city.", status: "Approved", requested: "Oct 02, 2026" },
  { id: "LV-203", type: "Sick leave", start: "Oct 15, 2026", end: "Oct 16, 2026", days: 2, note: "Recovering from a seasonal illness.", status: "Pending", requested: "Oct 09, 2026" },
  { id: "LV-198", type: "Casual leave", start: "Sep 04, 2026", end: "Sep 04, 2026", days: 1, note: "Personal errands.", status: "Approved", requested: "Aug 27, 2026" },
];

export const attendanceDays = [
  { day: "Mon", date: "Oct 05", hours: 8.2, label: "8h 12m" },
  { day: "Tue", date: "Oct 06", hours: 8.8, label: "8h 48m" },
  { day: "Wed", date: "Oct 07", hours: 7.6, label: "7h 36m" },
  { day: "Thu", date: "Oct 08", hours: 8.5, label: "8h 30m" },
  { day: "Fri", date: "Oct 09", hours: 7.9, label: "7h 54m" },
];

export const payslips = [
  { month: "September 2026", gross: 58333, deductions: 6200, net: 52133, status: "Paid" },
  { month: "August 2026", gross: 58333, deductions: 6200, net: 52133, status: "Paid" },
  { month: "July 2026", gross: 58333, deductions: 6200, net: 52133, status: "Paid" },
  { month: "June 2026", gross: 55000, deductions: 5800, net: 49200, status: "Paid" },
];

export const documents = [
  { name: "Employee handbook", category: "Policies", updated: "Updated Sep 12, 2026", description: "Workplace guidelines, benefits and company policies." },
  { name: "Remote work policy", category: "Policies", updated: "Updated Aug 28, 2026", description: "Guidelines for working remotely and requesting equipment." },
  { name: "Tax declaration form", category: "Payroll", updated: "Updated Apr 02, 2026", description: "Annual tax declaration and investment proof details." },
  { name: "Benefits overview", category: "Benefits", updated: "Updated Jan 15, 2026", description: "Health, wellbeing and employee benefit information." },
];

export const holidays = [
  { name: "Diwali", date: "Nov 08, 2026", description: "Festival of Lights" },
  { name: "Christmas Day", date: "Dec 25, 2026", description: "Company holiday" },
  { name: "New Year's Day", date: "Jan 01, 2027", description: "Company holiday" },
];

export const tickets = [
  { id: "HR-1024", subject: "Question about my payslip", category: "Payroll", created: "Oct 10, 2026", status: "In progress" },
  { id: "HR-1018", subject: "Update emergency contact", category: "Personal details", created: "Oct 06, 2026", status: "Open" },
  { id: "HR-1007", subject: "Leave balance clarification", category: "Time off", created: "Sep 28, 2026", status: "Resolved" },
];

export const notifications = [
  { title: "Your October payslip is ready", detail: "Payroll · 2 hours ago" },
  { title: "Time-off request approved", detail: "People team · Yesterday" },
  { title: "Your leave request is awaiting review", detail: "People team · Oct 09" },
];