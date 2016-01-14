(function(){
	function Paging(selector) {
        var self = this,exeChange;
        this.change = function (callback) { exeChange = callback; };
        //设置默认
        this.p = parseInt(arguments[3]) || 1; 				//当前页		(如果不传入参数或者参数错误默认当前页为:1)
        this.psize = parseInt(arguments[2]) || 10; 			//每页数据量	(如果不传入参数或者参数错误默认页大小为:10)
        this.recordCount = parseInt(arguments[1]) || 0; 	//总数据量	(如果不传入参数或者参数错误默认数据量为:0 不显示分页)
        if (this.p <= 0) this.p = 1;
        if (this.psize <= 0) this.psize = 10;
        if (this.recordCount < 0) this.recordCount = 0;

        this.setPage = function (num) {
        	if(num*1 && this.p == num*1) return;	//如果当前页 拒绝操作
        	this.p = num*1;
            create();
            exeChange && exeChange(this);
        }
        //创建或更新分页dom
        function create(){
        	if (self.psize <= 0) { self.psize = 10; }
            //计算最大页码
            var maxPage = Math.ceil(self.recordCount / self.psize);
            if (maxPage <= 0) { return; }
            self.p > maxPage && (self.p=maxPage);
            self.p < 1 && (self.p = 1);
            //拼接
            var html = '<div class="page-bar"><ul class="page-items">';
            if (self.p == 1) {
                html += '<li class="page-disable-item">首页</li><li class="page-disable-item">上一页</li>';
            } else {
                html += '<li data-page="1">首页</li><li data-page="' + (self.p - 1) + '">上一页</li>';
            }
            if (self.p > maxPage - 3) {
                for (var i = Math.max(1, maxPage - 6); i <= self.p - 4; i++) {
                    html += '<li data-page="' + i + '">' + i + '</li>';
                }
            }
            for (var i = 1; i <= maxPage; i++) {
                if (self.p - 3 <= i && i <= self.p + 3) {
                    html += i == self.p ? '<li class="page-current-item">' + i + '</li>' : '<li data-page="' + i + '">' + i + '</li>';
                }
            }
            if (self.p < 4) {
                for (var i = 4 + self.p; i <= Math.min(7, maxPage); i++) {
                    html += '<li  data-page="' + i + '">' + i + '</li>';
                }
            }
            if (self.p == maxPage) {
                html += '<li class="page-disable-item">下一页</li><li class="page-disable-item">末页</li></ul>';
            } else {
                html += '<li data-page="' + (self.p + 1) + '">下一页</li><li data-page="' + maxPage + '">末页</li></ul>';
            }
            html += '<div class="page-jump"><input type="number" value="' + self.p + '" min="1" max="' + maxPage + '"><button class="page-goto">确定</button></div></div><div class="page-info">共 <span>' + self.recordCount + '</span> 条  当前显示第 <span>' + ((self.p - 1) * self.psize + 1) + ' - ' + Math.min(self.p * self.psize, self.recordCount) + '</span> 条 共 ' + maxPage + ' 页</div>';
            $(selector).html(html);
        }
        //绑定点击事件
        $(selector).off('click',".page-items li[data-page]");
        $(selector).on("click",".page-items li[data-page]",function () {
            self.setPage($(this).attr("data-page"));
        });
        $(selector).off("click",".page-goto");
        $(selector).on("click",".page-goto",function () {
            self.setPage($(this).siblings(".page-jump input[type=number]").val());
        });
        create();
    }
    window.UI = $.extend(window.UI, { Paging: Paging});
})();