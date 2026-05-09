/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Shield, Activity, Settings, Eye, CheckCircle, Search, Wifi, Box, Lock, Calendar, AlertTriangle, Globe } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('status');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [isVpnConnected, setIsVpnConnected] = useState(false);
  const [vpnLocation, setVpnLocation] = useState('Optimal Location');
  const [isWifiScanning, setIsWifiScanning] = useState(false);
  const [wifiScanProgress, setWifiScanProgress] = useState(0);
  const [wifiStatus, setWifiStatus] = useState('idle');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isWifiScanning) {
      interval = setInterval(() => {
        setWifiScanProgress(prev => {
          if (prev >= 100) {
            setIsWifiScanning(false);
            setWifiStatus('safe');
            return 0;
          }
          return prev + 1;
        });
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isWifiScanning]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isScanning) {
      interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            setIsScanning(false);
            return 0;
          }
          return prev + 1;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isScanning]);

  const handleScanClick = () => {
    if (!isScanning) {
      setIsScanning(true);
      setScanProgress(0);
    }
  };

  return (
    <div className="flex h-screen w-full text-slate-300 geometric-bg">
      <aside className="w-64 flex flex-col border-r border-slate-800 bg-slate-900/50">
        <div className="p-8 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
            <Shield size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            AEGIS <span className="text-blue-500 font-light">ONE</span>
          </span>
        </div>
        
        <nav className="flex-1 py-4">
          <div 
            className={`nav-item px-8 py-4 flex items-center gap-4 cursor-pointer ${activeTab === 'status' ? 'active' : 'text-slate-500 hover:text-slate-300'}`}
            onClick={() => setActiveTab('status')}
          >
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium uppercase text-xs tracking-widest">Status</span>
          </div>
          <div 
            className={`nav-item px-8 py-4 flex items-center gap-4 cursor-pointer ${activeTab === 'protection' ? 'active' : 'text-slate-500 hover:text-slate-300'}`}
            onClick={() => setActiveTab('protection')}
          >
            <Shield className="w-5 h-5" />
            <span className="font-medium uppercase text-xs tracking-widest">Protection</span>
          </div>
          <div 
             className={`nav-item px-8 py-4 flex items-center gap-4 cursor-pointer ${activeTab === 'performance' ? 'active' : 'text-slate-500 hover:text-slate-300'}`}
             onClick={() => setActiveTab('performance')}
          >
            <Activity className="w-5 h-5" />
            <span className="font-medium uppercase text-xs tracking-widest">Performance</span>
          </div>
          <div 
            className={`nav-item px-8 py-4 flex items-center gap-4 cursor-pointer ${activeTab === 'privacy' ? 'active' : 'text-slate-500 hover:text-slate-300'}`}
            onClick={() => setActiveTab('privacy')}
          >
            <Eye className="w-5 h-5" />
            <span className="font-medium uppercase text-xs tracking-widest">Privacy</span>
          </div>
          <div 
            className={`nav-item px-8 py-4 flex items-center justify-between cursor-pointer ${activeTab === 'vpn' ? 'active' : 'text-slate-500 hover:text-slate-300'}`}
            onClick={() => setActiveTab('vpn')}
          >
            <div className="flex items-center gap-4">
              <Globe className="w-5 h-5" />
              <span className="font-medium uppercase text-xs tracking-widest">Private VPN</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-green-500/20 text-green-400 px-2 py-0.5 rounded ml-2">Free</span>
          </div>
          <div 
            className={`nav-item px-8 py-4 flex items-center justify-between cursor-pointer ${activeTab === 'wifi' ? 'active' : 'text-slate-500 hover:text-slate-300'}`}
            onClick={() => setActiveTab('wifi')}
          >
            <div className="flex items-center gap-4">
              <Wifi className="w-5 h-5" />
              <span className="font-medium uppercase text-xs tracking-widest">Free Wi-Fi</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded ml-2">Scan</span>
          </div>
        </nav>
        
        <div className="p-8 border-t border-slate-800 text-xs text-slate-500">
          <p className="mb-1">Version 24.1.0 (Build 342)</p>
          <p>Subscription: <span className="text-blue-500">Premium</span></p>
        </div>
      </aside>
      
      <main className="flex-1 flex flex-col items-center justify-between p-12 overflow-y-auto">
        <header className="w-full flex justify-end">
          <div className="flex items-center gap-4 bg-slate-800/50 rounded-full px-4 py-2 border border-slate-700/50">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium">Cloud Network Connected</span>
            <div className="w-px h-4 bg-slate-700"></div>
            <span className="text-sm font-light">Chicago, IL</span>
          </div>
        </header>

        {activeTab === 'status' && (
          <div className="flex flex-col items-center flex-1 justify-center my-8">
            <div className={`status-ring mb-8 transition-colors duration-300 ${isScanning ? 'scanning' : ''}`}>
              {isScanning ? (
                <>
                  <div className="text-blue-500 mb-4 text-4xl font-light">{scanProgress}%</div>
                  <h2 className="text-3xl font-bold text-white">Scanning...</h2>
                  <p className="text-slate-400 mt-1">Analyzing system files</p>
                </>
              ) : (
                <>
                  <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
                  <h2 className="text-3xl font-bold text-white">Protected</h2>
                  <p className="text-slate-400 mt-1">Everything is up to date</p>
                </>
              )}
            </div>
            
            <button 
              onClick={handleScanClick}
              disabled={isScanning}
              className={`font-semibold py-4 px-12 rounded-xl transition-all shadow-lg active:scale-95 ${
                isScanning 
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed shadow-none' 
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20'
              }`}
            >
              {isScanning ? 'SCANNING...' : 'RUN SMART SCAN'}
            </button>
            
            <div className="mt-8 flex gap-12 text-center">
              <div className="metric-border pr-12">
                <span className="block text-xs uppercase tracking-widest text-slate-500 mb-1">Last Scan</span>
                <span className="text-sm text-slate-200 font-medium">
                  {scanProgress === 0 && !isScanning ? 'Just now' : '38 minutes ago'}
                </span>
              </div>
              <div className="metric-border pr-12">
                <span className="block text-xs uppercase tracking-widest text-slate-500 mb-1">Threats Blocked</span>
                <span className="text-sm text-slate-200 font-medium">12,482</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-widest text-slate-500 mb-1">Protected Items</span>
                <span className="text-sm text-slate-200 font-medium">1.2M files</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vpn' && (
           <div className="flex flex-col items-center flex-1 justify-center my-8 w-full max-w-md mx-auto">
             <div className={`w-32 h-32 rounded-full mb-8 flex items-center justify-center transition-all duration-500 ${isVpnConnected ? 'bg-green-500/10 text-green-500 ring-4 ring-green-500/30' : 'bg-slate-800 text-slate-500 ring-4 ring-slate-700'}`}>
               <Globe className="w-16 h-16" />
             </div>
             
             <h2 className="text-3xl font-bold text-white mb-2">{isVpnConnected ? 'Connection Secured' : 'Unsecured Connection'}</h2>
             <p className="text-slate-400 mb-8 text-center">{isVpnConnected ? `Your IP is hidden. Browsing from: ${vpnLocation}` : 'Your online activity is exposed. Turn on VPN to hide your IP and encrypt your connection.'}</p>
             
             <button 
               onClick={() => setIsVpnConnected(!isVpnConnected)}
               className={`w-full font-semibold py-4 px-12 rounded-xl transition-all active:scale-95 text-white ${
                 isVpnConnected 
                   ? 'bg-slate-700 hover:bg-slate-600' 
                   : 'bg-green-600 hover:bg-green-500 shadow-lg shadow-green-900/20'
               }`}
             >
               {isVpnConnected ? 'DISCONNECT' : 'TURN ON VPN'}
             </button>
             
             <div className="w-full mt-8 p-4 rounded-xl border border-slate-800 bg-slate-900/30 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-slate-500 mb-1">Server Location</div>
                  <div className="text-sm text-white font-medium">{vpnLocation}</div>
                </div>
                <button className="text-blue-500 hover:text-blue-400 text-sm font-medium">Change</button>
             </div>
           </div>
        )}

        {activeTab === 'wifi' && (
          <div className="flex flex-col items-center flex-1 justify-center my-8 w-full max-w-lg mx-auto">
            <div className={`w-32 h-32 rounded-full mb-8 flex items-center justify-center transition-all duration-500 ${wifiStatus === 'safe' && !isWifiScanning ? 'bg-green-500/10 text-green-500 ring-4 ring-green-500/30' : isWifiScanning ? 'bg-blue-500/10 text-blue-500 ring-4 ring-blue-500/30' : 'bg-slate-800 text-slate-500 ring-4 ring-slate-700'}`}>
              <Wifi className={`w-16 h-16 ${isWifiScanning ? 'animate-pulse' : ''}`} />
            </div>

            <h2 className="text-3xl font-bold text-white mb-2">
              {isWifiScanning ? 'Analyzing Network...' : wifiStatus === 'safe' ? 'Network is Safe' : 'Free Wi-Fi Inspector'}
            </h2>
            <p className="text-slate-400 mb-8 text-center text-sm">
              {isWifiScanning ? `Scanning connected devices and router vulnerabilities... ${wifiScanProgress}%` : wifiStatus === 'safe' ? 'Your current Wi-Fi network uses strong encryption and no suspicious devices were found.' : 'Connect to public and free Wi-Fi safely. We will scan the network for hidden threats and vulnerabilities.'}
            </p>

            <button
              onClick={() => {
                if (!isWifiScanning) {
                   setIsWifiScanning(true);
                   setWifiScanProgress(0);
                   setWifiStatus('scanning');
                }
              }}
              disabled={isWifiScanning}
              className={`w-full font-semibold py-4 px-12 rounded-xl transition-all active:scale-95 text-white ${
                isWifiScanning
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/20'
              }`}
            >
              {isWifiScanning ? 'SCANNING NETWORK...' : 'SCAN CURRENT NETWORK'}
            </button>

            {wifiStatus === 'safe' && !isWifiScanning && (
              <div className="w-full mt-8 p-6 rounded-xl border border-slate-800 bg-slate-900/30 flex flex-col gap-4">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <Shield className="w-5 h-5 text-green-500" />
                     <span className="text-sm font-medium text-slate-200">Encryption (WPA3)</span>
                   </div>
                   <span className="text-xs text-green-500 font-medium">Secured</span>
                 </div>
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <Search className="w-5 h-5 text-green-500" />
                     <span className="text-sm font-medium text-slate-200">ARP Spoofing</span>
                   </div>
                   <span className="text-xs text-green-500 font-medium">Not Detected</span>
                 </div>
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <Lock className="w-5 h-5 text-green-500" />
                     <span className="text-sm font-medium text-slate-200">DNS Hijacking</span>
                   </div>
                   <span className="text-xs text-green-500 font-medium">Clear</span>
                 </div>
              </div>
            )}
          </div>
        )}

        {activeTab !== 'status' && activeTab !== 'vpn' && activeTab !== 'wifi' && (
           <div className="flex flex-col items-center flex-1 justify-center opacity-50 my-8">
             <Settings className="w-16 h-16 text-slate-600 mb-4" />
             <h2 className="text-2xl font-semibold text-white">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings</h2>
             <p className="text-slate-400 mt-2">Adjust your {activeTab} preferences here.</p>
           </div>
        )}

        <footer className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-auto">
          <div 
            className="card p-5 rounded-2xl flex flex-col gap-3 group cursor-pointer transition-transform hover:-translate-y-1"
            onClick={() => setActiveTab('wifi')}
          >
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Wifi className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold group-hover:text-blue-400 transition-colors">Wi-Fi Inspector</h4>
              <p className="text-xs text-slate-500">Check your network security</p>
            </div>
          </div>
          
          <div className="card p-5 rounded-2xl flex flex-col gap-3 group cursor-pointer transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
              <Box className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold group-hover:text-orange-400 transition-colors">Sandbox</h4>
              <p className="text-xs text-slate-500">Run apps in isolation</p>
            </div>
          </div>
          
          <div className="card p-5 rounded-2xl flex flex-col gap-3 group cursor-pointer border-blue-500/30 transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-white font-semibold group-hover:text-green-400 transition-colors">Ransomware</h4>
              </div>
              <p className="text-xs text-slate-500">Active protection ON</p>
            </div>
          </div>
          
          <div className="card p-5 rounded-2xl flex flex-col gap-3 group cursor-pointer transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold group-hover:text-purple-400 transition-colors">Scheduled</h4>
              <p className="text-xs text-slate-500">Manage recurring scans</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
