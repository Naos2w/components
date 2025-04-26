import React, { useState, } from 'react';
import styles from './JsonToTable.module.scss';
import { FiMoreVertical } from 'react-icons/fi';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import ThemeSwitch from './ThemeSwitch';

{/* <JsonToTable data={someData} />              // 🔕 不會顯示 opt 功能
<JsonToTable data={someData} opt />          // ✅ 顯示 opt 功能
<JsonToTable data={someData} opt={true} />   // ✅ 同上
<JsonToTable data={someData} opt={false} />  // 🔕 不會顯示 opt 功能 */}

interface JsonToTableProps {
  data: Record<string, any>[];
  opt?: boolean;
}

type SortOrder = 'asc' | 'desc' | null;

const JsonToTable: React.FC<JsonToTableProps> = ({ data, opt }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  const sortedData = React.useMemo(() => {
    if (!data || data.length === 0) return [];
    if (!sortBy || !sortOrder) return data;
    return [...data].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortBy, sortOrder]);

  if (!data || data.length === 0)
    return <p className={styles.empty}>No data available</p>;

  const handleSort = (header: string) => {
    if (sortBy !== header) {
      setSortBy(header);
      setSortOrder('asc');
    } else {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'));
      if (sortOrder === 'desc') setSortBy(null);
    }
  };

  return (
    <div className={`${styles.wrapper} ${isDarkMode ? styles.dark : ''}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            {opt && (
              <th className={styles.actionCol}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                className={styles.menuButton}
              >
                <FiMoreVertical />
              </button>
              {showMenu && (
                <ul className={styles.menuList}>
                  <li className={styles.menuItem}>
                    <ThemeSwitch
                      isDark={isDarkMode}
                      label="Switch Theme"
                      onToggle={() => setIsDarkMode(!isDarkMode)}
                    />
                  </li>
                </ul>
              )}
            </th>
            )}
            <th className={styles.indexCol}>#</th>
            {headers.map((header) => (
              <th key={header} onClick={() => handleSort(header)} style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
                  {header}
                  <span>
                    {sortBy === header && sortOrder === 'asc' && <FiChevronUp size={14} />}
                    {sortBy === header && sortOrder === 'desc' && <FiChevronDown size={14} />}
                    {sortBy !== header && (
                      <>
                        <FiChevronUp size={10} style={{ opacity: 0.4 }} />
                        <FiChevronDown size={10} style={{ opacity: 0.4, marginLeft: -10 }} />
                      </>
                    )}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, idx) => (
            <tr key={idx}>
              <td className={styles.actionCol}></td>
              <td className={styles.indexCol}>{idx + 1}</td>
              {headers.map((header) => (
                <td key={header}>{String(row[header])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JsonToTable;
