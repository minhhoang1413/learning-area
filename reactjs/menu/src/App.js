import { useState } from 'react';
import './App.css';
import Categories from './Categories';
import items from './data'
import Menu from './Menu';

const allCategories = ['all']
items.forEach(i => {
  if (!allCategories.includes(i.category)) {
    allCategories.push(i.category)
  }
})

function App() {
  const [menuItems, setMenuItems] = useState(items)
  const [categories, setCategories] = useState(allCategories)
  
  const filterCategory = (category) => {
    if (category === 'all') {
      setMenuItems(items)
      return
    }
    setMenuItems( items.filter(item => item.category === category))

  } 
  return (
    <main>
      <section className="menu section">
        <div className="title">
          <h2>our menu</h2>
          <div className="underline"></div>
        </div>
        <Categories categories={categories} filterCategory={filterCategory} />
        <Menu items={menuItems} />
      </section>
    </main>
  );
}

export default App;
