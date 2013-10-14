关于eBind
=====
eBind是一个前端数据绑定Javascript扩展库，支持Grid绑定、List绑定、Form绑定、Element绑定，前端模板机制使用trimpath。

使用方法
=====
支持声明式、标记式两种使用方式
绑定Grid
-----
### HTML结构
    <table id="list" class="table table-bordered table-striped" data-sort="UserId" data-desc="0" data-pagesize="3">
        <thead>
            <tr>
                <th>
                    <a href="#" data-sort="UserId">ID</a>
                </th>
                <th>
                    <a href="#" data-sort="UserName">Name</a>
                </th>
            </tr>
        </thead>
    </table>
### 1.声明式
    var options = {
        source: '/demo/getlist',
        template: '{for user in list}<tr><td>${user.UserId}</td><td>${user.UserName}</td></tr>{/for}',
        pagesize: 3,
        field: 'UserId',
        desc: true
    };
    $('#list').bindTable(options);
### 2.标记式
    <textarea cols="1" data-for="list" id="template" rows="1" style="display: none;">
    {for user in list}
    <tr>
      <td>
        ${user.UserId}
      </td>
      <td>
        ${user.UserName}
      </td>
    </tr>
    {/for}
    </textarea>
    
    var options = {
        source: '/demo/getlist',  
        template: $('#template').val(),      
    };
    $('#list').bindTable(options);
