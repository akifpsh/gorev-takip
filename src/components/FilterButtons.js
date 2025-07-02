// FilterButtons.js: Lets user filter tasks by all, completed, or active.

function FilterButtons({filter, setFilter }) {
  return (
     <div className="filter-bar">
      <button onClick={() => setFilter('all')} style={{fontWeight: filter === 'all' ? 'bold' : 'normal'}}>Tümü</button>
      <button onClick={() => setFilter('completed')} style={{fontWeight: filter === 'completed' ? 'bold' : 'normal'}}>Tamamlananlar</button>
      <button onClick={() => setFilter('active')} style={{fontWeight: filter === 'active' ? 'bold' : 'normal'}}>Tamamlanmamışlar</button>
    </div>
  );
}

export default FilterButtons;
