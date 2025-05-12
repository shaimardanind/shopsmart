import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
    const createList = () => {
        const id = uuidv4();
        window.location.href = `/list/${id}`;
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <button onClick={createList} className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow">
                Создать новый список покупок
            </button>
        </div>
    );
}

export default App;
