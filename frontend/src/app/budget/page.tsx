// frontend/src/app/budget/page.tsx
'use client';

import { useState } from 'react';

type BudgetItem = {
  category: string;
  item: string;
  cost: number;
};

export default function Budget() {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    { category: 'Pre-Production', item: 'Screenwriting', cost: 5000 },
    { category: 'Production', item: 'Camera Equipment', cost: 10000 },
    { category: 'Production', item: 'Lighting Equipment', cost: 5000 },
    { category: 'Post-Production', item: 'Editing', cost: 8000 },
  ]);
  
  const [newItem, setNewItem] = useState<BudgetItem>({
    category: 'Pre-Production',
    item: '',
    cost: 0
  });

  const handleAddItem = () => {
    if (newItem.item && newItem.cost > 0) {
      setBudgetItems([...budgetItems, newItem]);
      setNewItem({
        category: 'Pre-Production',
        item: '',
        cost: 0
      });
    }
  };

  const handleDeleteItem = (index: number) => {
    const updatedItems = [...budgetItems];
    updatedItems.splice(index, 1);
    setBudgetItems(updatedItems);
  };

  const categories = ['Pre-Production', 'Production', 'Post-Production', 'Marketing'];
  
  const totalBudget = budgetItems.reduce((sum, item) => sum + item.cost, 0);

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Film Budget Calculator</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-3">Budget Items</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Category</th>
                  <th className="border p-2 text-left">Item</th>
                  <th className="border p-2 text-right">Cost ($)</th>
                  <th className="border p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {budgetItems.map((item, index) => (
                  <tr key={index}>
                    <td className="border p-2">{item.category}</td>
                    <td className="border p-2">{item.item}</td>
                    <td className="border p-2 text-right">${item.cost.toLocaleString()}</td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => handleDeleteItem(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-bold">
                  <td className="border p-2" colSpan={2}>Total</td>
                  <td className="border p-2 text-right">${totalBudget.toLocaleString()}</td>
                  <td className="border p-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-3">Add New Item</h2>
          <div className="space-y-4 p-4 border rounded-md">
            <div>
              <label htmlFor="category" className="block mb-1">Category:</label>
              <select
                id="category"
                className="w-full p-2 border rounded-md"
                value={newItem.category}
                onChange={(e) => setNewItem({...newItem, category: e.target.value})}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="item" className="block mb-1">Item Description:</label>
              <input
                id="item"
                type="text"
                className="w-full p-2 border rounded-md"
                value={newItem.item}
                onChange={(e) => setNewItem({...newItem, item: e.target.value})}
              />
            </div>
            
            <div>
              <label htmlFor="cost" className="block mb-1">Cost ($):</label>
              <input
                id="cost"
                type="number"
                className="w-full p-2 border rounded-md"
                value={newItem.cost || ''}
                onChange={(e) => setNewItem({...newItem, cost: parseFloat(e.target.value) || 0})}
                min="0"
              />
            </div>
            
            <button
              onClick={handleAddItem}
              className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={!newItem.item || newItem.cost <= 0}
            >
              Add Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}