import Ember from 'ember';

export default Ember.Component.extend({

  selectedFolderPath: '',
  initUrl: '/api/v1/views/FILES/versions/1.0.0/instances/Files/resources/files/fileops/listdir?path=%2F',

  didInsertElement: function() {
    var _self = this, result = [];

    var init = function(url, parent){
    $.ajax({
         url: url,
         type: 'GET',
         accepts: 'application/json',
         success: function(records) {

             var dirRecords = {};
             dirRecords['files'] = [];

             // filtering only the directory records.
             for(var i=0; i < records['files'].length; i++ ){
                  if(records.files[i].isDirectory){
                      dirRecords['files'].push(records['files'][i]);
                  }
             }

             if(parent !== null){
               //This will run only after first level is generated
               var temp = '';
               var arr =  parent.split('');
               for(var i=0; i < arr.length; i++){
                 temp = temp + "[" + arr[i] + "]" + "['nodes']";
               }
               eval('result' + temp  + '= []');
             }

             var dirRecordsLength = dirRecords.files.length;
             for(var i = 0; i < dirRecordsLength; i++ ) {
                var tempJson = {}
                var recordsArr = dirRecords.files[i].path.split('/');

                tempJson['text'] = recordsArr[recordsArr.length-1];  // setting text property to JSON
                tempJson['completepath'] = dirRecords.files[i].path; // setting completepath property to JSON

                if(parent !== null){
                   //This will run only after first level is generated
                   tempJson['parent'] =  parent.toString() + i.toString();
                   eval('result' + temp).push(tempJson);
                } else {
                   //This will run only once when first level is generated
                   tempJson['parent'] = i.toString();
                   result.push(tempJson);
                }
             }

              $('#tree').treeview( {
                data: result,
                levels: 1,
                showIcon: false,
                showBorder: false,
                expandIcon: "fa fa-folder",
                collapseIcon: "fa fa-folder",
                emptyIcon: "fa fa-folder",
                onNodeSelected: function(event, data) {

                   //Tracks scrollTop of the container(tree) because it gets reset to 0 after rendering the json tree.
                   var $treeElmnt = $(event.target);
                   var $treeElmntScrollHeight = $treeElmnt.scrollTop();

                   var dirUrl = '/api/v1/views/FILES/versions/1.0.0/instances/Files/resources/files/fileops/listdir?path=' + data.completepath;

                   init(dirUrl, data.parent);


                   setTimeout(function(){
                     /* TODO :: Use Ember promise for this and exceute the below lines only after geeting successful callback.  */

                      $('#tree').treeview('expandNode', [ data.nodeId, { silent: true } ]);
                      $('#tree').treeview('revealNode', [ data.nodeId, { silent: true } ]);
                      $('#tree').treeview('selectNode', [ data.nodeId, { silent: true } ]);

                      $treeElmnt.scrollTop($treeElmntScrollHeight);

                      _self.set('selectedFolderPath', data.completepath );
                      _self.send('setSelectedFolder', _self.get('selectedFolderPath')); // send the path as param

                   },250);

                }}
             )
         },
         error: function() {
             console.log('Error in retrieving the directorties.');
         }
      });
  };

  init(this.initUrl , null);

  },
  actions: {
    setSelectedFolder: function(path) {
      this.parentView.set('selectionName', path);
    }
  }
});
