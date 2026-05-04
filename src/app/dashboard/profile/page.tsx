"use client";

import React, { useState } from 'react';
import styles from '../Dashboard.module.css';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('personal');

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

      <div className={styles.card} style={{ padding: '40px' }}>
        {activeTab === 'personal' && (
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Fullname</label>
              <input type="text" defaultValue="Fernando" className={styles.formInput} />
            </div>
            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input type="email" defaultValue="savvybittechnology@gmail.com" className={styles.formInput} />
            </div>
            <div className={styles.formGroup}>
              <label>Phone Number</label>
              <input type="text" defaultValue="+1545454545454" className={styles.formInput} />
            </div>
            <div className={styles.formGroup}>
              <label>Country</label>
              <select className={styles.formSelect} defaultValue="Spain">
                <option value="Spain">Spain</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
            </div>
            <div className={styles.formGroupFull}>
              <label>Address</label>
              <textarea placeholder="Full Address" className={styles.formTextarea}></textarea>
            </div>
            <div className={styles.formActions}>
              <button className={styles.updateBtn}>Update Profile</button>
              <button className={styles.logoutBtnOutline}>Logout</button>
            </div>
          </div>
        )}

        {activeTab === 'withdrawal' && (
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Bank Name</label>
              <input type="text" placeholder="Enter bank name" className={styles.formInput} />
            </div>
            <div className={styles.formGroup}>
              <label>Account Name</label>
              <input type="text" placeholder="Enter Account name" className={styles.formInput} />
            </div>
            <div className={styles.formGroup}>
              <label>Account Number</label>
              <input type="text" placeholder="Enter Account Number" className={styles.formInput} />
            </div>
            <div className={styles.formGroup}>
              <label>Swift Code</label>
              <input type="text" placeholder="Enter Swift Code" className={styles.formInput} />
            </div>
            <div className={styles.formGroup}>
              <label>Bitcoin</label>
              <input type="text" placeholder="Enter Bitcoin Address" className={styles.formInput} />
              <span className={styles.inputHint}>Enter your Bitcoin Address that will be used to withdraw your funds</span>
            </div>
            <div className={styles.formGroup}>
              <label>Ethereum</label>
              <input type="text" placeholder="Enter Ethereum Address" className={styles.formInput} />
              <span className={styles.inputHint}>Enter your Ethereum Address that will be used to withdraw your funds</span>
            </div>
            <div className={styles.formGroup}>
              <label>Litecoin</label>
              <input type="text" placeholder="Enter Litecoin Address" className={styles.formInput} />
              <span className={styles.inputHint}>Enter your Litecoin Address that will be used to withdraw your funds</span>
            </div>
            <div className={styles.formGroup}>
              <label>USDT.TRC20</label>
              <input type="text" placeholder="Enter USDT.TRC20 Address" className={styles.formInput} />
              <span className={styles.inputHint}>Enter your USDT.TRC20 wallet Address that will be used to withdraw your funds</span>
            </div>
            <div className={styles.formActions}>
              <button className={styles.saveBtn}>Save</button>
            </div>
          </div>
        )}

        {activeTab === 'password' && (
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Old Password</label>
              <input type="password" placeholder="Enter your current password" className={styles.formInput} />
            </div>
            <div className={styles.formGroup}>
              <label>New Password</label>
              <input type="password" placeholder="Enter your new password" className={styles.formInput} />
            </div>
            <div className={styles.formGroup}>
              <label>Confirm New Password</label>
              <input type="password" placeholder="Confirm your new password" className={styles.formInput} />
            </div>
            <div className={styles.formActions}>
              <button className={styles.updateBtn}>Update Password</button>
            </div>
          </div>
        )}
        
        {activeTab === 'other' && (
          <div className={styles.otherSettingsGrid}>
            <div className={styles.settingsItem}>
              <p>Send confirmation OTP to my email when withdrawing my funds.</p>
              <div className={styles.radioGroup}>
                <label><input type="radio" name="otp" defaultChecked /> Yes</label>
                <label><input type="radio" name="otp" /> No</label>
              </div>
            </div>
            <div className={styles.settingsItem}>
              <p>Send me email when I get profit.</p>
              <div className={styles.radioGroup}>
                <label><input type="radio" name="profit" defaultChecked /> Yes</label>
                <label><input type="radio" name="profit" /> No</label>
              </div>
            </div>
            <div className={styles.settingsItem}>
              <p>Send me email when my investment plan expires.</p>
              <div className={styles.radioGroup}>
                <label><input type="radio" name="expiry" defaultChecked /> Yes</label>
                <label><input type="radio" name="expiry" /> No</label>
              </div>
            </div>
            <div className={styles.formActions}>
              <button className={styles.saveBtn}>Save</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
