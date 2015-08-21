app.factory('Toast',  function(){
	
	function Toast(Settings){
		this.text = "";
		this.title = "";
		this.position = (Settings != null)?Settings.defaultToastPosition:"BOTTOM";
		this.toastsArray = [];
		this.toastClass = "NOTE";
	};
	Toast.LONG = 2500;
	Toast.SHORT = 1000;
	Toast.SUCCESS = "SUCCESS";
	Toast.ERROR = "ERROR";
	Toast.NOTE = "NOTE";
	Toast.TOP = 'TOP';
	Toast.BOTTOM = 'BOTTOM';
	Toast.CENTER = 'CENTER';
	Toast.prototype = {

		show: function(title, text, duration, toastClass, forcePosition){
			duration = ((duration != null)?duration:this.SHORT);
			toastClass = ((toastClass == null || toastClass == undefined)?this.NOTE:(toastClass == this.SUCCESS)?this.SUCCESS:this.ERROR);
			if($('#ToastMessage').css('display')=="none"){
				$('#ToastMessage .ToastTitle').html(title);
				$('#ToastMessage .ToastBody').html(text);
				$('#ToastMessage').removeClass(this.TOP).removeClass(this.BOTTOM).removeClass(this.CENTER);
				$('#ToastMessage').addClass(((forcePosition == undefined || forcePosition == null)?this.position:forcePosition));
				$('#ToastMessage .ToastTitle').addClass(toastClass);
				$('#ToastMessage').fadeIn(500).delay(duration).fadeOut(500);
				var passThis = this;
				setTimeout(function(){
					$('#ToastMessage .ToastTitle').html("");
					$('#ToastMessage .ToastBody').html("");
					$('#ToastMessage').removeClass(this.TOP).removeClass(this.BOTTOM).removeClass(this.CENTER);
					
					var nextToast = passThis.toastsArray.shift();
					if(nextToast != undefined){
						passThis.show(nextToast.title, nextToast.text, nextToast.duration, nextToast.toastClass, nextToast.position);
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
				tempToast.toastClass = toastClass;
				this.toastsArray.push(tempToast);
			}
		}
	};
	return Toast;
});