import { QueryTabsResponse } from './types';

export const fetchTabUrl = (): Promise<QueryTabsResponse> =>
  new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action: 'queryTabs' }, (response: QueryTabsResponse | PromiseLike<QueryTabsResponse>) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve(response);
      }
    });
  });


export const convertVideoDurationToSeconds = (videoDurationContent: string): Boolean => {
  const durationParts = videoDurationContent.split(':');
  let totalSeconds = 0;

  if (durationParts.length === 3) {
    totalSeconds += parseInt(durationParts[0]) * 3600;
  }

  totalSeconds += parseInt(durationParts[durationParts.length - 2]) * 60;
  totalSeconds += parseInt(durationParts[durationParts.length - 1]);

  if(totalSeconds <= 480){
    return true;
  }

  return false;
};
