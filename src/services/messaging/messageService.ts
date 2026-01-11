/**
 * Centralized messaging service for Chrome extension messaging.
 * Provides methods for sending messages to content scripts and handling message listeners.
 */

import { MessagePayload } from "../../types";

/**
 * Sends a message to a single tab.
 * @param tabId - Tab ID to send message to
 * @param message - Message payload to send
 * @returns Promise that resolves when message is sent
 */
async function sendMessageToTab(tabId: number, message: MessagePayload): Promise<void> {
  return new Promise<void>((resolve) => {
    chrome.tabs.sendMessage(tabId, message, () => {
      if (chrome.runtime.lastError) {
        // Ignore errors for tabs that can't receive messages (e.g., chrome:// pages)
      }
      resolve();
    });
  });
}

/**
 * Sends a message to all open tabs (content scripts).
 * @param message - Message payload to send
 * @returns Promise that resolves when all messages are sent
 */
export async function sendMessageToAllTabs(message: MessagePayload): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    chrome.tabs.query({}, async (tabs) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }

      try {
        const sendPromises = tabs
          .filter((tab) => tab.id !== undefined)
          .map((tab) => sendMessageToTab(tab.id!, message));

        await Promise.all(sendPromises);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
}
