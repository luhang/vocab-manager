import { useState } from 'react';

export default function WordForm({
  categories,
  onSave,
  onCancel,
  initial,
}) {
  const [word, setWord] = useState(initial?.word || '');
  const [definition, setDefinition] = useState(initial?.definition || '');
  const [category, setCategory] = useState(initial?.category || categories[0] || '默认');
  const [newCat, setNewCat] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!word.trim() || !definition.trim()) return;
    const cat = newCat.trim() || category;
    onSave(word.trim(), definition.trim(), cat);
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{initial ? '编辑单词' : '添加单词'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>单词</label>
            <input
              autoFocus
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="例如：ephemeral"
            />
          </div>
          <div className="form-group">
            <label>释义</label>
            <textarea
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              placeholder="例如：短暂的，转瞬即逝的"
              rows={3}
            />
          </div>
          <div className="form-group">
            <label>分类</label>
            <div className="category-select">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <input
                value={newCat}
                onChange={(e) => setNewCat(e.target.value)}
                placeholder="或输入新分类"
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              取消
            </button>
            <button type="submit" className="btn-primary">
              {initial ? '保存' : '添加'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
