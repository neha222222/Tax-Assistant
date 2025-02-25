declare namespace chrome {
  namespace tabs {
    function query(
      queryInfo: object,
      callback: (result: chrome.tabs.Tab[]) => void
    ): void;
  }

  namespace runtime {
    function sendMessage(
      message: object,
      callback?: (response: any) => void
    ): void;

    // Add the 'connect' method definition
    function connect(
      connectInfo: {
        name?: string;
      }
    ): chrome.runtime.Port;

    const onMessage: {
      removeListener(handleMessage: (message: { type: string; height: React.SetStateAction<number | null>; }) => void): unknown;
      addListener(
        callback: (
          message: any,
          sender: chrome.runtime.MessageSender,
          sendResponse: (response?: any) => void
        ) => void
      ): void;
    };

    const lastError: any
  }

  namespace storage {
    interface StorageArea {
      get(
        keys: string | string[] | null,
        callback: (items: { [key: string]: any }) => void
      ): void;

      set(items: { [key: string]: any }, callback?: () => void): void;
    }
  }
}
