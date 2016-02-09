/*
  Static configuration for the columns to be shown.
*/
var columnsConfig = [
  {
    title: 'Name',
    key: 'name',
    isVisible: true,
    sortable: true,
    sortOrder: 0,
    columnClass: 'col-md-4'
  },
  {
    title: 'Size',
    key: 'size',
    isVisible: true,
    sortable: true,
    sortOrder: 0,
    columnClass: 'col-md-1'
  },
  {
    title: 'Last Modified',
    key: 'date',
    isVisible: true,
    sortable: true,
    sortOrder: 0,
    columnClass: 'col-md-2'
  },
  {
    title: 'Owner',
    key: 'owner',
    isVisible: true,
    sortable: true,
    sortOrder: 0,
    columnClass: 'col-md-2'
  },
  {
    title: 'Group',
    key: 'group',
    isVisible: true,
    sortable: true,
    sortOrder: 0,
    columnClass: 'col-md-1'
  },
  {
    title: 'Permission',
    key: 'permission',
    isVisible: true,
    sortable: false,
    sortOrder: 0,
    columnClass: 'col-md-2'
  }
];

export default columnsConfig;