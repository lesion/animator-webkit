var App = {

  settings: {
    log: true
  },

  gui: require('nw.gui'),

  main: function(){
    $.ui.customClickHandler = App.route;
  },

  route: function(target)
  {
    var url = $(target).attr('href');
    if(url===null)return;

    var args = url.split('/');
    var controller = args.shift();

    try
    {
      // TOFIX check that controller is not internal method
      if( typeof App[controller] === 'function' )
        App[controller].apply(null,args);
      else if ( controller!=='' && $('#'+controller).length)
        $.ui.loadContent('#'+controller,true,false);
      else
      {
        App.log("");
      }
      return true;
    }
    catch(e)
    {
      App.log(e.message);
      return true;

    }
    return true;
  },

  log: function(message){console.log(message);},
  quit: function(){
    App.gui.Window.get().close();
  }

};

$.ui.ready(App.main);
