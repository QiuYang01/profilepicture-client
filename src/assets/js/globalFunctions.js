


exports.install = function(Vue, options) {

    

    /*------------      消息提示     ------------*/
    // 成功消息提示
    Vue.prototype.succMsg = function(str) {
        this.$message({
            message: str,
            type: 'success'
        });
    }

    // 警告消息提示
    Vue.prototype.warnMsg = function(str) {
        this.$message({
            message: str,
            type: 'warning'
        });
    }

    // 错误消息提示
    Vue.prototype.errMsg = function(str) {
        this.$message.error(str);
    }

    // 普通消息提示
    Vue.prototype.Msg = function(str) {
        this.$message(str);
    }

    /*------------      时间、日期格式化     ------------*/
    // 日期格式化
    Vue.prototype.dateFormate = function(dateStr) {
        // console.log(dateStr)
        // if(!this.notEmptyN(dateStr) || isNaN(Date.parse(dateStr))) return "";
        if(!this.notEmptyN(dateStr) ) return "";
        return dateStr.split("T")[0];
        //var dt = new Date(dateStr.split(".")[0].replace(/\-/g, '/').replace("T"," "));
        //return dt.getFullYear() + '-' + (dt.getMonth() + 1).toString().padStart(2, '0') + '-' + dt.getDate().toString().padStart(2, '0');
    }

    // 日期时间格式化
    Vue.prototype.dateTimeFormate = function(dateStr) {
        if(!this.notEmptyN(dateStr) ) return "";
        return dateStr.split(".")[0].replace("T"," ");
        var dt = new Date(dateStr.split(".")[0].replace(/\-/g, '/').replace("T"," "));
        //return dateStr.split(".")[0].replace(/\-/g, '/').replace("T"," ")
        return dt.getFullYear() + '-' + (dt.getMonth() + 1).toString().padStart(2, '0') + '-' + dt.getDate().toString().padStart(2, '0') +
            ' ' + dt.getHours().toString().padStart(2, '0') + ':' + dt.getMinutes().toString().padStart(2, '0') + ':' + dt.getSeconds().toString().padStart(2, '0');
    }

    // 时间格式化
    Vue.prototype.timeFormate = function(dateStr) {
        if(!this.notEmptyN(dateStr) ) return "";
        return dateStr.split(".")[0].split("T")[1];
        if (!this.notEmptyN(dateStr) || isNaN(Date.parse(dateStr))) return "";
        var dt = new Date(dateStr.split(".")[0].replace(/\-/g, '/').replace("T"," "));
        return  dt.getHours().toString().padStart(2, '0') + ':' + dt.getMinutes().toString().padStart(2, '0');
    }

    // 时间格式化
    // Vue.prototype.timeSecondsFormate = function(dateStr) {
    //     if (!this.notEmptyN(dateStr) || isNaN(Date.parse(dateStr))) return "";
    //     var dt = new Date(dateStr.split(".")[0].replace(/\-/g, '/').replace("T"," "));
    //     return  dt.getHours().toString().padStart(2, '0') + ':' + dt.getMinutes().toString().padStart(2, '0') +
    //         ' ' + dt.getSeconds().toString().padStart(2, '0');
    // }

    // // 时间格式化
    // Vue.prototype.MinutesFormate = function(dateStr) {
    //     if (!this.notEmptyN(dateStr) || isNaN(Date.parse(dateStr))) return "";
    //     var dt = new Date(dateStr.split(".")[0].replace(/\-/g, '/').replace("T"," "));
    //     return dt.getMinutes().toString().padStart(2, '0') + ':' + dt.getSeconds().toString().padStart(2, '0');
    // }

    /*------------      金额格式化     ------------*/
    Vue.prototype.moneyFormate = function(val) { // 金额格式化
        if(!val) return 0;
        val = val.toString().replace(/\$|\,/g, '');
        if (isNaN(val)) {
            val = "0";
        }
        let sign = (val == (val = Math.abs(val)));
        val = Math.floor(val * 100 + 0.50000000001);
        let cents = val % 100;
        val = Math.floor(val / 100).toString();
        if (cents < 10) {
            cents = "0" + cents
        }
        for (var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
            val = val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3));
        }

        return (((sign) ? '' : '-') + val + '.' + cents);
    }


    /*------------      数据校验     ------------*/
    // 判断是否为空（无提示）
    Vue.prototype.notEmptyN = function(value) {

        if (typeof value == "undefined" || value == null || String(value) == "") {
            return false;
        } else {
            return true;
        }
    }


    // 判断是否为空
    Vue.prototype.notEmpty = function(value, name) {
        if (typeof value == "undefined" || value == null || String(value) == "") {
            this.warnMsg(name + '不能为空！');
            return false;
        } else {
            return true;
        }
    }

    // 判断是否为空且大于零
    Vue.prototype.notEmptyPositive = function(value, name) {
        if (typeof value == "undefined" || value == null || value <= 0 || String(value) == "") {
            this.warnMsg(name + '不能为空且大于0！');
            return false;
        } else {
            return true;
        }
    }


    //判断不能为负数
    Vue.prototype.notPositive = function(value, name) {
        if (value < 0) {
            this.warnMsg(name + '不能为负数！');
            return false;
        } else {
            return true;
        }
    }

    //判断不能为负数
    Vue.prototype.Positive = function(value, name) {
        if (value != 0) {
            this.warnMsg(name + '不为零！');
            return false;
        } else {
            return true;
        }
    }

    //判断重复
    Vue.prototype.findRepetition = function(methods, name) {
        if (this.$store.getters[methods](name)) {
            this.warnMsg('名称重复！');
            return false;
        } else {
            return true;
        }
    }



    //判断余额
    Vue.prototype.monneyNotPositive = function(val1, val2, name) {
        var value1 = this.notEmptyN(val1) ? parseFloat(val1) : 0;
        var value2 = this.notEmptyN(val2) ? parseFloat(val2) : 0;
        if (value1 - value2 < 0) {
            this.warnMsg(name);
            return false;
        } else {
            return true;
        }
    }

    // 判断是否为空（是否选择）
    Vue.prototype.notSelect = function(value, name) {
        if (typeof value == "undefined" || value == null || String(value) == "") {
            this.warnMsg('请选择' + name + '！');
            return false;
        } else {
            return true;
        }
    }

    // 验证电话号码格式
    Vue.prototype.phoneNumber = function(value) {
            if (value && (!(/^[0-9]{6,11}$/).test(value))) {
                this.warnMsg('手机号码不符合规范');
                return false;
            } else {
                return true;
            }
        }
        //验证vip卡号必须是六位数字
    Vue.prototype.VIPNumber = function(value) {
            if (value && (!(/^[0-9]{6}$/).test(value))) {
                this.warnMsg('VIP卡号不符合规范');
                return false;
            } else {
                return true;
            }
        }
    //     // 验证身份证号码
    // Vue.prototype.idCardNumber = function(value) {
    //     if (value && (!(/\d{17}[\d|x]|\d{15}/).test(value) || (value.length !== 15 && value.length !== 18))) {
    //         this.warnMsg('身份证号码不符合规范');
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }
   // 验证身份证号码
    Vue.prototype.idCardNumber = function(value) {
        console.log("新的身份证校验")
        let data = value.toUpperCase() //转换成大写
        return validateIdent.IdentityCodeValid(data)
    }
}


// 身份证校验的函数
const validateIdent = {
    aIdentityCode_City: { // 城市代码列表  
        11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林",
        23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西",
        37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南",
        50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃",
        63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 "
    },
    IdentityCode_isCardNo(card) {//检查号码是否符合规范，包括长度，类型  
        var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/; //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
        if (reg.test(card) === false) {
            return false;
        }
        return true;
    },
    IdentityCode_checkProvince(card) { //取身份证前两位，校验省份    
        var province = card.substr(0, 2);
        if (validateIdent.aIdentityCode_City[province] == undefined) {
            return false;
        }
        return true;
    },
    IdentityCode_checkBirthday(card) { //检查生日是否正确，15位以'19'年份来进行补齐。  
        var len = card.length;
        //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字    
        if (len == '15') {
            var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
            var arr_data = card.match(re_fifteen); // 正则取号码内所含出年月日数据  
            var year = arr_data[2];
            var month = arr_data[3];
            var day = arr_data[4];
            var birthday = new Date('19' + year + '/' + month + '/' + day);
            return validateIdent.IdentityCode_verifyBirthday('19' + year, month, day, birthday);
        }
        //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X    
        if (len == '18') {
            var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
            var arr_data = card.match(re_eighteen); // 正则取号码内所含出年月日数据  
            var year = arr_data[2];
            var month = arr_data[3];
            var day = arr_data[4];
            var birthday = new Date(year + '/' + month + '/' + day);
            // console.log(year + '/' + month + '/' + day)
            return validateIdent.IdentityCode_verifyBirthday(year, month, day, birthday);
        }
        return false;
    },
    IdentityCode_verifyBirthday(year, month, day, birthday) {//校验日期 ，15位以'19'年份来进行补齐。
        var now = new Date();
        var now_year = now.getFullYear();
        //年月日是否合理    
        if (birthday.getFullYear() == year
            && (birthday.getMonth() + 1) == month
            && birthday.getDate() == day) {
            //判断年份的范围（0岁到150岁之间)    
            var time = now_year - year;
            if (time >= 0 && time <= 150) {
                return true;
            }
            return false;
        }
        return false;
    },
    IdentityCode_checkParity(card) { //校验位的检测  
        card = validateIdent.IdentityCode_changeFivteenToEighteen(card); // 15位转18位    
        var len = card.length;
        if (len == '18') {
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var cardTemp = 0, i, valnum;
            for (i = 0; i < 17; i++) {
                cardTemp += card.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[cardTemp % 11];
            if (valnum == card.substr(17, 1)) {
                return true;
            }
            return false;
        }
        return false;
    },
    IdentityCode_changeFivteenToEighteen(card) {  //15位转18位身份证号   
        if (card.length == '15') {
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var cardTemp = 0, i;
            card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
            for (i = 0; i < 17; i++) {
                cardTemp += card.substr(i, 1) * arrInt[i];
            }
            card += arrCh[cardTemp % 11];
            return card;
        }
        return card;
    },
    IdentityCodeValid(card) {//   身份证号码检验主入口 
        let pass = true;
        let sex = ''
        //是否为空    
        if (pass && card === '')
            pass = false;

        //校验长度，类型    
        if (pass && validateIdent.IdentityCode_isCardNo(card) === false)
            pass = false;

        //检查省份    
        // if (pass && validateIdent.IdentityCode_checkProvince(card) === false)
        //     pass = false;
        // console.log(pass)
        //校验生日    
        if (pass && validateIdent.IdentityCode_checkBirthday(card) === false)
            pass = false;

        //检验位的检测    
        // if (pass && validateIdent.IdentityCode_checkParity(card) === false)
        //     pass = false;
        // console.log(pass)
        if (pass) {
            // var iCard = validateIdent.IdentityCode_changeFivteenToEighteen(card);
            // if (parseInt(iCard.charAt(16)) % 2 == 0) {
            //     sex = "0"; // 女生  
            // } else {
            //     sex = "1"; // 男生  
            // }
            return true
        } else {
            return false
        }
    }
}