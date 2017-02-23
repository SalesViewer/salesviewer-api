(function($){
  
  
  
  function log() {
    if ('console' in window) {
      console.log.apply(console, arguments);
    }
  }
  var initSwaggerUi = function(){
     if(window.SwaggerTranslator) {
      window.SwaggerTranslator.translate();
    }
    var swaggerUi = new SwaggerUi({
      url: 'swagger/salesviewer-api.swagger.json',
      dom_id: $(this).attr('id'),
      booleanValues: [0,1],
      docExpansion: 'list', 
      defaultModelRendering: 'model',
      //supportedSubmitMethods: ['get', 'post'],
      //jsonEditor: true,
      showOperationIds: false,
      onComplete: function(swaggerApi, swaggerUi){
        if(typeof initOAuth == "function") {
          initOAuth({
            clientId: "your-client-id",
            clientSecret: "your-client-secret-if-required",
            realm: "your-realms",
            appName: "your-app-name",
            scopeSeparator: " ",
            additionalQueryStringParams: {}
          });
        }

        if(window.SwaggerTranslator) {
          window.SwaggerTranslator.translate();
        }
      },
      onFailure: function(data) {
          log("Unable to Load SwaggerUI");
        },
    });
    
    swaggerUi.load();
    
    //swaggerUi.api.clientAuthorizations.add("apiKey", new SwaggerClient.ApiKeyAuthorization("Authorization", "XXXX", "header"));
  };
  
  $('#swagger-ui-container').each(initSwaggerUi);
  
  
  
  
  
  
  var initApiConsole = function(){
      var orderSetHeaders = function(status, strHeaders){
        var headers = strHeaders.split("\n");
        headers.sort();
        strHeaders = headers.join("\n");
        $('#resultHeaders').text(status + "\r\n\r\n" + strHeaders);        
      };
    
      var processResponse = function(xhr){
        var status = 'Status: ' + xhr.status + ' - ' + xhr.statusText;
          orderSetHeaders(status, xhr.getAllResponseHeaders());
          $('#result').text(xhr.responseText);
          
          try{
            $('#resultJSON').JSONView(xhr.responseText);
            $('#resultJSON-tab').tab('show');
          }
          catch(e){
            $('#result-tab').tab('show');
          }
      };
    
      var form = $('form').submit(function(){        
        var url = $(this).attr('action');
        var query = $(this).serialize();
        
        url += '?' + query;
        
        $.ajax({
          url: url
        }).done(function(data, textStatus, xhr){
          processResponse(xhr);
          return true;          
        }).fail(function(xhr, textStatus, errorThrown){
          processResponse(xhr);
          return true;
        });;
        return false;
      });
      
      
      $('#exampleSelect').change(function(){
        $('#query').val($(this).val());
        form.submit();
      })
      .change();
      
      $('#query').on('focus', function(){
        $(this).keydown(function(e){ 
          if((e.keyCode == 13 && e.ctrlKey) || e.keyCode == 116){
            form.submit();
            return false;
          }
        });
      })
      .on('blur', function(){
        $(this).off('keydown');
      });
  };
  
  
  $('#apiConsole').each(initApiConsole);
  
  
  $('#schema').each(function(){
    var panZoom  = svgPanZoom(this, {
       panEnabled: true
      , controlIconsEnabled: false
      , zoomEnabled: true
      , dblClickZoomEnabled: true
      , mouseWheelZoomEnabled: true
      , preventMouseEventsDefault: true
      , fit: false
      , contain: true
    
    });
    
    $(window).resize(function(){
          panZoom.resize();
          panZoom.fit();
          panZoom.center();
        });
  });
  
})(jQuery);