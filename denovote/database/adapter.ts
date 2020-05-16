import {Votable} from '../votable.ts'

interface Adapter {
    getVotables(): Votable[];
}

export { Adapter }