#!/usr/bin/env node
var WebSocketClient = require('websocket').client;
var webSocketOptions = {
        reconnectInterval: 1000, //重连延迟时间
        reconnectDecay: 1.5, //重连延时增长率
        timeoutInterval: 2000, //一次连接等待时间
        maxReconnectInterval: 5000 //重连最大延迟时间
    };

var account_info = {
        username: 'admin',
        password: 'localsense',
    };
    
function getAndsendGrpAccess() {

            var username = account_info.username;
            var pwd = account_info.password;

            /**
             * 用户名: admin → 61 64 6D 69 6E
             * 密码:  47bce5c74f589f4867dbd57e9ca9f808
             * 1. 帧头 固定值2B 0xcc5f
             * 2. 帧类型 固定值1B 0x27
             * 3. 用户名长度 4B 0x00000005
             * 4. 用户名字符 NB admin
             * 5. 用户密码长度 4B 0x0000000A
             * 6. 用户密码字符 NB localsense
             * 7. CRC校验 2B
             * 8. 帧尾 2B
             */

            var buffer = new ArrayBuffer(256); //预定义
            var int8view = new Uint8Array(buffer);
            //var str_16 = "0x";//为了后面做CRC16校验，将所有数据收集组成16进制数据字符串
            var str_2 = ""; //为了后面做CRC16校验，将所有数据收集组成2进制数据字符串
            int8view[0] = 0xCC;
            int8view[1] = 0x5F;
            int8view[2] = 0x27;
            //str_16+="CC5F27";
            str_2 += hexto0b("CC5F27");
            //处理用户名长度
            var len = username.length;
            var len2hex = len.toString(16);
            var len2hex_str_len = String(len2hex).length; //姓名所得16进制字符串长度
            var len8 = Math.floor((8 - len2hex_str_len) / 2); //需要补0的长度
            for (var i = 3; i < 3 + len8; i++) {
                int8view[i] = 0;
                //str_16+="00";
                str_2 += "00000000";
            }
            //存入用户名长度  从3+len8
            var name_16_len = Math.ceil(len2hex_str_len / 2); //姓名长度标识位  需要设置的次数
            if (len2hex_str_len / 2 % 1 === 0) { //类似0x1C 0x21CB等
                for (var i = 0; i < name_16_len; i++) {
                    int8view[3 + len8 + i] = len2hex.substring(i * 2, 2 + i * 2);
                    //str_16+=""+len2hex.substring(i*2,2+i*2);
                    str_2 += hexto0b(len2hex.substring(i * 2, 2 + i * 2));
                }
            } else { //类似0x01C 0x021CB
                for (var i = 0; i < name_16_len; i++) {
                    if (i == 0) {
                        int8view[3 + len8 + i] = "0" + len2hex.substring(i * 2, 1 + i * 2);
                        //str_16+="0"+len2hex.substring(i*2,1+i*2);
                        str_2 += ("0000" + hexto0b(len2hex.substring(i * 2, 1 + i * 2)));
                    } else {
                        int8view[3 + len8 + i] = len2hex.substring(i * 2, 2 + i * 2);
                        //str_16+=""+len2hex.substring(i*2,2+i*2);
                        str_2 += hexto0b(len2hex.substring(i * 2, 2 + i * 2));
                    }
                }
            }
            //处理用户名
            var name16_str = strToHexCharCode(username);
            for (var i = 0; i < username.length; i++) {
                int8view[7 + i] = "0x" + name16_str.substring(2 + i * 2, 4 + i * 2); //+2是为了避开开头的0x
                //str_16+=""+name16_str.substring(2+i*2,4+i*2);
                str_2 += hexto0b(name16_str.substring(2 + i * 2, 4 + i * 2));
            }
            //处理密码长度标识
            var plen = pwd.length;
            var plen2hex = plen.toString(16);
            var plen2hex_str_len = String(plen2hex).length; //密码所得16进制字符串长度
            var plen8 = Math.floor((8 - plen2hex_str_len) / 2); //需要补0的长度
            var pwd_len_0_start = 6 + username.length + 1; //密码长度标识位开始索引
            //密码长度标识补零位置
            for (var i = 0; i < plen8; i++) {
                int8view[i + pwd_len_0_start] = 0;
                //str_16+="00";
                str_2 += "00000000";
            }
            //密码长度 具体值设置 从pwd_len_0_start+plen8开始
            var p_16_len = Math.ceil(plen2hex_str_len / 2); //密码长度标识位  需要设置的次数
            var pwd_len_start = pwd_len_0_start + plen8;
            if (plen2hex_str_len / 2 % 1 === 0) { //类似0x1C 0x21CB等
                for (var i = 0; i < p_16_len; i++) {
                    int8view[pwd_len_start + i] = plen2hex.substring(i * 2, 2 + i * 2);
                    //str_16+=""+plen2hex.substring(i*2,2+i*2);
                    str_2 += hexto0b(plen2hex.substring(i * 2, 2 + i * 2));
                }
            } else { //类似0x01C 0x021CB
                for (var i = 0; i < p_16_len; i++) {
                    if (i == 0) {
                        int8view[pwd_len_start + i] = "0" + plen2hex.substring(i * 2, 1 + i * 2);
                        //str_16+="0"+plen2hex.substring(i*2,1+i*2);
                        str_2 += hexto0b(plen2hex.substring(i * 2, 2 + i * 2));
                    } else {
                        int8view[pwd_len_start + i] = plen2hex.substring(i * 2, 2 + i * 2);
                        //str_16+=""+plen2hex.substring(i*2,2+i*2);
                        str_2 += hexto0b(plen2hex.substring(i * 2, 2 + i * 2));
                    }
                }
            }
            //处理密码
            var pwd16_str = strToHexCharCode(pwd);
            var pwd_start = pwd_len_start + p_16_len;
            for (var i = 0; i < pwd.length; i++) {
                int8view[pwd_start + i] = "0x" + pwd16_str.substring(2 + i * 2, 4 + i * 2); //+2是为了避开开头的0x
                //str_16+=""+pwd16_str.substring(2+i*2,4+i*2);
                str_2 += hexto0b(pwd16_str.substring(2 + i * 2, 4 + i * 2));
            }
            /**
              *CRC校验
              *0. 得到原始十六进制发送数据
              *1. 十六进制转二进制 parseInt(info,16).toString(2) 得到原始发送数据C(X) 
              *2. CRC16 
              *		CRC-16 x16+x15+x2+18005IBM SDLC
            		CRC16-CCITT  x16+x12+x5+11021ISO HDLC, ITU X.25, V.34/V.41/V.42, PPP-FCS
            		常用: CRC-16
              */
            //var str_2 = parseInt(str_16,16).toString(2);//C(X)原始报文

            var crc_16 = "11000000000000011";
            var crc_r = 16; //16位校验位置
            var crc_mod = get_high_1_mod(str_2, crc_16); //CRC余数
            while (parseInt(crc_mod, 2) > parseInt(crc_16, 2)) {
                crc_mod = get_high_1_mod(crc_mod, crc_16);
            }
            var sendCRCinfo = ""; //经过crc校验过的信息  二进制字符串
            for (i = 0; i < crc_r - crc_mod.length; i++) { //补零
                sendCRCinfo += "0";
            }
            sendCRCinfo = str_2 + (Array(16).join("0") + crc_mod).slice(-16); //将CRC校验码存放在低位

            //帧尾 固定值 0xAABB
            var sendCRCinfo_16 = "";
            sendCRCinfo_16 = btohex(sendCRCinfo);

            /**
             * 将用CRC16处理过的十六进制的字符串,按照Uint8Array来处理
             */
            var sendCRCinfo_16_len = sendCRCinfo_16.length / 2 + 2; //加2字节 帧尾
            var buf = new ArrayBuffer(sendCRCinfo_16_len);

            var int8v = new Uint8Array(buf); //最终发送数据
            for (var i = 0; i < sendCRCinfo_16_len - 2; i++) {
                int8v[i] = "0x" + sendCRCinfo_16.substring(i * 2, (i + 1) * 2);
            }
            int8v[sendCRCinfo_16_len - 2] = "0xAA";
            int8v[sendCRCinfo_16_len - 1] = "0xBB";

            var waitWs1 = -1;
            waitWs1 = setInterval(function () {
                if (ws1 != undefined && ws1.readyState == 1) {
                    clearInterval(waitWs1);
                    ws1.send(int8v.buffer);
                    CallbackRegisterFunc(this_obj.CB_TYPE.Send_Int8v, int8v);
                }
            }, 100);


        };

var client = new WebSocketClient();


client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });

    function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            connection.sendUTF(number.toString());
            setTimeout(sendNumber, 1000);
        }
    }
    sendNumber();
});




client.connect('ws://47.89.152.165:48300/', 'echo-protocol', webSocketOptions);