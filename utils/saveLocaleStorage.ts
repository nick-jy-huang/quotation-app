export function handleGetLocaleStorage(key: string) {
  const data = localStorage.getItem(key);
  if (!data) return null;
  return JSON.parse(data);
}

export function handleSaveLocaleStorage(key: string, value: object | string | number) {
  const data = JSON.stringify(value);
  localStorage.setItem(key, data);
}

export function handleSaveExportPDFToLocal(current: object) {
  const historyKey = 'quotation_history';
  let history = [];

  history = handleGetLocaleStorage(historyKey || []);

  if (!history || history?.length === 0) {
    history = [current];
  } else {
    history.unshift(current);
  }

  if (history.length > 10) history = history.slice(0, 10);
  handleSaveLocaleStorage(historyKey, history);
}
