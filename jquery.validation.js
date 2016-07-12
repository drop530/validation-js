(function($){
	$.fn.valid = function(options){
		var $form = this;

		var opt = $.extend({
			ok : function(){},
			error : function(){}
		},options);

		var $submitBtn = $form.find(".valid_sbmt");

		$submitBtn.on("click",function(){

			var $inputs = $form.find("input,textarea,select").not("input[type=submit]").not(".valid_sbmt");
			var errorType = "";
			var _this = "";
			var message = '';

			//全inputの入力をチェックする
			$inputs.each(function(){
				if(errorType) return false; //すでにエラーの場合は調査をしない
				$(this).css('background', '#fff');
				var $inpt = $(this);
				var isMust = $inpt.data("must");
				var type = $inpt.data("validation-type") || "";
				var length = $inpt.data("validation-length");

				//チェック項目でないinputは処理をスキップ
				if(!isMust && !type && !length) return true;

				var val = $inpt.val();
				//必須項目チェック
				if(!!(isMust && !val)){
					errorType = "must";
					message = "必須項目を入力してください";
					_this = this;
					$(_this).css('background', '#F9D5B1');
					return false;
				}

				// lengthチェック
				if(val && length) {
					var length = length.split("-") || "";
					var val_len = val.length;
					if(val_len < length[0] || val_len > length[1]) {
						errorType = "length";
						message = length[0]+"-"+length[1]+"文字の範囲で入力してください";
						_this = this;
						$(_this).css('background', '#F9D5B1');
						return false;
					}
				}

				//入力がある項目項目のみ各チェックを実施
				if(val){
					switch(type){
						case "numeric":
							if(!$inpt.val().match(/^[0-9]+$/)) {
								errorType = "numeric";
								message = "半角数値(ハイフン無し)で入力してください";
							};
							break;
						case "alphabet":
							if(!$inpt.val().match(/^([a-zA-Z])+$/)) {
								errorType = "alphabet";
								message = "半角英字で入力してください";
							};
							break;
						case "alphanumeric":
							if(!$inpt.val().match(/^([a-zA-Z0-9])+$/)) {
								errorType = "alphanumeric";
								message = "半角英数字で入力してください";
							};
							break;
						case "account":
							if(!$inpt.val().match(/^([a-zA-Z0-9_-])+$/)) {
								errorType = "account";
								message = "半角英数字で入力してください<br>※使用できる記号はハイフン(&nbsp;-&nbsp;)アンダースコア(&nbsp;_&nbsp;)のみです";
							};
							break;
						case "email":
							if(!$inpt.val().match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)) {
								errorType = "email";
								message = "メールアドレスの形式が正しくありません";
							};
							break;
						case "url":
							if(!$inpt.val().match(/^https?[:]\/\/.*$/)) {
								errorType = "url";
								message = "URLの形式が正しくありません";
							};
							break;
						case "tel":
							if(!$inpt.val().match(/^(0\d{1,4}(-?)\d{1,4}(-?)\d{3,6})$/)) {
								errorType = "tel";
								message = "電話番号の形式が正しくありません";
							};
							break;
						case "date":
							if(!$inpt.val().match(/^\d{4}\/\d{1,2}\/\d{1,2}$/) && !$inpt.val().match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
								errorType = "date";
								message = "日付の形式が正しくありません";
							}
					}

					if(errorType) {
						_this = this;
						$(_this).css('background', '#F9D5B1');
						return false
					};
				}
			});

			if(errorType){
				opt.error(errorType, message,_this);
			}else{
				opt.ok();
			}
			return false;
		});
	}
})(jQuery);