import React, { useState } from 'react';

const AddUser = ({ handleAddUser }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);

    const handleClick = (event) => {
        console.log("ten:", name);
        console.log("tuoi:", age);
        console.log(event);
        // Set state
        setName("datdzvodich");
        setAge(Math.random() * 100);
    }

    const handleSubmit = (event) => {
        var a = window.confirm("submit??");
        if (a) {
            setName("datdzvodichonsumit");
        }
        event.preventDefault();
        console.log("ten:", name);
        console.log("tuoi:", age);
        console.log({ name, age });
    }

    const handleChange1 = (event) => {
        setName(event.target.value);
        
    }
    const handleChange2 = (event) => {
        setAge(event.target.value);
        
    }
    return (
        <div>
            <div>
                <label>
                    Add user
                    <br></br>
                       <div>
                        My name:{name}
                        <br></br>
                        My age:{age}
                       </div>
                 </label>
                <form onSubmit={(event) => handleAddUser(event)}>
                    <input type="text" name="name" onChange={handleChange1} />
                    <input type="number" name="age" onChange={handleChange2} />
                    <button type="submit">
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddUser;
