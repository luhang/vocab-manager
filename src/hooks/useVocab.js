import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { loadData, saveData } from '../utils/storage';

export function useVocab() {
  const [data, setData] = useState(() => loadData());

  const persist = useCallback((next) => {
    setData(next);
    saveData(next);
  }, []);

  const addWord = useCallback((word, definition, category) => {
    const next = {
      ...data,
      words: [
        ...data.words,
        {
          id: uuidv4(),
          word,
          definition,
          category: category || '默认',
          sentences: [],
          createdAt: Date.now(),
        },
      ],
    };
    persist(next);
  }, [data, persist]);

  const updateWord = useCallback((id, updates) => {
    const next = {
      ...data,
      words: data.words.map((w) => (w.id === id ? { ...w, ...updates } : w)),
    };
    persist(next);
  }, [data, persist]);

  const deleteWord = useCallback((id) => {
    persist({ ...data, words: data.words.filter((w) => w.id !== id) });
  }, [data, persist]);

  const addSentence = useCallback((wordId, sentence, translation) => {
    const next = {
      ...data,
      words: data.words.map((w) =>
        w.id === wordId
          ? {
              ...w,
              sentences: [
                ...w.sentences,
                { id: uuidv4(), sentence, translation, createdAt: Date.now() },
              ],
            }
          : w
      ),
    };
    persist(next);
  }, [data, persist]);

  const deleteSentence = useCallback((wordId, sentenceId) => {
    const next = {
      ...data,
      words: data.words.map((w) =>
        w.id === wordId
          ? { ...w, sentences: w.sentences.filter((s) => s.id !== sentenceId) }
          : w
      ),
    };
    persist(next);
  }, [data, persist]);

  const addCategory = useCallback((name) => {
    if (data.categories.includes(name)) return;
    persist({ ...data, categories: [...data.categories, name] });
  }, [data, persist]);

  const deleteCategory = useCallback((name) => {
    if (name === '默认') return;
    const next = {
      ...data,
      categories: data.categories.filter((c) => c !== name),
      words: data.words.map((w) =>
        w.category === name ? { ...w, category: '默认' } : w
      ),
    };
    persist(next);
  }, [data, persist]);

  return {
    words: data.words,
    categories: data.categories,
    addWord,
    updateWord,
    deleteWord,
    addSentence,
    deleteSentence,
    addCategory,
    deleteCategory,
  };
}
