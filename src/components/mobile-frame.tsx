import React, { useState } from 'react';

// MobileFrame component included directly in the same file
const MobileFrame = ({ children, isPortrait = true, scale = 1 }) => {
  // Format time for status bar
  const currentTime = new Date().toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false 
  });

  // Styles for the component
  const styles = {
    deviceFrame: {
      position: 'relative',
      background: 'linear-gradient(135deg, #2D3748 80%, #1E293B)',
      borderRadius: '38px',
      // Removed box-shadow
      border: '4px solid #23272f',
      overflow: 'visible',
      minWidth: isPortrait ? '260px' : '844px',
      maxWidth: isPortrait ? '390px' : '844px',
      minHeight: isPortrait ? '500px' : '390px',
      maxHeight: isPortrait ? '844px' : '390px',
      aspectRatio: isPortrait ? '9/19.5' : '19.5/9',
      transition: 'transform 0.3s',
      willChange: 'transform',
      transform: `scale(${scale})`,
      animation: 'float 3s ease-in-out infinite'
    },
    deviceNotch: {
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '120px',
      height: '30px',
      background: '#181C23',
      borderRadius: '0 0 18px 18px',
      zIndex: 10
    },
    statusBar: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '44px',
      padding: '0 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 5,
      background: 'rgba(15,23,42,0.5)',
      backdropFilter: 'blur(8px)',
      fontFamily: 'Inter, sans-serif',
      borderTopLeftRadius: '38px',
      borderTopRightRadius: '38px'
    },
    statusTime: {
      color: '#fff',
      fontSize: '13px',
      fontWeight: 500
    },
    statusIcons: {
      display: 'flex',
      gap: '0.25rem'
    },
    deviceScreen: {
      width: '100%',
      height: '100%',
      overflow: 'auto',
      borderRadius: '32px',
      background: 'linear-gradient(135deg, #23243a 60%, #181C23 100%)',
      position: 'relative',
      zIndex: 2,
      fontFamily: 'Inter, sans-serif',
      WebkitOverflowScrolling: 'touch',
      padding: 0,
      boxSizing: 'border-box'
    },
    homeIndicator: {
      position: 'absolute',
      bottom: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90px',
      height: '5px',
      background: '#444b5a',
      borderRadius: '3px',
      opacity: 0.7,
      zIndex: 10
    }
  };

  // CSS for the animation - keep the floating effect
  const keyFrames = `
    @keyframes float {
      0%, 100% { transform: translateY(0) scale(${scale}); }
      50% { transform: translateY(-16px) scale(${scale * 1.01}); }
    }
  `;

  return (
    <>
      <style>{keyFrames}</style>
      <div style={styles.deviceFrame}>
        {/* Notch / Dynamic Island */}
        <div style={styles.deviceNotch} />
        
        {/* Status Bar */}
        <div style={styles.statusBar}>
          <div style={styles.statusTime}>{currentTime}</div>
          <div style={styles.statusIcons}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12 18c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6zm0-10c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z" />
              <path d="M6.18 7.82a7.915 7.915 0 0 0-2.24 5.62c0 4.41 3.58 8 7.99 8 1.98 0 3.81-.73 5.21-1.93l-1.42-1.42a5.956 5.956 0 0 1-3.8 1.35c-3.31 0-6-2.69-6-6 0-1.4.5-2.68 1.31-3.69l-1.05-.93z" />
              <path d="M17.79 7.21c.7.98 1.2 2.11 1.2 3.37 0 1.02-.29 1.96-.78 2.77l1.28 1.13c.73-1.14 1.15-2.47 1.15-3.89 0-1.57-.53-3.03-1.43-4.2l-1.42.82z" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zM13 18h-2v-2h2v2zm0-4h-2V9h2v5z" />
            </svg>
          </div>
        </div>
        
        {/* Content Area (scrollable) */}
        <div style={styles.deviceScreen}>
          {children}
        </div>
        
        {/* Home Indicator */}
        <div style={styles.homeIndicator} />
      </div>
    </>
  );
};

// Main demo component - without the external controls
const ModifiedMobileFrameDemo = () => {
  // Sample content that would appear inside the frame
  const DemoContent = () => (
    <div style={{
      width: '100%', 
      height: '100%', 
      padding: '60px 16px 40px', 
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 4px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Panson</h1>
        </div>
        <div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2">
            <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
            <path d="M12 12v.01" />
          </svg>
        </div>
      </header>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          borderRadius: '50%', 
          background: '#EC4899',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold'
        }}>
          P
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{
            background: '#EC4899',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '6px 16px',
            fontSize: '14px'
          }}>
            Tags
          </button>
          
          <button style={{
            background: 'transparent',
            color: 'white',
            border: '1px solid white',
            borderRadius: '20px',
            padding: '6px 16px',
            fontSize: '14px'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{marginRight: '4px'}}>
              <path d="M5 12h14M12 5v14" />
            </svg>
          </button>
          
          <button style={{
            background: '#EC4899',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '6px 16px',
            fontSize: '14px'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 9h6v6H9z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '4px',
        marginBottom: '8px'
      }}>
        <span style={{
          background: '#EC4899',
          borderRadius: '12px',
          padding: '4px 8px',
          fontSize: '12px'
        }}>
          Live
        </span>
        <span style={{
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '12px',
          padding: '4px 8px',
          fontSize: '12px'
        }}>
          Contest
        </span>
      </div>
      
      {/* Chat messages */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            background: '#64748b',
            flexShrink: 0
          }} />
          <div style={{ fontSize: '14px' }}>
            <p style={{ margin: 0, color: '#94a3b8' }}>nalavenkte - 18hr</p>
            <p style={{ margin: 0 }}>Liake ywe songahe</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            background: '#64748b',
            flexShrink: 0
          }} />
          <div style={{ fontSize: '14px' }}>
            <p style={{ margin: 0 }}>Panson</p>
          </div>
        </div>
        
        <div style={{ 
          alignSelf: 'flex-start', 
          maxWidth: '70%', 
          background: 'white', 
          color: 'black', 
          padding: '10px', 
          borderRadius: '16px', 
          fontSize: '14px' 
        }}>
          Per sesuage?
          This late sjwehs crnee ul sygtyjor
          nstie htew hsr you nutsns!
        </div>
        
        <div style={{ 
          alignSelf: 'flex-start', 
          maxWidth: '70%', 
          background: '#334155', 
          padding: '10px', 
          borderRadius: '16px', 
          fontSize: '14px',
          color: '#94a3b8'
        }}>
          Fjewiew qnj wrtde
          dhje hsgtjkhe.
        </div>
        
        <div style={{ 
          alignSelf: 'flex-end', 
          maxWidth: '70%', 
          background: '#334155', 
          padding: '10px', 
          borderRadius: '16px', 
          fontSize: '14px'
        }}>
          Hpwe Xweh and qrte yhkj
          kknni be pgsjhd gwdtube
        </div>
        
        <div style={{ marginTop: 'auto' }}>
          <div style={{ 
            color: '#94a3b8', 
            borderBottom: '1px solid #334155', 
            paddingBottom: '8px',
            fontSize: '14px',
            marginBottom: '12px'
          }}>
            <p style={{ margin: 0 }}>Here Seguto - 8:01 2019</p>
            <p style={{ margin: 0 }}>Lesw yjp with peok your hwr ❤️</p>
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-around', 
            marginTop: '8px',
            marginBottom: '8px'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path d="M9 22V12h6v10" />
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M20 12V4H4v8" />
              <path d="M2 16h20M12 12v8" />
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
            </svg>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px'
            }}>
              😊
            </div>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#EC4899',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              !
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ 
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}>
      {/* Mobile frame with demo content - removed controls */}
      <MobileFrame isPortrait={true} scale={1}>
        <DemoContent />
      </MobileFrame>
    </div>
  );
};

export default ModifiedMobileFrameDemo;