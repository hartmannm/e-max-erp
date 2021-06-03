export default interface IDatabase<C> {

  createConnection(): Promise<void>;

  getConnection(): C;

  isConnected(): boolean;

}
