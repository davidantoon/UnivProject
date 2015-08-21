app.factory('Toast',  function(){
	
	function Toast(Settings){
		this.text = "";
		this.title = "";
		this.position = (Settings != null)?Settings.defaultToastPosition:"BOTTOM";
		this.toastsArray = [];
	};

	Toast.prototype = {

		show: function(title, text, forcePosition){

			if($('#ToastMessage').css('display')=="none"){
				$('#ToastMessage .ToastTitle').html(title);
				$('#ToastMessage .ToastBody').html(text);
				$('#ToastMessage').removeClass('TOP').removeClass('BOTTOM').removeClass('CENTER');
				$('#ToastMessage').addClass(((forcePosition == undefined || forcePosition == null)?this.position:forcePosition));
				$('#ToastMessage').fadeIn(500).delay(2000).fadeOut(500);
				var passThis = this;
				setTimeout(function(){
					$('#ToastMessage .ToastTitle').html("");
					$('#ToastMessage .ToastBody').html("");
					$('#ToastMessage').removeClass('TOP').removeClass('BOTTOM').removeClass('CENTER');
					
					var x = passThis.toastsArray.shift();
					if(x != undefined){
						passThis.show(x.title, x.text, x.position);
					}
				},3200);
			}else{
				var tempToast = new Toast();
				tempToast.text = text;
				tempToast.title = title;
				if(forcePosition == null || forcePosition == undefined)
					tempToast.position = this.position;
				else
					tempToast.position = forcePosition;
				this.toastsArray.push(tempToast);
			}
		}
	};
	return Toast;
});