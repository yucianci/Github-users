import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    axios.get('https://api.github.com/users').then((response) => {
      setUsers(response.data);
    })
  }, [])
  console.log(selectedUser)
  console.log(users, selectedUser);

  const getRepo = (user) => {
    setSelectedUser(user)
    axios.get(`https://api.github.com/users/${user.login}/repos`).then((response) => {
      setRepos(response.data);
      console.log(response.data);
    })
  };

  return (
    <div className="App">
      <header className="App-header">
        {users.map((user) => {
          return (
            <div className="perfil-section" key={user.id} >
              <p className="username">{user.login}</p>
              <img className="perfil-img" src={user.avatar_url} />
              <p className="userID" >ID: {user.id}<br /></p>
              <div className="wrapper">
                <div className="button">
                  <div className="icon">
                    <i><a className="wrapper-link" href={user.html_url} target="_blank" rel="external"><img src="github.png" alt="github-icon" width="25px" height="25px"/></a></i>
                  </div>
                  <span><a className="wrapper-link" href={user.html_url} target="_blank" rel="external">Github</a></span>
                </div>
                <div className="button" onClick={() => getRepo(user)}>
                  <div className="icon">
                    <i><a className="wrapper-link-repo"><img src="search.png" alt="repo-icon" width="25px" height="25px"/></a></i>
                  </div>
                  <span><a className="wrapper-link-repo">Repositórios</a></span>
                </div>
              </div>
            </div>
          )
        })}
        {selectedUser && (
          <div className="window-repos" onClick={() => setSelectedUser(null)}>
            <div className="content-window">
              <table className="content-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>URL do Repositório</th>
                  </tr>
                </thead>
                <tbody>
                  {repos.map((repoData) => {
                    return (
                      <tr key={repoData.id}>
                        <td>{repoData.id}</td>
                        <td>{repoData.name}</td>
                        <td>{repoData.url}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <button className="content-button" onClick={() => setSelectedUser(null)}>Fechar</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
