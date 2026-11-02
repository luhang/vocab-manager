import { useState, useMemo } from 'react';
import { useVocab } from './hooks/useVocab';
import Sidebar from './components/Sidebar';
import WordList from './components/WordList';
import WordDetail from './components/WordDetail';
import WordForm from './components/WordForm';
import './App.css';

export default function App() {
  const vocab = useVocab();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editWord, setEditWord] = useState(null);

  const filteredWords = useMemo(() => {
    let result = vocab.words;
    if (activeCategory) {
      result = result.filter((w) => w.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (w) =>
          w.word.toLowerCase().includes(q) ||
          w.definition.toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => b.createdAt - a.createdAt);
  }, [vocab.words, activeCategory, search]);

  function handleSave(word, definition, category) {
    if (editWord) {
      vocab.updateWord(editWord.id, { word, definition, category });
      setEditWord(null);
    } else {
      vocab.addWord(word, definition, category);
    }
    setShowForm(false);
  }

  function handleEdit(word) {
    setEditWord(word);
    setShowForm(true);
  }

  function handleDelete(id) {
    vocab.deleteWord(id);
    setSelectedWord(null);
  }

  return (
    <div className="app">
      <Sidebar
        categories={vocab.categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onAddCategory={vocab.addCategory}
        onDeleteCategory={vocab.deleteCategory}
        search={search}
        onSearchChange={setSearch}
        wordCount={vocab.words.length}
      />

      <main className="main-content">
        {selectedWord ? (
          <WordDetail
            word={vocab.words.find((w) => w.id === selectedWord.id) || selectedWord}
            onAddSentence={vocab.addSentence}
            onDeleteSentence={vocab.deleteSentence}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onBack={() => setSelectedWord(null)}
          />
        ) : (
          <WordList
            words={filteredWords}
            onSelect={setSelectedWord}
            onAdd={() => {
              setEditWord(null);
              setShowForm(true);
            }}
          />
        )}
      </main>

      {showForm && (
        <WordForm
          categories={vocab.categories}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditWord(null);
          }}
          initial={editWord}
        />
      )}
    </div>
  );
}
