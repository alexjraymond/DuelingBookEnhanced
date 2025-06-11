declare global {
  interface Window {
    stepBackwardE?: () => void;
    _stepBackwardE?: () => void;
  }
}

export {}; // This makes the file a module 