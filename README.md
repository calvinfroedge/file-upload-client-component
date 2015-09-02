#FileUploadClient Component

This component handles just the upload part for building applications like a client-side image editor, audio manager, etc. It provides a simple upload callback:

```
  var c = new FileUploadClientComponent({
    attachTo: $('#container'),
    events: {
      onUpload: function(files){
        console.log('files are', files);
      }
    }
  });
```

You can also customize the following via options:

- headingText
- allowMultiple (set to true to allow multiple file upload)
