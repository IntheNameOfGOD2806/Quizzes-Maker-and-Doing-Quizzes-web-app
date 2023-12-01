import React, { useState, useEffect } from 'react';
import AddUser from './AddUser';
import DisplayInfo from './DisplayInfo';
const MyComponent = () => {
    const [listUsers, setListUsers] = useState([
        { id: 1, name: "dat", age: 12 },
        { id: 2, name: "dat1", age: 13 },
        { id: 3, name: "dat2", age: 14 }
    ]);
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const handleAddUser = (event) => {
        event.preventDefault();
        const user = {
            id: Math.floor(Math.random() * 100),
            name: event.target.name.value,
            age: event.target.age.value
        }
        setListUsers([user, ...listUsers]);
    }
    const handleClick = (event) => {
        console.log("ten:", name);
        console.log("tuoi:", age);
        console.log(event);
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
    const handleChange = (event) => {
        setName(event.target.value);
        setAge(Math.random() * 100);
    }
    const handleDeleteUser = (event, userId) => {
        const newlist = listUsers.filter(user => user.id !== userId);
        setListUsers(newlist);
    }
    useEffect(() => {
        if (listUsers.length === 0) { console.log(">>> expired"); }
    }, [listUsers])
    return (
        <>
            <AddUser handleAddUser={handleAddUser}></AddUser>
            <DisplayInfo listUsers={listUsers} handleDeleteUser={handleDeleteUser} ></DisplayInfo>
        </>
    );
}
export default MyComponent;
