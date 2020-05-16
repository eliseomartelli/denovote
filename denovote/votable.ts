import { Answer } from "./answer.ts";

class Votable {
  private _id: number;
  private _text: string;
  private _answers: Answer[];

  public get id(): number {
    return this._id;
  }

  public get text(): string {
    return this._text;
  }

  public get answers(): Answer[] {
    return this._answers;
  }

  constructor(id: number, text: string, answers: Answer[]) {
    this._id = id;
    this._text = text;
    this._answers = answers;
  }

  public toJSON() {
    return {
      text: this._text,
      id: this._id,
      answers: this._answers,
    };
  }
}

export { Votable, Answer };
