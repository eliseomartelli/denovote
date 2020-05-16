import { Adapter } from './adapter.ts';
import { DB, save, open } from "https://deno.land/x/sqlite/mod.ts";
import {Votable} from '../votable.ts'



class SQLite implements Adapter {

    private _db!: DB;
    private _file: string;

    constructor(file: string) {
        this._file = file;
    }

    async initDB() {
        this._db = await open(this._file);
        this._db.query(
            "CREATE TABLE IF NOT EXISTS votables \
            (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)", 
            []);
        await save(this._db);
    }

    getVotables(): Votable[] {
        console.log(this._db.query("SELECT * FROM votables",[]));
        return [new Votable(0,"",[])];
    }
    
}

export { SQLite };