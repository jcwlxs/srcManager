$().ready(function () {
    validateRule();
});
$.validator.setDefaults({
    submitHandler: function () {
        save();
    }
});

function save() {
    $.ajax({
        cache: true,
        type: "POST",
        url: "/src/save",
        data: $('#signupForm').serialize(),// 你的formid
        async: false,
        error: function (request) {
            parent.layer.alert("Connection error");
        },
        success: function (data) {
            if (data.code == 0) {
                parent.layer.msg("操作成功");
                parent.reLoad();
                var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
                parent.layer.close(index);

            } else {
                parent.layer.alert(data.msg)
            }

        }
    });

}

function validateRule() {
    var icon = "<i class='fa fa-times-circle'></i> ";
    $("#signupForm").validate({
        rules: {
            name: {
                required: true
            },
            imgUrl: {
                required: true
            },
            link: {
                required: true,
                url: true
            },
            introduction: {
                required: true
            }
        },
        messages: {
            name: {
                required: icon + "请输入公司名"
            },
            imgUrl: {
                required: icon + "请上传logo"
            },
            link: {
                required: icon + "请输入公司链接",
                url: icon + "链接格式不正确"
            },
            introduction: {
                required: icon + "请输入公司简介"
            }
        }
    })
}

layui.use('upload', function () {
    var upload = layui.upload;
    //执行实例
    var uploadInst = upload.render({
        elem: '#test1', //绑定元素
        url: '/common/sysFile/upload', //上传接口
        size: 1000,
        accept: 'file',
        done: function (r) {
            layer.msg(r.msg);
            $('#logo').attr('src', r.fileName);
            $('#imgUrl').val(r.fileName);
            console.log('msg', r)
        },
        error: function (r) {
            layer.msg(r.msg);
        }
    });
});