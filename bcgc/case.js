/**
 *  The MIT License (MIT)
 *  Copyright (c) 2024 by @xyzendev - Adriansyah
 *  © 2024 by @xyzendev - Muhammad Adriansyah | MIT License
 */

import { appenTextMessage } from "./core/serialize.js";
import { config } from "./core/index.js";
import { chalk, util } from "@xyzendev/modules/core/main.modules.js";
import { sleep } from "./core/function.js";

/**
 * 
 * @param {*} client 
 * @param {*} store 
 * @param {*} m 
 * @param {*} chatUpdate 
 * @returns 
 */
export default async function Message(client, store, m, chatUpdate) {
    try {
        await (m.type === 'conversation') ? m.message.conversation : (m.type == 'imageMessage') ? m.message.imageMessage.caption : (m.type == 'videoMessage') ? m.message.videoMessage.caption : (m.type == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.type == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.type == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.type == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.type == 'interactiveResponseMessage') ? appenTextMessage(JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id, chatUpdate, m, client) : (m.type == 'templateButtonReplyMessage') ? appenTextMessage(m.msg.selectedId, chatUpdate, m, client) : (m.type === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        const quoted = m.isQuoted ? m.quoted : m
        const Downloaded = async (fileName) => await client.downloadMediaMessage(quoted, fileName)
        const isCommand = (m.prefix && m.body.startsWith(m.prefix)) || false

        if (!m.public) {
            if (!m.key.fromMe || m.isCreator) return;
        }

        if (m.isBot) return;

        if (m.message && !m.isBot) {
            const a = m.isGroup ? "👥 Group" : "👤 Private";
            const b = m.body || m.type;
            console.log(
                `${chalk.blue("FROM")}: ${chalk.yellow(m.pushName + " => " + m.sender)}\n` +
                `${chalk.blue("IN")}: ${chalk.magenta(a)}\n` +
                `${chalk.blue("MESSAGE")}: ${chalk.green(b)}\n` +
                `🕒 ${new Date().toLocaleTimeString()}`
            );
        }

        switch (isCommand ? m.command.toLowerCase() : false) {
            case 'bcgc':
            case 'bcgroup': {
                if (!m.isCreator) return m.reply('Khusus GW')
                if (!m.text) return m.reply('Teksnya Mana??');
                let getGroups = await client.groupFetchAllParticipating()
                let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
                let anu = groups.map(v => v.id)
                m.reply('please wait...')
                for (let i of anu) {
                    await sleep(5000)
                    await client.sendMessage(i, { text: m.text })
                }
                m.reply('done')
            }
                break
            default:
                if (['>', 'eval', '=>'].some(a => m.command.toLowerCase().startsWith(a)) && m.isCreator) {
                    let evalCmd = '';
                    try {
                        evalCmd = /await/i.test(m.text) ? eval('(async() => { ' + m.text + ' })()') : eval(m.text);
                    } catch (e) {
                        evalCmd = e;
                    }
                    new Promise((resolve, reject) => {
                        try {
                            resolve(evalCmd);
                        } catch (err) {
                            reject(err);
                        }
                    })
                        ?.then(res => m.reply(util.format(res)))
                        ?.catch(err => m.reply(util.format(err)));
                }
        }
    } catch (e) {
        client.sendMessage(config.owners + "@s.whatsapp.net", { text: "`" + util.format(e) + "`" }, { quoted: m })
        console.error(e)
    }
}