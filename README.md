关于eBind
=====
eBind是一个前端数据绑定Javascript扩展库，支持Grid绑定、List绑定、分页、Form绑定、Element绑定，前端模板机制使用Trimpath。

使用方法
=====
引用所有脚本：eBind-template.js、eBind-table.js、eBind-sort.js、eBind-pager.js、eBind-element.js、eBind-form.js。
支持声明式、标记式两种使用方式，标记字段约定如下：
data-sort:排序字段
data-desc:排序方式
data-pagesize:页大小
data-index:页号

一、绑定Grid
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
        sort: 'UserId',
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
    
二、绑定List
-----
### HTML结构
    <select id="eselect_one" name="eselect_one">
    </select>
### 1.声明式
    var option = {
        source: '/demo/getlist',
        template: '{for user in list}<tr><td>${user.UserId}</td><td>${user.UserName}</td></tr>{/for}',
    };
    $('#eselect_one').bindList(option);
### 2.标记式
    <textarea cols="1" data-for="eselect_one" id="template" rows="1" style="display: none;">
        {for user in list}
            <option value="${user.UserId}">                              
                ${user.UserName}             
            </option>
        {/for}
    </textarea>
    
    var options = {
        source: '/demo/getlist',     
    };
    $('#list').bindList(options);
    
三、绑定Form
-----
### HTML结构
    <form id="frm" class="form-horizontal">
    <div class="control-group">
        <label class="control-label" for="etext">
            etext</label>
        <div class="controls">
            <input type="text" id="etext" name="etext" />
        </div>
    </div>
    <div class="control-group">
        <label class="control-label" for="etextarea">
            etextarea</label>
        <div class="controls">
            <textarea rows="2" cols="1" id="etextarea" name="etextarea"></textarea>
        </div>
    </div>
    <div class="control-group">
        <label class="control-label" for="eselect_one">
            eselect_one</label>
        <div class="controls">
            <select id="eselect_one" name="eselect_one">
                <option value="1">zhangsan</option>
                <option value="2">lisi</option>
                <option value="3">wangwu</option>
            </select>
        </div>
    </div>
    <div class="control-group">
        <label class="control-label" for="eselect_muli">
            eselect_muli</label>
        <div class="controls">
            <select id="eselect_muli" multiple="multiple" name="eselect_muli">
                <option value="1">zhangsan</option>
                <option value="2">lisi</option>
                <option value="3">wangwu</option>
            </select>
        </div>
    </div>
    <div class="control-group">
        <label class="control-label" for="echeckbox">
            echeckbox</label>
        <div class="controls">
            <input type="checkbox" id="echeckbox" name="echeckbox" value="1" />
            <input type="checkbox" id="Checkbox1" name="echeckbox" value="2" />
            <input type="checkbox" id="Checkbox2" name="echeckbox" value="3" />
        </div>
    </div>
    <div class="control-group">
        <label class="control-label" for="eradio">
            eradio</label>
        <div class="controls">
            <input type="radio" id="eradio" name="eradio" value="1" />
            <input type="radio" id="Radio1" name="eradio" value="2" />
            <input type="radio" id="Radio2" name="eradio" value="3" />
        </div>
    </div>
    </form>
### 1.声明式
    var model = {"text":"123","textarea":"456\r\n123","select_one":2,"select_muli":[2,3],"checkbox":[1,3],"radio":2} || {};
    $('#frm').bindForm(model);
