import React, { useState, useEffect } from 'react'
import UserTable from './tables/UserTable'
import AddUserForm from './tables/AddUserForm'
import EditUserForm from './tables/EditUserForm'

const App = () => {

  const initialFormState = { id: null, name: '', username: '' }

  // const usersData = [
  //   { id: 1, name: 'Tania', username: 'floppydiskette' },
  //   { id: 2, name: 'Craig', username: 'siliconeidolon' },
  //   { id: 3, name: 'Ben', username: 'benisphere' },
  // ]

  const [users, setUsers] = useState([])
  // const [users, setUsers] = useState(usersData)
  const [editing, setEditing] = useState(false)
  const [currentUser, setCurrentUser] = useState(initialFormState)

  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Erreur lors du fetch des utilisateurs:', error));
  }, []); // Le tableau vide indique que cet effet ne dépend d'aucune valeur et ne s'exécutera donc qu'une fois, au montage du composant.

  const addUser = (user) => {
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then(data => {
      setUsers([...users, data]);
    })
    .catch(error => console.error('Erreur lors de l\'ajout d\'un utilisateur:', error));
  };  
  // const addUser = (user) => {
  //   user.id = users.length + 1
  //   setUsers([...users, user])
  // }

  const deleteUser = (id) => {
    fetch(`/api/users/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      setUsers(users.filter(user => user.id !== id));
    })
    .catch(error => console.error('Erreur lors de la suppression d\'un utilisateur:', error));
  };  
  // const deleteUser = (id) => {
  //   setUsers(users.filter((user) => user.id !== id))
  // }

  const editRow = (user) => {
    setEditing(true)
  
    setCurrentUser({ id: user.id, name: user.name, username: user.username })
  }

  const updateUser = (id, updatedUser) => {
    fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
    .then(response => response.json())
    .then(() => {
      setUsers(users.map(user => (user.id === id ? updatedUser : user)));
    })
    .catch(error => console.error('Erreur lors de la mise à jour d\'un utilisateur:', error));
  };  
  // const updateUser = (id, updatedUser) => {
  //   setEditing(false)
  
  //   setUsers(users.map((user) => (user.id === id ? updatedUser : user)))
  // }

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
      <div className="flex-large">
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  )
}

export default App