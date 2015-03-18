(function() {
  "use strict";

  angular.module("appNorthwind")
    .controller("ProductGridCtrl", ["$scope", "$filter", "products", "productService", productGridCtrl]);

  function productGridCtrl($scope, $filter, products, productService) {

    $scope.submit=function(){
      var aa=$scope.formGrid;
      var text =$scope.formGrid.test;
    }
    var productData = products.map(function(p) {
      var prod = {
        'Name': p.productName,
        'Code': p.productCode,
        'Date': p.releaseDate,
        'Cost': p.cost,
        'Price': p.price
      };
      return prod;
    })
    $scope.gridData = productData;
    $scope.gridOptions = {
      data: 'gridData',
      enableColumnResize: true,
      columnDefs: getColumnDefs(),
      showColumnMenu:true,
      showFilter:true,
      showFooter:true,
      showSelectionCheckbox:true,
      maintainColumnRatios:true,
      jqueryUITheme:true
    };
  }

  function getColumnDefs() {
    var defs = [{
      field: 'Name',
      displayName: 'Product Name',
      width: '200'
    }, {
      field: 'Code',
      width: '120'
    }, {
      field: 'Date',
      aggLabelFilter: 'date',
      width: '140'
    }, {
      field: 'Cost',
      aggLabelFilter: 'currency',
      width: '80'
    }, {
      field: 'Price',
      width: '80'
    }];
    return defs;
  }
})();