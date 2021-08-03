const Env = require('./Env');
const $ = new Env('京喜领88红包');
const request = require('request');
const jdCookieNode = require('./jdCookie.js');
let doCookie = process.env.DO_CK ? process.env.DO_CK.split('&') : [];

Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

let cookiesArr = [];

let UA, uuid;

Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item]);
});

function getUUID() {
    var n = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    uuid = uuid
        .replace(/[xy]/g, function (e) {
            var t = (n + 16 * Math.random()) % 16 | 0;
            return (
                (n = Math.floor(n / 16)), ('x' == e ? t : (3 & t) | 8).toString(16)
            );
        })
        .replace(/-/g, '');
    return uuid;
}

!(async () => {
    $.shareCode = [];
    for (let index = 0; index < doCookie.length; index++) {
        uuid = getUUID();
        UA = `jdapp;iPhone;10.0.0;14.1;${uuid};network/wifi;ADID/E51BE7F2-E307-3A5F-7F53-E9F9DC7E6D9A;model/iPhone9,2;addressid/0024325356;appBuild/167694;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) MQQBrowser/6.2 TBS/606367 Mobile/15E148;supportJDSHWK/1`;
        $.cookie = doCookie[index];
        $.pt_pin = $.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1];
        await joinActive($.cookie);
        const codeRes = await getUserInfo($.cookie);
        if (codeRes && codeRes.Data && codeRes.Data.strUserPin) {
            $.strUserPin = codeRes.Data.strUserPin;
            console.log(`${$.pt_pin} 的助力码：${$.strUserPin}`);
            $.shareCode.push($.strUserPin);
        }
    }
    console.log(`\n\n开始助力`);
    for (let i = 0; i < cookiesArr.length; i++) {
        uuid = getUUID();
        UA = `jdapp;iPhone;10.0.0;14.1;${uuid};network/wifi;ADID/E51BE7F2-E307-3A5F-7F53-E9F9DC7E6D9A;model/iPhone9,2;addressid/0024325356;appBuild/167694;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) MQQBrowser/6.2 TBS/606367 Mobile/15E148;supportJDSHWK/1`;
        $.cookie = cookiesArr[i];
        $.canHelp = true;
        $.pt_pin = $.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1];
        $.UserName = decodeURIComponent(
            $.cookie.match(/pt_pin=([^; ]+)(?=;?)/) &&
            $.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]
        );
        if ($.shareCode.length === 0) {
            console.log('没有需要助力的任务');
            break;
        }
        for (let i = 0; i < $.shareCode.length && $.canHelp; i++) {
            $.code = $.shareCode[i];
            try {
                const res = await enrollFriend($.cookie, $.code);
                await $.wait(1000);
                // console.log(res);
                console.log(`\n${$.pt_pin} 助力 ${$.code}`);
                console.log(`==== iRet:${res.iRet} Msg:${res.sErrMsg}`);
                if (res.iRet === 2016) {
                    $.canHelp = false;
                    break;
                }
                if (res.iRet === 2015) {
                    $.canHelp = false;
                    break;
                }
                if (res.iRet == 2013) {
                    console.log(`${$.code} 已经完成，移除`);
                    $.shareCode.remove($.code);
                }

                if (res.iRet == 2000) {
                    $.canHelp = false;
                    break;
                }
            } catch (error) {
                $.canHelp = false;
                console.log(`${$.pt_pin} 异常，跳过`);
            }
        }
    }
    // 拆包
    console.log(`\n\n拆包`);
    const grades = [1, 2, 3, 4, 5, 6, 7];
    for (let index = 0; index < doCookie.length; index++) {
        $.cookie = doCookie[index];
        $.UserName = decodeURIComponent(
            $.cookie.match(/pt_pin=([^; ]+)(?=;?)/) &&
            $.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]
        );
        uuid = getUUID();
        UA = `jdapp;iPhone;10.0.0;14.1;${uuid};network/wifi;ADID/E51BE7F2-E307-3A5F-7F53-E9F9DC7E6D9A;model/iPhone9,2;addressid/0024325356;appBuild/167694;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) MQQBrowser/6.2 TBS/606367 Mobile/15E148;supportJDSHWK/1`;
        $.pt_pin = $.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1];
        const codeRes = await getUserInfo($.cookie);
        if (codeRes && codeRes.Data && codeRes.Data.strUserPin) {
            $.strUserPin = codeRes.Data.strUserPin;
        }
        for (const grade of grades) {
            try {
                const openRedPackRes = await openRedPack($.cookie, $.strUserPin, grade);
                console.log(
                    `拆 ${$.pt_pin} 的第 ${grade} 包，结果：${openRedPackRes.sErrMsg}`
                );
                if (openRedPackRes.iRet === 2017) break;
                await sleep(1000);
            } catch (error) {
                console.log(`拆 ${$.pt_pin} 的第 ${grade} 包失败，请手动处理`);
            }
        }
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '');
    })
    .finally(() => {
        $.done();
    });

// 开启活动
async function joinActive(cookie) {
    const postUrl = new URL(
        'https://wq.jd.com/cubeactive/steprewardv3/JoinActive?activeId=489177&publishFlag=1&channel=7&_stk=activeId,channel,phoneid,publishFlag,stepreward_jstoken,timestamp&_ste=1&sceneval=2&g_login_type=1'
    );

    postUrl.searchParams.set('timestamp', new Date().getTime().toString());
    postUrl.searchParams.set('_', new Date().getTime().toString());
    postUrl.searchParams.set('phoneid', uuid);
    postUrl.searchParams.set(
        'stepreward_jstoken',
        Math.random().toString(36).slice(2, 10) +
        Math.random().toString(36).slice(2, 10) +
        Math.random().toString(36).slice(2, 10) +
        Math.random().toString(36).slice(2, 10)
    );
    console.log(postUrl.toString())
    return new Promise((resolve, reject) => {
        request(
            {
                method: 'GET',
                url: postUrl.toString(),
                headers: {
                    Host: 'wq.jd.com',
                    Cookie: cookie,
                    accept: '*/*',
                    'user-agent': UA,
                    'accept-language': 'zh-cn',
                    referer:
                        'https://wqactive.jd.com/cube/front/activePublish/step_reward/489177.html?aid=489177',
                },
            },
            async function (error, response, body) {
                if (!error) {
                    try {
                        const body = JSON.parse(response.body);
                        resolve(body);
                    } catch (error) {
                        resolve(response.body);
                    }
                }
                reject(error);
            }
        );
    });
}

// 获取助力码
async function getUserInfo(cookie) {
    const postUrl = new URL(
        'https://wq.jd.com/cubeactive/steprewardv3/GetUserInfo?activeId=489177&publishFlag=1&channel=7&_stk=activeId,channel,joinDate,phoneid,publishFlag,timestamp&_ste=1&sceneval=2&g_login_type=1'
    );
    const joinDate = new Date()
        .toISOString()
        .slice(0, 10)
        .replace('-', '')
        .replace('-', '');
    postUrl.searchParams.set('timestamp', new Date().getTime());
    postUrl.searchParams.set('_', new Date().getTime());
    postUrl.searchParams.set('phoneid', uuid);
    postUrl.searchParams.set('joinDate', joinDate);
    postUrl.searchParams.set(
        'stepreward_jstoken',
        Math.random().toString(36).slice(2, 10) +
        Math.random().toString(36).slice(2, 10) +
        Math.random().toString(36).slice(2, 10) +
        Math.random().toString(36).slice(2, 10)
    );
    return new Promise((resolve, reject) => {
        request(
            {
                method: 'GET',
                url: postUrl.toString(),
                headers: {
                    Host: 'wq.jd.com',
                    Cookie: cookie,
                    accept: '*/*',
                    'user-agent': UA,
                    'accept-language': 'zh-cn',
                    referer:
                        'https://wqactive.jd.com/cube/front/activePublish/step_reward/489177.html?aid=489177',
                },
            },
            async function (error, response, body) {
                if (!error) {
                    try {
                        const body = JSON.parse(response.body);
                        resolve(body);
                    } catch (error) {
                        resolve(response.body);
                    }
                }
                reject(error);
            }
        );
    });
}

// 助力
async function enrollFriend(cookie, strPin) {
    const postUrl = new URL(
        'https://wq.jd.com/cubeactive/steprewardv3/EnrollFriend?activeId=489177&publishFlag=1&channel=7&_stk=activeId,channel,joinDate,phoneid,publishFlag,strPin,timestamp&_ste=1&sceneval=2&g_login_type=1'
    );
    const joinDate = new Date()
        .toISOString()
        .slice(0, 10)
        .replace('-', '')
        .replace('-', '');
    postUrl.searchParams.set('timestamp', new Date().getTime());
    postUrl.searchParams.set('_', new Date().getTime());
    postUrl.searchParams.set('phoneid', uuid);
    postUrl.searchParams.set('joinDate', joinDate);
    postUrl.searchParams.set('strPin', strPin);
    postUrl.searchParams.set(
        'stepreward_jstoken',
        Math.random().toString(36).slice(2, 10) +
        Math.random().toString(36).slice(2, 10) +
        Math.random().toString(36).slice(2, 10) +
        Math.random().toString(36).slice(2, 10)
    );
    return new Promise((resolve, reject) => {
        request(
            {
                method: 'GET',
                url: postUrl.toString(),
                headers: {
                    Host: 'wq.jd.com',
                    Cookie: cookie,
                    accept: '*/*',
                    'user-agent': UA,
                    'accept-language': 'zh-cn',
                    referer:
                        'https://wqactive.jd.com/cube/front/activePublish/step_reward/489177.html?aid=489177',
                },
            },
            async function (error, response, body) {
                if (!error) {
                    try {
                        const body = JSON.parse(response.body);
                        resolve(body);
                    } catch (error) {
                        resolve(response.body);
                    }
                }
                reject(error);
            }
        );
    });
}

// 拆包
async function openRedPack(cookie, strPin, grade) {
    const postUrl = new URL(
        'https://m.jingxi.com/cubeactive/steprewardv3/DoGradeDraw?activeId=489177&publishFlag=1&channel=7&_stk=activeId%2Cchannel%2Cgrade%2Cphoneid%2CpublishFlag%2Cstepreward_jstoken%2CstrPin%2Ctimestamp&_ste=1&sceneval=2&g_login_type=1&g_ty=ls'
    );
    postUrl.searchParams.set('timestamp', new Date().getTime().toString());
    postUrl.searchParams.set('_', new Date().getTime().toString());
    postUrl.searchParams.set('phoneid', uuid);
    postUrl.searchParams.set('grade', grade);
    postUrl.searchParams.set('strPin', strPin);
    postUrl.searchParams.set(
        'stepreward_jstoken',
        Math.random().toString(36).slice(2, 10) +
        Math.random().toString(36).slice(2, 10) +
        Math.random().toString(36).slice(2, 10) +
        Math.random().toString(36).slice(2, 10)
    );
    return new Promise((resolve, reject) => {
        request(
            {
                method: 'GET',
                url: postUrl.toString(),
                headers: {
                    Host: 'wq.jd.com',
                    Cookie: cookie,
                    accept: '*/*',
                    'user-agent': UA,
                    'accept-language': 'zh-cn',
                    referer:
                        'https://wqactive.jd.com/cube/front/activePublish/step_reward/489177.html?aid=489177',
                },
            },
            async function (error, response, body) {
                if (!error) {
                    try {
                        const body = JSON.parse(response.body);
                        resolve(body);
                    } catch (error) {
                        resolve(response.body);
                    }
                }
                reject(error);
            }
        );
    });
}
