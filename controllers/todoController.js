const db = require('../db.js');

/**
 * @description Get all todos
 * @Route GET /api/v1/todos
 *
 */
exports.getTodos = async function (req, res, next) {
  try {
    const c = await db;
    const [rows] = await c.execute('SELECT * FROM todos');

    res.status(200).json({
      success: true,
      message: 'Response of all todos',
      todosCount: rows.length,
      todos: rows,
    });
  } catch (error) {
    responseOnError(req, next, error);
  }
};

/**
 * @description Get single todo
 * @Route GET /api/v1/todo/:id
 *
 */
exports.getTodo = async function (req, res, next) {
  try {
    const isTodo = await checkIfTodoExists(req);
    if (!isTodo) {
      res.status(400).json({
        success: false,
        message: `No Todo found with the id ${req.params.id}`,
      });
    } else {
      const c = await db;
      const [rows] = await c.execute('SELECT * FROM todos WHERE id=?', [
        req.params.id,
      ]);
      res.status(200).json({
        success: true,
        message: `Response of the todo with the id of ${req.params.id}`,
        todo: rows,
      });
    }
  } catch (error) {
    responseOnError(req, next, error);
  }
};

/**
 * @description Create single todo
 * @Route POST /api/v1/todos
 *
 */
exports.createTodo = async function (req, res, next) {
  try {
    const c = await db;
    const [rows] = await c.execute(
      `
      INSERT INTO todos(title, description, due_date)
      VALUES (?, ?, ?)
      `,
      [req.body.title, req.body.description, req.body.dueDate]
    );

    res.status(201).json({
      success: true,
      message: `Created the todo with the id of ${rows.insertId}`,
    });
  } catch (error) {
    responseOnError(req, next, error);
  }
};

/**
 * @description Update single todo
 * @Route PUT /api/v1/todos
 *
 */
exports.updateTodo = async function (req, res, next) {
  try {
    const isTodo = await checkIfTodoExists(req);
    if (!isTodo) {
      res.status(400).json({
        success: false,
        message: `No Todo found with the id ${req.params.id}`,
      });
    } else {
      const c = await db;
      const [rows] = await c.execute(
        `
      UPDATE todos SET 
        title=?,
        description=?,
        due_date=?  
      WHERE id=?
      `,
        [req.body.title, req.body.description, req.body.dueDate, req.params.id]
      );

      res.status(200).json({
        success: true,
        message: `Updated the todo with the id of ${req.params.id}`,
      });
    }
  } catch (error) {
    responseOnError(req, next, error);
  }
};

/**
 * @description Delete single todo
 * @Route DELETE /api/v1/todo/:id
 *
 */
exports.deleteTodo = async function (req, res, next) {
  try {
    const c = await db;
    const [rows] = await c.execute('DELETE FROM todos WHERE id=?', [
      req.params.id,
    ]);

    res.status(200).json({
      success: true,
      message: `Deleted the todo with the id of ${req.params.id}`,
    });
  } catch (error) {
    responseOnError(req, next, error);
  }
};

/** HELPER FUNCTIONS */

/**
 * @function responseOnError
 * @description This function handle the error response inside the catch block
 * @param {*} req
 * @param {*} next
 * @param {*} error
 */
function responseOnError(req, next, error) {
  const err = new Error(`Request Error - ${req.originalUrl}`);
  process.env.NODE_ENV === 'production' ? next(err) : next(error);
}

/**
 * @function checkIfTodoExists
 * @description This function send a query to the db to check of todo with given id exists
 * @param {*} req
 * @returns true if todo exists
 */
async function checkIfTodoExists(req) {
  try {
    const c = await db;
    const res = await c.execute(
      'SELECT EXISTS(SELECT id FROM todos WHERE id=?) AS isTodo',
      [req.params.id]
    );

    if (res[0][0].isTodo) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    next(error);
  }
}
