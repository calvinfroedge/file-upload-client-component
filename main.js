/*
 * FileUploadClientComponent
 *
 * Options:
 * {
 *  allowMultiple: false, //Set to true to allow multiple files to be uploaded simultaneously
 *  headingText: 'Upload image(s)', 
 *  attachTo: $('#container'),
 *  events: {
 *    onUpload: function(files){ //handle files},
 *    onRender: function(el){ //do something with el}
 *  }
 * }
 */
(function (module) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], function ($) { 
          return module.component($); 
        });
    } else {
        window.FileUploadClientComponent = module.component($ || jQuery);
    }
}({
  component: function(){
    /*
     * Creates component and adds to page
     */
    var FileUploadClientComponent = function(opts){
      var opts = opts || {};

      opts.events = opts.events || {};


      /*
       * Helper to pluralize word
       */
      var pluralize = function(word, multiple){
        return word + ( (multiple) ? 's' : '');
      }

			/*
			 * Handle single file upload
			 */
			var handleSingle = function(file, cb){
      	var reader = new FileReader();
        reader.onload = function(e) {
          file.src = e.target.result;
					cb(file);
        }
        reader.readAsDataURL(file);
			}

      /*
       * Handle files on finish
       */
      var handleUpload = function(files){
        var uploads = [];
				var i = 0;
				
				var handle = function(){
					handleSingle(files[i], function(file){
						++i;
						uploads.push(file);
						if(i < files.length){
							handle();
						} else {
							if(opts.events.onUpload) opts.events.onUpload(uploads);
						}
					});
				}

				handle();
      }

      /*
       * Start processing files
       */
      var startProcessing = function(files){
        if(opts.allowMultiple){
          handleUpload(files);
        } else {
          handleUpload([files[0]]);
        }
      }

      /*
       * Els, container, dropzone
       */
      var els = {};

      els.container = $('<div class="file-upload-client-component">');

      els.dropzone = $('<div class="file-upload-dropzone"><h2>'+(opts.headingText || 'Drag and drop '+pluralize('file', opts.allowMultiple)+' here')+'</h2><p>or...</p></div>');
      els.dropzone.css('border', '1px solid #ccc');
      els.dropzone.css('padding', '1em');
      els.dropzone.css('text-align', 'center');

      /*
       * Drag / drop listeners
       */
      els.dropzone[0].addEventListener('dragover', function(event){
        event.preventDefault(); 
      }, true);

      els.dropzone[0].addEventListener('drop', function(event){
        event.preventDefault();
        var allTheFiles = event.dataTransfer.files;
        startProcessing(allTheFiles);
      }, true);

      /*
       * File input
       */
      els.browse = $('<input class="file-upload-browse" type="file" '+((opts.allowMultiple) ? 'multiple' : '')+'>');

      els.browse.on('change', function(event){
        startProcessing(els.browse.prop('files'));
      });

      /*
       * Add to dom
       */
      els.dropzone.append(els.browse);

      els.container.append(els.dropzone);

      /*
       * attach parent node to dom
       */
      if(opts.attachTo){
        if(opts.attachTo instanceof $){
          opts.attachTo.append(els.container);
        } else {
          opts.attachTo.appendChild(els.container);
        }

        if(opts.events.onRender){
          opts.events.onRender(els.container);
        }
      }

      //Public API for the component
      return {
        els: els,
        remove: function(){
          els.container.remove();
        }
      }
    };

    return FileUploadClientComponent;

  }
}));
