describe('component', function(){
  var Component = window.FileUploadClientComponent;
  var el = $('body');

  /*
   * Test sync
   */
  describe('File uploader instantiation', function(){
    var cp;
    var renderCallback = null;

    beforeEach(function(){
      cp = new FileUploadClientComponent({
        attachTo: el,
        events: {
          onRender: function(){
            renderCallback = true;
          }
        }
      });
    });

    it('should be present on the page', function(){
      expect(el.find(cp.els.container).length).toEqual(1);
    });

    it('should fire onRender event', function(){
      expect(renderCallback).toEqual(true);
    });

    afterEach(function(){
      cp.remove();
    });
  })
});
