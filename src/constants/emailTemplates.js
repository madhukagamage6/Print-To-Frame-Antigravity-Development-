/**
 * Email Communication Templates for Print To Frame ERP
 * Used by Administrators and Operators to dispatch onboarding credentials, approvals, and notices.
 */

export const EMAIL_TEMPLATES = [
  {
    id: 'partner_approval',
    title: 'Partner Application Approved (Welcome & Activation)',
    category: 'Partners',
    description: 'Welcome email with partner ID and login credentials for approved framing & art partners.',
    targetRoles: ['Partner'],
    subject: 'Welcome to the Print To Frame Partner Network — Your Account is Ready [{{partnerId}}]',
    body: `Dear {{recipientName}},

We are pleased to inform you that your application to join the Print To Frame Partner Network has been approved!

Your partner account and workspace access are now active with the following details:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARTNER ACCOUNT CREDENTIALS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Partner Name: {{recipientName}}
• Partner ID: {{partnerId}}
• Assigned Role: Art & Framing Partner
• Portal URL: {{portalUrl}}
• Username / Email: {{loginEmail}}
• Temporary Password: {{tempPassword}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NEXT STEPS:
1. Log in to the Print To Frame Portal at {{portalUrl}}
2. Access your assigned fabrication jobs, submit orders, and track commission disbursements.
3. For security, please update your temporary password in the "My Profile" tab upon your first login.

If you have any questions or require technical assistance, feel free to reply directly to this email or reach our operations desk at {{contactPhone}}.

We look forward to a fruitful and successful partnership!

Warm regards,

{{senderName}}
Print To Frame Pvt Ltd
Kadawatha, Sri Lanka
Web: {{portalUrl}}`,
  },
  {
    id: 'client_approval',
    title: 'Business Client B2B Access Activated',
    category: 'Clients',
    description: 'Account activation notice for approved corporate buyers, architecture firms, and wholesale clients.',
    targetRoles: ['Business Client'],
    subject: 'Print To Frame B2B Corporate Portal Access Activated — {{companyName}}',
    body: `Dear {{recipientName}},

Thank you for choosing Print To Frame as your commercial framing and fabrication partner.

Your corporate account for {{companyName}} has been approved and activated with authorized B2B portal privileges.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CORPORATE ACCESS DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Company / Entity: {{companyName}}
• Primary Contact: {{recipientName}}
• Account Type: Corporate Client (B2B)
• Portal URL: {{portalUrl}}
• User Login: {{loginEmail}}
• Temporary Password: {{tempPassword}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PORTAL CAPABILITIES:
• Submit custom steel & canvas framing work orders directly to our factory floor.
• Review live line-item quotations and CAD structural blueprints.
• Track job progress through Fabrication, Ready to Load, and Final Handover stages.
• View and download advance (75%) and final (25%) settlement invoices.

Please log in at {{portalUrl}} to review your active dashboard.

Best regards,

{{senderName}}
Corporate Accounts Desk
Print To Frame Pvt Ltd
Kadawatha, Sri Lanka`,
  },
  {
    id: 'employee_invite',
    title: 'New Team Member Workspace Onboarding',
    category: 'Internal Team',
    description: 'Internal credentials and onboarding instructions for staff members.',
    targetRoles: ['Admin', 'Manager', 'Sales', 'Operations', 'Support', 'Accounts', 'Logistics'],
    subject: 'Welcome to the Print To Frame Team — Your Workspace Access [{{assignedRole}}]',
    body: `Hi {{recipientName}},

Welcome to the Print To Frame team!

Your workspace user account has been provisioned on the ERP system with the {{assignedRole}} role.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WORKSPACE CREDENTIALS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Full Name: {{recipientName}}
• Assigned Department / Role: {{assignedRole}}
• Portal URL: {{portalUrl}}
• Login Email: {{loginEmail}}
• Initial Password: {{tempPassword}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please sign in at {{portalUrl}}, familiarize yourself with your department modules, and update your profile picture in the "My Profile" tab.

Welcome aboard, and let's build great things together!

Best regards,

{{senderName}}
Print To Frame Pvt Ltd`,
  },
  {
    id: 'request_info',
    title: 'Application Needs Additional Information',
    category: 'Verification',
    description: 'Request additional documentation, BRN, or portfolio samples from applicants.',
    targetRoles: ['Partner', 'Business Client'],
    subject: 'Action Required: Print To Frame Application Review for {{recipientName}}',
    body: `Dear {{recipientName}},

Thank you for your interest in registering with Print To Frame for {{requestedRole}} access.

During our review of your application, our team noticed that we need a few additional details before we can complete your account activation:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REQUESTED INFORMATION / DOCUMENTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{missingDetails}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please reply directly to this email with the requested information at your earliest convenience so we can proceed with your verification.

Thank you for your cooperation.

Sincerely,

{{senderName}}
Partner Verification Desk
Print To Frame Pvt Ltd`,
  },
  {
    id: 'request_rejection',
    title: 'Application Status Update (Ineligible / Declined)',
    category: 'Status',
    description: 'Polite notification for applications that cannot be approved at this time.',
    targetRoles: ['Partner', 'Business Client'],
    subject: 'Update Regarding Your Print To Frame Registration Request',
    body: `Dear {{recipientName}},

Thank you for submitting a registration request for the Print To Frame ERP portal.

After careful review, we regret to inform you that we are unable to approve your application for {{requestedRole}} access at this time due to the following reason:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REASON:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{reason}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

If you believe this decision was made in error or if your business details change in the future, you are welcome to re-apply or contact our support team at {{supportEmail}}.

We appreciate your interest in Print To Frame.

Sincerely,

{{senderName}}
Operations & Compliance Desk
Print To Frame Pvt Ltd`,
  },
];

/**
 * Replace placeholders like {{key}} with matching value from data object.
 * Missing keys default to a clean placeholder or fallback.
 */
export const interpolateTemplate = (templateString, data = {}) => {
  if (!templateString) return '';
  return templateString.replace(/\{\{([a-zA-Z0-9_]+)\}\}/g, (match, key) => {
    if (data[key] !== undefined && data[key] !== null && String(data[key]).trim() !== '') {
      return String(data[key]);
    }
    // Fallback defaults for common keys
    switch (key) {
      case 'portalUrl':
        return typeof window !== 'undefined' ? window.location.origin : 'https://portal.print2frame.xyz';
      case 'contactPhone':
        return '+94 11 234 5678';
      case 'supportEmail':
        return 'support@print2frame.xyz';
      case 'tempPassword':
        return '[Password provided upon account creation]';
      case 'partnerId':
        return 'P-PENDING';
      case 'senderName':
        return 'Administration Team';
      case 'missingDetails':
        return '• Business Registration Number (BRN) copy\n• Workshop location & sample portfolio';
      case 'reason':
        return 'Incomplete registration details or unverified business credentials.';
      default:
        return match;
    }
  });
};
