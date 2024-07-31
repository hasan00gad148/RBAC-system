const { User, Article, Role, RolePermission, Permission } = require('./models.js');




async function initData(){

    const roles = await Role.bulkCreate([
    {roleName: 'admin'},
    {roleName: 'editor'},
    {roleName: 'reader'},
    {roleName: 'notAuthenticated'},
    ])

    console.log(roles.length);




    const Permissions = await Permission.bulkCreate([
        {permissionName: 'manageContent'},
        {permissionName: 'manageUsers'},
        {permissionName: 'manageRoles'},
        {permissionName: 'viewContent'},
        {permissionName: 'editContent'},
        {permissionName: 'createContent'},
        ])
        
    console.log(Permissions.length);





    const RolePermissions = await RolePermission.bulkCreate([
        {permission_id:Permissions[0].id , role_id:roles[0].id},
        {permission_id:Permissions[1].id , role_id:roles[0].id},
        {permission_id:Permissions[2].id , role_id:roles[0].id},
        {permission_id:Permissions[3].id , role_id:roles[1].id},
        {permission_id:Permissions[4].id , role_id:roles[1].id},
        {permission_id:Permissions[5].id , role_id:roles[1].id},
        {permission_id:Permissions[3].id , role_id:roles[2].id},
        ])
        
    console.log(RolePermissions.length);





    const users = await User.bulkCreate([
        { userName: 'hasan1', email: 'hasan1@happynews.com', phone:"+201010101001", password: '123451', role_id:roles[0].id},
        { userName: 'hasan2', email: 'hasan2@happynews.com', phone:"+201010101002", password: '123452', role_id:roles[1].id},
        { userName: 'hasan3', email: 'hasan3@happynews.com', phone:"+201010101003", password: '123453', role_id:roles[1].id},
        { userName: 'hasan4', email: 'hasan4@happynews.com', phone:"+201010101004", password: '123454', role_id:roles[2].id},
        { userName: 'hasan5', email: 'hasan5@happynews.com', phone:"+201010101005", password: '123455', role_id:roles[2].id},
    ]);


    console.log(users.length);






    const Articles = await Article.bulkCreate([
        {title: 'title1', content:"this is content1", user_id:users[1].id},
        {title: 'title2', content:"this is content2", user_id:users[1].id},
        {title: 'title3', content:"this is content3", user_id:users[1].id},
        {title: 'title4', content:"this is content4", user_id:users[2].id},
        {title: 'title5', content:"this is content5", user_id:users[2].id},
        ])
        
    console.log(Articles.length);
}

initData()