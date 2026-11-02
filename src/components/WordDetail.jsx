import { useState } from 'react';

export default function WordDetail({
  word,
  onAddSentence,
  onDeleteSentence,
  onEdit,
  onDelete,
  onBack,
}) {
  const [sentence, setSentence] = useState('');
  const [translation, setTranslation] = useState('');

  function handleAddSentence(e) {
    e.preventDefault();
    if (!sentence.trim()) return;
    onAddSentence(word.id, sentence.trim(), translation.trim());
    setSentence('');
    setTranslation('');
  }

  return (
    <div className="word-detail">
      <div className="detail-header">
        <button className="back-btn" onClick={onBack}>&larr; 返回</button>
        <div className="detail-actions">
          <button className="btn-edit" onClick={() => onEdit(word)}>编辑</button>
          <button className="btn-delete" onClick={() => onDelete(word.id)}>删除</button>
        </div>
      </div>

      <div className="detail-word">
        <h2>{word.word}</h2>
        <span className="detail-category">{word.category}</span>
      </div>
      <p className="detail-definition">{word.definition}</p>

      <div className="sentences-section">
        <h3>例句 ({word.sentences.length})</h3>

        <form className="add-sentence" onSubmit={handleAddSentence}>
          <input
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            placeholder="输入英文例句..."
          />
          <input
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            placeholder="中文翻译（可选）"
          />
          <button type="submit">添加</button>
        </form>

        <ul className="sentence-list">
          {word.sentences.length === 0 && (
            <li className="empty-hint">暂无例句，添加一个吧</li>
          )}
          {word.sentences.map((s) => (
            <li key={s.id} className="sentence-item">
              <div className="sentence-content">
                <p className="sentence-en">{s.sentence}</p>
                {s.translation && (
                  <p className="sentence-cn">{s.translation}</p>
                )}
              </div>
              <button
                className="sentence-delete"
                onClick={() => onDeleteSentence(word.id, s.id)}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
