"use client";

import React, { useState, useEffect } from 'react';
import styles from '../Dashboard.module.css';
import { authService } from '@/services/authService';
import StatusModal from '@/components/StatusModal';
import { countries } from '@/utils/countries';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, type: 'success' as 'success' | 'error', title: '', message: '' });

  // Form states
  const [profileData, setProfileData] = useState({
    full_name: '',
    email: '',
    phone: '',
    country: '',
    address: '',
    dob: ''
  });

  const [withdrawalInfo, setWithdrawalInfo] = useState({
    bank_name: '',
    account_name: '',
    account_number: '',
    swift_code: '',
    bitcoin_address: '',
    ethereum_address: '',
    litecoin_address: '',
    usdt_trc20_address: ''
  });

  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password: '',
    confirm_password: ''
  });

  const [otherSettings, setOtherSettings] = useState({
    send_otp_on_withdrawal: true,
    notify_on_profit: false,
    notify_on_plan_expiry: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { user } = authService.getSession();
        if (user) {
          setProfileData({
            full_name: user.full_name || '',
            email: user.email || '',
            phone: user.phone || '',
            country: user.country || '',
            address: user.address || '',
            dob: user.dob ? user.dob.split('T')[0] : ''
          });
        }

        const withdrawData = await authService.getWithdrawalInfo();
        if (withdrawData) {
          // If it's a list, take the first one as per user description
          const info = Array.isArray(withdrawData) ? withdrawData[0] : withdrawData;
          if (info) {
            setWithdrawalInfo({
              bank_name: info.bank_name || '',
              account_name: info.account_name || '',
              account_number: info.account_number || '',
              swift_code: info.swift_code || '',
              bitcoin_address: info.bitcoin_address || '',
              ethereum_address: info.ethereum_address || '',
              litecoin_address: info.litecoin_address || '',
              usdt_trc20_address: info.usdt_trc20_address || ''
            });
          }
        }

        const settingsData = await authService.getOtherSettings();
        if (settingsData) {
          const s = Array.isArray(settingsData) ? settingsData[0] : settingsData;
          setOtherSettings({
            send_otp_on_withdrawal: s.send_otp_on_withdrawal ?? true,
            notify_on_profit: s.notify_on_profit ?? false,
            notify_on_plan_expiry: s.notify_on_plan_expiry ?? true
          });
        }
      } catch (err) {
        console.error("Failed to fetch profile data:", err);
      }
    };
    fetchData();
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleWithdrawChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWithdrawalInfo({ ...withdrawalInfo, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      await authService.updateProfile(profileData);
      // Update local storage with new data
      const { token, user } = authService.getSession();
      authService.setSession(token!, { ...user, ...profileData });
      setModal({
        isOpen: true,
        type: 'success',
        title: 'Profile Updated',
        message: 'Your personal information has been successfully updated.'
      });
    } catch (err: any) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Update Failed',
        message: err.message || 'Failed to update profile information.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveWithdrawal = async () => {
    setLoading(true);
    try {
      await authService.createWithdrawalInfo(withdrawalInfo);
      setModal({
        isOpen: true,
        type: 'success',
        title: 'Settings Saved',
        message: 'Your withdrawal information has been successfully updated.'
      });
    } catch (err: any) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Save Failed',
        message: err.message || 'Failed to save withdrawal information.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (passwordData.new_password !== passwordData.confirm_password) {
      setModal({ isOpen: true, type: 'error', title: 'Error', message: 'New passwords do not match.' });
      return;
    }
    setLoading(true);
    try {
      await authService.changePassword({
        old_password: passwordData.old_password,
        new_password: passwordData.new_password
      });
      setModal({
        isOpen: true,
        type: 'success',
        title: 'Password Changed',
        message: 'Your password has been successfully updated.'
      });
      setPasswordData({ old_password: '', new_password: '', confirm_password: '' });
    } catch (err: any) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Update Failed',
        message: err.message || 'Failed to update password.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSettings = async () => {
    setLoading(true);
    try {
      await authService.updateOtherSettings(otherSettings);
      setModal({
        isOpen: true,
        type: 'success',
        title: 'Settings Updated',
        message: 'Your notification settings have been successfully updated.'
      });
    } catch (err: any) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Update Failed',
        message: err.message || 'Failed to update notification settings.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
  };

  const tabs = [
    { id: 'personal', label: 'Personal Settings' },
    { id: 'withdrawal', label: 'Withdrawal Settings' },
    { id: 'password', label: 'Password/Security' },
    { id: 'other', label: 'Other Settings' },
  ];

  return (
    <div className={styles.mainContainer}>
      <div className={styles.tabContainer}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabBtn} ${activeTab === tab.id ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.card}>
        {activeTab === 'personal' && (
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Fullname</label>
              <input 
                type="text" 
                name="full_name"
                value={profileData.full_name} 
                onChange={handleProfileChange}
                className={styles.formInput} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input 
                type="email" 
                name="email"
                value={profileData.email} 
                onChange={handleProfileChange}
                className={styles.formInput} 
                disabled 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Phone Number</label>
              <input 
                type="text" 
                name="phone"
                value={profileData.phone} 
                onChange={handleProfileChange}
                className={styles.formInput} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Country</label>
              <select 
                name="country"
                value={profileData.country} 
                onChange={handleProfileChange}
                className={styles.formSelect} 
              >
                <option value="">Select country</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroupFull}>
              <label>Address</label>
              <textarea 
                name="address"
                value={profileData.address}
                onChange={handleProfileChange}
                placeholder="Full Address" 
                className={styles.formTextarea}
              ></textarea>
            </div>
            <div className={styles.formActions}>
              <button className={styles.updateBtn} onClick={handleUpdateProfile} disabled={loading}>
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
              <button className={styles.logoutBtnOutline} onClick={handleLogout}>Logout</button>
            </div>
          </div>
        )}

        {activeTab === 'withdrawal' && (
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Bank Name</label>
              <input 
                type="text" 
                name="bank_name"
                value={withdrawalInfo.bank_name}
                onChange={handleWithdrawChange}
                placeholder="Enter bank name" 
                className={styles.formInput} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Account Name</label>
              <input 
                type="text" 
                name="account_name"
                value={withdrawalInfo.account_name}
                onChange={handleWithdrawChange}
                placeholder="Enter Account name" 
                className={styles.formInput} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Account Number</label>
              <input 
                type="text" 
                name="account_number"
                value={withdrawalInfo.account_number}
                onChange={handleWithdrawChange}
                placeholder="Enter Account Number" 
                className={styles.formInput} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Swift Code</label>
              <input 
                type="text" 
                name="swift_code"
                value={withdrawalInfo.swift_code}
                onChange={handleWithdrawChange}
                placeholder="Enter Swift Code" 
                className={styles.formInput} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Bitcoin</label>
              <input 
                type="text" 
                name="bitcoin_address"
                value={withdrawalInfo.bitcoin_address}
                onChange={handleWithdrawChange}
                placeholder="Enter Bitcoin Address" 
                className={styles.formInput} 
              />
              <span className={styles.inputHint}>Enter your Bitcoin Address that will be used to withdraw your funds</span>
            </div>
            <div className={styles.formGroup}>
              <label>Ethereum</label>
              <input 
                type="text" 
                name="ethereum_address"
                value={withdrawalInfo.ethereum_address}
                onChange={handleWithdrawChange}
                placeholder="Enter Ethereum Address" 
                className={styles.formInput} 
              />
              <span className={styles.inputHint}>Enter your Ethereum Address that will be used to withdraw your funds</span>
            </div>
            <div className={styles.formGroup}>
              <label>Litecoin</label>
              <input 
                type="text" 
                name="litecoin_address"
                value={withdrawalInfo.litecoin_address}
                onChange={handleWithdrawChange}
                placeholder="Enter Litecoin Address" 
                className={styles.formInput} 
              />
              <span className={styles.inputHint}>Enter your Litecoin Address that will be used to withdraw your funds</span>
            </div>
            <div className={styles.formGroup}>
              <label>USDT.TRC20</label>
              <input 
                type="text" 
                name="usdt_trc20_address"
                value={withdrawalInfo.usdt_trc20_address}
                onChange={handleWithdrawChange}
                placeholder="Enter USDT.TRC20 Address" 
                className={styles.formInput} 
              />
              <span className={styles.inputHint}>Enter your USDT.TRC20 wallet Address that will be used to withdraw your funds</span>
            </div>
            <div className={styles.formActions}>
              <button className={styles.saveBtn} onClick={handleSaveWithdrawal} disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'password' && (
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Old Password</label>
              <input 
                type="password" 
                name="old_password"
                value={passwordData.old_password}
                onChange={handlePasswordChange}
                placeholder="Enter your current password" 
                className={styles.formInput} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>New Password</label>
              <input 
                type="password" 
                name="new_password"
                value={passwordData.new_password}
                onChange={handlePasswordChange}
                placeholder="Enter your new password" 
                className={styles.formInput} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Confirm New Password</label>
              <input 
                type="password" 
                name="confirm_password"
                value={passwordData.confirm_password}
                onChange={handlePasswordChange}
                placeholder="Confirm your new password" 
                className={styles.formInput} 
              />
            </div>
            <div className={styles.formActions}>
              <button className={styles.updateBtn} onClick={handleUpdatePassword} disabled={loading}>
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'other' && (
          <div className={styles.otherSettingsGrid}>
            <div className={styles.settingsItem}>
              <p>Send confirmation OTP to my email when withdrawing my funds.</p>
              <div className={styles.radioGroup}>
                <label>
                  <input 
                    type="radio" 
                    name="otp" 
                    checked={otherSettings.send_otp_on_withdrawal === true} 
                    onChange={() => setOtherSettings({...otherSettings, send_otp_on_withdrawal: true})}
                  /> Yes
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="otp" 
                    checked={otherSettings.send_otp_on_withdrawal === false}
                    onChange={() => setOtherSettings({...otherSettings, send_otp_on_withdrawal: false})}
                  /> No
                </label>
              </div>
            </div>
            <div className={styles.settingsItem}>
              <p>Send me email when I get profit.</p>
              <div className={styles.radioGroup}>
                <label>
                  <input 
                    type="radio" 
                    name="profit" 
                    checked={otherSettings.notify_on_profit === true} 
                    onChange={() => setOtherSettings({...otherSettings, notify_on_profit: true})}
                  /> Yes
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="profit" 
                    checked={otherSettings.notify_on_profit === false}
                    onChange={() => setOtherSettings({...otherSettings, notify_on_profit: false})}
                  /> No
                </label>
              </div>
            </div>
            <div className={styles.settingsItem}>
              <p>Send me email when my investment plan expires.</p>
              <div className={styles.radioGroup}>
                <label>
                  <input 
                    type="radio" 
                    name="expiry" 
                    checked={otherSettings.notify_on_plan_expiry === true} 
                    onChange={() => setOtherSettings({...otherSettings, notify_on_plan_expiry: true})}
                  /> Yes
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="expiry" 
                    checked={otherSettings.notify_on_plan_expiry === false}
                    onChange={() => setOtherSettings({...otherSettings, notify_on_plan_expiry: false})}
                  /> No
                </label>
              </div>
            </div>
            <div className={styles.formActions}>
              <button className={styles.saveBtn} onClick={handleUpdateSettings} disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        )}
      </div>

      <StatusModal 
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />
    </div>
  );
}
