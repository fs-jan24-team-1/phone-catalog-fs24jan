import React from 'react';
import { useTheme } from '../../hooks/useTheme';

export const Theme = () => {
  const { theme, setTheme } = useTheme();

  const handleLightThemeClick = () => {
    setTheme('light');
    console.log(theme);
  };
  const handleDarkThemeClick = () => {
    setTheme('dark');
    console.log(theme);
  };

  return (
    <div>
      <button onClick={handleDarkThemeClick}>dark</button>
      <button onClick={handleLightThemeClick}>light</button>
    </div>
  );
};
