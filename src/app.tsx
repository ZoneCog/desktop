import React, { useCallback, useMemo } from 'react';
import electron from 'electron';

export const App: React.FC<{}> = () => {
  const randomNumber = useMemo(() => Math.random(), []);

  const handleClick = useCallback(async () => {
    const value = await electron.remote.dialog.showOpenDialog({
      properties: ['openFile'],
    });

    console.log(value.canceled, value.filePaths);
  }, []);

  return (
    <>
      Hello from React!
      <h1>Random number: {randomNumber}</h1>
      <button onClick={handleClick}>open files</button>
    </>
  );
};
