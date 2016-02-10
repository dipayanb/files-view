import Ember from 'ember';
import FileOperationMixin from '../mixins/file-operation';

export default Ember.Component.extend(FileOperationMixin, {

  selectedFolderPath: '',
  revealPathName: Ember.computed.alias('revealPath'),
  initPath: '?path=%2F',
  didInsertElement: function() {
    var _self = this, result = [];
    var adapter = _self.get('store').adapterFor('file');
    var baseURL = adapter.buildURL('file');

    var init = function(url, parent){
    return Ember.$.ajax({
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

             var temp = '';
             if(parent !== null){
               //This will run only after first level is generated
               var arr =  parent.split('');
               for(var j=0; j < arr.length; j++){
                 temp = temp + "[" + arr[j] + "]" + "['nodes']";
               }
               eval('result' + temp  + '= []');
             }

             var dirRecordsLength = dirRecords.files.length;
             for(var k = 0; k < dirRecordsLength; k++ ) {
                var tempJson = {};
                var recordsArr = dirRecords.files[k].path.split('/');

                tempJson['text'] = recordsArr[recordsArr.length-1];  // setting text property to JSON
                tempJson['completepath'] = dirRecords.files[k].path; // setting completepath property to JSON

                if(parent !== null){
                   //This will run only after first level is generated
                   tempJson['parent'] =  parent.toString() + k.toString();
                   eval('result' + temp).push(tempJson);
                } else {
                   //This will run only once when first level is generated
                   tempJson['parent'] = k.toString();
                   result.push(tempJson);
                }
             }

              $('#tree').treeview({
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

                   var dirUrl = baseURL +'?path=' + data.completepath;

                   init(dirUrl, data.parent).then(function(response){
                       /* Below lines get execute for successful callback. */
                       $('#tree').treeview('expandNode', [ data.nodeId, { silent: true } ]);
                       $('#tree').treeview('revealNode', [ data.nodeId, { silent: true } ]);
                       $('#tree').treeview('selectNode', [ data.nodeId, { silent: true } ]);

                       $treeElmnt.scrollTop($treeElmntScrollHeight);

                       _self.set('selectedFolderPath', data.completepath );
                       _self.send('setSelectedFolder', _self.get('selectedFolderPath')); // send the path as param
                   },
                   function(error){
                      console.log('Fail to retrieve directories through init function.');
                   });
                }}
             );
         },
         error: function() {
             console.log('Error in retrieving the directorties.');
         }
      });
  };

  init(baseURL + this.initPath , null);
  /* TODO:: open all the nodes of revealPathName . */

  },
  actions: {
    setSelectedFolder: function(path) {
      this.parentView.set('selectionName', path);
    }
  }
});
