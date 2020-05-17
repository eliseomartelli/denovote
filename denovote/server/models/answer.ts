class Answer {
  private _id: number;
  private _text: string;
  private _score: number;

  public get id(): number {
    return this._id;
  }

  public get text(): string {
    return this._text;
  }

  constructor(id: number, text: string, score: number = 0) {
    this._id = id;
    this._text = text;
    this._score = score;
  }

  public toJSON() {
    return {
      id: this._id,
      text: this._text,
      score: this._score,
    };
  }

  public get score(): number {
    return this._score;
  }

  public set score(v: number) {
    this._score = v;
  }
}

export { Answer };
