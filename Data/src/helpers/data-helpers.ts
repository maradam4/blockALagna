import fs from "fs";
import ObjectsToCsv from "objects-to-csv";
import { Logger } from "./logger";

import { IUserDataWithProps, RawUserData } from "./types";

export class DataHelpers {
  private userData: IUserDataWithProps[];
  private logger: Logger;
  constructor(private data: RawUserData[], private Logger: Logger) {
    this.userData = JSON.parse(JSON.stringify(data));
    this.logger = Logger;
  }
  /**
   * a get accessor to manipulated data
   *
   */
  get users() {
    return this.userData;
  }

  /**
   * a get accessor to data length
   *
   */
  get dataSize() {
    return this.userData.length;
  }

  /**
   * a method to get only a random sample of data
   *
   * @param {number|string} sampleSize default is half the original size
   * @example getRandomSample(50); // get only 50 users
   *
   * @example getRandomSample('50%'); // get 50% of the original size
   *
   */
  public getRandomSample(sampleSize: number | string = this.dataSize / 2) {
    if (typeof sampleSize === "number" && sampleSize > this.userData.length) {
      this.logger.log(this.logger.sizeError);
      return;
    }

    let size = sampleSize;
    if (typeof sampleSize === "string") {
      size = this.getPercentageSize(sampleSize);
      if (!size) {
		this.logger.log(this.logger.typeError);
        return;
      }
    }

    const dataCopy = JSON.parse(JSON.stringify(this.userData));
    const sample: IUserDataWithProps[] = [];

    for (let n = 0; n < size; n++) {
      const rndm = this.generateRandomNumber(dataCopy.length);

      sample.push(dataCopy[rndm]);
      dataCopy.splice(rndm, 1);
    }

    return sample;
  }

  /**
   * appends a link property with calculated value to current instance of data
   *
   * @param prop takes a value of link type: linkId (by user id) or link (by username)
   *
   */
  public appendLink(prop: "linkId" | "link") {
    switch (prop) {
      case "linkId": {
        this.userData.forEach((user) => {
          user.linkId = this.getLinkById(user.id);
        });
        break;
      }
      case "link": {
        this.userData.forEach((user) => {
          user.link = this.getLinkByUsername(user.username);
        });
        break;
      }
    }
  }

  /**
   * appends additional props with given value to current instance of data
   *
   * @param {string} propName property name
   * @param {Function} callbackFn a function used to calculate the prop value
   * @param {keyof RawUserData} value optional: used to calculate value from origional data object
   *
   */
  public appendAdditionalProps(
    propName: string,
    callbackFn: Function,
    value?: keyof RawUserData
  ) {
    this.userData.forEach((user) => {
      if (!user.additionalProps) user.additionalProps = {};
      user.additionalProps[propName] = value
        ? callbackFn(user[value])
        : callbackFn();
    });
  }

  /**
   * save current instance of data to JSON file to dataFiles Folder
   *
   * @param {string} fileName name of the file
   *
   */
  public saveJson(fileName: string) {
    fs.writeFileSync(
      `${__dirname}/../dataFiles/${fileName}.json`,
      JSON.stringify(this.userData)
    );
  }

  /**
   * save current instance of data to CSV file to dataFiles Folder
   *
   * @param {string} fileName name of the file
   *
   */
  public saveCsv(fileName: string) {
    const csv = new ObjectsToCsv(this.userData);
    csv.toDisk(`${__dirname}/../dataFiles/${fileName}.csv`);
  }

  /**
   * save current instance of usernames to text file to dataFiles Folder
   *
   * @param {string} fileName name of the file
   *
   */
  public saveUsernamesToTxt(fileName: string) {
    const usernamesString = this.createStringListOfUsernames();
    fs.writeFileSync(
      `${__dirname}/../dataFiles/${fileName}.txt`,
      usernamesString
    );
  }

  private getLinkById(id: string) {
    return `https://twitter.com/intent/user?user_id=${id}`;
  }

  private getLinkByUsername(username: string) {
    return `https://twitter.com/${username}`;
  }

  private createStringListOfUsernames() {
    const usernames: string[] = [];
    this.userData.forEach((user) => {
      usernames.push(user.username);
    });
    return usernames.join("\n");
  }

  private generateRandomNumber(range: number) {
    return Math.floor(Math.random() * range);
  }

  private getPercentageSize(p: string) {
    const number = Number(p.replace("%", ""));
    return Math.floor((number / 100) * this.dataSize);
  }
}
