USE todo_app;
CREATE TABLE IF NOT EXISTS todos (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255),
    description VARCHAR(255),
    due_date DATETIME,
    PRIMARY KEY (id)
);