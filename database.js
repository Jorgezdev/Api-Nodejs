import sql from 'mssql';

export default class Database {
  poolConnection = null;
  connected = false;

  constructor(config) {
    this.config = config;
    console.log(`Database config: ${JSON.stringify(config)}`);
  }

  async connect() {
    try {
      console.log('Database connecting...');
      if (this.connected === false) {
        this.poolConnection = await sql.connect(this.config);
        this.connected = true;
        console.log('Database connection successful');
      } else {
        console.log('Database already connected');
      }
    } catch (error) {
      console.error(`Error connecting to database: ${JSON.stringify(error)}`);
    }
  }

  async disconnect() {
    try {
      await this.poolConnection.close();
      console.log('Database connection closed');
    } catch (error) {
      console.error(`Error closing database connection: ${error}`);
    }
  }

  async readAll() {
    await this.connect();
    const request = this.poolConnection.request();
    const result = await request.query('SELECT * FROM dbo.tasks');
    return result.recordsets[0];
  }

  async create(data) {
    await this.connect();
    const request = this.poolConnection.request();

    request.input('description', sql.NVarChar(255), data.description);
    request.input('dateCreated', sql.DateTime, data.dateCreated);
    request.input('isCompleted', sql.Bit, data.isCompleted);
    request.input('dateCompleted', sql.DateTime, data.dateCompleted);

    const result = await request.query(`
      INSERT INTO dbo.tasks (description, dateCreated, isCompleted, dateCompleted)
      VALUES (@description, @dateCreated, @isCompleted, @dateCompleted)
    `);

    return result.rowsAffected[0];
  }

  async update(id, data) {
    await this.connect();
    const request = this.poolConnection.request();

    request.input('id', sql.Int, id);
    request.input('description', sql.NVarChar(255), data.description);
    request.input('dateCreated', sql.DateTime, data.dateCreated);
    request.input('isCompleted', sql.Bit, data.isCompleted);
    request.input('dateCompleted', sql.DateTime, data.dateCompleted);

    const result = await request.query(`
      UPDATE dbo.tasks
      SET description=@description,
          dateCreated=@dateCreated,
          isCompleted=@isCompleted,
          dateCompleted=@dateCompleted
      WHERE id = @id
    `);

    return result.rowsAffected[0];
  }
}
