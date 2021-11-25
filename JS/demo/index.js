(function () {

    var filter_tag = [];
    var tag_id_all = "";

    window.UpdateFilterTag = function (obj) {
        var b_update;
        for (var id in obj) {
            if (!(id in filter_tag)) {
                b_update = true;
                break;
            }
        }
        for (var id in filter_tag) {
            if (id == tag_id_all) continue;
            if (!(id in obj)) {
                b_update = true;
                break;
            }
        }
        if (b_update) {
            filter_tag = {};
            filter_tag[tag_id_all] = tag_id_all;
            for (var id in obj) {
                filter_tag[id] = id;
            }

            var filter_tag_sel = document.getElementById("filter_tag");
            var last_sel = filter_tag_sel.value;
            filter_tag_sel.innerHTML = "";

            for (var id in filter_tag) {
                var dom_opt = document.createElement("option");
                dom_opt.value = id;
                if (last_sel == id) {
                    dom_opt.setAttribute('selected', true);
                }
                dom_opt.innerHTML = id;
                filter_tag_sel.appendChild(dom_opt);
            }
        }

    }

    var val_show_tag_pos = "Debug Data";
    var val_show_gao_jing = "Debug Data";
    var val_show_dm_data = "Debug Data";
    var val_modfiy_data = "Debug Data";
    var val_show_append_info = "Debug Data";
    var val_show_person_info = "Debug Data";
    var val_show_base_state = "Debug Data";
    var val_show_command = "Debug Data"
    var val_show_video_state = "Debug Data";
    var val_show_btns_state = "Debug Data";
    var val_show_area_info = "Debug Data";
    var val_show_btns = "";
    var val_show_buffer = "";

    function animate() {
        requestAnimationFrame(animate);

        var dom = document.getElementById("show_tag_pos");
        if (dom) {
            dom.value = val_show_tag_pos;
        }

        var dom = document.getElementById("show_gao_jing");
        if (dom) {
            dom.value = val_show_gao_jing;
        }

        var dom = document.getElementById("show_dm_data");
        if (dom) {
            dom.value = val_show_dm_data;
        }

        var dom = document.getElementById("show_modfiy_data");
        if (dom) {
            dom.value = val_modfiy_data;
        }

        var dom = document.getElementById("show_append_info");
        if (dom) {
            dom.value = val_show_append_info;
        }

        var dom = document.getElementById("show_person_info");
        if (dom) {
            dom.value = val_show_person_info;
        }

        var dom = document.getElementById("show_base_state");
        if (dom) {
            dom.value = val_show_base_state;
        }

        var dom = document.getElementById("show_command");
        if (dom) {
            dom.value = val_show_command;
        }

        var dom = document.getElementById("show_video_state");
        if (dom) {
            dom.value = val_show_video_state;
        }

        var dom = document.getElementById("show_btns_state");
        if (dom) {
            dom.value = val_show_btns_state;
        }

        var dom = document.getElementById("show_area_info");
        if (dom) {
            dom.value = val_show_area_info;
        }

    }
    animate();

    var time_str = "";
    setInterval(function () {
        var date = new Date();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        var ss = date.getMilliseconds();
        time_str = `${h}:${m}:${s}:${ss}`;
    }, 1)

    // json数据格式化
    function JsonToLine(obj, par) {
        var data_str = "";
        for (var key in obj) {
            if (key) {
                data_str = data_str + key + ":" + JSON.stringify(obj[key]) + "\n";
            }
        }
        var str = "{" + "\n" + data_str + "}";
        return str
    }

    // 防止数据量过多
    function delData(isDel) {
        if (isDel) {
            if (tagpos_count == 10) {
                val_show_tag_pos = "";
                tagpos_count = 0;
            } else if (basestate_count == 30) {
                val_show_base_state = "";
                basestate_count = 0;
            } else if (gaojing_count == 50) {
                val_show_gao_jing = "";
                gaojing_count = 0;
            } else if (dmdata_count == 30) {
                val_show_dm_data = "";
                dmdata_count = 0;
            } else if (modify_count == 50) {
                val_modfiy_data = "";
                modify_count = 0;
            } else if (append_count == 50) {
                val_show_append_info = "";
                append_count = 0;
            } else if (person_count == 50) {
                val_show_person_info = "";
                person_count = 0;
            } else if (video_count == 50) {
                val_show_video_state = "";
                video_count = 0;
            } else if (areaInfo_count == 50) {
                val_show_area_info = "";
                areaInfo_count = 0;
            }
        }
    }

    var exportData = "";

    window.dataToTxt = function () {
        exportData = `Location real-time data：` + val_show_tag_pos_export + `Alarm real-time data：` +
            val_show_gao_jing_export + `Regional real-time data：` + val_show_dm_data_export + `Data update record：` +
            val_modfiy_data_export + `Other sensor data：` + val_show_append_info_export + `Online tag data：` +
            val_show_person_info_export + `Anchor data：` + val_show_base_state_export + `Video linkage data：` + val_show_video_state_export;
        // var excelHtml = `<html><head><meta charset='utf-8' /></head><body>${exportData}</body></html>`;
        Export(exportData);
    }

    function Export(data) {
        var excelBlob = new Blob([data], {
            type: 'application/vnd.ms-excel'
        })
        var oA = document.createElement('a');
        // 利用URL.createObjectURL()方法为a元素生成blob URL
        oA.href = URL.createObjectURL(excelBlob);
        // 给文件命名
        oA.download = 'All records.txt';
        oA.click();
    }
    var tagpos_count = 0;
    var val_show_tag_pos_export = "";

    function showTagPos(val) {
        tagpos_count++;
        delData(true);
        val = JsonToLine(val);
        val_show_tag_pos = "Location real-time data【analysis content】" + time_str + val + "\n" + val_show_tag_pos;
        // val_show_tag_pos_export = "位置实时数据【解析内容】" + time_str + val + "\n" + val_show_tag_pos_export;
    }

    function showTagPosBin(val) {
        val = JSON.stringify(val);
        
        val_show_tag_pos = "Location real-time data【hexadecimal original code 】" + time_str + val + "\n" +
            "---------------------------------------------------------------------------------------------" +
            "\n" + val_show_tag_pos;
        // val_show_tag_pos_export = "位置实时数据【16进制原码】" + time_str + val + "\n" +
        //     "\n" + val_show_tag_pos_export;
    }
    var gaojing_count = 0;
    var val_show_gao_jing_export = "";

    function showGaoJing(val) {
        gaojing_count++;
        delData(true);
        val = JSON.stringify(val);
        val_show_gao_jing = "Alarm real-time data【analysis content 】" + time_str + val + "\n" + val_show_gao_jing;
        // val_show_gao_jing_export = "告警实时数据【解析内容】" + time_str + val + "\n" + val_show_gao_jing_export;
    }

    function showGaoJingBin(val) {
        val = JSON.stringify(val);
        val_show_gao_jing = "Alarm real-time data【hexadecimal original code 】" + time_str + val + "\n" +
            "---------------------------------------------------------------------------------------------" +
            "\n" + val_show_gao_jing;
        // val_show_gao_jing_export = "告警实时数据【16进制原码】" + time_str + val + "\n" +
        //     "\n" + val_show_gao_jing_export;
    }

    var areaInfo_count = 0;

    function showAreaInfo(val) {
        areaInfo_count++;
        delData(true);
        val = JSON.stringify(val);
        val_show_area_info = "Regional out/in statistics【analysis content 】" + time_str + val + "\n" + val_show_area_info;
    }

    function showAreaInfoBin(val) {
        val = JSON.stringify(val);
        val_show_area_info = "Regional out/in statistics【hexadecimal original code 】" + time_str + val + "\n" +
            "---------------------------------------------------------------------------------------------" +
            "\n" + val_show_area_info;
    }

    var dmdata_count = 0;
    var val_show_dm_data_export = "";

    function showDmData(val) {
        dmdata_count++;
        delData(true);
        val = JSON.stringify(val);
        val_show_dm_data = "Regional real-time statistics【analysis content】" + time_str + val + "\n" + val_show_dm_data;
        // val_show_dm_data_export = "区域实时统计【解析内容】" + time_str + val + "\n" + val_show_dm_data_export;
    }

    function showDmDataBin(val) {
        val = JSON.stringify(val);
        val_show_dm_data = "Regional real-time statistics【hexadecimal original code】" + time_str + val + "\n" +
            "---------------------------------------------------------------------------------------------" +
            "\n" + val_show_dm_data;
        // val_show_dm_data_export = "区域实时统计【16进制原码】" + time_str + val + "\n" +
        //     "---------------------------------------------------------------------------------------------" +
        //     "\n" + val_show_dm_data_export;
    }
    var modify_count = 0;
    var val_modfiy_data_export = "";

    function showModfiyData(val) {
        modify_count++;
        delData(true);
        val = JSON.stringify(val);
        val_modfiy_data = "Data update notification【analysis content】" + time_str + val + "\n" + val_modfiy_data;
        // val_modfiy_data_export = "数据更新通知【解析内容】" + time_str + val + "\n" + val_modfiy_data_export;
    }

    function showModfiyDataBin(val) {
        val = JSON.stringify(val);
        val_modfiy_data = "Data update notification【hexadecimal original code】" + time_str + val + "\n" +
            "---------------------------------------------------------------------------------------------" +
            "\n" + val_modfiy_data;
        // val_modfiy_data_export = "数据更新通知【16进制原码】" + time_str + val + "\n" +
        //     "\n" + val_modfiy_data_export;
    }
    var append_count = 0;
    var val_show_append_info_export = "";

    function showAppendInfo(val) {
        append_count++;
        delData(true);
        val = JSON.stringify(val);
        val_show_append_info = "Other sensor data【analysis content】" + time_str + val + "\n" + val_show_append_info;
        // val_show_append_info_export = "其他传感器数据【解析内容】" + time_str + val + "\n" + val_show_append_info_export;
    }

    function showAppendInfoBin(val) {
        val = JSON.stringify(val);
        val_show_append_info = "Other sensor data【hexadecimal original code】" + time_str + val + "\n" +
            "---------------------------------------------------------------------------------------------" +
            "\n" + val_show_append_info;
        // val_show_append_info_export = "其他传感器数据【16进制原码】" + time_str + val + "\n" +
        //     "\n" + val_show_append_info_export;
    }
    var person_count = 0;
    var val_show_person_info_export = "";

    function showPersonInfo(val) {
        person_count++;
        delData(true);
        val = JSON.stringify(val);
        val_show_person_info = "Online tag statistics【analysis content】" + time_str + val + "\n" + val_show_person_info;
        // val_show_person_info_export = "在线标签统计【解析内容】" + time_str + val + "\n" + val_show_person_info_export;
    }

    function showPersonInfoBin(val) {
        val = JSON.stringify(val);
        val_show_person_info = "Online tag statistics【hexadecimal original code】" + time_str + val + "\n" +
            "---------------------------------------------------------------------------------------------" +
            "\n" + val_show_person_info;
        // val_show_person_info_export = "在线标签统计【16进制原码】" + time_str + val + "\n" +
        //     "\n" + val_show_person_info_export;
    }
    var basestate_count = 0;
    var val_show_base_state_export = "";

    function showBaseState(val) {
        basestate_count++;
        delData(true);
        val = JSON.stringify(val);
        val_show_base_state = "Anchor data【analysis content】" + time_str + val + "\n" + val_show_base_state;
        // val_show_base_state_export = "基站数据【解析内容】" + time_str + val + "\n" + val_show_base_state_export;
    }

    function showBaseStateBin(val) {
        val = JSON.stringify(val);
        val_show_base_state = "Anchor data【hexadecimal original code】" + time_str + val + "\n" +
            "---------------------------------------------------------------------------------------------" +
            "\n" + val_show_base_state;
        // val_show_base_state_export = "基站数据【16进制原码】" + time_str + val + "\n" +
        //     "\n" + val_show_base_state_export;
    }

    function showBtns(val) {
        val = JSON.stringify(val);
        val_show_command = "Instructions:" + time_str + val + "\n" + val_show_command;
    }
    var video_count = 0;
    var val_show_video_state_export = "";

    function showVideState(val) {
        video_count++;
        delData(true);
        val = JSON.stringify(val);
        val_show_video_state = "Video linkage JSON data:" + time_str + val + "\n" + val_show_video_state;
        // val_show_video_state_export = "视频联动JSON数据:" + time_str + val + "\n" + val_show_video_state_export;
    }

    function showBtnsState(val) {
        val = JSON.stringify(val);
        val_show_btns_state = "Instructions response JSON data:" + time_str + val + "\n" + val_show_btns_state;
    }

    function HEXto16Str(hex) {
        var newstr = '';
        for (var i = 0; i < hex.length; i++) {
            var s = "00" + hex[i].toString(16);
            numto16 = s.substr(s.length - 2, 2);
            newstr += numto16;
        }
        return newstr
    }

    window.ClearShowInfo = function () {
        val_show_tag_pos = "";
        val_show_gao_jing = "";
        val_show_dm_data = "";
        val_modfiy_data = "";
        val_show_append_info = "";
        val_show_person_info = "";
        val_show_base_state = "";
        val_show_command = "";
        val_show_video_state = "";
        val_show_btns_state = "";
        val_show_area_info = "";
    }

    window.ToggleBasicClicked = function () {
        var password = document.getElementById("password").value;
        if(password == ''){alert('Please input websocket  password');return;}
        window.CloseWebsocket();
        window.ClearShowInfo();
        $("#connetbtn").attr("disabled", "disabled");
        var time = 3;
        $("#connetbtn").text(time);
        var timer = setInterval(() => {
            time--
            $("#connetbtn").text(time);
            if (time == 0) {
                clearInterval(timer);
                $("#connetbtn").removeAttr("disabled", "disabled");
                $("#connetbtn").text("connection");
            }
        }, 1000);
        var ws_api = window.LOCALSENSE.WEBSOCKET_API;
        if (ws_api) {
            var url = window.document.getElementById("serverip").value;
            var username = document.getElementById("username").value;
            if (salt_en_val == null || salt_en_val == "") {
                salt_en_val = "";
            } 
            ws_api.SetAccount(username, password, salt_en_val);
            ws_api.ClearBuffer();

            if (url == '' || url == undefined) {
                alert('Please input server address');
            }

            console.log("SDK VERSION  " + ws_api.getVersionMajor() + "." + ws_api.getVersionMinor())
            //RequireBasicInfo：基本信息，包括标签位置，告警信息，
            //点名数据，修改数据，人员信息等数据，如下：
            ws_api.onRecvTagPos = function (obj) {
                UpdateFilterTag(obj);
                showTagPos(obj);
            };
            ws_api.onRecvTagPosBin = function (obj) {
                showTagPosBin(HEXto16Str(obj));
            };

            ws_api.onRecvGaojing = function (obj) {
                showGaoJing(obj);
            };
            ws_api.onRecvGaojingBin = function (obj) {
                showGaoJingBin(HEXto16Str(obj));
            };

            ws_api.onRecvAreaInfo = function (obj) {
                showAreaInfo(obj);
            };
            ws_api.onRecvAreaInfoBin = function (obj) {
                showAreaInfoBin(HEXto16Str(obj));
            };

            ws_api.onRecvDmData = function (obj) {
                showDmData(obj);
            };
            ws_api.onRecvDmDataBin = function (obj) {
                showDmDataBin(HEXto16Str(obj));
            };

            ws_api.onRecvModfiyData = function (obj) {
                showModfiyData(obj);
            };
            ws_api.onRecvModfiyDataBin = function (obj) {
                showModfiyDataBin(HEXto16Str(obj));
            };

            ws_api.onRecvAppendInfo = function (obj) {
                showAppendInfo(obj);
            };
            ws_api.onRecvAppendInfoBin = function (obj) {
                showAppendInfoBin(HEXto16Str(obj));
            };

            ws_api.onRecvPersonInfo = function (obj) {
                showPersonInfo(obj);
            };
            ws_api.onRecvPersonInfoBin = function (obj) {
                showPersonInfoBin(HEXto16Str(obj));
            };

            ws_api.onRecvErrorInfo = function (obj) {
                showPersonInfo(obj);
            };

            //RequireExtraInfo：其他信息，包括基站数据，如下：
            ws_api.onRecvBaseStData = function (obj) {
                showBaseState(obj);
            };
            ws_api.onRecvBaseStDataBin = function (obj) {
                showBaseStateBin(HEXto16Str(obj));
            };

            //RequireControlInfo：控制信息，包括电子围栏报警开关，
            //无陪同报警开关，提押报警开onRecvWebScoketSwitchBack关，电子点名开关
            ws_api.onRecvWebScoketSwitchBack = function (obj) {
                showBtnsState(obj);
            };

            ws_api.onRecvClickSwitchBack = function (obj) {
                showBtns(obj);
            };

            //打开视频联动以及关闭视频联动
            ws_api.onRecvVideoChange = function (obj) {
                showVideState(obj);
            };
            //打开视频联动指令
            ws_api.onSendVideoRequest = function (param) {
                val_show_command = "Instruction" + time_str + param + "\n" + val_show_command;
            }
            //关闭视频联动指令
            ws_api.onSendVideoClose = function (param) {
                val_show_command = "Instruction" + time_str + param + "\n" + val_show_command;
            }
            //临时撤防指令
            ws_api.onSendDrawRequest = function (param) {
                val_show_command = "Instruction" + time_str + param + "\n" + val_show_command;
            }

            //标签震动蜂鸣指令
            ws_api.onSendTagShakeRequest = function (param) {
                val_show_command = "Instruction" + time_str + param + "\n" + val_show_command;
            }

            // ws错误
            ws_api.onError = function (obj) {
                val_show_command = obj;
            }

            ws_api.onOpen = function (obj) {
                val_show_command = obj;
            }

            ws_api.onClose = function (obj) {
                val_show_command = obj + "\n" + val_show_command;
            }

            ws_api.RequireBasicInfo(url);

            ws_api.RequireExtraInfo(url);

            ws_api.RequireControlInfo(url);
			
			//传入tag64 checked
			var tag64CheckedObj = document.getElementById("tag64Id");
            // console.log('ttt'+tag64CheckedObj)
			tag64CheckedObj.addEventListener("click", function(obj){
				if(obj.target.checked){
					ws_api.setTag64CheckedFlag(true);
				}else{
					ws_api.setTag64CheckedFlag(false);
				}
			});
			ws_api.setTag64CheckedFlag(tag64CheckedObj.checked);

            //位置数据输出模式            
            var posOutPutOptionObj = document.getElementById("posOutPutOption");
			posOutPutOptionObj.addEventListener("click", function(obj){
                var selectedPosOption = obj.target.value;
				ws_api.setPosOutType(selectedPosOption);
			});
			ws_api.setPosOutType(posOutPutOptionObj.value);
            // var selected_val = document.getElementById(select_id).value;
        }
    }

    //客户端断开的请求
    window.CloseWebsocket = function () {
        var ws_api = window.LOCALSENSE.WEBSOCKET_API;
        if (ws_api) {
            ws_api.RejectBasicInfo();
            ws_api.RejectExtraInfo();
            ws_api.RejectControlInfo();
            delData(false);
            val_show_command = "Instruction" + time_str + "Disconnected from server" + "\n" + val_show_command;
        }
    };

    // 按钮点击返回
    window.SwitchBtnClick = function (type, state) {
        var ws_api = window.LOCALSENSE.WEBSOCKET_API;
        ws_api.Send2WS_RequsetSwitch(type, state);
    };

    // 过滤按钮
    var rss_content = "";
    window.RssTagClicked = function () {
        rss_content = document.getElementById("Rss_content").value;
        if (rss_content == null || rss_content == "") {
            alert("Please input a tag to subscribe")
        } else {
            val_show_tag_pos = "";
            var ws_api = window.LOCALSENSE.WEBSOCKET_API;
            ws_api.Send2WS_RssTagClicked(rss_content);
			let allmap = ""//为空全订阅
            ws_api.Send2WS_RssMapClicked(allmap);
            val_show_command = "Instruction:" + time_str + "Subscribed tags:" + rss_content + "\n" + val_show_command;
        };
    }
    window.RssGroupClicked = function () {
        rss_content = document.getElementById("Rss_content").value;
        if (rss_content == null || rss_content == "") {
            alert("Please input group to subscribe")
        } else {
            var ws_api = window.LOCALSENSE.WEBSOCKET_API;
            ws_api.Send2WS_RssGroupClicked(rss_content);
            val_show_command = "Instruction:" + time_str + "Subscribed groups:" + rss_content + "\n" + val_show_command;
        }
    };
    window.RssMapClicked = function () {
        rss_content = document.getElementById("Rss_content").value;
        if (rss_content == null || rss_content == "") {
            alert("Please input layer to subscribe")
        } else {
            val_show_tag_pos = "";
            var ws_api = window.LOCALSENSE.WEBSOCKET_API;
            ws_api.Send2WS_RssMapClicked(rss_content);
			//再订阅所有标签(否则如之前发送过按图层订阅则非被订阅图层的标签订阅不到)
            let alltag = "";//为空全订阅
            ws_api.Send2WS_RssTagClicked(alltag);
            val_show_command = "Instructions:" + time_str + "Subscribed layer:" + rss_content + "\n" + val_show_command;
        }
    };

    window.NoFiliter = function () {
        document.getElementById("Rss_content").value = null;
        window.CloseWebsocket();
        window.ToggleBasicClicked();
    }


    var g_filter_tag = "";
    window.FilterTag = function () {
        g_filter_tag = document.getElementById("filter_tag").value;
    }
    window.VedioOpenBtnClick = function () { //打开视频联动
        var ws_api = window.LOCALSENSE.WEBSOCKET_API;
        ws_api.Send2WS_RequsetVedioOpen(g_filter_tag);
    };
    window.VedioCloseBtnClick = function () { //关闭视频联动
        var ws_api = window.LOCALSENSE.WEBSOCKET_API;
        ws_api.Send2WS_RequsetVideoClose(g_filter_tag);
    };
    window.WithdrawUpdateBtnClick = function () { //标签临时撤防设置
        var ws_api = window.LOCALSENSE.WEBSOCKET_API;
        var time = new Date().getTime(); //用户根据需要自己输入时间
        ws_api.Send2WS_RequsetWithdrawUpdateReq(g_filter_tag, time); //time时间戳的形式
    };
    window.TagShakeBuzzBtnClick = function () { //标签振动蜂鸣
        var ws_api = window.LOCALSENSE.WEBSOCKET_API;
        var conf_type = "tagvibrateandshake"; //标签振动蜂鸣类型
        var conf_value = "enable"; //启用
        ws_api.Send2WS_RequsetTagShakeBuzzReq(conf_type, conf_value, g_filter_tag);
    };



}());