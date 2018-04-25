$(document).ready(function () {
    $('.number').keypress(function (event) {
        //var regex = new RegExp("^[0-9]+$");
        //var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);

        //if (!regex.test(key)) {
        //    event.preventDefault();
        //    return false;
        //}
        var key = window.event ? event.keyCode : event.which;
        if (event.keyCode == 8 || event.keyCode == 46
         || event.keyCode == 37 || event.keyCode == 39) {
            return true;
        }
        else if (key < 48 || key > 57) {
            return false;
        }
        else return true;
    });
    $('.numberF').keypress(function (event) {
        var charCode = (event.which) ? event.which : event.keyCode
        if (event.keyCode == 8 || event.keyCode == 46)
            return true;
        if (
            (charCode != 44 || $(this).val().indexOf(',') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
            (charCode != 46 || $(this).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
            (charCode < 48 || charCode > 57 ))
            return false;

        return true;
    });

    $(".showPDF").fancybox({
        width: '80%',
        height: '80%',
        type: 'iframe'
    });

    $(".showImages").fancybox({

    });

    $(".showDoc").fancybox({
        href: "https://docs.google.com/gview?url=" + window.location.host + "/" + this.URL + "&embedded=true",
        width: '80%',
        height: '80%',
        type: 'iframe'
    });

    //$('.fancybox').fancybox();

    $(".fancyboxUpdate").fancybox({
        closeBtn: true,
        closeClick: false,
        helpers: { overlay: { closeClick: false } },
        keys: { close: null },
        type: 'iframe',
        'afterClose': function () { loadGridTableAll(); }
    });

    $(".fancyboxView").fancybox({
        closeBtn: true,
        closeClick: false,
        helpers: { overlay: { closeClick: false } },
        keys: { close: null },
        'onComplete': function () {
            setTimeout(function () { $.fancybox.close(); }, 9000); // 3000 = 3 secs
        }
    });

    //$(".fancyboxView").fancybox({
    //    width: 1001,
    //    height: 860,
    //    closeBtn: true,
    //    closeClick: false,
    //    helpers: { overlay: { closeClick: false } },
    //    keys: { close: null },
    //    'onComplete': function () {
    //        setTimeout(function () { $.fancybox.close(); }, 9000); // 3000 = 3 secs
    //    }
    //});

    $(".fancyboxStaff").fancybox({
        'width': 1001,
        'height': 860,
        closeBtn: true,
        closeClick: false,
        helpers: { overlay: { closeClick: false } },
        keys: { close: null },
        'type': 'iframe',
        'afterClose': function () { window.location.reload(); }
    });
});

function ShowAlertValue(divShow, value) {
    var v = "";
    v += '<div class="alert alert-success" role="alert" style="text-align: center;margin-bottom:0px;vertical-align: middle;" >';
    v += '  <strong>Cập nhật thông tin cơ bản thành công!</strong>';
    v += '</div>';
    $("#" + divShow).empty();
    $("#" + divShow).html(v);
}

function ShowAlertSuccess (divShow) {
    var v = "";
    v += '<div class="alert alert-success" role="alert" style="text-align: center;margin-bottom:0px;vertical-align: middle;">';
    v += '  <strong style="text-align: center;vertical-align: middle;min-height: 40px;">Cập nhật thông tin cơ bản thành công!</strong>';
    v += '</div>';
    $("#" + divShow).empty();
    $("#" + divShow).html(v);
    parent.$.fancybox.inner.width(320);
    parent.$.fancybox.inner.height(80);
    parent.$.fancybox.update();
    window.setTimeout(function () {
        parent.$.fancybox.close();
    }, 2000);
}

function ShowAdminLinkEdit(CheckUpdate, Id, Name, url) {
    var v = "";
    if (CheckUpdate == 1)
    {
        v += "      <a class='fancybox fancybox.iframe fancyboxUpdate' href='/" + url + "/Update/" + Id + "' style='cursor: pointer;' >" + Name + "</a>";
    }
    else
    {
        v += "      <a class='fancybox fancybox.iframe fancyboxView' href='/" + url + "/ViewRow/" + Id + "' style='cursor: pointer;' >" + Name + "</a>";
    }
    return v;
}

function ShowAdminButtonEdit(CheckUpdate, Id, Name, url) {
    var v = "";
    if (CheckUpdate == 1) {
        v += "          <a href='/" + url + "/Update/" + Id + "' class='btn btn-xs btn-info fancybox fancybox.iframe fancyboxUpdate'>";
        v += "              <i class='ace-icon fa fa-edit bigger-120'></i>";
        v += "          </a>";
    }
    else {
        v += "          <a href='' class='btn btn-xs btn-info disabled'>";
        v += "              <i class='ace-icon fa fa-edit bigger-120'></i>";
        v += "          </a>";
    }
    return v;
}

function ShowAdminButtonDelete(CheckUpdate, Id, deleteFunction) {
    var v = "";
    if (CheckUpdate == 1) {
        v += "          <a onClick='return " + deleteFunction + "(" + Id + ");'  class='btn btn-xs btn-danger'>";
        v += "              <i class='ace-icon fa fa-trash-o bigger-120'></i>";
        v += "          </a>";
    }
    else {
        v += "          <a class='btn btn-xs btn-danger disabled'>";
        v += "              <i class='ace-icon fa fa-trash-o bigger-120'></i>";
        v += "          </a>";
    }
    return v;
}

function ShowAdminIsEncryted(intCheck,value) {
    var v = "";
    if (intCheck == 1) {
        v += value;
    }
    else {
        v += "-xxxxxx-";
    }
    return v;
}

function ShowAdminImages(value,links,height) {
    var v = "";
    if (value != null && value != "") {
        v += "<a data-fancybox-href='" + links + "' href='" + links + "'' class='" + CheckFileTypeShowBox(value) + "'><img style='height:" + height + "px;' src='" + links + "' /></a></td>";
    }
    else {
        v += " không có";
    }
    return v;
}

//title: Công ty CP Tập Đoàn T&T ;links :ttgroupjobs.com ; imgview : /Assets/Images/logo.png;
function ShowAdminViewEmail(title, links, content, imgview, imgviewHeader, imgviewFooter, links1, links2, links3) {
    var v = "";
    v += '<div class="container">';
    v += '    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#cccccc" style="margin:auto">';
    v += '        <tr>';
    v += '            <td>';
    v += '                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="max-width: 550px;margin:auto">';
    v += '                    <tbody>';
    v += '                        <tr>';
    v += '                            <td>';
    v += '                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">';
    v += '                                    <tr>';
    v += '                                          <td style="padding: 15px 20px">';
    v += '                                              <a href="' + links  + '" target="_blank">';
    v += '                                                  <img border="0" src="' + imgview + '" alt="' + title + '" />';
    v += '                                              </a>';
    v += '                                          </td>';
    v += '                                    </tr>';
    v += '                                </table>';
    v += '                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">';
    v += '                                    <tr>';
    v += '                                        <td style="padding: 0 20px 15px">';
    v += '                                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">';
    if (imgviewHeader != "")
    {
        v += '                                                <tr>';
        v += '                                                    <td align="center" style="padding-bottom: 20px">';
        v += '                                                        <img style="width:100%; max-width: 500px" src="' + imgviewHeader + '"  />';
        v += '                                                    </td>';
        v += '                                                </tr>';
    }
    v += '                                                <tr><td style="padding-bottom:20px" id="email_content">' + content + '</td></tr>';
    v += '                                                <tr>';
    v += '                                                    <td>';
    v += '                                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">';
    v += '                                                            <tr>';
    v += '                                                                <td colspan="6" style="border-top: 1px solid #666; padding: 15px 0; font-family:arial; font-size: 12px; color: #000000; font-weight: bold">Cơ Hội Nghề Nghiệp Tại: ' + title + '  </td>';
    v += '                                                            </tr>';
    v += '                                                            <tr>';
    v += '                                                                <td bgcolor="#ff772c" height="25" width="25%" align="center" valign="middle" style="border: 1px solid #ff5b00"><a href="' + links1 +'" target="_blank" style="color: #fff; font-size: 12px; font-weight:bold; font-family: arial; text-decoration: none">Tất Cả Việc Làm</a></td>';
    v += '                                                                <td width="3%">&nbsp;</td>';
    v += '                                                                <td bgcolor="#ff772c" height="25" width="33%" align="center" valign="middle" style="border: 1px solid #ff5b00"><a href="' + links2 + '" target="_blank" style="color: #fff; font-size: 12px; font-weight:bold; font-family: arial; text-decoration: none">Việc làm theo ngành nghề</td>';
    v += '                                                                <td width="3%">&nbsp;</td>';
    v += '                                                                <td bgcolor="#ff772c" height="25" width="33%" align="center" valign="middle" style="border: 1px solid #ff5b00"><a href="' + links3 + '" target="_blank" style="color: #fff; font-size: 12px; font-weight:bold; font-family: arial; text-decoration: none">Việc Làm Theo Địa Điểm</td>';
    v += '                                                                <td width="5%">&nbsp;</td>';
    v += '                                                            </tr>';
    v += '                                                        </table>';
    v += '                                                    </td>';
    v += '                                                </tr>';
    if (imgviewFooter != "") {
        v += '                                                <tr>';
        v += '                                                    <td align="center" style="padding-top: 15px">';
        v += '                                                        <img style="width:100%; max-width: 500px" src="' + imgviewFooter + '"  />';
        v += '                                                    </td>';
        v += '                                                </tr>';
    }
    v += '                                            </table>';
    v += '                                        </td>';
    v += '                                    </tr>';
    v += '                                </table>';
    v += '                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">';
    v += '                                    <tr>';
    v += '                                        <td style="padding:0 5% 15px; font-family:arial; font-size:12px; color: #000000" align="center"></td>';
    v += '                                    </tr>';
    v += '                                </table>';
    v += '                            </td>';
    v += '                        </tr>';
    v += '                    </tbody>';
    v += '                </table>';
    v += '            </td>';
    v += '        </tr>';
    v += '    </table>';
    v += '</div>';
    return v;
}

function CheckFileTypeShowBox(objCheck) {
    var ext = objCheck.substring(objCheck.lastIndexOf('.') + 1).toLowerCase();
    switch (ext) {
        case 'jpg':
            return 'showImages';
        case 'jpeg':
            return 'showImages';
        case 'png':
            return 'showImages';
        case 'gif':
                return 'showImages';
        case 'doc':
            return 'showDoc';
        case 'docx':
            return 'showDoc';
        case 'pdf':
            return 'showPDF';
        default:
            return 'fancybox';
    }
}


// Hàm check null
function CheckNull(objCheck, objShow, objMess)
{
    if ($("#" + objCheck).val() == "") {
        $("#" + objShow).text("Xin vui lòng điền " + objMess + "!");
        $("#" + objCheck).focus();
        return false;
    }
    else
    {
        return true;
    }
}
// Hàm check null
function CheckDropdownlist(objCheck, objShow, objMess) {
    if ($("#" + objCheck).val() == "0") {
        $("#" + objShow).text("Xin vui lòng chọn " + objMess + "!");
        $("#" + objCheck).focus();
        return false;
    }
    else {
        return true;
    }
}

function CheckCheckBox(objCheck, objShow, objMess) {
    if ($("#" + objCheck).is(':checked')) {
        $("#" + objShow).text(objMess);
        $("#" + objCheck).focus();
        return false;
    }
    else {
        return true;
    }
}
// Hàm check null
function CheckEndDate(objCheckStart, objCheckEnd, objShow, objMess) {

    var currentStartDate = parseDate($('#' + objCheckStart).val()) ;
    var currentEndDate = parseDate($('#' + objCheckEnd).val());
    if (currentStartDate > currentEndDate)
    {
        $("#" + objShow).text(objMess);
        $("#" + objCheckEnd).focus();
        return false;
    }
    else
    {
        return true;
    }
}

function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[1], mdy[0]);
}


function getCheckBoxToString(objCheck) {

    if ($("#" + objCheck).is(':checked')) {
        return '1';
    }
    else {
        return '2';
    }   
}

function setCheckBoxBool(objCheck,intCheck) {

    if (intCheck == 1)
    {
        $("#" + objCheck).prop('checked',true);
    }
    else
    {
        //return '2';
        $("#" + objCheck).prop('checked',false);
    }
}

function getCheckBoxToInt(intCheck) {

    if (intCheck == 1) {
        return true;
    }
    else {
        return false;
    }
}



function getViewStatus(intCheck) {

    if (intCheck == 1) {
        return 'Hiển thị';
    }
    else if (intCheck == 2) {
        return 'Không';
    }
    else {
        return 'Đã xóa';
    }
}

function getViewStatusContact(intCheck) {

    if (intCheck == 1) {
        return 'Đã xem';
    }
    else if (intCheck == 2) {
        return 'Chưa xem';
    }
    else {
        return 'Đã xóa';
    }
}

function getViewIsMain(intCheck) {

    if (intCheck == 1) {
        return 'Chính';
    }
    else {
        return '';
    }
}

function setLabelCheckBox(objCheck, objShow) {

    if ($(objCheck).is(':checked')) {
        $("#" + objShow).text('hiển thị!');
    }
    else {
        $("#" + objShow).text('không hiển thị!');;
    }
}
function setLabelCheckBoxIsAdmin(objCheck, objShow) {

    if ($(objCheck).is(':checked')) {
        $("#" + objShow).text('quyền quản trị!');
    }
    else {
        $("#" + objShow).text('người dùng bình thường!');;
    }
}
function setLabelCheckBoxIsDomain(objCheck, objShow) {

    if ($(objCheck).is(':checked')) {
        $("#" + objShow).text('thuộc Domain!');
    }
    else {
        $("#" + objShow).text('không thuộc Domain!');;
    }
}

function setLabelCheckBoxOther(objCheck, objShow, objMessTrue, objMessFalse) {
   
    if ($(objCheck).is(':checked')){
        $("#" + objShow).text(objMessTrue);
    }
    else {
        $("#" + objShow).text(objMessFalse);;
    }
}
function setLabelCheckBoxOtherDis(objCheck, objShow, objMessTrue, objMessFalse, objDis) {
   
    if ($(objCheck).is(':checked')) {
        $("#" + objDis).prop('disabled', false);
        $("#" + objShow).text(objMessTrue);
    }
    else {
        $("#" + objDis).prop('disabled', true);
        $("#" + objShow).text(objMessFalse);;
    }
}
function CheckEmail(objCheck, objShow, objMess) {
    var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    var sEmail = $("#" + objCheck).val();

    if (filter.test(sEmail)) {
        return true;
    }
    else {
        $("#" + objShow).text("Sai định dạng " + objMess + "!");
        $("#" + objCheck).focus();
        return false;
    }
}
function validateEmail(sEmail) {
    var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    if (filter.test(sEmail)) {
        return true;
    }
    else {
        return false;
    }
}

function getViewContract(intCheck) {

    if (intCheck == 1) {
        return 'Còn';
    }
    else if (intCheck == 2) {
        return 'Hết';
    }
    else if (intCheck == 9) {
        return 'Vô hạn';
    }
    else {
        return 'Hết';
    }
}
function getViewMainContact(intCheck) {

    if (intCheck == 1) {
        return 'Yes';
    }
    else if (intCheck == 2) {
        return 'No';
    }
    else {
        return 'No';
    }
}

function checkNull(obj) {
    if (obj != null) {       
        return obj;
    }
    else {
        return '';
    }
}

function convertDateAlert(dateToFormat) {
    var dateObject = new Date(dateToFormat);
    var day = dateObject.getDate();
    var month = dateObject.getMonth() + 1;
    var year = dateObject.getFullYear();
  
    var currentdate = new Date();    
    var dayNow = currentdate.getDate();
    var monthNow = currentdate.getMonth() + 1;
    var yearNow = currentdate.getFullYear();

    if (year < yearNow) {
        return false;
    }
    else if (year == yearNow) {        
        if ((monthNow +1) >= month) {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }
}

function convertDate(dateToFormat) {
    if (dateToFormat != null)
    {
        var dateObject = new Date(dateToFormat);
        var day = dateObject.getDate();
        var month = dateObject.getMonth() + 1;
        var year = dateObject.getFullYear();
        day = day < 10 ? "0" + day : day;
        month = month < 10 ? "0" + month : month;

        if (year != 1)
        {
            return (day + "/" + month + "/" + year);
        }
        else
        {
            return '';
        }
    }
    else
    {
        return '';
    }
}

function getAge(dateToFormat) {    
    if (dateToFormat != null) {
        var dateObject = new Date(dateToFormat);      
        var year = dateObject.getFullYear();

        var currentdate = new Date();
        var yearNow = currentdate.getFullYear();

        if (yearNow > year) {
            return (yearNow - year);
        }
        else {
            return '';
        }
    }
    else {
        return '';
    }
}

//function validateEmail(txtEmail){
//    var a = document.getElementById(txtEmail).value;
//    var filter = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{0,4}$/;
//    if(filter.test(a)){
//        return true;
//    }
//    else{
//        return false;
//    }
//}​

// check đúng định dạng email
function validateEmail(objCheck, objShow)
{
    var a = document.getElementById(objCheck).value;

    var filter = /^[a-zA-Z0-9_.-]+@@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{0,4}$/;
    if (filter.test(a)) {
        alert(filter.test(a));
        return true;
    }
    else{
        return false;
        $("#" + objShow).text(" " + "Chưa đúng định dạng mail" + "!");
        $("#" + objCheck).focus();
    }
}


function convertDateTime(dateToFormat) {
    var dateObject = new Date(dateToFormat);
    var day = dateObject.getDate();
    var month = dateObject.getMonth() + 1;
    var year = dateObject.getFullYear();
 
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    //08/05/2017 12:00 AM
    //dd/mm/yyyy HH:MM t
    return (day + "/" + month + "/" + year + " " + formatAMPM(dateObject));
}

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
    //8:30 AM
}



//---------------------------------------- CSDL ------------------------------------------------

function deleteRowTable(varId,control,action,funCall) {
    return alertify.confirm("Bạn có chắc chắn muốn xóa không?", function (e) {
        if (e) {
            
            var res = true;
            var urlDelete =  "/" + control + "/" + action ;
            var result = $.ajax({
                type: "GET",
                url: urlDelete,
                data: {
                    Id: varId
                },
                dataType: "text",
                async: false
            });
            alert(varId);
            result.done(function (resp) {
                if (resp == "false") {
                    res = false;
                }
                setTimeout(funCall + "()", 1);
                return resp;
            });
            return res;
        } else {
            return false;
        }
    });
}
//----------------------------------------------------------------------------------------------------

//---------------------------------------- Chu su dung------------------------------------------------


//$.formattedDate = function (dateToFormat) {
//    var dateObject = new Date(dateToFormat);
//    var day = dateObject.getDate();
//    var month = dateObject.getMonth() + 1;
//    var year = dateObject.getFullYear();
//    day = day < 10 ? "0" + day : day;
//    month = month < 10 ? "0" + month : month;
//    var formattedDate = day + "/" + month + "/" + year;
//    return formattedDate;
//};

function ConvertURL(str) {
    str = str.toLowerCase();
    var find, re;
    var a = ['À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Æ', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ð', 'ð', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', 'Ø', 'Ù', 'Ú', 'Û', 'Ü', 'Ý', 'ß', 'à', 'á', 'â', 'ã', 'ấ', 'ä', 'å', 'æ', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ñ', 'ò', 'ó', 'ô', 'ộ', 'Ộ', 'õ', 'ö', 'ø', 'ù', 'ú', 'û', 'ü', 'ý', 'ÿ', 'Ā', 'ā', 'Ă', 'ă', 'Ą', 'ą', 'Ć', 'ć', 'Ĉ', 'ĉ', 'Ċ', 'ċ', 'Č', 'č', 'Ď', 'ď', 'Đ', 'đ', 'Ē', 'ē', 'Ĕ', 'ĕ', 'Ė', 'ė', 'Ę', 'ę', 'Ě', 'ě', 'Ĝ', 'ĝ', 'Ğ', 'ğ', 'Ġ', 'ġ', 'Ģ', 'ģ', 'Ĥ', 'ĥ', 'Ħ', 'ħ', 'Ĩ', 'ĩ', 'Ī', 'ī', 'Ĭ', 'ĭ', 'Į', 'į', 'İ', 'ı', 'Ĳ', 'ĳ', 'Ĵ', 'ĵ', 'Ķ', 'ķ', 'Ĺ', 'ĺ', 'Ļ', 'ļ', 'Ľ', 'ľ', 'Ŀ', 'ŀ', 'Ł', 'ł', 'Ń', 'ń', 'Ņ', 'ņ', 'Ň', 'ň', 'ŉ', 'Ō', 'ō', 'Ŏ', 'ŏ', 'Ő', 'ő', 'Œ', 'œ', 'Ŕ', 'ŕ', 'Ŗ', 'ŗ', 'Ř', 'ř', 'Ś', 'ś', 'Ŝ', 'ŝ', 'Ş', 'ş', 'Š', 'š', 'Ţ', 'ţ', 'Ť', 'ť', 'Ŧ', 'ŧ', 'Ũ', 'ũ', 'Ū', 'ū', 'Ŭ', 'ŭ', 'Ů', 'ů', 'Ű', 'ű', 'Ų', 'ų', 'Ŵ', 'ŵ', 'Ŷ', 'ŷ', 'Ÿ', 'Ź', 'ź', 'Ż', 'ż', 'Ž', 'ž', 'ſ', 'ƒ', 'Ơ', 'ơ', 'Ư', 'ư', 'Ǎ', 'ǎ', 'Ǐ', 'ǐ', 'Ǒ', 'ǒ', 'Ǔ', 'ǔ', 'Ǖ', 'ǖ', 'Ǘ', 'ǘ', 'Ǚ', 'ǚ', 'Ǜ', 'ǜ', 'Ǻ', 'ǻ', 'Ǽ', 'ǽ', 'Ǿ', 'ǿ', 'Ά', 'ά', 'Έ', 'έ', 'Ό', 'ό', 'Ώ', 'ώ', 'Ί', 'ί', 'ϊ', 'ΐ', 'Ύ', 'ύ', 'ϋ', 'ΰ', 'Ή', 'ή'];
    var b = ['A', 'A', 'A', 'A', 'A', 'A', 'AE', 'C', 'E', 'E', 'E', 'E', 'I', 'I', 'I', 'I', 'D', 'd', 'N', 'O', 'O', 'O', 'O', 'O', 'O', 'U', 'U', 'U', 'U', 'Y', 's', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'ae', 'c', 'e', 'e', 'e', 'e', 'i', 'i', 'i', 'i', 'n', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'u', 'u', 'u', 'u', 'y', 'y', 'A', 'a', 'A', 'a', 'A', 'a', 'C', 'c', 'C', 'c', 'C', 'c', 'C', 'c', 'D', 'd', 'D', 'd', 'E', 'e', 'E', 'e', 'E', 'e', 'E', 'e', 'E', 'e', 'G', 'g', 'G', 'g', 'G', 'g', 'G', 'g', 'H', 'h', 'H', 'h', 'I', 'i', 'I', 'i', 'I', 'i', 'I', 'i', 'I', 'i', 'IJ', 'ij', 'J', 'j', 'K', 'k', 'L', 'l', 'L', 'l', 'L', 'l', 'L', 'l', 'l', 'l', 'N', 'n', 'N', 'n', 'N', 'n', 'n', 'O', 'o', 'O', 'o', 'O', 'o', 'OE', 'oe', 'R', 'r', 'R', 'r', 'R', 'r', 'S', 's', 'S', 's', 'S', 's', 'S', 's', 'T', 't', 'T', 't', 'T', 't', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'W', 'w', 'Y', 'y', 'Y', 'Z', 'z', 'Z', 'z', 'Z', 'z', 's', 'f', 'O', 'o', 'U', 'u', 'A', 'a', 'I', 'i', 'O', 'o', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'A', 'a', 'AE', 'ae', 'O', 'o', 'Α', 'α', 'Ε', 'ε', 'Ο', 'ο', 'Ω', 'ω', 'Ι', 'ι', 'ι', 'ι', 'Υ', 'υ', 'υ', 'υ', 'Η', 'η'];
    for (var i = 0; i < a.length; i++) {
        find = 'abc';
        re = new RegExp(a[i], 'g');
        str = str.replace(re, b[i]);
    }
    return str;
}

//---------------------------------------- Export ------------------------------------------------

function filterColumnTable(i, objTable) {
    if (i > 0) {
        $('#' + objTable).DataTable().column(i).search(
            $('#col' + i + '_filter').val(),
            true,
            true
        ).draw();
    }
    else {
        $('#' + objTable).DataTable().search(
            $('#global_filter').val(),
            true,
            true
        ).draw();
    }
}
function deleteItem(varId, url, title,funtionTable) {    
     alertify.confirm("Bạn có chắc chắn muốn xóa " + title + " không?", function (e) {
        if (e) {
            var res = true;
            var result = $.ajax({
                type: "GET",
                url: url,
                data: {
                    Id: varId
                },
                dataType: "text",
                async: false
            });
            result.done(function (resp) {
                if (resp == "false") {
                    res = false;
                }
                setTimeout(funtionTable + "()", 1);
                return resp;
            });
            return res;
        } else {
            return false;
        }
    });
}


function getIDsByTalbe(objTable,icolumn) {
    var v = '';
    var varIDs = '';
    var table = $('#' + objTable).DataTable();
    var rows = table.rows({ filter: 'applied' }).data();
    for (var i = 0; i < rows.length; i++) {
        var id = rows[i][icolumn];
        if (i < (rows.length - 1)) {
            varIDs += id + ",";
        }
        else {
            varIDs += id;
        }
    }
    return varIDs;
}

function ExportFile(ReportTitle, filetype, table) {

    switch (filetype) {
        case 'doc' || 'docx':
            {
                //$("#" + body).wordExport(ConvertURL(ReportTitle) + "." + filetype);
                break;
            }
        case 'xls' || 'xlsx':
            {
                tableToExcel(table, 'Export_EO_' + ReportTitle);
                break;
            }
        case 'pdf': {
            var pdf = new jsPDF('p', 'pt', 'a4');
            pdf.setFont('Arial');
            pdf.addHTML($('#' + table), function () {
            pdf.save('Export_EO_' + ReportTitle + '.pdf');
            });
            break;
        }
        default: {
            break;
        }
    }  
}


function printPreviewCustomer(ReportTitle, body) {   
    var str = "<!DOCTYPE html><html><title>" + ReportTitle + "</title>";
    str +="<link rel='stylesheet' href='/Assets/Themes/bootstrap/css/bootstrap.min.css'>";
    str +="<link rel='stylesheet' href='/Assets/Themes/bootstrap/fonts/font-awesome.css'>";
    str +="<link rel='stylesheet' href='/Assets/Themes/bootstrap/fonts/ionicons.min.css'>";
    str +="<link rel='stylesheet' href='/Assets/Themes/plugins/daterangepicker/daterangepicker.css'>";
    str +="<link rel='stylesheet' href='/Assets/Themes/plugins/datepicker/datepicker3.css'>";
    str +="<link rel='stylesheet' href='/Assets/Themes/plugins/jvectormap/jquery-jvectormap-1.2.2.css'>";
    str +="<link rel='stylesheet' href='/Assets/Themes/dist/css/AdminTTGroup.css'>";
    str +="<link rel='stylesheet' href='/Assets/Themes/dist/css/skins/_all-skins.min.css'>";
    str += "<link rel='stylesheet' href='/Assets/Themes/plugins/datatables/dataTables.bootstrap.css'>";
    str += "<script src='/Assets/Scripts/jquery.validate.ttg.js' type='text/javascript'></script>";
    str += "<script type='text/javascript' src='/Assets/Themes/plugins/fancybox2.16/jquery.fancybox.pack.js?v=2.1.5'></script>";
    str += "<link rel='stylesheet' type='text/css' href='/Assets/Themes/plugins/fancybox2.16/jquery.fancybox.css?v=2.1.5' media='screen' />";
    str +="<body>";
    str += body + "</body></html>";
    //top open multiple instances we have to name newWindow differently, so getting milliseconds
    var d = new Date();
    var n = 'newWindow' + d.getMilliseconds();
    var newWindow = window.open(
            "",
            n,
            "width=" + (screen.width / 2) - (670 / 2) +
            ",top=0" +
            ",height=" + screen.height - 105 +
            ",left='center'" +
            ",resizable=  'yes'" +
            ",scrollbars=  'yes'" +
            ",status='yes'"
            );
    newWindow.document.write(str);
    newWindow.document.title = ReportTitle;
    newWindow.print();
    newWindow.close();
}

var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
      , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
      , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    return function (table, name) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
        window.location.href = uri + base64(format(template, ctx))
    }
})();

