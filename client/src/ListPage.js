import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

function ListPage() {
    const { id } = useParams();
    const [items, setItems] = useState([]);
    const [input, setInput] = useState('');
    const [prompt, setPrompt] = useState('');

    useEffect(() => {
        socket.emit('join', id);
        fetchItems();

        socket.on('update', data => {
            setItems(data);
        });

        return () => socket.off('update');
    }, [id]);

    const fetchItems = async () => {
        const res = await fetch(`http://localhost:4000/api/${id}`);
        const data = await res.json();
        if (data.items) setItems(data.items);
    };

    const addItem = async () => {
        await fetch(`http://localhost:4000/api/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item: input })
        });
        setInput('');
    };

    const toggleItem = async (index) => {
        await fetch(`http://localhost:4000/toggle/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ index })
        });
    };

    const generateList = async () => {
        await fetch(`http://localhost:4000/ai/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });
        setPrompt('');
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Список покупок</h1>
            <div className="flex mb-2 gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Добавить товар"
                    className="flex-1 border px-3 py-2 rounded"
                />
                <button onClick={addItem} className="bg-green-500 text-white px-4 py-2 rounded">
                    +
                </button>
            </div>
            <ul className="mb-4">
                {items.map((item, idx) => (
                    <li
                        key={idx}
                        onClick={() => toggleItem(idx)}
                        className={`cursor-pointer px-2 py-1 rounded ${item.bought ? 'line-through text-gray-500' : ''}`}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    placeholder="Пример: купить продукты для борща"
                    className="flex-1 border px-3 py-2 rounded"
                />
                <button onClick={generateList} className="bg-purple-500 text-white px-4 py-2 rounded">
                    🤖
                </button>
            </div>
        </div>
    );
}

export default ListPage;
