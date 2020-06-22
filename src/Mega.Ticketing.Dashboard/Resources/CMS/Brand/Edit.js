﻿//'use strict';

var Edit = function () {
    // Base elements
    var self = this;
    //Properties and public methods
    this.ReloadDropDown = function (target, url, method, data) {
        $.ajax({
            url: url,
            method: method,
            data: data,
            success: function (responseData) {
                //console.log(responseData); 
                $(target).empty();
                $(target).html(responseData);
                $(".kt-selectpicker").attr("data-live-search", "true");
                $(".kt-selectpicker").attr("data-size", "5")
                $('.kt-selectpicker').selectpicker();
            }
        });
    };
    // PRIVATE 
    var brands = function () {
        $("#brandForm").validate({
            rules: {
                Name: {
                    required: true,
                    minlength: 2
                }
            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                var userData = $("#brandForm").serialize();
                $.ajax({
                    url: "/CMSBrand/AjaxEdit",
                    method: "POST",
                    data: userData,
                    success: function (data) {
                        //notification
                        if (data && data.Result) {
                            tto.success("موفقیت", "درخواست شما با موفقیت انجام شده است.");
                        }
                        else if (data && data.Error) {
                            tto.alert("هشدار", data.Error);
                        }
                        else {
                            tto.alert("هشدار", "مشکلی در ارسال دیده شد. لطفا بررسی نمایید.");
                        }
                    },
                    error: function (data) {
                        if (data) {
                            tto.error("خطا", data.Error);
                        }
                        else {
                            tto.error("خطا", "مشکلی در ارسال ارطلاعات ایجاد شده است");
                        }
                    }
                });
            }
        });
    }
    return {
        init: function () {
            //Dropdowns default
            $(".kt-selectpicker").attr("data-live-search", "true");
            $(".kt-selectpicker").attr("data-size", "5")
            $('.kt-selectpicker').selectpicker();

            //CKEditor init
            CKEDITOR.replace('Description');

            //close modal
            $(document).on('click', '#btnClose', function () {
                MegaYadakModal.inst.CloseModal("#edit");
            });

            //init 
            brands();
        }
    };
}();


$(function () {
    Edit.init();
});