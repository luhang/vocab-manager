import { useState } from 'react';

export default function Sidebar({
  categories,
  activeCategory,
  onSelectCategory,
  onAddCategory,
  onDeleteCategory,
  search,
  onSearchChange,
  wordCount,
}) {
  const [newCat, setNewCat] = useState('');
  const [editing, setEditing] = useState(null);

  function handleAdd() {
    const name = newCat.trim();
    if (name) {
      onAddCategory(name);
      setNewCat('');
    }
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Vocab Manager</h2>
        <span className="word-count">{wordCount} 个单词</span>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="搜索单词或释义..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="category-section">
        <div className="category-header">
          <h3>分类</h3>
        </div>
        <ul className="category-list">
          <li
            className={activeCategory === null ? 'active' : ''}
            onClick={() => onSelectCategory(null)}
          >
            <span>全部</span>
          </li>
          {categories.map((cat) => (
            <li
              key={cat}
              className={activeCategory === cat ? 'active' : ''}
              onClick={() => onSelectCategory(cat)}
            >
              {editing === cat ? (
                <input
                  autoFocus
                  value={cat}
                  onChange={(e) => setEditing(e.target.value)}
                  onBlur={() => setEditing(null)}
                  onKeyDown={(e) => e.key === 'Enter' && setEditing(null)}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <span>{cat}</span>
              )}
              {cat !== '默认' && (
                <button
                  className="cat-delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteCategory(cat);
                  }}
                >
                  &times;
                </button>
              )}
            </li>
          ))}
        </ul>
        <div className="add-category">
          <input
            type="text"
            placeholder="新分类名称"
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button onClick={handleAdd}>+</button>
        </div>
      </div>
    </aside>
  );
}
