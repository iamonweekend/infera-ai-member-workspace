import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  Bell, 
  Building, 
  LogOut, 
  Key, 
  Check, 
  Save, 
  Smartphone
} from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { currentUser } from '../data/mockData';

export const SettingsPage = ({ 
  activeFilter = 'all',
  onOpenLogout, 
  onShowToast 
}) => {
  const [name, setName] = useState(currentUser.name);
  const [role, setRole] = useState(currentUser.role);
  const [department, setDepartment] = useState(currentUser.department);
  const [emailDigest, setEmailDigest] = useState(currentUser.preferences.emailDigest);
  const [autoScroll, setAutoScroll] = useState(currentUser.preferences.autoScrollReader);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    if (onShowToast) onShowToast("Preferences saved successfully");
    setTimeout(() => setSaved(false), 2000);
  };

  const showPersonal = activeFilter === 'all' || activeFilter === 'personal';
  const showSecurity = activeFilter === 'all' || activeFilter === 'security';
  const showNotifications = activeFilter === 'all' || activeFilter === 'notifications';
  const showWorkspace = activeFilter === 'all' || activeFilter === 'workspace';

  return (
    <div className="space-y-8">
      {/* 1. Header */}
      <PageHeader
        title="Settings & Workspace"
        subtitle="Manage personal credentials, security keys, and corporate knowledge access."
        actions={
          <button
            onClick={onOpenLogout}
            className="text-xs font-inter text-[#85898D] hover:text-red-700 flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        }
      />

      <form onSubmit={handleSave} className="space-y-6">
        {/* 2. Personal Information */}
        {showPersonal && (
          <div className="border border-[#E8E8E8] rounded-xl p-6 bg-white space-y-6">
            <div className="flex items-center gap-2 border-b border-[#E8E8E8] pb-3">
              <User size={16} className="text-[#202124]" />
              <h2 className="text-base font-manrope font-bold text-[#202124]">
                Personal Information
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#171717] text-white flex items-center justify-center font-manrope font-bold text-lg">
                {currentUser.initials}
              </div>
              <div className="space-y-0.5">
                <h3 className="text-sm font-inter font-semibold text-[#202124]">
                  {name}
                </h3>
                <p className="text-xs text-[#85898D]">
                  {currentUser.email} • {role}
                </p>
                <span className="inline-block text-[10px] bg-[#EAF0EB] text-[#526D5C] font-semibold px-2 py-0.2 rounded mt-1">
                  Authenticated Enterprise Member
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-inter font-semibold text-[#85898D] block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F7F7F7] border border-[#E8E8E8] text-xs font-inter text-[#202124] focus:bg-white focus:border-[#171717] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-inter font-semibold text-[#85898D] block mb-1">
                  Corporate Email
                </label>
                <input
                  type="email"
                  value={currentUser.email}
                  disabled
                  className="w-full px-3 py-2 rounded-lg bg-[#F0F1F2] border border-[#E8E8E8] text-xs font-inter text-[#85898D] cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-xs font-inter font-semibold text-[#85898D] block mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F7F7F7] border border-[#E8E8E8] text-xs font-inter text-[#202124] focus:bg-white focus:border-[#171717] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-inter font-semibold text-[#85898D] block mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F7F7F7] border border-[#E8E8E8] text-xs font-inter text-[#202124] focus:bg-white focus:border-[#171717] focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        )}

        {/* 3. Security & Credentials */}
        {showSecurity && (
          <div className="border border-[#E8E8E8] rounded-xl p-6 bg-white space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E8E8E8] pb-3">
              <Shield size={16} className="text-[#202124]" />
              <h2 className="text-base font-manrope font-bold text-[#202124]">
                Security & Authentication
              </h2>
            </div>

            <div className="space-y-2.5">
              <div className="p-3.5 rounded-lg bg-[#F7F7F7] border border-[#E8E8E8] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E8E8E8] flex items-center justify-center text-[#202124]">
                    <Key size={15} />
                  </div>
                  <div>
                    <h4 className="text-xs font-inter font-semibold text-[#202124]">
                      Hardware Security Key (FIDO2 / YubiKey)
                    </h4>
                    <p className="text-[11px] text-[#85898D]">
                      Enforced for zero-trust SSO access to knowledge clusters
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-[#526D5C] bg-[#EAF0EB] px-2 py-0.5 rounded">
                  Enforced & Active
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#F7F7F7] border border-[#E8E8E8] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E8E8E8] flex items-center justify-center text-[#202124]">
                    <Smartphone size={15} />
                  </div>
                  <div>
                    <h4 className="text-xs font-inter font-semibold text-[#202124]">
                      Two-Factor Authentication (2FA)
                    </h4>
                    <p className="text-[11px] text-[#85898D]">
                      Configured with Okta Verify & Time-based OTP
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onShowToast && onShowToast("2FA preferences confirmed")}
                  className="text-xs font-inter text-[#202124] hover:underline"
                >
                  Manage 2FA
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. Notification Preferences */}
        {showNotifications && (
          <div className="border border-[#E8E8E8] rounded-xl p-6 bg-white space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E8E8E8] pb-3">
              <Bell size={16} className="text-[#202124]" />
              <h2 className="text-base font-manrope font-bold text-[#202124]">
                Notification Preferences
              </h2>
            </div>

            <div className="space-y-3 text-xs font-inter">
              <label className="flex items-start justify-between cursor-pointer p-3 rounded-lg hover:bg-[#F7F7F7] transition-colors">
                <div>
                  <p className="font-semibold text-[#202124]">
                    Weekly Document Revisions Digest
                  </p>
                  <p className="text-[#85898D] text-[11px] mt-0.5">
                    Receive email notifications when organizational policies are updated or superseded.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={emailDigest}
                  onChange={(e) => setEmailDigest(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-[#D6D6D6] text-[#171717] focus:ring-[#171717]"
                />
              </label>

              <label className="flex items-start justify-between cursor-pointer p-3 rounded-lg hover:bg-[#F7F7F7] transition-colors">
                <div>
                  <p className="font-semibold text-[#202124]">
                    Auto-Jump to Cited Paragraphs
                  </p>
                  <p className="text-[#85898D] text-[11px] mt-0.5">
                    Automatically open and illuminate cited clauses when navigating from AI Assistant answers.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={autoScroll}
                  onChange={(e) => setAutoScroll(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-[#D6D6D6] text-[#171717] focus:ring-[#171717]"
                />
              </label>
            </div>
          </div>
        )}

        {/* 5. Workspace Info */}
        {showWorkspace && (
          <div className="border border-[#E8E8E8] rounded-xl p-6 bg-[#F7F7F7] space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E8E8E8] pb-3">
              <Building size={16} className="text-[#202124]" />
              <h2 className="text-base font-manrope font-bold text-[#202124]">
                Workspace Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-inter">
              <div className="p-3 rounded-lg bg-white border border-[#E8E8E8]">
                <span className="text-[10px] text-[#85898D] uppercase font-semibold">Workspace</span>
                <p className="font-bold text-[#202124] mt-1">{currentUser.workspace.name}</p>
              </div>
              <div className="p-3 rounded-lg bg-white border border-[#E8E8E8]">
                <span className="text-[10px] text-[#85898D] uppercase font-semibold">Access Clearance</span>
                <p className="font-bold text-[#202124] mt-1">Full Read & Query</p>
              </div>
              <div className="p-3 rounded-lg bg-white border border-[#E8E8E8]">
                <span className="text-[10px] text-[#85898D] uppercase font-semibold">Corpus Index</span>
                <p className="font-bold text-[#526D5C] mt-1">116 Verified Docs</p>
              </div>
            </div>
          </div>
        )}

        {/* Save button */}
        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            className="btn-primary-dark text-xs px-6 py-2.5"
          >
            {saved ? (
              <>
                <Check size={14} />
                <span>Saved Changes</span>
              </>
            ) : (
              <>
                <Save size={14} />
                <span>Save Preferences</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
