import React, { useState } from 'react';
import Card from '../components/Card';
import { 
  User, 
  Bell, 
  Lock, 
  Globe, 
  Monitor,
  Moon,
  Sun,
  Mail,
  Shield,
  Database,
  Save,
  AlertCircle
} from 'lucide-react';

// PUBLIC_INTERFACE
/**
 * Settings page component for managing admin preferences and configurations
 * @returns {JSX.Element} Settings page
 */
function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  
  // Profile settings state
  const [profileData, setProfileData] = useState({
    fullName: 'Admin User',
    email: 'admin@fashionadmin.com',
    phone: '+1-555-0100',
    role: 'Administrator',
    department: 'Management'
  });

  // Preferences state
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'UTC-5',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD'
  });

  // Notifications state
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    orderAlerts: true,
    lowStockAlerts: true,
    customerMessages: false,
    systemUpdates: true,
    marketingEmails: false
  });

  // Security state
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({ ...prev, [name]: checked }));
  };

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurityData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Simulate save operation
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Monitor },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'system', label: 'System', icon: Database }
  ];

  return (
    <div className="space-y-6">
      {/* Success Notification */}
      {showSaveNotification && (
        <div className="fixed top-20 right-6 bg-success text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50 animate-fade-in">
          <AlertCircle size={20} />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Settings</h1>
          <p className="text-secondary mt-1">Manage your account and preferences</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2 shadow-sm"
        >
          <Save size={18} />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Tabs Navigation */}
      <Card className="p-0 overflow-hidden">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary text-primary bg-gray-50'
                    : 'border-transparent text-secondary hover:text-primary hover:bg-gray-50'
                }`}
              >
                <IconComponent size={18} />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Profile Settings */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <Card title="Personal Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={profileData.role}
                  disabled
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-secondary cursor-not-allowed"
                />
              </div>
            </div>
          </Card>

          <Card title="Profile Picture">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold">
                <User size={40} />
              </div>
              <div>
                <button className="bg-gray-100 text-primary px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  Upload New Picture
                </button>
                <p className="text-sm text-secondary mt-2">JPG, PNG or GIF. Max size 2MB.</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Preferences Settings */}
      {activeTab === 'preferences' && (
        <div className="space-y-6">
          <Card title="Appearance">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Theme
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {['light', 'dark', 'auto'].map((theme) => (
                    <button
                      key={theme}
                      onClick={() => setPreferences(prev => ({ ...prev, theme }))}
                      className={`p-4 border-2 rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                        preferences.theme === theme
                          ? 'border-primary bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {theme === 'light' && <Sun size={24} className="text-primary" />}
                      {theme === 'dark' && <Moon size={24} className="text-primary" />}
                      {theme === 'auto' && <Monitor size={24} className="text-primary" />}
                      <span className="text-sm font-medium capitalize">{theme}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card title="Regional Settings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  <div className="flex items-center space-x-2">
                    <Globe size={16} />
                    <span>Language</span>
                  </div>
                </label>
                <select
                  name="language"
                  value={preferences.language}
                  onChange={handlePreferenceChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Timezone
                </label>
                <select
                  name="timezone"
                  value={preferences.timezone}
                  onChange={handlePreferenceChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="UTC-5">Eastern Time (UTC-5)</option>
                  <option value="UTC-6">Central Time (UTC-6)</option>
                  <option value="UTC-7">Mountain Time (UTC-7)</option>
                  <option value="UTC-8">Pacific Time (UTC-8)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Date Format
                </label>
                <select
                  name="dateFormat"
                  value={preferences.dateFormat}
                  onChange={handlePreferenceChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Currency
                </label>
                <select
                  name="currency"
                  value={preferences.currency}
                  onChange={handlePreferenceChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                </select>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Notifications Settings */}
      {activeTab === 'notifications' && (
        <Card title="Notification Preferences">
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center space-x-3">
                  {key === 'emailNotifications' && <Mail size={18} className="text-secondary" />}
                  {key === 'orderAlerts' && <Bell size={18} className="text-secondary" />}
                  {key === 'lowStockAlerts' && <AlertCircle size={18} className="text-secondary" />}
                  {key === 'customerMessages' && <Mail size={18} className="text-secondary" />}
                  {key === 'systemUpdates' && <Shield size={18} className="text-secondary" />}
                  {key === 'marketingEmails' && <Mail size={18} className="text-secondary" />}
                  <div>
                    <p className="font-medium text-primary">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </p>
                    <p className="text-sm text-secondary">
                      {key === 'emailNotifications' && 'Receive email notifications for important events'}
                      {key === 'orderAlerts' && 'Get notified when new orders are placed'}
                      {key === 'lowStockAlerts' && 'Alert when products are low in stock'}
                      {key === 'customerMessages' && 'Receive customer support messages'}
                      {key === 'systemUpdates' && 'Get notified about system updates and maintenance'}
                      {key === 'marketingEmails' && 'Receive marketing and promotional emails'}
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name={key}
                    checked={value}
                    onChange={handleNotificationChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Security Settings */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <Card title="Change Password">
            <div className="space-y-4 max-w-lg">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={securityData.currentPassword}
                  onChange={handleSecurityChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={securityData.newPassword}
                  onChange={handleSecurityChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={securityData.confirmPassword}
                  onChange={handleSecurityChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Confirm new password"
                />
              </div>
              <button className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors">
                Update Password
              </button>
            </div>
          </Card>

          <Card title="Two-Factor Authentication">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-primary">Enable 2FA</p>
                <p className="text-sm text-secondary mt-1">Add an extra layer of security to your account</p>
              </div>
              <button className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors">
                Enable
              </button>
            </div>
          </Card>

          <Card title="Active Sessions">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Monitor size={20} className="text-primary" />
                  <div>
                    <p className="font-medium text-primary">Current Session</p>
                    <p className="text-sm text-secondary">Chrome on Windows - Active now</p>
                  </div>
                </div>
                <span className="text-sm text-success font-medium">Active</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* System Settings */}
      {activeTab === 'system' && (
        <div className="space-y-6">
          <Card title="System Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-secondary mb-1">Version</p>
                <p className="font-medium text-primary">v1.0.0</p>
              </div>
              <div>
                <p className="text-sm text-secondary mb-1">Last Updated</p>
                <p className="font-medium text-primary">January 15, 2024</p>
              </div>
              <div>
                <p className="text-sm text-secondary mb-1">Environment</p>
                <p className="font-medium text-primary">Production</p>
              </div>
              <div>
                <p className="text-sm text-secondary mb-1">Server Status</p>
                <p className="font-medium text-success">Online</p>
              </div>
            </div>
          </Card>

          <Card title="Data Management">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-primary">Export Data</p>
                  <p className="text-sm text-secondary mt-1">Download all your data in CSV format</p>
                </div>
                <button className="bg-gray-100 text-primary px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  Export
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-primary">Clear Cache</p>
                  <p className="text-sm text-secondary mt-1">Clear temporary data and cache</p>
                </div>
                <button className="bg-gray-100 text-primary px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  Clear
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border border-error rounded-lg bg-red-50">
                <div>
                  <p className="font-medium text-error">Delete Account</p>
                  <p className="text-sm text-secondary mt-1">Permanently delete your account and all data</p>
                </div>
                <button className="bg-error text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Settings;
