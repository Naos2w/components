import React from 'react';
import styles from './ThemeSwitch.module.scss';

interface ThemeSwitchProps {
  isDark: boolean;
  label: string;
  onToggle: () => void;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ isDark, label, onToggle }) => {
  return (
    <div className={styles.wrapper}>
      {label && <span className={`${styles.label} ${isDark ? styles.dark : ''}`}>{label}</span>}
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label="switch theme"
        className={`${styles.switch} ${isDark ? styles.dark : ''}`}
        onClick={onToggle}
      >
        {/* 左右兩側圖示 */}
        <div className={styles.icons}>
          <span role="img" aria-label="bright">☀️</span>
          <span role="img" aria-label="dark">🌙</span>
        </div>
        {/* 滑塊 */}
        <div className={styles.thumb} />
      </button>
    </div>
  );
};

export default ThemeSwitch;