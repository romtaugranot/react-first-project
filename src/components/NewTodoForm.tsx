import { useState } from "react";

export function NewTodoForm(props: { onSubmit: (arg0: string) => void; }) {
    const [newItem, setNewItem] = useState<string>("");
    
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (newItem === "") return
    
        props.onSubmit(newItem)
    
        setNewItem(""); // Clear the input field after adding a new todo
    }

    return <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            id="item"
          />
        </div>
    <button className="btn" type="submit">Add</button>
    </form>
}