requirejs.config({
  paths: {
    "jquery": "https://code.jquery.com/jquery-2.1.4.min"
  }
});

define(["main"], function(FileUploadClientComponent){
  var c = new FileUploadClientComponent({
    attachTo: $('#container'),
		allowMultiple: true,
    events: {
      onUpload: function(files){
        console.log('files are', files);
      }
    }
  });
});
