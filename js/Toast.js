app.factory('Toast',  function(){
	
	function Toast(Settings){
		this.text = "";
		this.title = "";
		this.position = (Settings != null)?Settings.defaultToastPosition:"BOTTOM";
		this.toastsArray = [];
	};
	Toast.LONG = 2500;
	Toast.SHORT = 1000;
	Toast.prototype = {

		show: function(title, text, duration, forcePosition){
			duration = ((duration != null)?duration:this.SHORT);
			if($('#ToastMessage').css('display')=="none"){
				$('#ToastMessage .ToastTitle').html(title);
				$('#ToastMessage .ToastBody').html(text);
				$('#ToastMessage').removeClass('TOP').removeClass('BOTTOM').removeClass('CENTER');
				$('#ToastMessage').addClass(((forcePosition == undefined || forcePosition == null)?this.position:forcePosition));
				$('#ToastMessage').fadeIn(500).delay(duration).fadeOut(500);
				var passThis = this;
				setTimeout(function(){
					$('#ToastMessage .ToastTitle').html("");
					$('#ToastMessage .ToastBody').html("");
					$('#ToastMessage').removeClass('TOP').removeClass('BOTTOM').removeClass('CENTER');
					
					var nextToast = passThis.toastsArray.shift();
					if(nextToast != undefined){
						passThis.show(nextToast.title, nextToast.text, nextToast.duration, nextToast.position);
					}
				},(duration+1200));
			}else{
				var tempToast = new Toast();
				tempToast.text = text;
				tempToast.title = title;
				if(forcePosition == null || forcePosition == undefined)
					tempToast.position = this.position;
				else
					tempToast.position = forcePosition;
				tempToast.duration = duration;
				this.toastsArray.push(tempToast);
			}
		}
	};
	return Toast;
});