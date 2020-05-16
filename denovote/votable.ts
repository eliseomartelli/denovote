import { Answer } from "./answer.ts";

class Votable {
  _id!: {
    $oid: string;
  };
  private _text: string;
  private _answers: Answer[];

  public get text(): string {
    return this._text;
  }

  public get answers(): Answer[] {
    return this._answers;
  }

  constructor(text: string, answers: Answer[]) {
    this._text = text;
    this._answers = answers;
  }

  public toJSON() {
    return {
      text: this._text,
      _id: this._id,
      answers: this._answers,
    };
  }
}

export { Votable, Answer };
