import React, { useCallback } from 'react';
import { promises as fs } from 'fs';
import electron from 'electron';

import { DomainGraph } from 'domain-graph';
import { DataProvider, OpenFilesResult } from 'domain-graph/lib/data-provider';

export const App: React.VFC = () => {
  const handleDrop = useCallback(async () => {
    return true;
  }, []);

  const handleShowOpenDialog = useCallback(async () => {
    const value = await electron.remote.dialog.showOpenDialog({
      properties: ['openFile'],
    });

    const buffers = await Promise.all(
      value.filePaths.map((filePath) => fs.readFile(filePath)),
    );

    const result: OpenFilesResult = {
      canceled: value.canceled,
      files: buffers.map((buffer, i) => ({
        filePath: value.filePaths[i],
        contents: buffer.toString(),
      })),
    };

    return result;
  }, []);

  return (
    <DataProvider onDrop={handleDrop} onShowOpenDialog={handleShowOpenDialog}>
      {(introspection) => <DomainGraph introspection={introspection} />}
    </DataProvider>
  );
};
