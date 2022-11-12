export class Logger {
  private dataLength: number;
  public sizeError: string;
  public typeError: string;

  constructor(length: number) {
    this.dataLength = length;
    this.sizeError = `Sample Size must be less than data length, current data has only ${this.dataLength} users`;
	this.typeError = "This is not a valid number or a percentage";
  }

  public log(error: string) {
    console.log(error);
  }
}
