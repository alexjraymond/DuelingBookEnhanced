export function splitActions(action: string) {
  return action.includes('/') ? action.split('/') : [action];
}
