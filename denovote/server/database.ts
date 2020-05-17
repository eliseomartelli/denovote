import { init, MongoClient } from "https://deno.land/x/mongo@v0.6.0/mod.ts";

await init();

const dbName = Deno.env.get("DB_NAME") || "denovote";
const dbUrl = Deno.env.get("DB_HOST_URL") || "localhost:27017";

console.log(dbUrl);

class DB {
  public client: MongoClient;
  constructor(public dbName: string, public url: string) {
    this.dbName = dbName;
    this.url = url;
    this.client = {} as MongoClient;
    this.connect();
  }
  connect() {
    const client = new MongoClient();
    // client.connectWithOptions({
    //   hosts: [this.url],
    //   username: Deno.env.get("DB_USER") || "root",
    //   password: Deno.env.get("DB_PASS") || "root",
    //   directConnection: true,
    //   appName: "DenoVote"
    // });
    client.connectWithUri("mongodb://" + this.url);
    this.client = client;
  }
  public getDatabase() {
    return this.client.database(this.dbName);
  }
}

const db = new DB(dbName, dbUrl);

export default db;
