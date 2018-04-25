// JavaScript Document
function onBlurLastName(e)
{
	if(e.value=='')
	{
		e.value = language.member_register_write_lastname;
		$('#lastname').css('color', '#9F9F9F');
	}
}
function onFocusLastName(e)
{
	if(e.value== language.member_register_write_lastname) 
	{
		e.value='';
		$('#lastname').css('color', '#333333');
	}
}
function onFocusFirstName(e)
{
	if(e.value== language.member_register_write_firstname) 
	{
		e.value='';
		$('#firstname').css('color', '#333333');
	}
}
function onBlurFirstName(e)
{
	if(e.value=='')
	{
		e.value = language.member_register_write_firstname;
		$('#firstname').css('color', '#9F9F9F');
	}
}
function onFocusFullName(e)
{
	if(e.value== language.employer_register_write_fullname) 
	{
		e.value='';
		$('#full_name').css('color', '#333333');
	}
}
function onBlurFullName(e)
{
	if(e.value=='')
	{
		e.value = language.employer_register_write_fullname;
		$('#full_name').css('color', '#9F9F9F');
	}
}

function onFocusCurrentPosition(e)
{
	if(e.value== language.employer_register_write_currentposition) 
	{
		e.value='';
		$('#currentposition').css('color', '#333333');
	}
}
function onBlurCurrentPosition(e)
{
	if(e.value=='')
	{
		e.value = language.employer_register_write_currentposition;
		$('#currentposition').css('color', '#9F9F9F');
	}
}
function onFocusFolderName(e)
{
	if(e.value== language.employer_write_foldername) 
	{
		e.value='';
		$('#folder_name').css('color', '#333333');
	}
}
function onBlurFolderName(e)
{
	if(e.value=='')
	{
		e.value = language.employer_write_foldername;
		$('#folder_name').css('color', '#9F9F9F');
	}
}
function onFocusAddress(e)
{
	if(e.value== language.employer_register_write_address) 
	{
		e.value='';
		$('#address').css('color', '#333333');
	}
}
function onBlurAddress(e)
{
	if(e.value=='')
	{
		e.value = language.employer_register_write_address;
		$('#address').css('color', '#9F9F9F');
	}
}
function onFocusTel(e)
{
	if(e.value== language.field_tel) 
	{
		e.value='';
		$('#tel').css('color', '#333333');
	}
}
function onBlurTel(e)
{
	if(e.value=='')
	{
		e.value = language.field_tel;
		$('#tel').css('color', '#9F9F9F');
	}
}
function onFocusMobile(e)
{
	if(e.value== language.field_mobile) 
	{
		e.value='';
		$('#mobile').css('color', '#333333');
	}
}
function onBlurMobile(e)
{
	if(e.value=='')
	{
		e.value = language.field_mobile;
		$('#mobile').css('color', '#9F9F9F');
	}
}
function onFocusLetterTitle(e)
{
	if(e.value == language.employer_write_letter_title) 
	{
		e.value='';
		$('#letter_title').css('color', '#333333');
	}
}
function onBlurLetterTitle(e)
{
	if(e.value=='')
	{
		e.value = language.employer_write_letter_title;
		$('#letter_title').css('color', '#9F9F9F');
	}
}

//DuyAnh :: jobseeker bookmarks job
function saveJob(jobId){
	$.ajax({
		type: "POST",
		url: TN+"/jobs/save",
		data: { id: jobId }
	}).done(function( msg ) {
		if(msg == 1) alert(language.msg_job_is_saved_successfully);
		else alert(language.msg_you_have_already_save_this_job);
	});
}

//DuyAnh :: employer rates a resume
function rateResume(resumeId, score){
	$.ajax({
		type: "POST",
		url:  EMP_TN+"/resume/rate",
		data: { resume: resumeId, score: score}
		}).done(function( msg ) {
			if(msg > 0){
				//keep silent...	
			}
			else alert( msg );
	});
}

//DuyAnh :: employer set wfs for resume
function setWfsResume(resumeId, score){
	$('#wfs_display').html("&nbsp");
	$.ajax({
		type: "POST",
		url:  EMP_TN+"/resume/wfs",
		data: { resume: resumeId, score: score}
		}).done(function( msg ) {
			if(msg > 0){
				//keep silent...	
				$('#wfs_display').text($('#work_flow_stage_'+score).text());
				$('#wfs_display').fadeIn('slow');
			}
			else alert( msg );
	});
}

//DuyAnh :: employer adds a note for resume
function addNote(resumeId, content){
	if(content == '') alert(language.msg_data_require);
	else{
		$.ajax({
			type: "POST",
			url:  EMP_TN+"/resume/note",
			data: { resume: resumeId, content: content}
			}).done(function( msg ) {
				if(msg > 0){
					$('#strContent').val('');
					window.location.reload();
				}
				else alert( msg );
		});
	}
}

//DuyAnh :: employer delete applied jobs / resumes in folder
function deleteResume(objectId, resumeId, type){
	if(showConfirm(language.msg_confirm_delete)){
		$.ajax({
			type: "POST",
			url:  EMP_TN+"/resume/delete",
			data: { resume: resumeId, objectId: objectId, type: type}
			}).done(function( msg ) {
				if(msg > 0) {
					alert(language.msg_delete_successfull);
					window.location.reload();
				}
				else alert( msg );
		});
	}
}

//VinhTP :: employer delete applied jobs / resumes in folder
function deleteResumeNew(objectId, resumeId, type, fullname){
	if(showConfirm(language.msg_confirm_delete)){
		$.ajax({
			type: "POST",
			url:  EMP_TN+"/resume/delete",
			data: { resume: resumeId, objectId: objectId, type: type, fullname:fullname}
			}).done(function( msg ) {
				if(msg > 0) {
					alert(language.msg_delete_successfull);
					window.location.reload();
				}
				else alert( msg );
		});
	}
}

function restoreResume(objectId, resumeId, type){
	if(showConfirm(language.msg_confirm_restore)){
		$.ajax({
			type: "POST",
			url:  EMP_TN+"/resume/restore",
			data: { resume: resumeId, objectId: objectId, type: type}
			}).done(function( msg ) {
				if(msg > 0) {
					alert(language.msg_restore_successfull);
					window.location.reload();
				}
				else alert( msg );
		});
	}
}

//DuyAnh :: employer add resume to folder
function addResumeToFolder(resumeId, folderId){
	$.ajax({
		type: "POST",
		url: EMP_TN+"/resume/save-resume-to-folder",
		data: { resume: resumeId, folder: folderId}
		}).done(function( msg ) {
			if(msg > 0) {
				alert( language.msg_add_successfull );
				window.location.reload();
			}
			else alert( language.msg_resume_saved_in_this_folder );
	});
}

//employer adds or edit a note for resume
function saveNoteMember(resumeId,content,noteId,index){
        content = escapeHtml(content);
	if(content == ''){
		alert(language.msg_data_require);
		return false;
	}
	$.ajax({
		type: "POST",
		url:  EMP_TN+"/member/save-note-member",
		data: { resume: resumeId, content: content, noteid: noteId}
		}).done(function( msg ) {
			if(msg > 0){				
				/*Neu da reload page thi khong can set?
				$('#'+index).val('');
				$('#'+index).attr('note_id',0);*/
				if($('#lstTbNote').length){
					var dC = flBg = bgR = '';
					if($('.hDCurrent').length)
						dC = $('.hDCurrent').val();
					
					var arrTemp = index.split("_"); 
					if($('#bgRow_'+arrTemp[1]).length){
						flBg = $('#bgRow_'+arrTemp[1]).val();
						$('#bgRow_'+arrTemp[1]).val('2');
					}
					if(flBg == 1){
						bgR = 'bg';
						$('#bgRow_'+arrTemp[1]).val('2');
					}else{
						$('#bgRow_'+arrTemp[1]).val('1');
					}
					$strHtml = '';
					$strHtml += '<tr class="record '+bgR+'">';
					$strHtml += '    <td width="150" valign="top" class="pad_left15">'+dC+'</td>';
					$strHtml += '    <td width="235" valign="top" class="pad_left15">'+content+'</td>';
					$strHtml += '</tr>';
					$('#lstTbNote > tbody').prepend($strHtml);
					$('#'+index).val('');
					$('.addNote').hide();
					$('.btnShowNote').show();
				}else if(location.href.indexOf('tab') == -1 && location.href.indexOf('resume/detail') != -1){
					if(location.href.indexOf('?') == -1)								
						location.href = location.href+'?tab=2';					
					else	
						location.href = location.href+'&tab=2';					
				}else{
					window.location.reload();
				}
			}
			else alert( msg );
	});
}
//employer adds or edit a note for resume
function saveNote(resumeId,content,noteId,index){
	if(content == ''){
		alert(language.msg_data_require);
		return false;
	}
	var request=$.ajax({
		type: "POST",
		url:  EMP_TN+"/member/save-note",
		data: { resume: resumeId, content: content, noteid: noteId},
		dataType: "json"
		});
	request.done(function(data) {
			$("#note_"+resumeId).html(data.html);
			$('#'+index).val('');
			$('#'+index).attr('note_id',0);
			$('#txt_'+resumeId).text(200);

	});
}
//show note of employer
function showNote(memberId){
	$.ajax({
		type: "POST",
		url: EMP_TN+"/member/show-note-member",
		data: {member: memberId},
		dataType: "json",
		success: function(data){
			$("#note_"+memberId).html(data.html);
		}
	});
}
//delete note
function deleteNote(resumeId,noteId){
	var isConfirm = confirm(language.msg_confirm_delete);
	if(isConfirm == true){
		$.ajax({
			type: "POST",
			url:  EMP_TN+"/member/delete-note-member",
			data: {resume: resumeId,noteid: noteId}
			}).done(function( msg ) {
				if(msg > 0){
					window.location.reload();
				}
				else alert( msg );
		});
	}
	else return false;
}

//DuyAnh :: Load all letters by type
function loadLettersByType(idType, idLocation, idMatch){
	var url = EMP_TN+'/ajax/load-letters-by-type';
	if($(idType+' option:selected').val() != ''){
		$(idLocation).load(url,{type:$(idType+' option:selected').val(), idMatch:idMatch, trans:LANGUAGE});
	}
	$(idType).change(function(){
		$(idLocation).load(url,{type:$(idType+' option:selected').val(), idMatch:idMatch, trans:LANGUAGE});
	});	
}

//DuyAnh :: Load all locations followed by country
function loadLocations(idCountry, idLocation, idMatch){
	var url = TN+'/ajax/load-location/';
	if($(idCountry+' option:selected').val() != ''){
		$(idLocation).load(url,{country:$(idCountry+' option:selected').val(), idMatch:idMatch, trans:LANGUAGE});
	}
	$(idCountry).change(function(){
		$(idLocation).load(url,{country:$(idCountry+' option:selected').val(), idMatch:idMatch, trans:LANGUAGE});
	});
}

//DuyAnh :: Load all categories
function loadCategories(idCates, idLocation, idMatch){
	var url = EMP_TN+'/ajax/load-categories/';
	if($(idCates+' option:selected').val() != ''){
		$(idLocation).load(url,{parent:$(idCates+' option:selected').val(), idMatch:idMatch, trans:LANGUAGE});
	}
	$(idCates).change(function(){
		$(idLocation).load(url,{parent:$(idCates+' option:selected').val(), idMatch:idMatch, trans:LANGUAGE});
	});
}


//VinhTP :: Load Job By Department
function loadJobByDepartment(intIdDept, txtJob){
	var url = EMP_TN+'/ajax/load-job-by-department';
	$(txtJob).load(url,{dept:intIdDept});	
}

//VinhTP :: Load Job By User
function loadJobByUser(cbUser, cbJob){
	var intIdUser = $('#'+cbUser).val();
	var url = EMP_TN+'/ajax/load-job-by-user';
	$('#'+cbJob).load(url,{user:intIdUser});	
}

//VinhTP :: Load Industry Other
// type (1:location, 2:industry)
function loadCbOther(idMain, idOther, type){
	var lstChoseOther = $('#'+idOther).chosen().val();
	var valMain = $('#'+idMain).val();
	var url = '';
	if(type == 1){
		url = TN+'/ajax/load-location-other';
	}else if(type == 2){
		url = TN+'/ajax/load-industry-other';
	}
	$.ajax({
		async: false,
		type: "POST",
		url: url,
		data: {valMain:valMain,lstChoseOther:lstChoseOther}
	}).done(function(data) {
		$('#'+idOther).html(data);
		$('#'+idOther).trigger("chosen:updated");
	});
}

//VinhTP :: Load all district followed by location
// Var: idMatch - id location chosen; type - (1: district combobox, 2:district combobox multi, 3:distric combobox multi & location combobox multi)
function loadDistrict(idLocation, idDistrict, idMatch, type){
	if(type == 3)
		var url = TN+'/ajax/load-district-group';
	else
		var url = TN+'/ajax/load-district';
	if($(idLocation+' option:selected').val() != ''){
		var location = $(idLocation+' option:selected').val();
		if(type == 3)
			location = $(idLocation).chosen().val();
		if(location === undefined || location === null)
			location = 0;
		$(idDistrict).load(url,{location:location, idMatch:idMatch, type:type}, function(response,status,xhr){
			if(type >= 2){
				fixWidthChosenDefaulOption(idDistrict+'_chosen', idDistrict, 9);
			}			   															   
		});
	}
	$(idLocation).change(function(){
		location = $(idLocation+' option:selected').val();
		if(type == 3){
			location = $(idLocation).chosen().val();
			idMatch = $(idDistrict).chosen().val();
		}
		if(location === undefined || location === null)
			location = 0;
		$(idDistrict).load(url,{location:location, idMatch:idMatch, type:type}, function(response,status,xhr){
			if(type >= 2){
				fixWidthChosenDefaulOption(idDistrict+'_chosen', idDistrict, 9);
			}																			   
		});
	});
}

//DuyAnh :: vote survey
function voteSurvey(idQuestion, idAnswer){
	var result = null;
	var url = TN+'/ajax/vote-survey/';
	$.ajax({
		async: false,
		type: "POST",
		url: url,
		data: { question: idQuestion, answer: idAnswer }
	}).done(function( msg ) {
		result = msg;
	});
	return result;
}


//Tan Vinh :: vote multi survey
function voteMultiSurvey(strIdQuestion, strIdAnswer){
	var result = null;
	var url = TN+'/ajax/vote-multi-survey/';
	$.ajax({
		async: false,
		type: "POST",
		url: url,
		data: { strIdQuestion: strIdQuestion, strIdAnswer: strIdAnswer }
	}).done(function( msg ) {
		result = msg;
	});
	return result;
}

//DuyAnh :: activate CKEditors
function activeCKEditor(frmId){
	$('#'+frmId).bind('submit', function() {
		for (instance in CKEDITOR.instances)
			CKEDITOR.instances[instance].updateElement();
	})	
}

// VinhTP :: character counter for FCK 
function imposeCKEditorMaxLength(editorName, txtLabel, MaxLen){
	var editor = CKEDITOR.instances[editorName];
	if (!editor) { 
		editor = CKEDITOR.replace(editorName);
	}
	/*init*/
	
	var length = 0;
	var strData = editor.getData();
	if(strData != ''){
		strData = decodeEntities(strData);
		length = strData.replace(/<[^>]*>|\s/g, '').length;
	}
	var count = MaxLen - length;
	if(count >= 0) $('#'+txtLabel).html(count);
	else $('#'+txtLabel).html(0);
	CKEDITOR.instances[editorName].updateElement();
	/*listener*/
	editor.on( 'key', function( e ){
		strData = editor.getData();
		if(strData != ''){
			strData = decodeEntities(strData);
			length = strData.replace(/<[^>]*>|\s/g, '').length;
		}
		count = MaxLen - length;
		if(count >= 0) $('#'+txtLabel).html(count);
		else $('#'+txtLabel).html(0);
	}, editor.element.$ );
	editor.on( 'afterPaste', function( e ){
		strData = editor.getData();
		if(strData != ''){
			strData = decodeEntities(strData);
			length = strData.replace(/<[^>]*>|\s/g, '').length;
		}
		count = MaxLen - length;
		if(count >= 0) $('#'+txtLabel).html(count);
		else $('#'+txtLabel).html(0);
	}, editor.element.$ );
	CKEDITOR.instances[editorName].updateElement();
} 

//VanDung :: get character  length for FCK
function getCKEditorLength(editorName){
	var editor = CKEDITOR.instances[editorName];
	if (!editor) { 
		//editor.destroy(true);
		editor = CKEDITOR.replace(editorName);
	}
	/*init*/
	var length = editor.getData().replace(/<[^>]*>|\s/g, '').length;
	/*listener*/
	editor.on( 'key', function( e ){
		length = editor.getData().replace(/<[^>]*>|\s/g, '').length;
	}, editor.element.$ );
	editor.on( 'paste', function( e ){
		length = editor.getData().replace(/<[^>]*>|\s/g, '').length;
	}, editor.element.$ );
	return length;
} 
//DuyAnh :: character counter for simple textarea
function imposeMaxLength(ele, MaxLen, txtLabel)
{
   if (ele.value.length > (MaxLen-1)) {
        //alert("It cannot exceed " + MaxLen + " characters.");
        ele.value = ele.value.substr(0, (MaxLen));
   }
   var count = MaxLen - ele.value.length;
   if(count >= 0) $('#'+txtLabel).html(count);
   else $('#'+txtLabel).html(0);
}

//DuyAnh :: back to top button
$('.back-to-top').click(function(event) {
	event.preventDefault();
	jQuery('html, body').animate({scrollTop: 0}, 500);
	return false;
})

//DuyAnh :: Essensial functions need to be loaded at runtime
$(document).ready(function () {
	//DuyAnh :: plugin chi cho phep nhap kieu so
	$(".numericOnly").bind("keyup paste", function () {
		$(this).val($(this).val().replace(/[^0-9]/g, ''));
		//$(this).val();
	});
	
	$(".is_score").keypress(function(evt) {
		var charCode = (evt.which) ? evt.which : event.keyCode;
		 if(charCode == 46)
			return true;
		 if (charCode > 31 && (charCode < 48 || charCode > 57))
			return false;
		 return true;
	});
	
	$(".jobonlineCB").delegate( ".cbActiveJob", "click", function() {
		var jobId = $(this).attr('job_id');
		tnAlert(language.title_confirm_active_job_cb, language.content_confirm_active_job_cb, function(){
			$.ajax({
				type: "POST",
				url: EMP_TN+"/job/active-job-cb",
				data: { job_id: jobId }
			}).done(function( msg ) {
				if(msg == 1)
					alert(language.msg_active_job_cb_successful);
				else if(msg == 2)
					alert(language.msg_active_job_cb_expired);
				else if(msg == 3)
					alert(language.msg_active_job_cb_inactived);
				else
					alert(language.msg_active_job_cb_fail);	
			}); //end ajax
		},
		function(){
		});
	});
	if(typeof SHOW_CHANGE_EMAIL_BLACKLIST !== 'undefined')
		showChangeMailForm();
});

/**
 * @author thanglt
 * check if email exist or not
 * usage : check field with id = email
 */
function checkExistEmail(){
		if ($('#email').valid()){
			email =$('#email').val();
			var request=$.ajax({
				url:TN+"/index/check-exist-email",
				type:"POST",
				dataType :"JSON",
				data:{email:email}});
			request.done(function(data){
				if (data.code>0) alert(language.msg_email_exist);
				else alert(language.msg_email_available)
			});
			request.fail(function(jqXHR, textStatus) {
				alert( "Request failed: " + textStatus );
			});	
		}else{
			alert(language.msg_email_require);
		}
}
/**
 * @author Dang Van Dung
 * check if email exist or not
 * usage : check field with id = email
 */
function checkExistEmailEmployer(){
		if ($('#email').valid()){
			email =$('#email').val();
			var request=$.ajax({
				url:EMP_TN+"/user/check-exist-email-employer",
				type:"POST",
				dataType :"JSON",
				data:{email:email}});
			request.done(function(data){
				if (data.code>0) alert(language.msg_email_exist);
				else alert(language.msg_email_available)
			});
			request.fail(function(jqXHR, textStatus) {
				alert( "Request failed: " + textStatus );
			});	
		}else{
			alert(language.msg_email_require);
		}
}
/**
 * @author thanglt
 * reload new capcha
 * usage : create span wrapper for captcha with id = tn_captcha
 */
function refreshCaptcha(){
	$('#tn_captcha').load(TN+'/ajax/get-captcha');
}

/**
 * @author thanglt
 * usage:
 * @param url
 */
function openurl(url){
	window.location.href=url;
}
/**
 * @author thanglt
 * usage:
 * @param url
 */
function redirect(url){
	window.location=url;
}

function fClear(frmId){
	$("#"+frmId).find("input[type=text], textarea, select").val("");
	$("#"+frmId).find("input[type=checkbox]").removeAttr('checked');		
	/*for (instance in CKEDITOR.instances){
		CKEDITOR.instances[instance].setData('');
		CKEDITOR.instances[instance].updateElement();
	}*/
}

function fReset(frmId){
	document.getElementById(frmId).reset();
}

//DuyAnh :: confirm delete
function showConfirm(msg)
{
	return r=confirm(msg)
}

//DuyAnh :: Get value of selected checkboxes
function getSelectedByName(objname){
	var ids = '';
	$("INPUT[name^='"+objname+"'][disabled!='true']").each(function () {
		if($(this).is(':checked'))
			ids += $(this).val() + ',';
	});
	return ids.replace(/[\s,]+$/, '');
}

//DuyAnh: set cookie
function setCookie(c_name,value,expiredays)
{
	var exdate=new Date();
	exdate.setHours(exdate.getHours()+expiredays);
	document.cookie=c_name+ "=" +escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toUTCString())+";domain=."+DOMAIN+";path=/;";
}

//DuyAnh: get cookie
function getCookie(c_name)
{
	if (document.cookie.length>0)
	{
		var c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1)
		{
			c_start=c_start + c_name.length+1;
			var c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
} 

//DuyAnh :: create Keyword, phục vụ cho form search ngoài jobseeker 
function createKeyword (keyword) {
	keyword = $.trim(keyword).replace(/[\/?+#&><"'%.\\]/gi,"");
	do {
		tempkeyword = keyword;
		keyword = tempkeyword.replace(' ', ' ');
	} while (tempkeyword != keyword);
		keyword = keyword.replace(/ /g, '-');
	return encodeURIComponent(keyword);
}

//DuyAnh :: Hàm convert \n sang <br>
function nl2br (str, is_xhtml) {   
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}

//DuyAnh :: Hàm lọc dấu tiếng việt
function stripVietnamese (str) {
	str= str.toLowerCase();
	str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
	str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
	str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
	str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
	str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
	str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
	str= str.replace(/đ/g,"d");
	str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-");
	/* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
	str= str.replace(/-+-/g,"-"); //thay thế 2- thành 1-
	str= str.replace(/^\-+|\-+$/g,"");
	//cắt bỏ ký tự - ở đầu và cuối chuỗi
	return str;
} 

function showPopupCb(obj){
	var jobId = $(obj).attr('rel');
	$(obj).show();
	$.ajax({
		cache: true,
		type: "POST",
		url: EMP_TN+'/job/popup-job-cb',
		data:{job_id:jobId}
		}).done(function(msg) {
			$(obj).html(msg);
		}); //end ajax
}
//dang van dung
function showPopupSource(obj,template){
	var jobId = $(obj).attr('rel');
	$(obj).show();

	$.ajax({
		cache:true,
		async:false,
		//type: "POST",
		url: EMP_TN+'/job/popup-job-source',
		data:{job_id:jobId,lang:LANGUAGE,template:template}
		}).done(function(msg) {
			$(obj).html(msg);
		}); //end ajax
}
// VinhTP
function showPopupNoteUser(obj,user){
	var strRel = $(obj).attr('rel');
	var arrRel = strRel.split('_');
	$(obj).show();
	if($.trim($(obj).html()) == ''){
		$.ajax({
			type: "POST",
			url: EMP_TN+'/requisition/show-note',
			data:{requisition:arrRel[0],user:arrRel[1],lang:LANGUAGE},
			dataType: "json",
			success: function(data){
				if(data.error ==0){
					$(obj).html(data.html);
				}else alert(data.msg);
			}
		});
	}
}
//dang van dung
function popupCandidatesInProcess(obj){
	var jobId = $(obj).attr('rel');
	$(obj).show();
	$.ajax({
		type: "POST",
		url: EMP_TN+'/requisition/load-candidates-in-process',
		data:{job_id:jobId,lang:LANGUAGE}
		}).done(function(msg) {
			$(obj).html(msg);
		}); //end ajax
}

function popupHistoryApplies(obj){
	var resumeId = $(obj).attr('rel');
	$(obj).show();
	$.ajax({
		type: "POST",
		url: EMP_TN+'/resume/load-history-application',
		data:{resume_id:resumeId,lang:LANGUAGE}
		}).done(function(msg) {
			$(obj).html(msg);
		}); //end ajax
}
//DuyAnh :: check if browser is IE
//Example: if (isIE () == 8) / if (isIE () < 9) / if (isIE())
function isIE () {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

function shareLink(type){switch(type){case"yume":window.open("http://yume.vn/share_partners/link?u="+encodeURIComponent(location.href)+"&t="+encodeURIComponent(document.title),"yumeshare","toolbar=1,status=0,width=980,height=475,scrollbars=1,menubar=1,location=1,resizable=1","_blank");break;case"facebook":window.open("http://www.facebook.com/sharer.php?u="+encodeURIComponent(location.href)+"?track-source=facebook"+"&t="+encodeURIComponent(document.title),"sharer",",width=980,height=600");break;case"yahoo":document.getElementById("yahoo_share").href="ymsgr:im?msg="+document.title+" "+location.href;break;case"yahoo2":document.getElementById("yahoo_share2").href="ymsgr:im?msg="+document.title+" "+location.href;break;case"twitter":window.open("http://twitter.com/home?status=Reading:"+encodeURIComponent(location.href)+"&t="+encodeURIComponent(document.title),"sharer",",width=980,height=600");break;case"linkedin":window.open("http://www.linkedin.com/shareArticle?mini=true&url="+encodeURIComponent(location.href)+"?track-source=linkedin"+"&t="+encodeURIComponent(document.title),"sharer",",width=980,height=600");break;case"google":window.open("https://www.google.com/bookmarks/mark?op=edit&bkmk="+encodeURIComponent(location.href)+"&title="+encodeURIComponent(document.title)+"&annotation="+encodeURIComponent(document.title),"sharer",",width=980,height=600");break;}return false;}
function adjustHeight(){
	//set height
	var windowHeight = $(window).height();
	var headerHeight = $('#header-container').height();
	var footerHeight = $('#footer').height() + 80;
	var mainHeight = $('#main-content').height();
	var objHeight = windowHeight - (headerHeight + footerHeight);
	if (mainHeight < objHeight )
	{
		$('#main-content').css({"min-height": objHeight});
	}
}
function adjustHeightUpgrade(){
	//set height
	var windowHeight = $(window).height();
	var headerHeight = $('#header-container').outerHeight(true);	
	var footerHeight = $('#footer').outerHeight(true);

	var mainHeight = $('#wrapper').outerHeight(true);
	var objHeight = windowHeight - (headerHeight + footerHeight);
	var height = headerHeight + footerHeight + mainHeight;
	if (mainHeight < objHeight )
	{
		$('#wrapper').css({"min-height": objHeight});
	}
}
function adjustHeightPremium(){
	//set height
	var windowHeight = $(window).height();
	var headerHeight = $('#section-header').height();
	var footerHeight = $('#footer-pre').height();
	var mainHeight = $('#wrapper').height();
	var objHeight = windowHeight - (headerHeight + footerHeight);
	if (mainHeight < objHeight ){
		$('#wrapper').css({"min-height": objHeight});
	}
}

function adjustHeightPremiumDemo(){
	var windowHeight = $(window).height();
	var headerHeight = $('.header-container').height();
	var footerHeight = $('#footer').height()+10;
	var mainHeight = $('#wrapper').height();
	//alert(windowHeight + ' - ' + headerHeight + ' - ' + footerHeight + ' - ' + mainHeight);
	var objHeight = windowHeight - (headerHeight + footerHeight);
	if (mainHeight < objHeight ){
		$('#wrapper').css({"min-height": objHeight});
	}
}

function tnAlert(title,description,functionOK,functionCancel){
	$('#notice_title').html(title);
	$('#notice_desc').html(description);
	if (typeof(functionOK) == "function"){
		$('#notice_ok').click(function(){
			functionOK();
		});
	}
	if (typeof(functionCancel) == "function"){	
		$('#notice_cancel').click(function(){
			functionCancel();
		});
	}else{
		$('#notice_cancel').remove();
	}
	$('#notice_title').html(title);
	$.fancybox({
		'href' : '#NoticePost',
		'type' : 'inline'
	});
}

//DuyAnh :: load box ngoài jobseeker template02
function loadJobsMapBox(divId){
	$.ajax({
		type: "POST",
		url: TN+"/jobs/all-jobs",
		data: { trans: LANGUAGE  }
	}).done(function( msg ) {
		$('#'+divId).html(msg);
	});
}

//VinhTP :: load section all job in home
function loadJobsMapSection(divId){
	$.ajax({
		type: "POST",
		url: TN+"/jobs/all-jobs",
		data: { trans: LANGUAGE, type: 'section'}
	}).done(function( msg ) {
		$('#'+divId).html(msg);
	});
}

//VinhTP :: load section job in home
function loadJobsByCateSection(divId){
	$.ajax({
		type: "POST",
		url: TN+"/ajax/load-job-by-cate-section",
		data: { trans: LANGUAGE}
	}).done(function( msg ) {
		$('#'+divId).html(msg);
	});
}

//VinhTP :: load section media
function loadMediaSection(divId, controler, action){
	$.ajax({
		type: "POST",
		url: TN+"/ajax/load-media-section",
		data: {'con': controler, 'ac': action}
	}).done(function( msg ) {
		$('#'+divId).html(msg);
	});
}

//DuyAnh :: load box ngoài jobseeker template 04
function loadJskNewsBox(divId,rowsPerPage){
	$.ajax({
		type: "POST",
		url: TN+"/ajax/load-news",
		data: { trans: LANGUAGE,limit: rowsPerPage}
	}).done(function( msg ) {
		$('#'+divId).html(msg);
	});
}

//VinhTP
function loadJskNewsBoxByCate(catId, divId,rowsPerPage){
	$.ajax({
		type: "POST",
		url: TN+"/ajax/load-news",
		data: { trans: LANGUAGE,limit: rowsPerPage,catId:catId}
	}).done(function( msg ) {
		$('#'+divId).html(msg);
	});
}

//Van Dung :: load box about us ngoài jobseeker template vinacapital
function loadJskAboutusBox(divId){
	$.ajax({
		type: "POST",
		url: TN+"/ajax/load-aboutus",
		data: { trans: LANGUAGE  }
	}).done(function( msg ) {
		$('#'+divId).html(msg);
	});
}
//Author : Van Dung | modified by Tan Thang (27/03/2014)
function popupSendMail(buttonName, editorName, memberId, jobId, bypassJob){
	//Sendmail
	$('.'+buttonName).click(function(){
		if(!memberId){
			var member = getSelectedByName('id[]');
			if(member == ''){
				alert(language.msg_choose_item);
				return false;
			}
		}else 
			member = memberId;
		if(!jobId)
			job= getSelectedByName('ind[]');
		else
			job=jobId;
		if (bypassJob==true) job="";	
		$.fancybox({
		  href : EMP_TN+"/member/sendmail?member="+member+"&job="+job,
		  type : 'ajax',
		  onClosed: function() {
			  CKEDITOR.remove(CKEDITOR.instances[editorName]);
		  }
		});
		//window.location = EMP_TN+"/member/sendmail?member="+member;
	});
}

function popupForwardMail(buttonName, editorName, memberId){
	//Forward
	$('.'+buttonName).click(function(){
		if(!memberId){
			var member = getSelectedByName('id[]');
			if(member == ''){
				alert(language.msg_choose_item);
				return false;
			}
		}
		else member = memberId;
		$.fancybox({
		  href : EMP_TN+"/member/forward-member?member="+member,
		  type : 'ajax',
		  onClosed: function() {
			  CKEDITOR.remove(CKEDITOR.instances[editorName]);
		  }
		});
		//window.location = EMP_TN+"/member/forward-member?member="+member;
	});
}
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  } 
  //alert('Query Variable ' + variable + ' not found');
  return "";
}
//Van Dung : upload avatar
function ajaxFileUpload(){	
	$.ajaxFileUpload({
		url:TN+'/resume/uploadavatar',
		secureuri:false,
		fileElementId:'fileavatar',		
		dataType: 'json',
		success: function (data, status){
			if(typeof(data.error) != 'undefined'){
				if(data.error != ''){
					jAlert(data.error,language.msg_notice,'error');
				}else{
					$("#img_mem_avatar").attr("src",IMAGES_TN+'/avatar/'+data.msg);
					$('#remove_photo_span').css('display','block');
				}
			}
		},
		error: function (data, status, e){
			jAlert(e,language.msg_notice,'error');
		}
	}
	)
	return false;
} 
/*
* Function upload avarta employers
* Add new param jobseeker_id check jobseeker_id of employer
* @author: Vinhht
*/
function ajaxFileUploadAdmin(){	
	$.ajaxFileUpload({
		url:EMP+'/resume/uploadavatar',
		secureuri:false,
		fileElementId:'fileavatar',		
		data:{'jobseeker_id':jobseeker_id},
		dataType: 'json',
		success: function (data, status){
			if(typeof(data.error) != 'undefined'){
				if(data.error != ''){
					jAlert(data.error,language.msg_notice,'error');
				}else{
					$("#img_mem_avatar").attr("src",IMAGES_TN+'/avatar/'+data.msg);
					$('#remove_photo_span').css('display','inline');
				}
			}
		},
		error: function (data, status, e){
			jAlert(e,language.msg_notice,'error');
		}
	}
	)
	return false;
} 
function removePicture(){
	$.ajax({
		type: "POST",
		url:TN+"/resume/removeavatar",		
		dataType: "html",
		success: function(){
			$('#img_mem_avatar').attr('src',STATIC_TN+'/images/noavatar.png');
			$('#remove_photo_span').css('display','none');
		}
	});
}

function removePicturePrivate(link_noavatar){
	$.ajax({
		type: "POST",
		url:TN+"/resume/removeavatar",		
		dataType: "html",
		success: function(){
			$('#img_mem_avatar').attr('src',link_noavatar);
			$('#remove_photo_span').css('display','none');
		}
	});
}
/*
* Function remove avarta employers
* Add new param jobseeker_id check jobseeker_id of employer
* @author: Vinhht
*/

function removePictureAdmin(){
	$.ajax({
		type: "POST",
		url:EMP+"/resume/removeavatar",		
		data:{'jobseeker_id':jobseeker_id},
		dataType: "html",
		success: function(){
			$('#img_mem_avatar').attr('src',STATIC_TN+'/images/noavatar.png');
			$('#remove_photo_span').css('display','none');
		}
	});
}

//Author : Van Dung (30/06/2014)
function popupAddInterview(buttonName, memberId, jobId, currentUrl){
	$('.'+buttonName).click(function(){
		if(!memberId){
			var member = getSelectedByName('id[]');
			if(member == ''){
				alert(language.msg_choose_item);
				return false;
			}
		}
		else member = memberId;
		$.fancybox({
		  openEffect  : 'none',
   		  closeEffect : 'none',
		  href : EMP_TN+"/calendar/create-event?member="+member+'&job='+jobId+'&url='+currentUrl,
		  type : 'ajax'
		});
	});
}
//Author : Van Dung (08/07/2014)
function popupEditInterview(taksId, currentUrl){
	
	$.fancybox({
	  openEffect  : 'none',
	  closeEffect : 'none',
	  href : EMP_TN+"/calendar/create-event?id="+taksId+'&url='+currentUrl,
	  type : 'ajax'
	});
}
//Author : Van Dung (08/07/2014)
function popupAddEvent(currentUrl){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10) {
		dd='0'+dd
	} 
	if(mm<10) {
		mm='0'+mm
	} 
	var today = yyyy+'-'+mm+'-'+dd;
	$.fancybox({
	  openEffect  : 'none',
	  closeEffect : 'none',
	  href : EMP_TN+"/calendar/create-event?type=2&url="+currentUrl+'&start='+today+'&end='+today,
	  type : 'ajax'
	});
}
// VinhTP: Decode Entities Html  
function decodeEntities(s){
	var str, temp= document.createElement('p');
    temp.innerText = s;
    str= temp.textContent || temp.innerText;
    temp=null;
    return str;
}

function changeCFieldDate(id)
{
	id = '#'+id;
	var m = $(id+'_month').val();
	var y = $(id+'_year').val();
	var my = m+'-'+y;
	if(my=="-") my="";
	$(id).val(my);
}

function showChangeMailForm()
{
	$.fancybox({
		href: TN+'/'+LANGUAGE +'/changeemail',
		type: 'ajax'
	});
}

function confirmEmailForm()
{
	$.ajax({
		type: "POST",
		url: TN+"/confirmemail",
		data: { 'confirmed': 1 }
	}).done(function( msg ) {
		$.fancybox.close();
	});
	return false;
}

(function () {
	$.fn.popbox = function (options) {
		var settings = $.extend({
			selector: this.selector,
			txt_getData: '.txt_getData',
			DataGot: '.DataGot',
			close: '.close'
		}, options);
		var methods = {
			txt_getData: function (event) {
				var flag = true;
				if (flag){
					event.preventDefault();
					var pop = $(this);
					var DataGot = $(this).parent().find(settings['DataGot']);
					$('.DataGot').fadeOut("fast");
					if (DataGot.css('display') == 'block') {
						methods.close();
					} else {
						DataGot.css({
							'display': 'block'
						});
					}
				}
			},
			close: function () {
				$(settings['DataGot']).fadeOut("fast");
			}
		};
		$(document).bind('click', function (event) {
			if (!$(event.target).closest(settings['selector']).length) {
				methods.close();
			}
		});
		return this.each(function () {
			$(settings['txt_getData'], this).bind('click', methods.txt_getData);
			$(settings['txt_getData'], this).parent().find(settings['close']).bind('click', function (event) {
				event.preventDefault();
				methods.close();
			});
		});
	}
}).call(this);
function nCheck(val, tokens, key)
{	
	var err = '';
	if(val == '(' && key > 0){								
		var t_tmp = --key;	
		if(tokens[t_tmp] == '' || $.inArray(tokens[t_tmp], ['AND','OR']) >= 0 || tokens[t_tmp] == undefined){					
		}else{					
			err = language.emp_common_error_keyword_boolean;
		}
	}else if(val == ')'){				
		var p_tmp = ++key;
		if(tokens[p_tmp] == '' || $.inArray(tokens[p_tmp], ['AND','OR']) >= 0 || tokens[p_tmp] == undefined){						
		}else{
			err = language.emp_common_error_keyword_boolean;
		}
	}	
	return err;
}

function checkInputNormalText(strCheck){if(isBlackListTag(strCheck)){return false}return true}
function isBlackListTag(strCheck){var arrList=new Array("<",">","=","[","]","{","}","^","~","$","%");for(var i=0;i<arrList.length;i++){if(strCheck.indexOf(arrList[i])>=0){return true}}return false}

function parse_boolean_string(boolean_string)
{	
	boolean_string = boolean_string.replace(/[\r\n\t]/g,"").trim();	
	var pattern = /(AND|OR|\(|\))/;
	var tokens = new Array();
	tokens = boolean_string.split(pattern);// /(AND|OR|\(|\)|[\s,]+)/
	var i = 0;	
	console.log(tokens);
	$.each(tokens, function(key, val){	
		tokens[key] = $.trim(val);
		if($.trim(val) == ""){
			tokens.splice(key, 1);			
		}					
		if(val == undefined){
			tokens.splice(key, 1);				
		}					
	});	
	console.log(tokens);
	var err= '';	
	var total_w = tokens.length;		
	if(tokens[i] == undefined)
		tokens.shift();	
	total_w = tokens.length;	
	if(tokens[total_w-1] == undefined)
		tokens.pop();
	total_w = tokens.length;		
	$.each(tokens, function(key, val){		
		i++;							
		if(i == 1 && parseInt($.inArray(val, ['AND','OR'])) >= 0){				
			err = language.emp_common_error_keyword_boolean;				
		}				
		
		if(i == total_w && parseInt($.inArray(val, ['AND', 'OR'])) >= 0){			
			err = language.emp_common_error_keyword_boolean;	
		}
		if(parseInt($.inArray(val, ['(', ')'])) >= 0 && err == ''){				
			err = nCheck(val, tokens, key);			
		}			
	});			
	return err;	
}
function validateKeySearch(idKey){
	//$('#frmSearchMember').submit();
	var keyword = $('#'+idKey).val().replace(/\//g,"&frasl;");
	if(checkInputNormalText(keyword)==false){			
		alert(language.emp_common_validate_keyword);
		return false;
	}		
	if(keyword != ''){				
		var str_err = parse_boolean_string(keyword);	
		if(str_err){
			alert(str_err);
			return false;
		}
		
		var char_open = keyword.match(/\(/g);			
		if(char_open == null)
			char_open = 0;
		else
			char_open = char_open.length;
		var char_close = keyword.match(/\)/g);
		if(char_close == null)
			char_close = 0;
		else
			char_close = char_close.length;		
		if(parseInt(char_open) - parseInt(char_close) != 0){			
			alert(language.emp_common_error_keyword_parenthesis);				
			return false;
		}		
		if(parseInt(char_open) > 2 && parseInt(char_close) > 2){
			alert(language.emp_common_error_keyword_max_condition);				
			return false;
		}
		
		var char_n = keyword.match(/\"/g);			
		if(char_n == null)
			char_n = 0;
		else
			char_n = char_n.length;
		if(parseInt(char_n) % 2 != 0){
			alert(language.emp_common_error_keyword_parenthesis);				
			return false;
		}	
		
		
		var pattern_c = /AND|OR/g;
		var matches = keyword.match(pattern_c);	
		if(matches != null){
			matches = matches.toString();	
			var arrMatches = matches.split(",");	
			if(arrMatches.length > 3){				
				alert(language.emp_common_error_keyword_boolean);					
				return false;
			}
		}	

		var pattern_d = /"(.*?)"/g;
		var matches = keyword.match(pattern_d);				
		if(matches != null){			
			matches = matches.toString();			
			var arrMatches = matches.split(",");
			var err = '';
			$.each(arrMatches, function(key, val){					
				var res = val.replace("AND","and");				
				res = res.replace("OR","or");				
				keyword = keyword.replace(val, res);				
				if($.trim(res.replace(/[\"]/g,"")) == '') {					
					err = language.emp_common_error_keyword_boolean;					
				}else if(res.indexOf('(') >= 0 || res.indexOf(')') >= 0){
					err = language.emp_common_error_keyword_boolean;					
				} 
			});
			if(err){						
				alert(err);						
				return false;
			}
		}	
		
		var pattern_e = /\(.*?\)/g;
		var matches = keyword.match(pattern_e);		
		if(matches != null){
			matches = matches.toString();
			if(matches.indexOf('AND')==-1 && matches.indexOf('OR')==-1){				
				alert(language.emp_common_error_keyword_boolean);						
				return false;
			}else{
				var arrMatch = matches.split(",");	
				var err = '';				
				$.each(arrMatch, function(key, val){					
					var tmp = val;
					tmp = tmp.replace('(', '');
					tmp = tmp.replace(')', '');				
					var arrMatches = tmp.split(/(AND|OR)/);										
					var tt = 0;
					var ss = 0;		
					$.each(arrMatches, function(key, val1){							
						if($.trim(val1) == 'AND' || $.trim(val1) == 'OR')
							tt++;
						if($.trim(val1) != '' && $.trim(val1) != 'AND' && $.trim(val1) != 'OR')
							ss++;					
					});	
					if(ss-tt != 1){
						err = language.emp_common_error_keyword_boolean;							
					}	
				});
				if(err){						
					alert(err);						
					return false;
				}
			}
		}	
	}	
	return true;
}

// kind (0: Except Saturday & Sunday, 1: Except Saturday, 2: Except Sunday, 3: All )
function calcBusinessDays(start, end, kind) {
    // This makes no effort to account for holidays
    // Counts end day, does not count start day

    // make copies we can normalize without changing passed in objects    
    var start = new Date(start);
    var end = new Date(end);

    // initial total
    var totalBusinessDays = 0;

    // normalize both start and end to beginning of the day
    start.setHours(0,0,0,0);
    end.setHours(0,0,0,0);

    var current = new Date(start);
    //current.setDate(current.getDate() + 1);
    var day;
    // loop through each day, checking
    while (current <= end) {
        day = current.getDay();
		switch(kind){
			case 0:
				if (day >= 1 && day <= 5) {
					++totalBusinessDays;
				}
				break;
			case 1:
				if (day >= 0 && day <= 5) {
					++totalBusinessDays;
				}
				break;
			case 2:
				if (day >= 1 && day <= 6) {
					++totalBusinessDays;
				}
				break;
			case 3:
				++totalBusinessDays;
				break;
		}
		
        current.setDate(current.getDate() + 1);
    }
    return totalBusinessDays;
}

// type (1: Add, 2: Sub)
// kind (0: Except Saturday & Sunday, 1: Except Saturday, 2: Except Sunday, 3: All )
function getDayFollowNumDay(date, num, type, kind) {
    // make copies we can normalize without changing passed in objects    
    var date = new Date(date);
    
    // normalize both start and end to beginning of the day
    date.setHours(0,0,0,0);
	
    var current = new Date(date);
	var day;
	day = current.getDay();
	switch(kind){
		case 0:
			while(day == 0 || day == 6) {
				current.setDate(current.getDate() + 1);
				day = current.getDay();
			}
			break;
		case 1:
			while(day == 6) {
				current.setDate(current.getDate() + 1);
				day = current.getDay();
			}
			break;
		case 2:
			while(day == 0) {
				current.setDate(current.getDate() + 1);
				day = current.getDay();
			}
			break;
	}
	if(num > 0){
		num = num - 1;
		if(type == 1){
			// loop through each day, checking
			while(num) {
				day = current.getDay();
				switch(kind){
					case 0:
						while(day == 0 || day == 6) {
							current.setDate(current.getDate() + 1);
							day = current.getDay();
						}
						break;
					case 1:
						while(day == 6) {
							current.setDate(current.getDate() + 1);
							day = current.getDay();
						}
						break;
					case 2:
						while(day == 0) {
							current.setDate(current.getDate() + 1);
							day = current.getDay();
						}
						break;
				}
				current.setDate(current.getDate() + 1);
				num = num - 1;
			}	
			day = current.getDay();
			switch(kind){
				case 0:
					while(day == 0 || day == 6) {
						current.setDate(current.getDate() + 1);
						day = current.getDay();
					}
					break;
				case 1:
					while(day == 6) {
						current.setDate(current.getDate() + 1);
						day = current.getDay();
					}
					break;
				case 2:
					while(day == 0) {
						current.setDate(current.getDate() + 1);
						day = current.getDay();
					}
					break;
			}
			
		}else if(type == 2){
			// loop through each day, checking
			while(num) {
				day = current.getDay();
				switch(kind){
					case 0:
						while(day == 0 || day == 6) {
							current.setDate(current.getDate() - 1);
							day = current.getDay();
						}
						break;
					case 1:
						while(day == 6) {
							current.setDate(current.getDate() - 1);
							day = current.getDay();
						}
						break;
					case 2:
						while(day == 0) {
							current.setDate(current.getDate() - 1);
							day = current.getDay();
						}
						break;
				}
				current.setDate(current.getDate() - 1);
				num = num - 1;
			}
			day = current.getDay();
			switch(kind){
				case 0:
					while(day == 0 || day == 6) {
						current.setDate(current.getDate() - 1);
						day = current.getDay();
					}
					break;
				case 1:
					while(day == 6) {
						current.setDate(current.getDate() - 1);
						day = current.getDay();
					}
					break;
				case 2:
					while(day == 0) {
						current.setDate(current.getDate() - 1);
						day = current.getDay();
					}
					break;
			}
		}
	}
	var result = '', date = current.getDate(), month = current.getMonth() + 1;
	if(date < 10)
		result += '0' + date;
	else
		result += date;
	result += '/';	
	if(month < 10)
		result += '0' + month;
	else
		result += month;
	result += '/' + current.getFullYear(); 
    return result;
}

function isNumberKey(evt)
{
 	var charCode = (evt.which) ? evt.which : event.keyCode;
 	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;
 	return true;
}

function removeNotify(logid, objR)
{
	$.ajax({
		url: EMP_TN+'/notifyalert',
		type: 'POST',
		async: false,
		data: {'id':logid, 'action':'delete'}		
	}).done(function(data) {
		if(data=="1") $(objR).remove();
	});	
	return false;
}

function setGridJobType(type){
	setCookie('gridtype',type);
	location.reload();
}

function shareLinkDirect(type, url) {
    switch (type) {
        case "facebook":
            window.open("http://www.facebook.com/sharer.php?u=" + encodeURIComponent(url) + "?track-source=facebook" + "&t=" + encodeURIComponent(document.title), "sharer", ",width=980,height=600");
            break;
        case "yahoo":
            document.getElementById("yahoo_share").href = "ymsgr:im?msg=" + document.title + " " + url;
            break;
        case "yahoo2":
            document.getElementById("yahoo_share2").href = "ymsgr:im?msg=" + document.title + " " + url;
            break;
        case "twitter":
            window.open("http://twitter.com/home?status=Reading:" + encodeURIComponent(url) + "&t=" + encodeURIComponent(document.title), "sharer", ",width=980,height=600");
            break;
        case "linkedin":
            window.open("http://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(url) + "?track-source=linkedin" + "&t=" + encodeURIComponent(document.title), "sharer", ",width=980,height=600");
            break;
        case "google":
            window.open("https://www.google.com/bookmarks/mark?op=edit&bkmk=" + encodeURIComponent(url) + "&title=" + encodeURIComponent(document.title) + "&annotation=" + encodeURIComponent(document.title), "sharer", ",width=980,height=600");
            break;
		case "pinterest":
            window.open("https://pinterest.com/pin/create/button/?url==" + encodeURIComponent(url) + "&description=" + encodeURIComponent(document.title), "sharer", ",width=980,height=600");
            break;
    }
    return false;
}

function getAnchor(url) {  
    return (url.split('#').length > 1) ? url.split('#')[1] : null;
}

function checkUrlValid(url) {  
    if(/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(url)){
		return true;
	} else {
		return false;
	}
}

function number_format (number, decimals, dec_point, thousands_sep) {
    // Strip all characters but numerical ones.
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}


var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

function escapeHtml (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}