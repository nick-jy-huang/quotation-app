import {
  handleGetLocaleStorage,
  handleSaveLocaleStorage,
  handleSaveExportPDFToLocal,
} from '@/utils/saveLocaleStorage';

describe('handleSaveLocaleStorage & handleGetLocaleStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should save and get object correctly', () => {
    const obj = { a: 1, b: 'test' };
    handleSaveLocaleStorage('testKey', obj);
    const result = handleGetLocaleStorage('testKey');
    expect(result).toEqual(obj);
  });

  it('should save and get string correctly', () => {
    handleSaveLocaleStorage('strKey', 'hello');
    expect(handleGetLocaleStorage('strKey')).toBe('hello');
  });

  it('should save and get number correctly', () => {
    handleSaveLocaleStorage('numKey', 123);
    expect(handleGetLocaleStorage('numKey')).toBe(123);
  });

  it('should return null if key not found', () => {
    expect(handleGetLocaleStorage('notExist')).toBeNull();
  });
});

describe('handleSaveExportPDFToLocal', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should add current to history and keep max 10', () => {
    for (let i = 0; i < 12; i++) {
      handleSaveExportPDFToLocal({ id: i });
    }
    const history = handleGetLocaleStorage('quotation_history');
    expect(history.length).toBe(10);
    expect(history[0].id).toBe(11);
    expect(history[9].id).toBe(2);
  });
});
