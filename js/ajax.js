var Ajax = {

	request : null,
	method : 'GET',
	body : null,
	async : false,
	
	init : function () {
		this.request = (window.XMLHttpRequest)
						? new XMLHttpRequest()
						: ((window.ActiveXObject)
							? new ActiveXObject('Microsoft.XMLHTTP')
							: false
						);
	},
					
	doRequest : function (url, method) {
		//alert(url);
		if(this.request && url != null)
		{
			this.request.onreadystatechange = function()
			{
				if(Ajax.request.readyState == 4)
				{
					//alert(Ajax.request.responseText)
					Ajax.callback(Ajax.request.responseText, Ajax.request.responseXML);
				}
			}
			
			method = method || this.method;
			
			if(method == 'GET')
			{
				this.request.open(method, url, this.async);
				this.request.send(null);
			}
			else
			{
				//this.request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
				this.request.open(method, url, this.async);
				this.request.send(this.body);
			}
			
		}
	},
		
	callback : function (text, xml) {}
};