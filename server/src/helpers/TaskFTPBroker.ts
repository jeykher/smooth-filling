import fs from 'fs';
import readline from 'readline';

import FTPClient from 'ftp';

import Logger from './Logger';

import { iTask } from '../interfaces/tasks/iTask.interface';
import { iFTPFile } from '../interfaces/ftpfiles/iFTPFile.interface';

class TaskFTPBroker {

    private FLCorporationData: any;

    constructor() {
        this.FLCorporationData = [];
    }

    private async getLocalJSON(file?: string) {
        if(file !== undefined && file !== null) {
            return new Promise((resolve: any, reject: any) => {
                let stream: any;
                let json: any;
                stream = fs.createReadStream(file);
                console.log('Level 1: Reading local JSON tasks file...');
                Logger.log('Level 1: Reading local JSON tasks file...');
                stream.on("data", (chunk: any) => {
                    json = JSON.parse(chunk);
                });
                stream.on("end", () => {
                    console.log('It has been obtained tasks from local json.');
                    Logger.log('It has been obtained tasks from local json.');
                    resolve(json);
                });
                stream.on("error", (error: Error) => {
                    console.log("It can't be obtained tasks from local json.");
                    Logger.error("It can't be obtained data from local json.");
                    reject(error);
                });
            });
        }
    }

    private async listFTPFiles(task: iTask) {
        return new Promise((resolve: any, reject: any) => {
            console.log(`Getting FTP list from task ${task.name}`);
            Logger.log(`Getting FTP list from task ${task.name}`);
            const ftp: any = new FTPClient();
            ftp.on("error", (error: any) => {
                console.log(`It can't be obtained list FTP for ${task.name} task.`);
                Logger.log(`It can't be obtained list FTP for ${task.name} task.`);
                reject(error);
            });
            ftp.on("ready", async () => {
                ftp.list(task.path, (err: any, list: any[]) => {
                    if(err) {
                        reject(err);
                        return;
                    }
                    const regex = new RegExp(task.format, "i");
                    const newList = list.filter((element) => {
                        return regex.test(element.name);
                    });
                    resolve(newList);
                    ftp.end();
                    console.log(`FTP list has been obtained for ${task.name} task`);
                    Logger.log(`FTP list has been obtained for ${task.name} task`);
                })
            });
            ftp.connect({
                host: task.host,
                port: 21
            });
        });
    }

    private async addPropertiesHistoryFiles(task: iTask, files: iFTPFile[]): Promise<void> {
        console.log(`Level 3: Checking if files need to save or update on database for ${task.name} task.`);
        Logger.log(`Level 3: Checking if files need to save or update on database for ${task.name} task.`);
        for(const file of files) {
            file.host = task.host;
            file.fullName = task.path + file.name;
            file.taskId = task.id;
            file.status = 0;
        }
        return;
    }

    /*private async checkHistoryFiles(files: iFTPFile[]): Promise<void> {
        for(const file of files) {
            try {
                let fileExist: any = await FTPFile.findOne({
                    name: file.name
                });
                /*if(!fileExist) {
                    console.log("No existe");
                }
                else {
                    console.log("Existe");
                }
            }
            catch(error) {
                console.log("File has not been checked.");
                Logger.error("File has not been checked.");
            }
        }
        return; 
    }*/

    public async getData() {
        return this.FLCorporationData;
    }

    private async processFile(task: iTask, ftp: FTPClient, file: iFTPFile, totalFiles: number) {
        return new Promise((resolve: any, reject: any) => {
            ftp.get(file.fullName, async (error: any, stream: any) => {
                try {
                    if(error) {
                        reject(error);
                    }
                    if(!fs.existsSync(`${task.description}`)) {
                        fs.mkdir(`${task.description}`, {
                            recursive: true
                        }, (err: any) => {
                            reject(err)
                        });
                    }
                    stream.once("close", () => {});
                    if(fs.existsSync(`./${task.description}/${file.name}`)) {
                        console.log(`${file.name} exists on /server/${task.description} yet`);
                    }
                    else {
                        console.log(`Saving ${file.name} on /server/${task.description}`);
                        await stream.pipe(fs.createWriteStream(`./${task.description}/${file.name}`));
                    }
                    const rl = readline.createInterface({
                        crlfDelay: Infinity,
                        input: stream
                    });
                    for await(const line of rl) {
                        let tempData: any = {};
                        let tempMainData: any = {};
                        if(task.description == 'FLCorporation') {
                            tempData.COR_TASK = task.description;
                            tempData.COR_NUMBER = line.substr(0,12).trim();
                            tempData.COR_NAME = line.substr(12, 192).trim();
                            tempData.COR_STATUS = line.substr(204, 1).trim();
                            tempData.COR_FILING_TYPE = line.substr(205, 15).trim();
                            tempData.COR_PRINC_ADD_1 = line.substr(220, 42).trim();
                            tempData.COR_PRINC_ADD_2 = line.substr(262, 42).trim();
                            tempData.COR_PRINC_CITY = line.substr(304, 28).trim();
                            tempData.COR_PRINC_STATE = line.substr(332, 2).trim();
                            tempData.BCOR_PRINC_ZIP = line.substr(334, 10).trim();
                            tempData.COR_PRINC_COUNTRY = line.substr(344, 2).trim();
                            tempData.COR_MAIL_ADD_1 = line.substr(346, 42).trim();
                            tempData.COR_MAIL_ADD_2 = line.substr(388, 42).trim();
                            tempData.COR_MAIL_CITY = line.substr(430, 28).trim();
                            tempData.COR_MAIL_STATE = line.substr(458, 2).trim();
                            tempData.COR_MAIL_ZIP = line.substr(460, 10).trim();
                            tempData.COR_MAIL_COUNTRY = line.substr(470, 2).trim();
                            tempData.COR_FILE_DATE = line.substr(472, 8).trim();
                            tempData.COR_FEI_NUMBER = line.substr(480, 14).trim();
                            tempData.MORE_THAN_SIX_OFF_FLAG = line.substr(494, 1).trim();
                            tempData.LAST_TRX_DATE = line.substr(495, 8).trim();
                            tempData.STATE_COUNTRY = line.substr(503, 2).trim();
                            tempData.REPORT_YEAR_1 = line.substr(505, 4).trim();
                            tempData.HOUSE_FLAG_1 = line.substr(509, 1).trim();
                            tempData.REPORT_DATE_1 = line.substr(510, 8).trim();
                            tempData.REPORT_YEAR_2 = line.substr(518, 4).trim();
                            tempData.HOUSE_FLAG_2 = line.substr(522, 1).trim();
                            tempData.REPORT_DATE_2 = line.substr(523, 8).trim();
                            tempData.REPORT_YEAR_3 = line.substr(531, 4).trim();
                            tempData.HOUSE_FLAG_3 = line.substr(535, 1).trim();
                            tempData.REPORT_DATE_3 = line.substr(536, 8).trim();
                            tempData.RA_NAME = line.substr(544, 42).trim();
                            tempData.RA_NAME_TYPE = line.substr(586, 1).trim();
                            tempData.RA_ADD_1 = line.substr(587, 42).trim();
                            tempData.RA_CITY = line.substr(629, 28).trim();
                            tempData.RA_STATE = line.substr(657, 2).trim();
                            tempData.RA_ZIP5= line.substr(659, 5).trim();
                            tempData.RA_ZIP4= line.substr(664, 4).trim();
                            tempData.PRINCIPALS = [];
                            tempMainData.PRINC_TITLE = line.substr(668, 4).trim();
                            tempMainData.PRINC_NAME_TYPE = line.substr(672, 1).trim();
                            tempMainData.PRINC_NAME = line.substr(673, 42).trim();
                            tempMainData.PRINC_ADD_1 = line.substr(715, 42).trim();
                            tempMainData.PRINC_CITY = line.substr(757, 28).trim();
                            tempMainData.PRINC_STATE = line.substr(785, 2).trim();
                            tempMainData.PRINC_ZIP5 = line.substr(787, 5).trim();
                            tempMainData.PRINC_ZIP4 = line.substr(792, 4).trim();
                            tempData.PRINCIPALS.push(tempMainData);
                            tempMainData.PRINC_TITLE = line.substr(796, 4).trim();
                            tempMainData.PRINC_NAME_TYPE = line.substr(800, 1).trim();
                            tempMainData.PRINC_NAME = line.substr(801, 42).trim();
                            tempMainData.PRINC_ADD_1 = line.substr(843, 42).trim();
                            tempMainData.PRINC_CITY = line.substr(885, 28).trim();
                            tempMainData.PRINC_STATE = line.substr(913, 2).trim();
                            tempMainData.PRINC_ZIP5 = line.substr(915, 5).trim();
                            tempMainData.PRINC_ZIP4 = line.substr(920, 4).trim();
                            tempData.PRINCIPALS.push(tempMainData);
                            tempMainData.PRINC_TITLE = line.substr(924, 4).trim();
                            tempMainData.PRINC_NAME_TYPE = line.substr(928, 1).trim();
                            tempMainData.PRINC_NAME = line.substr(929, 42).trim();
                            tempMainData.PRINC_ADD_1 = line.substr(971, 42).trim();
                            tempMainData.PRINC_CITY = line.substr(1013, 28).trim();
                            tempMainData.PRINC_STATE = line.substr(1041, 2).trim();
                            tempMainData.PRINC_ZIP5 = line.substr(1043, 5).trim();
                            tempMainData.PRINC_ZIP4 = line.substr(1048, 4).trim();
                            tempData.PRINCIPALS.push(tempMainData);
                            tempMainData.PRINC_TITLE = line.substr(1052, 4).trim();
                            tempMainData.PRINC_NAME_TYPE = line.substr(1056, 1).trim();
                            tempMainData.PRINC_NAME = line.substr(1057, 42).trim();
                            tempMainData.PRINC_ADD_1 = line.substr(1099, 42).trim();
                            tempMainData.PRINC_CITY = line.substr(1141, 28).trim();
                            tempMainData.PRINC_STATE = line.substr(1169, 2).trim();
                            tempMainData.PRINC_ZIP5 = line.substr(1171, 5).trim();
                            tempMainData.PRINC_ZIP4 = line.substr(1176, 4).trim();
                            tempData.PRINCIPALS.push(tempMainData);
                            tempMainData.PRINC_TITLE = line.substr(1180, 4).trim();
                            tempMainData.PRINC_NAME_TYPE = line.substr(1184, 1).trim();
                            tempMainData.PRINC_NAME = line.substr(1185, 42).trim();
                            tempMainData.PRINC_ADD_1 = line.substr(1227, 42).trim();
                            tempMainData.PRINC_CITY = line.substr(1269, 28).trim();
                            tempMainData.PRINC_STATE = line.substr(1297, 2).trim();
                            tempMainData.PRINC_ZIP5 = line.substr(1299, 5).trim();
                            tempMainData.PRINC_ZIP4 = line.substr(1304, 4).trim();
                            tempData.PRINCIPALS.push(tempMainData);
                            tempMainData.PRINC_TITLE = line.substr(1308, 4).trim();
                            tempMainData.PRINC_NAME_TYPE = line.substr(1312, 1).trim();
                            tempMainData.PRINC_NAME = line.substr(1313, 42).trim();
                            tempMainData.PRINC_ADD_1 = line.substr(1355, 42).trim();
                            tempMainData.PRINC_CITY = line.substr(1397, 28).trim();
                            tempMainData.PRINC_STATE = line.substr(1425, 2).trim();
                            tempMainData.PRINC_ZIP5 = line.substr(1427, 5).trim();
                            tempMainData.PRINC_ZIP4 = line.substr(1432, 4).trim();
                            tempData.PRINCIPALS.push(tempMainData);
                            tempData.FILLER = line.substr(1436, 4).trim();
                        }
                        this.FLCorporationData.push(tempData);
                    } 
                    resolve(file.name);
                }
                catch(e) {
                    reject(e);
                }
            });
        });
    }

    private async processFiles(task: iTask, list: iFTPFile[]) {
        return new Promise((resolve: any, reject: any) => {
            const ftp = new FTPClient();
            console.log(`Obtaining files on task ${task.name}`);
            Logger.log(`Obtaining files on task ${task.name}`);
            ftp.on("error", (error) => {
                console.log(`It can´t obtain files on task ${task.name}`);
                Logger.error(`It can´t obtain files on task ${task.name}`);
                reject(error);
            });
            ftp.on("ready", async () => {
                let totalFiles = 0;
                for(const file of list) {
                    await this.processFile(task, ftp, file, totalFiles);
                    totalFiles++;
                }
                console.log(`Total files obtained for task ${task.name}: ${totalFiles}`);
                Logger.log(`Total files obtained for task ${task.name}: ${totalFiles}`);
                resolve("OK");
                ftp.end();
            });
            ftp.connect({
                host: task.host,
                port: 21
            });
        });
    }

    private async doTask(task: iTask) {
        console.log(`task to be run is: ${task.description}`);
        Logger.log(`task to be run is: ${task.description}`);
        const list: any = await this.listFTPFiles(task);
        await this.addPropertiesHistoryFiles(task, list);
        //await this.checkHistoryFiles(list);
        await this.processFiles(task, list);
    }

    public async importFTPData() {
        console.log('Starting import FTP Data process...');
        Logger.log('Starting import FTP data process...');
        let tasks: any = await this.getLocalJSON('json/TaskInit.json');
        console.log('Level 2: Running every task...');
        Logger.log('Level 2: Running every task...');
        for(let task of tasks) {
            await this.doTask(task);
        }
    }

}

export default TaskFTPBroker;