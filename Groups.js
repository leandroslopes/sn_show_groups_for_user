var Groups = Class.create();
Groups.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

    listString: function(userSysIdParameter) {

        var groupsString = '';

        var userSysId = userSysIdParameter || this.getParameter("sysparm_user_sys_id");

        var glideRecordGroups = new GlideRecord('sys_user_grmember');
        glideRecordGroups.addQuery('user', userSysId.toString());
		    glideRecordGroups.orderBy('group');
        glideRecordGroups.query();

        while (glideRecordGroups.next()) {

            var groupName = glideRecordGroups.group.getDisplayValue();

            groupsString += groupName + '\n';
        }

        if (groupsString.length > 0) {
            groupsString = groupsString.slice(0, -1);
        }

        return JSON.stringify(groupsString);
    },

    queryToReferenceQualifier: function(userSysIdParameter) {
		
        var userSysId = userSysIdParameter;
        var groups = [];
        var query = '';
        var queryInitial = 'sys_idIN';

        var glideRecordGroups = new GlideRecord('sys_user_grmember');
        glideRecordGroups.addQuery('user', userSysId.toString());
		    glideRecordGroups.orderBy('group');
        glideRecordGroups.query();

        while (glideRecordGroups.next()) {

			    var groupSysID = glideRecordGroups.group;
			
            groups.push(groupSysID.toString());
          }

        query = queryInitial + groups.join(',');
        
        return query;
    },

    type: 'Groups'
});
