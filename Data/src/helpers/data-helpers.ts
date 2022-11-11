import fs from "fs";
import ObjectsToCsv from "objects-to-csv";

import { IUserDataWithProps, RawUserData } from "./types";

export class DataHelpers {
  private userData: IUserDataWithProps[];

  constructor(private data: RawUserData[]) {
    this.userData = data;
  }

  /**
   * a get accessor to manipulated data
   * 
   */
  get users() {
    return this.userData;
  }
  
  /**
   * appends a link property with calculated value to current instance of data
   * 
   */
  public appendLink() {
    this.userData.forEach((user) => {
      user.linkId = this.calculateLinkById(user.id)!;
    });
  }

  /**
   * appends additional props with given value to current instance of data
   * 
   * @param {string} propName property name
   * @param {Function} callbackFn a function used to calculate the prop value
   * @param {keyof RawUserData} value optional: used to calculate value from origional data object
   * 
   */
  public appendAdditionalData(
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

  private calculateLinkById(id: string) {
    return `https://twitter.com/intent/user?user_id=${id}`;
  }
}
