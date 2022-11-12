import fs from 'fs'
import { DataHelpers } from './helpers/data-helpers'
import { Logger } from './helpers/logger'

/** import data
 * example: const blockedUsers = JSON.parse(fs.readFileSync("./blockedUsersTest.json").toString())
**/

/**
 * create a new instance of the Logger
 * example: const logger = new Logger(blockedUsers.data.length)
 */

/**
 * create a new instance of helpers if you want to manpiulate raw data
 * example: const helper = new DataHelpers(blockedUsers.data)
 */

/**
 * create a sample data and manpiulate only the sample
 * example: const sample = helper.getRandomSample('50%')
 * 
 * manpiulate the sample with a new helper instance
 * const sampleHelper = new DataHelpers(sample)
 */