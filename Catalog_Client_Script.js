function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) {
        return;
    }

    if (newValue === "") {

        g_form.clearValue('groups');
    }

    if (oldValue == newValue) {
		
        g_form.clearValue('groups');
    }

    var userSysId = g_form.getValue('choose_a_user');
	
    var glideAjax = new GlideAjax('Groups');
    glideAjax.addParam('sysparm_name', 'listString');
    glideAjax.addParam('sysparm_user_sys_id', userSysId.toString());
    glideAjax.getXML(GroupsParse);

    function GroupsParse(response) {

        var answer = response.responseXML.documentElement.getAttribute("answer");
		
        g_form.setValue('groups', JSON.parse(answer));
    }

}
