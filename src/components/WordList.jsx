export default function WordList({ words, onSelect, onAdd }) {
  return (
    <div className="word-list-container">
      <div className="list-header">
        <h3>单词列表</h3>
        <button className="btn-primary btn-add" onClick={onAdd}>
          + 添加单词
        </button>
      </div>

      {words.length === 0 ? (
        <div className="empty-state">
          <p>还没有单词</p>
          <button className="btn-primary" onClick={onAdd}>添加第一个单词</button>
        </div>
      ) : (
        <div className="word-grid">
          {words.map((w) => (
            <div
              key={w.id}
              className="word-card"
              onClick={() => onSelect(w)}
            >
              <div className="word-card-header">
                <h4>{w.word}</h4>
                <span className="word-card-category">{w.category}</span>
              </div>
              <p className="word-card-def">{w.definition}</p>
              <span className="word-card-count">
                {w.sentences.length} 个例句
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
