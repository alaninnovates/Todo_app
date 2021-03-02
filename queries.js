module.exports = {
    addTodo: `INSERT INTO todos(title) VALUES(?)`,
    removeTodo: `DELETE FROM todos WHERE id=?`,
    getAll: `SELECT * FROM todos`,
    createTable: `CREATE TABLE IF NOT EXISTS todos(
                          id INT PRIMARY KEY auto_increment,
                          title VARCHAR(255)NOT NULL
                      )`,
};
