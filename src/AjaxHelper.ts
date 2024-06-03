/// <reference path="../node_modules/@types/jquery/dist/jquery.slim.d.ts" />

export module Ajax {

export class AjaxHelper {
   constructor() {}

getJSON(URL: string, callback_success, callback_error, ctx = null) {
   $.ajax({
       url: URL,
       type: 'GET',
       dataType: 'json',
       crossDomain: true,
       success: callback_success,
       error: callback_error,
       context: ctx
   });
   return true;
}

putJSON(URL: string,
        value: string,
        callback_success,
        callback_error,
        ctx = null) {
   $.ajax({
      url: URL,
      type: 'PUT',
      beforeSend: function(xhr) {
         xhr.setRequestHeader("Content-Type", "application/json");
         if (xhr.overrideMimeType) {
            xhr.overrideMimeType("application/json");
         }},
         dataType: 'json',
         crossDomain: true,
         success: callback_success,
         error: callback_error,
         data: value,
         context: ctx
   });
   return true;
}

postJSON(URL: string,
         value: string,
         callback_success,
         callback_error,
         ctx = null) {
   $.ajax({
      url: URL,
      type: 'POST',
      beforeSend: function(xhr) {
         xhr.setRequestHeader("Content-Type", "application/json");
         if (xhr.overrideMimeType) {
            xhr.overrideMimeType("application/json");
         }},
         dataType: 'json',
         crossDomain: true,
         success: callback_success,
         error: callback_error,
         data: value,
         context: ctx
      });
      return true;
   }
}

}