# ui.paging
分页组件
<blockquote style="padding:10px;border-left:5px solid #888;background:#eee;">
    <p>实例化: </p>
    <p>new window.UI.paging(selector,recordCount [,pSize] [,p])</p>
    <p>参数: </p>
	<p>selector —— jquery支持的选择器，分页条的目标容器</p>
    <p>recordCount —— 数据的总数，<=0 不合条件，不会显示分页条</p>
    <p>psize —— 页大小， 每页显示的数据量 默认:10</p>
    <p>p —— 当前页 ， 默认为1</p>
    <p>方法: </p>
    <p>setPage(Number:n)：调到第n页(n<1 && (n=1);n>maxPage && (n=maxPage))</p>
    <p>change(Function:callback)：页码变化时的回调函数</p>
</blockquote>

#使用方法：
见例子
http://mjixiang.github.io/ui.paging/index.html