if (ws_api) {
			ws_api.setTag64CheckedFlag(true);
            var url = "49.232.114.188:48300";
            var username = "ZAHIA";
            if (salt_en_val == null || salt_en_val == "") {
                salt_en_val = "";
            } 
            var password='ZAHIA1118+'
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
			// var tag64CheckedObj = document.getElementById("tag64Id");
			// tag64CheckedObj.addEventListener("click", function(obj){
			// 	if(obj.target.checked){
			// 		ws_api.setTag64CheckedFlag(true);
			// 	}else{
			// 		ws_api.setTag64CheckedFlag(false);
			// 	}
			// });
			// ws_api.setTag64CheckedFlag(tag64CheckedObj.checked);

            //位置数据输出模式            
            var posOutPutOptionObj = document.getElementById("posOutPutOption");
			posOutPutOptionObj.addEventListener("click", function(obj){
                var selectedPosOption = obj.target.value;
				ws_api.setPosOutType(selectedPosOption);
			});
			ws_api.setPosOutType(posOutPutOptionObj.value);
            // var selected_val = document.getElementById(select_id).value;
        }